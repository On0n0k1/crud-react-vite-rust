use futures::stream::StreamExt;
use mongodb::{
    bson::{doc, oid::ObjectId},
    error::Result as MongoResult,
    options::{ClientOptions, FindOptions},
    Client, Cursor,
};
use serde::{Deserialize, Serialize};

use crate::message::Message;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Response {
    pub name: String,
    pub priority: u8,
    pub due: u32,
    pub description: String,
    pub _id: String,
}

impl Response {
    pub fn new(message: Message, _id: String) -> Self {
        let (name, priority, due, description) = message.unwrap();

        Response {
            name,
            priority,
            due,
            description,
            _id,
        }
    }

    pub fn projection_doc() -> mongodb::bson::Document {
        doc! {
            "name": 1,
            "priority": 1,
            "due": 1,
            "description": 1,
            "_id": 1,
        }
    }
}
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct MessageProjection {
    #[serde(rename = "_id")]
    pub id: ObjectId,
    pub name: String,
    pub priority: u8,
    pub due: u32,
    pub description: String,
}

#[cfg_attr(feature = "cargo-clippy", allow(clippy::from_over_into))]
impl Into<Response> for MessageProjection {
    fn into(self) -> Response {
        let _id = self.id.to_string();
        let name = self.name.clone();
        let priority = self.priority;
        let due = self.due;
        let description = self.description;

        Response {
            _id,
            name,
            priority,
            due,
            description,
        }
    }
}

#[derive(Clone)]
pub struct DB {
    pub client: Client,
}

impl DB {
    pub async fn init() -> MongoResult<Self> {
        info!("Connecting to Database");

        let mut client_options = ClientOptions::parse("mongodb://mongodb:27017/").await?;
        client_options.app_name = Some("booky".to_string());

        info!("Database connected");

        Ok(Self {
            client: Client::with_options(client_options)?,
        })
    }

    pub async fn list_databases(&self) -> MongoResult<()> {
        info!("Listing Databases");

        for db_name in self.client.list_database_names(None, None).await? {
            info!("{}", db_name);
        }

        Ok(())
    }

    pub async fn insert(&self, message: Message) -> MongoResult<Response> {
        let typed_collection = self
            .client
            .database("messages")
            .collection::<Message>("messages");

        let inserted_result = typed_collection.insert_one(message.clone(), None).await?;
        let inserted_id = inserted_result
            .inserted_id
            .as_object_id()
            .unwrap()
            .to_string();
        info!("{}", inserted_id);
        let response = Response::new(message, inserted_id);

        Ok(response)
    }

    pub async fn list(&self) -> MongoResult<Vec<Response>> {
        let database = self.client.database("messages");
        let collection = database.collection::<MessageProjection>("messages");

        let options = FindOptions::builder()
            .projection(Response::projection_doc())
            .build();
        let mut cursor: Cursor<MessageProjection> = collection.find(None, options).await?;

        let mut result: Vec<Response> = Vec::new();

        while let Some(doc) = cursor.next().await {
            let message: Response = doc?.into();

            info!("{:#?}", message);
            result.push(message);
        }

        Ok(result)
    }

    pub async fn get(&self, id: ObjectId) -> MongoResult<Option<Response>> {
        let id_string = id.to_string();
        let database = self.client.database("messages");
        let collection = database.collection::<Message>("messages");

        let message: Option<Message> = collection.find_one(doc! { "_id": id }, None).await?;
        let response: Option<Response> = message.map(|value| Response::new(value, id_string));
        MongoResult::Ok(response)
    }

    pub async fn delete(&self, id: ObjectId) -> MongoResult<Option<Response>> {
        let id_string = id.to_string();
        let database = self.client.database("messages");
        let collection = database.collection::<Message>("messages");

        let message: Option<Message> = collection
            .find_one_and_delete(doc! { "_id": id }, None)
            .await?;

        let response: Option<Response> = message.map(|value| Response::new(value, id_string));

        MongoResult::Ok(response)
    }

    pub async fn update(&self, id: ObjectId, update: Message) -> MongoResult<Option<Response>> {
        let id_string = id.to_string();
        let database = self.client.database("messages");
        let collection = database.collection::<Message>("messages");

        // Find an entry with given id
        // then use the document returned by "update_doc" to know what to update
        // which in this case is all attributes
        let message: Option<Message> = collection
            .find_one_and_update(doc! { "_id": id }, update.update_doc(), None)
            .await?;

        let response: Option<Response> = message.map(|value| Response::new(value, id_string));
        Ok(response)
    }
}