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

    let response: Option<UpdateResponse> = db.update(id, update.clone()).await.unwrap();

    let output: Output = match response{
        None => Output::NotFound,
        Some(mut found) => {
            let (name, priority, due, description) = update.unwrap();
            // The attributes of the returned element are the old ones.
            // Changing the values so the new object is displayed properly.
            found.name = name;
            found.priority = priority;
            found.due = due;
            found.description = description;

            Output::Found(found)
        },
    };

    output.into()
}
