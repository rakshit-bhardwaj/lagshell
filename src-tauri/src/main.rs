#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_vibrancy::apply_acrylic;
use tauri_plugin_log::{LogTarget, Builder};
use log::info;
use std::process::Command;
use std::env;

#[tauri::command]
fn connect(ip: &str,port: u16, username: &str, password: &str, keypair: bool) {
    println!("Trying to connect with {}@{}", username, ip);
    let mut putty_command: String = "".to_string();
    // Construct the putty command
    if !keypair {
        putty_command = format!(
            "putty {} -P {} -l {} -pw {}",
            ip, port, username, password
        );
    } else {
        let current_user = env::var("USERNAME").unwrap_or_else(|_| "current_user".to_string());
        putty_command = format!(
            "putty {} -P {} -l {} -i C:\\Users\\{}\\.ssh\\{}",
            ip, port, username, current_user, password
        );
    }
    // Execute the putty command using PowerShell
    let _output = Command::new("cmd.exe")
        .args(&["/C", "start", "powershell.exe", "-Command", &putty_command])
        .status()
        .expect("Failed to execute putty command");
}

fn main() {
    info!("debugging started");
    tauri::Builder::default() 
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            apply_acrylic(&window, Some((18, 18, 18, 125))).expect("some error occured");
            Ok(())
        }).plugin(Builder::new().targets([
            LogTarget::LogDir,
            LogTarget::Stdout,
            LogTarget::Webview,
        ]).build())
        .invoke_handler(tauri::generate_handler![connect])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
