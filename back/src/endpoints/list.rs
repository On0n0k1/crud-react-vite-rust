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


pub enum ListResult{
    Success(Vec<Task>),
}


#[derive(Deserialize, Serialize, Clone)]
#[serde(untagged)]
enum Output{
    Success(Vec<Task>),
    // NOTFOUND,
}

#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for ListResult {
    fn into(self) -> Result<Response, Rejection> {
        // let output: Output = match self {
        //     SUCCESS => Output::SUCCESS,
        // };
        // let output = Output::SUCCESS;
        let output = match &self{
            Self::Success(values) => Output::Success(values.clone()),
        };

        let mut response = warp::reply::json(&output).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = match output {
            Output::Success(_) => StatusCode::OK,
            // Output::NOTFOUND => StatusCode::NOT_FOUND,
        };

        Ok(response)
    }
}


pub async fn list(
    tasks: Weak<RwLock<Tasks>>,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("List requested");

    // let response: ReadResult = ReadResult::SUCCESS;

    // response.into()

    tasks.upgrade()
        .unwrap()
        .read()
        .list()
        .into()
}