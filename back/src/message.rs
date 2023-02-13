use serde::{Serialize, Deserialize};
// Body: {
//   name: String,
//   priority: u8,
//   due: u32,
//   description: String,
// }


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
}