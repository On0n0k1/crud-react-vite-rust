use mongodb::{
    bson::{
        Document,
        doc,
    }
};
use serde::{Serialize, Deserialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Message{
    pub name: String,
    pub priority: u8,
    pub due: u32,
    pub description: String,
}

impl Message {

    /// Unwraps the type returning (name, priority, due, description)
    pub fn unwrap(self) -> (String, u8, u32, String){
        (self.name, self.priority, self.due, self.description)
    }

    pub fn update_doc(&self) -> Document{
        doc!{
            "$set": {
                "name": self.name.clone(),
                "priority": self.priority as u32,
                "due": self.due,
                "description": self.description.clone()
            }
        }
    }
}