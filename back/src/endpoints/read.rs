use mongodb::bson::{doc, oid::ObjectId};

use warp::{http::StatusCode, reply::Response, Rejection, Reply};

use crate::db::{Response as GetResponse, DB};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum Output {
    Found(GetResponse),
    NotFound,
}

#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for Output {
    fn into(self) -> Result<Response, Rejection> {
        let mut response = warp::reply::json(&self).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = match &self {
            Self::NotFound => StatusCode::NOT_FOUND,
            Self::Found(_) => StatusCode::OK,
        };

        Ok(response)
    }
}

pub async fn read(id: ObjectId, db: DB) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Mongodb Get Requested");

    let response: Option<GetResponse> = db.get(id).await.unwrap();

    let output: Output = match response {
        None => Output::NotFound,
        Some(value) => Output::Found(value),
    };

    output.into()
}