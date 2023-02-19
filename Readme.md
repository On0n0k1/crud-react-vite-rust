# Crud React Vite Rust

A simple full stack app with React in the Front End and Rust in the Back End.

Run the app with docker compose:

```bash
docker-compose up
```

Dependencies are cached for both the Front End and Back End. So, after making changes to the source code, it will not download and reinstall dependencies again.

Rebuild the images with:

```bash
# build all services
docker-compose build

# build only the front end
docker-compose build -- frontend

# start only the back end, it will start mongodb and build dependencies
docker-compose up -- backend2
```


# Backend is multi-stage

Rust Backend is built in 3 stages as docker-compose services:
 - backend0: download and compile dependencies;
 - backend1: copy source code and compile;
 - backend2: copy compiled source code to an empty, 20MB image, then start it;

By running ```docker-compose up```, these services will be built. But, after making changes to the source code, manually removing
images is required.

```bash
# If changes were made to the files in /back/src/
sudo docker-compose down

# Remove outdated images
sudo docker rmi crud-react-vite-rust_backend2
sudo docker rmi crud-react-vite-rust_backend1

# Start the backend
sudo docker-compose up -- backend2
```

Or

```bash
# If changes were made to Cargo.toml
sudo docker-compose down

# Remove outdated images
sudo docker rmi crud-react-vite-rust_backend2
sudo docker rmi crud-react-vite-rust_backend1
sudo docker rmi crud-react-vite-rust_backend0

# Start the backend
sudo docker-compose up -- backend2
```

# Database

MongoDB is used as database. It is started automatically when running ```docker-compose up```.
To remove volumes run:

```bash
# Remove all volumes in the system
sudo docker system prune --volumes

# Or
# list volumes
sudo docker volume ls
sudo docker volume rm volume_to_be_removed
```

# Backend: 

## API Endpoints

### GET /task HTTP/1.1

Retrieves all tasks stored in the database.

**Response:**

```
HTTP/1.1 200 OK
Content-type: application/json
[
    {
        "name": "name2",
        "priority": 2,
        "due": 1252515212,
        "description": "ddescription",
        "_id": "63ebc0bece2619cea0ae82b9"
    },
    {
        "name": "name",
        "priority": 5,
        "due": 125215212,
        "description": "description",
        "_id": "63ebc0e2ce2619cea0ae82ba"
    },
]

```

```due``` is the epoch time for the task.
```_id``` is a string with the identifier for the task.

---

### CREATE /task HTTP/1.1

Create a Task in the database. Requires a JSON body.

**Request:**

```
{
    "name": "Fix API bug",
    "priority": 1,
    "due": 330322620,
    "description": "Endpoint /task was panicking when receiving a certain type of request."
}
```
```due``` is the epoch time for the task.


**Response:**

```
{
    "name": "Fix API bug",
    "priority": 1,
    "due": 330322620,
    "description": "Endpoint /task was panicking when receiving a certain type of request.",
    "_id": "63f0c2892131a83310285853"
}
```

---

### GET /task/{id} HTTP/1.1

Retrieve task of given ID.

**Response:**

```
{
    "name": "Fix API bug",
    "priority": 1,
    "due": 330322620,
    "description": "Endpoint /task was panicking when receiving a certain type of request.",
    "_id": "63f0c2892131a83310285853"
}
```

---

### PUT /task/{id}

Update task with given {id}. Requires a JSON body.

**Request:**

```
{
    "name": "An update Task",
    "priority": 55,
    "due": 1512535215,
    "description": "An updated Description"
}
```

**Response:**

```
{
    "name": "An update Task",
    "priority": 55,
    "due": 1512535215,
    "description": "An updated Description",
    "_id": "63f0c2892131a83310285853"
}
```

---

### DELETE /task/{id}

Delete task with given {id}. Responds with removed task.

**Response:**

```
{
    "name": "An updated Task",
    "priority": 55,
    "due": 1512535215,
    "description": "An updated Description",
    "_id": "63f0c2892131a83310285853"
}
```

---
