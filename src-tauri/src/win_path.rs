use winreg::enums::*;
use winreg::RegKey;

#[tauri::command]
pub fn get_user_path() -> Result<String, String> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let env = hkcu
        .open_subkey("Environment")
        .map_err(|e| format!("Failed to open registry key: {}", e))?;

    let path: String = env.get_value("PATH").unwrap_or_else(|_| String::new());

    Ok(path)
}

#[tauri::command]
pub fn set_user_path(new_path: &str) -> Result<(), String> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let (env, _) = hkcu
        .create_subkey("Environment")
        .map_err(|e| format!("Failed to create or open registry key: {}", e))?;

    env.set_value("PATH", &new_path)
        .map_err(|e| format!("Failed to set registry value: {}", e))?;

    println!("Updated user PATH: {}", new_path);
    Ok(())
}

// pub fn get_system_path() -> Result<String, io::Error> {
//     let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
//     let env =
//         hklm.open_subkey("SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment")?;
//     let paths: Result<String, io::Error> = match env.get_value::<String, _>("PATH") {
//         Ok(path) => Ok(path),
//         Err(_) => Ok(String::new()),
//     };
//     paths
// }

// pub fn set_system_path(new_path: &str) -> Result<(), io::Error> {
//     let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
//     let (env, _) =
//         hklm.create_subkey("SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment")?;
//     env.set_value("PATH", &new_path)?;
//     println!("Updated system PATH: {}", new_path);
//     Ok(())
// }

// fn add_to_user_path(new_path: &str) -> Result<(), io::Error> {
//     let user_path = get_user_path()?;
//     let updated_user_path = format!("{};{}", user_path, new_path);
//     set_user_path(&updated_user_path)
// }

// fn add_to_system_path(new_path: &str) -> Result<(), io::Error> {
//     let system_path = get_system_path()?;
//     let updated_system_path = format!("{};{}", system_path, new_path);
//     set_system_path(&updated_system_path)
// }
