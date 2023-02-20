pub fn load() {
    match dotenv::dotenv() {
        Ok(_) => {}
        Err(err) => {
            if err.not_found() {
                warn!("File '.env' not found");
            } else {
                error!("{err}");
            }
        }
    };

    env_logger::init();
}