#[macro_use]
extern crate log;
extern crate mongodb;

use mongodb::bson::doc;

mod endpoints;
mod env;
mod message;
mod db;

use endpoints::{
    create::create,
    delete::delete,
    list::list,
    read::read,
    update::update,
};

use warp::Filter;
use serde::{Serialize, Deserialize};
use mongodb::bson::oid::{ ObjectId, Result as ParseResult};

use message::Message;
use db::DB;

#[derive(Debug, Deserialize, Serialize)]
struct JsonData {
    data: String,
}

fn limit_json() -> impl Filter<Extract = (Message,), Error = warp::Rejection> + Clone {
    warp::body::content_length_limit(1024 * 16).and(warp::body::json())
}

pub fn parse_id(id: &str) -> ParseResult<ObjectId> {
    ObjectId::parse_str(id)
}

/// Endpoints
///
/// Create: POST /task or /task/
/// Body: {
///   name: String,
///   priority: u8,
///   due: u32,
///   description: String,
/// }
/// 
/// Read: GET /task/{id}
/// 
/// Update: PUT /task/{id}
/// Body: {
///   name: String,
///   priority: u8,
///   due: u32,
///   description: String,
/// }
/// 
/// Delete: DELETE /task/{id}
/// 
#[tokio::main]
async fn main() {
    env::load();

    let db = DB::init().await.unwrap();
    match db.list_databases().await{
        Err(_) => warn!("Error"),
        _ => info!("OK"),
    };

    let db_filter = warp::any().map(move || db.clone());

    let param_filter = warp::path!("task" / String)
        .map(|id: String| parse_id(&id).unwrap());

    info!("Starting server at localhost");

    let mongo_insert = warp::post()
        .and(warp::path!("task"))
        .and(limit_json())
        .and(db_filter.clone())
        .and_then(create);
    
    let mongo_list = warp::get()
        .and(warp::path!("task"))
        .and(db_filter.clone())
        .and_then(list);

    let mongo_get = warp::get()
        .and(param_filter)
        .and(db_filter.clone())
        .and_then(read);

    let mongo_update = warp::put()
        .and(param_filter)
        .and(limit_json())
        .and(db_filter.clone())
        .and_then(update);

    let mongo_delete = warp::delete()
        .and(param_filter)
        .and(db_filter)
        .and_then(delete);

    let routes =mongo_insert.or(mongo_list).or(mongo_get).or(mongo_delete).or(mongo_update);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(vec!["GET", "POST", "PUT","DELETE"]);

    // Apply CORS middleware to all routes
    let routes = routes.with(cors);

    warp::serve(routes)
        .run(([0, 0, 0, 0], 3030))
        .await;
}