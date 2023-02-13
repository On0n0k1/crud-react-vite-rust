use std::sync::Weak;

use serde::{Deserialize, Serialize};
use warp::{http::StatusCode, reply::Response, Rejection, Reply};
use parking_lot::RwLock;

use crate::{
    task::{
        Task,
        Tasks,
    },
    message::Message,
};


pub enum UpdateResult{
    Success(Task),
    NotFound
}

#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
enum Output{
    Success(Task),
    NotFound
}


#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for UpdateResult {
    fn into(self) -> Result<Response, Rejection> {
        let output: Output = match &self {
            UpdateResult::Success(task) => Output::Success(task.clone()),
            UpdateResult::NotFound => Output::NotFound,
        };
        // let output = Output::UPDATED();


        let mut response = warp::reply::json(&output).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = match output {
            Output::Success(_) => StatusCode::OK,
            Output::NotFound => StatusCode::NOT_FOUND,
        };

        Ok(response)
    }
}


pub async fn update(
    id: usize,
    message: Message, 
    tasks: Weak<RwLock<Tasks>>,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Update requested");

    // let response: UpdateResult = UpdateResult::Success;

    // response.into()

    tasks.upgrade()
        .unwrap()
        .write()
        .update(id, message)
        .into()
}