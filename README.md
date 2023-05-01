# website

This project uses [Docker](https://www.docker.com/) for development.

To create a container for development, run in the root folder:

```shell
docker-compose up -d
```

You can now install the required packages and start the dev server:

```shell
docker-compose exec node npm install
docker-compose exec node npm run dev
```
