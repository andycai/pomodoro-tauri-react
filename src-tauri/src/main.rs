// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Menu;

use crate::utils::set_window_shadow;

mod utils;
mod tray;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(&app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        // .menu(tauri::Menu::os_default(&context.package_info().name))
        .menu(Menu::default())
        .system_tray(tray::menu())
        .on_system_tray_event(tray::handler)
        .run(context)
        .expect("error while running tauri application");
}
