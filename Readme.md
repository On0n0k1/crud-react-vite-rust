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

# build only the back end
docker-compose build -- backend
```