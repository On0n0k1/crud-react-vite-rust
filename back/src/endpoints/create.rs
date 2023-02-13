use std::sync::Weak;

use serde::{Deserialize, Serialize};
use warp::{http::StatusCode, reply::Response, Rejection, Reply};
use parking_lot::RwLock;

use crate::{
    task::{Task, Tasks},
    message::Message,
};


pub enum CreateResult{
    Success(Task),
}

#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
enum Output{
    Success(Task),
}


#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for CreateResult {
    fn into(self) -> Result<Response, Rejection> {
        // let output = Output::Created;
        let output = match &self{
            CreateResult::Success(task) => Output::Success(task.clone())
        };

        let mut response = warp::reply::json(&output).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = match output {
            Output::Success(_) => StatusCode::CREATED,
        };

        Ok(response)
    }
}


pub async fn create(
    message: Message, 
    tasks: Weak<RwLock<Tasks>>,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Create requested");

    tasks.upgrade()
        .unwrap()
        .write()
        .create(message)
        .into()
    
    

    // let response: CreateResult = CreateResult::Success;

    // response.into()
}