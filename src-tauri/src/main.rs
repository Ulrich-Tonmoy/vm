// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

mod download;
mod win_path;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .manage(download::DownloadState(Arc::new(
            Mutex::new(HashMap::new()),
        )))
        .invoke_handler(tauri::generate_handler![
            win_path::get_user_path,
            win_path::set_user_path,
            download::download_and_unzip
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
