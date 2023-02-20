use mongodb::bson::doc;

use warp::{http::StatusCode, reply::Response, Rejection, Reply};

use crate::db::{Response as DBResponse, DB};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum GetResponse {
    Messages(Vec<DBResponse>),
}

#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for GetResponse {
    fn into(self) -> Result<Response, Rejection> {
        let mut response = warp::reply::json(&self).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = StatusCode::OK;

        Ok(response)
    }
}

pub async fn list(db: DB) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Mongodb Get Requested");

    let response: Vec<DBResponse> = db.list().await.unwrap();

    let output = GetResponse::Messages(response);

    output.into()
}