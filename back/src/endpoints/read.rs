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


pub enum ReadResult{
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
impl Into<Result<Response, Rejection>> for ReadResult {
    fn into(self) -> Result<Response, Rejection> {
        // let output: Output = match self {
        //     SUCCESS => Output::FOUND,
        // };
        // let output = Output::Found;
        let output: Output = match &self{
            ReadResult::NotFound => Output::NotFound,
            ReadResult::Success(value) => Output::Found(value.clone())
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


pub async fn read(
    id: usize, 
    tasks: Weak<RwLock<Tasks>>,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Read requested");

    // let response: ReadResult = ReadResult::SUCCESS;

    // response.into()

    tasks.upgrade()
        .unwrap()
        .read()
        .read(id)
        .into()
}