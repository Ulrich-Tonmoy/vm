use reqwest::Client;
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::sync::{Arc, Mutex};
use tauri::async_runtime::channel;
use tauri::Manager;
use tauri::State;
use tokio::fs;
use zip::read::ZipArchive;

pub struct ProgressState(pub Arc<Mutex<f32>>);

#[tauri::command]
pub async fn download_and_unzip<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    url: String,
    dest: String,
    old_name: String,
    new_name: String,
    state: State<'_, ProgressState>, // State containing Arc<Mutex<f32>>
) -> Result<(), String> {
    let progress_arc = state.0.clone(); // Clone the Arc for use in async task
    let (tx, mut rx) = channel::<f32>(100);

    // Ensure the destination directory exists
    if !std::path::Path::new(&dest).exists() {
        std::fs::create_dir_all(&dest).map_err(|e| e.to_string())?;
    }

    let app_handle = app.clone();
    tauri::async_runtime::spawn(async move {
        let client = Client::new();
        let mut response = client
            .get(&url)
            .send()
            .await
            .map_err(|e| e.to_string())
            .unwrap();
        let total_size = response.content_length().unwrap_or(0) as f32;

        let zip_path = format!("{}/download.zip", &dest);
        let mut file = File::create(&zip_path).map_err(|e| e.to_string()).unwrap();

        let mut downloaded = 0.0;
        while let Some(chunk) = response.chunk().await.unwrap() {
            file.write_all(&chunk).unwrap();
            downloaded += chunk.len() as f32;

            let progress = downloaded / total_size * 100.0;
            {
                let mut progress_lock = progress_arc.lock().unwrap(); // Use cloned Arc
                *progress_lock = progress; // Update the progress in the state
            }

            tx.send(progress).await.unwrap();
        }

        let file = File::open(&zip_path).map_err(|e| e.to_string()).unwrap();
        let mut archive = ZipArchive::new(file).map_err(|e| e.to_string()).unwrap();
        for i in 0..archive.len() {
            let mut file = archive.by_index(i).map_err(|e| e.to_string()).unwrap();
            let outpath = std::path::Path::new(&dest).join(file.enclosed_name().unwrap());

            if (*file.name()).ends_with('/') {
                std::fs::create_dir_all(&outpath)
                    .map_err(|e| e.to_string())
                    .unwrap();
            } else {
                // Check if the parent directory exists
                if let Some(p) = outpath.parent() {
                    if !p.exists() {
                        std::fs::create_dir_all(&p)
                            .map_err(|e| e.to_string())
                            .unwrap();
                    }
                }

                // Open the file in write mode, or truncate if it already exists
                let mut outfile = OpenOptions::new()
                    .create(true)
                    .write(true)
                    .truncate(true)
                    .open(&outpath)
                    .map_err(|e| e.to_string())
                    .unwrap();

                std::io::copy(&mut file, &mut outfile)
                    .map_err(|e| e.to_string())
                    .unwrap();
            }
        }

        // Rename the directory to `v` if it's not already named `v`
        let unzipped_folder_path = std::path::Path::new(&dest).join(&old_name);
        let final_dest = std::path::Path::new(&dest).join(&new_name);

        if unzipped_folder_path != final_dest {
            fs::rename(&unzipped_folder_path, &final_dest)
                .await
                .map_err(|e| e.to_string())
                .unwrap();
        }

        fs::remove_file(&zip_path)
            .await
            .map_err(|e| e.to_string())
            .unwrap();
    });

    tauri::async_runtime::spawn(async move {
        while let Some(progress) = rx.recv().await {
            app_handle.emit_all("download_progress", progress).unwrap();
        }
    });

    Ok(())
}
