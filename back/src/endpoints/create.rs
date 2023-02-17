use mongodb::error::Result as MongoResult;

use serde::{Serialize, Deserialize};
use warp::{http::StatusCode, Reply};

use crate::{
    db::DB,
    message::Message,
};

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum ServerError{
    Error(String)
}

impl Default for ServerError{
    fn default() -> Self {
        Self::Error("Server Error".into())
    }
}

pub async fn create(
    message: Message,
    db: DB,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Mongodb Create requested");

    let response = match db.insert(message).await{
        MongoResult::Err(err) => {
            warn!("{:#?}", err);
            let mut response = warp::reply::json(&ServerError::default()).into_response();

            let status: &mut StatusCode = response.status_mut();

            *status = StatusCode::INTERNAL_SERVER_ERROR;

            // return Ok(warp::reply::with_status("Server Error", StatusCode::INTERNAL_SERVER_ERROR));
            return Ok(response);
        },
        MongoResult::Ok(value) => {
            info!("Success inserting entry: {:#?}", value);
            value
        },
    };

    let mut response = warp::reply::json(&response).into_response();

    let status: &mut StatusCode = response.status_mut();

    *status = StatusCode::OK;

    Ok(response)
}