use reqwest::Client;
use std::collections::HashMap;
use std::fs::{File, OpenOptions};
use std::io::Write;
use std::sync::{Arc, Mutex};
use tauri::async_runtime::channel;
use tauri::State;
use tauri::{Emitter, Manager};
use tokio::fs;
use zip::read::ZipArchive;

pub struct DownloadState(pub Arc<Mutex<HashMap<String, f32>>>);

#[tauri::command]
pub async fn download_and_unzip<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    url: String,
    dest: String,
    old_name: String,
    new_name: String,
    state: State<'_, DownloadState>,
) -> Result<(), String> {
    let progress_arc = state.0.clone();
    {
        let mut progress_map = progress_arc.lock().unwrap();
        progress_map.insert(new_name.clone(), 0.0);
    }

    let (tx, mut rx) = channel::<(String, f32)>(100);

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

        let zip_path = format!("{}/{}.zip", &dest, &new_name);
        let mut file = File::create(&zip_path).map_err(|e| e.to_string()).unwrap();

        let mut downloaded = 0.0;
        while let Some(chunk) = response.chunk().await.unwrap() {
            file.write_all(&chunk).unwrap();
            downloaded += chunk.len() as f32;

            let progress = downloaded / total_size * 100.0;
            {
                let mut progress_map = progress_arc.lock().unwrap();
                progress_map.insert(new_name.clone(), progress);
            }

            tx.send((new_name.clone(), progress)).await.unwrap();
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

        // Rename the directory to `new_name` if it's not already named `new_name`
        let unzipped_folder_path = std::path::Path::new(&dest).join(&old_name);
        let final_dest = std::path::Path::new(&dest).join(&new_name);

        if final_dest.exists() {
            fs::remove_dir_all(&final_dest)
                .await
                .map_err(|e| format!("Failed to remove existing folder: {}", e))
                .unwrap();
        }

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
        while let Some((version, progress)) = rx.recv().await {
            let window = app_handle.get_webview_window("main").unwrap();
            window
                .emit("download_progress", (version, progress))
                .unwrap();
        }
    });

    Ok(())
}
