// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};

mod download;
mod win_path;

fn main() {
    tauri::Builder::default()
        .manage(download::ProgressState(Arc::new(Mutex::new(0.0))))
        .invoke_handler(tauri::generate_handler![
            win_path::get_user_path,
            win_path::set_user_path,
            download::download_and_unzip
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
