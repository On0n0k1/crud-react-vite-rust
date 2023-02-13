use std::sync::Weak;


use serde::{Deserialize, Serialize};
use warp::{http::StatusCode, reply::Response, Rejection, Reply};
use parking_lot::RwLock;

use crate::{
    task::{
        Task,
        Tasks,
    },
};


pub enum DeleteResult{
    Success(Task),
    NotFound,
}

#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
enum Output{
    Found(Task),
    NotFound,
}


#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for DeleteResult {
    fn into(self) -> Result<Response, Rejection> {        
        let output: Output = match &self{
            DeleteResult::NotFound => Output::NotFound,
            DeleteResult::Success(task) => Output::Found(task.clone()),
        };

        let mut response = warp::reply::json(&output).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = match output {
            Output::Found(_) => StatusCode::FOUND,
            Output::NotFound => StatusCode::NOT_FOUND,
        };

        Ok(response)
    }
}


pub async fn delete(
    id: usize, 
    tasks: Weak<RwLock<Tasks>>,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Delete requested");

    tasks.upgrade()
        .unwrap()
        .write()
        .delete(id)
        .into()
}