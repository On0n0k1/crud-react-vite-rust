use serde::{Serialize, Deserialize};

use crate::endpoints::{
    create::CreateResult,
    delete::DeleteResult,
    list::ListResult,
    read::ReadResult,
    update::UpdateResult,
};

use crate::message::Message;



// Task
// name: string;
// priority: number;
// due: Epoch Time
// description: string;
// id: number;

#[derive(Clone, Serialize, Deserialize)]
pub struct Task {
    name: String,
    priority: u8,
    due: u32,
    description: String,
    id: usize,
}

impl Task{
    // Create
    pub fn new(
        name: String,
        priority: u8,
        due: u32,
        description: String,
        id: usize,
    ) -> Self {
        Task {
            name,
            priority,
            due,
            description,
            id,
        }
    }

}


#[derive(Default)]
pub struct Tasks(Vec<Task>);



impl Tasks {
    fn index_not_found(&self, index: usize) -> bool {
        index >= self.0.len()
    }

    // Create
    pub fn create(
        &mut self,
        message: Message,
    ) -> CreateResult {
        let index = self.0.len();
        let (name, priority, due, description) = message.unwrap();

        let task = Task::new(name, priority, due, description, index);

        self.0.push(task.clone());

        CreateResult::Success(task)
    }

    // read
    pub fn read(
        &self,
        index: usize,
    ) -> ReadResult {
        match self.0.get(index).map(|z| (*z).clone()){
            None => ReadResult::NotFound,
            Some(value) => ReadResult::Success(value),
        }
    }

    pub fn list(
        &self,
    ) -> ListResult {
        ListResult::Success(self.0.clone())
    }

    // update
    pub fn update(
        &mut self, 
        index: usize, 
        message: Message,
    ) -> UpdateResult{
        let task: &mut Task = match self.0.get_mut(index){
            None => return UpdateResult::NotFound,
            Some(value) => value,
        };

        let (name, priority, due, description) = message.unwrap();
        task.name = name;
        task.priority = priority;
        task.due = due;
        task.description = description;

        UpdateResult::Success(task.clone())
    }

    // delete
    pub fn delete(
        &mut self,
        index: usize
    ) -> DeleteResult {
        if self.index_not_found(index) {
            return DeleteResult::NotFound
        }

        let removed = self.0.remove(index);

        DeleteResult::Success(removed)
    }
}