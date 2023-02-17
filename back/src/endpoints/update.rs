use mongodb::bson::{ doc, oid::ObjectId };

use warp::{http::StatusCode, reply::Response, Rejection, Reply};


use serde::{Deserialize, Serialize};
use crate::{
    db::{DB, Response as UpdateResponse},
    message::Message,
};


#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum Output{
    Found(UpdateResponse),
    NotFound,
}


#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Result<Response, Rejection>> for Output {
    fn into(self) -> Result<Response, Rejection> {
        let mut response = warp::reply::json(&self).into_response();
        let status: &mut StatusCode = response.status_mut();

        *status = match &self{
            Self::NotFound => StatusCode::NOT_FOUND,
            Self::Found(_) => StatusCode::OK,
        };

        Ok(response)
    }
}


pub async fn update(
    id: ObjectId,
    update: Message,
    db: DB,
) -> Result<impl warp::Reply, warp::Rejection> {
    info!("Mongodb Update Requested");

    let response: Option<UpdateResponse> = db.update(id, update).await.unwrap();

    let output: Output = match response{
        None => Output::NotFound,
        Some(value) => Output::Found(value),
    };

    output.into()
}
