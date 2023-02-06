// use warp::{Filter, Rejection, Reply};
// use serde::{Serialize, Deserialize};

// #[derive(Debug, Deserialize, Serialize)]
// struct JsonData {
//     data: String,
// }

// async fn handle_post(json_data: JsonData) -> Result<impl Reply, Rejection> {
//     println!("Message: {}", json_data.data);
//     Ok(warp::reply::json(&json_data))
// }

// #[tokio::main]
// async fn main() {
//     println!("Starting server at localhost");
//     let api_data = warp::path!("api" / "data")
//         .and(warp::post())
//         .and(warp::body::json())
//         .and_then(handle_post);

//     let routes = api_data;

//     warp::serve(routes)
//         .run(([0, 0, 0, 0], 3030))
//         .await;
// }
use warp::{Filter, Rejection, Reply};
use serde::{Serialize, Deserialize};
// use cors::{self, Cors};

#[derive(Debug, Deserialize, Serialize)]
struct JsonData {
    data: String,
}

async fn handle_post(json_data: JsonData) -> Result<impl Reply, Rejection> {
    println!("Message: {}", json_data.data);
    Ok(warp::reply::json(&json_data))
}

#[tokio::main]
async fn main() {
    println!("Starting server at localhost");
    let api_data = warp::path!("api" / "data")
        .and(warp::post())
        .and(warp::body::json())
        .and_then(handle_post);

    let routes = api_data;

    // // Create a new CORS middleware with default options
    // let cors = Cors::new()
    //     .allow_any_origin()
    //     .allow_methods(vec!["GET", "POST"])
    //     .build();

    let cors = warp::cors()
        // .allow_origin("http://hyper.rs")
        .allow_any_origin()
        .allow_methods(vec!["GET", "POST", "DELETE"]);

    // Apply the CORS middleware to all routes
    let routes = routes.with(cors);

    warp::serve(routes)
        .run(([0, 0, 0, 0], 3030))
        .await;
}