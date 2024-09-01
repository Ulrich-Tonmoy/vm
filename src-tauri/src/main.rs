// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};

mod download;
mod win_path;

#[tauri::command]
fn get_user_path() -> String {
    let paths: Result<String, std::io::Error> = win_path::get_user_path();
    paths.unwrap()
}

#[tauri::command]
fn set_user_path(new_path: &str) -> String {
    let msg = match win_path::set_user_path(new_path) {
        Ok(_) => String::from("OK"),
        Err(e) => format!("Error: {}", e),
    };
    msg
}

// #[tauri::command]
// fn get_system_path() -> String {
//     let paths: Result<String, std::io::Error> = win_path::get_system_path();
//     paths.unwrap()
// }

// #[tauri::command]
// fn set_system_path(new_path: &str) -> String {
//     let msg = match win_path::set_system_path(new_path) {
//         Ok(_) => String::from("OK"),
//         Err(e) => format!("Error: {}", e),
//     };
//     msg
// }

fn main() {
    tauri::Builder::default()
        .manage(download::ProgressState(Arc::new(Mutex::new(0.0))))
        .invoke_handler(tauri::generate_handler![
            get_user_path,
            set_user_path,
            download::download_and_unzip
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
