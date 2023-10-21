use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, SystemTraySubmenu, 
    // api::dialog::message,
};

#[derive(Clone, serde::Serialize)]
struct DurationPayload {
  duration: i16,
  r#break: i16,
}

// 托盘菜单
pub fn menu() -> SystemTray {
    let tray_menu = SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new( // 子菜单
            "Work Duration", // 子菜单名称
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("wd15".to_string(), "15 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("wd20".to_string(), "20 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("wd25".to_string(), "25 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("wd30".to_string(), "30 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("wd45".to_string(), "45 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("wd60".to_string(), "60 minutes")) // 子菜单项（新增）
        ))
        .add_submenu(SystemTraySubmenu::new( // 子菜单
            "Break Duration", // 子菜单名称
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("bd5".to_string(), "5 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("bd10".to_string(), "10 minutes")) // 子菜单项（新增）
                .add_native_item(SystemTrayMenuItem::Separator) // 分割线
                .add_item(CustomMenuItem::new("bd15".to_string(), "15 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("bd20".to_string(), "20 minutes")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("bd30".to_string(), "30 minutes")) // 子菜单项（新增）
        ))
        .add_native_item(SystemTrayMenuItem::Separator) // 分割线
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit")); // 退出

    // 设置在右键单击系统托盘时显示菜单
    SystemTray::new().with_menu(tray_menu)
}

// 菜单事件
pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
    // 获取应用窗口
    // let window = app.get_window("main").unwrap();
    // let parent_window = Some(&window);
    // 匹配点击事件
    match event {
        // 左键点击
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            // match window.is_visible() {
            //     Ok(visible) => {
            //         if visible {
            //             window.hide().unwrap();
            //         } else {
            //             window.show().unwrap();
            //         }
            //     },
            //     Err(err) => println!("visible error: {}", err),
            // }
            println!("system tray received a left click");
        },
        // 右键点击
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        },
        // 双击，macOS / Linux 不支持
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a double click");
        },
        // 根据菜单 id 进行事件匹配
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "wd15" => {
                app.emit_all("event-change-duration", DurationPayload { duration: 15, r#break: -1 }).unwrap();
                // message(parent_window, "wd15", "TODO");
            }
            "wd20" => {
                app.emit_all("event-change-duration", DurationPayload { duration: 20, r#break: -1 }).unwrap();
            }
            "wd25" => {
                app.emit_all("event-change-duration", DurationPayload { duration: 25, r#break: -1 }).unwrap();
            }
            "wd30" => {
                app.emit_all("event-change-duration", DurationPayload { duration: 30, r#break: -1 }).unwrap();
            }
            "wd45" => {
                app.emit_all("event-change-duration", DurationPayload { duration: 45, r#break: -1 }).unwrap();
            }
            "wd60" => {
                app.emit_all("event-change-duration", DurationPayload { duration: 60, r#break: -1 }).unwrap();
            }
            "bd5" => {
                app.emit_all("event-change-break", DurationPayload { duration: -1, r#break: 5 }).unwrap();
            }
            "bd10" => {
                app.emit_all("event-change-break", DurationPayload { duration: -1, r#break: 10 }).unwrap();
            }
            "bd15" => {
                app.emit_all("event-change-break", DurationPayload { duration: -1, r#break: 15 }).unwrap();
            }
            "bd20" => {
                app.emit_all("event-change-break", DurationPayload { duration: -1, r#break: 20 }).unwrap();
            }
            "bd30" => {
                app.emit_all("event-change-break", DurationPayload { duration: -1, r#break: 30 }).unwrap();
            }
            "quit" => {
                std::process::exit(0);
            }
            _ => {}
        },
        _ => {},
    }
}