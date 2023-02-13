#[macro_use]
extern crate log;



mod endpoints;
mod env;
mod task;
mod message;
// mod read;

use std::sync::Arc;

use endpoints::{
    create::create,
    delete::delete,
    list::list,
    read::read,
    update::update,
};

use warp::{Filter, Rejection, Reply};
use serde::{Serialize, Deserialize};
use parking_lot::RwLock;

use task::Tasks;
use message::Message;



#[derive(Debug, Deserialize, Serialize)]
struct JsonData {
    data: String,
}


async fn handle_post(json_data: JsonData) -> Result<impl Reply, Rejection> {
    info!("Message: {}", json_data.data);
    Ok(warp::reply::json(&json_data))
}

fn limit_json() -> impl Filter<Extract = (Message,), Error = warp::Rejection> + Clone {
    warp::body::content_length_limit(1024 * 16).and(warp::body::json())
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

    // let tasks = Arc::new(Mutex::new(Tasks::default()));
    let tasks = Arc::new(RwLock::new(Tasks::default()));

    let tasks_copy = Arc::downgrade(&tasks);

    let tasks_filter = warp::any().map(move || tasks_copy.clone());

    info!("Starting server at localhost");
    let api_data = warp::path!("api" / "data")
        .and(warp::post())
        .and(warp::body::json())
        .and_then(handle_post);

    // Create

    let create = warp::post()
        .and(warp::path!("task"))
        .and(limit_json())
        .and(tasks_filter.clone())
        .and_then(create);

    // Read

    let read = warp::get()
        .and(warp::path!("task" / usize))
        .and(tasks_filter.clone())
        .and_then(read);

    // List
    let list = warp::get()
        .and(warp::path!("task" / ..))
        .and(tasks_filter.clone())
        .and_then(list);
        
    // Update
    let update = warp::put()
        .and(warp::path!("task" / usize))
        .and(limit_json())
        .and(tasks_filter.clone())
        .and_then(update);

    // Delete
    let delete = warp::delete()
        .and(warp::path!("task" / usize))
        .and(tasks_filter.clone())
        .and_then(delete);

    let routes = api_data.or(create).or(read).or(list).or(update).or(delete);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_methods(vec!["GET", "POST", "PUT","DELETE"]);

    // Apply the CORS middleware to all routes
    let routes = routes.with(cors);

    warp::serve(routes)
        .run(([0, 0, 0, 0], 3030))
        .await;
}