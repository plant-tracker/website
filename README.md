# plant-tracker-website
A web application written in Svelte designed to track, manage and maintain plants.
![image](https://github.com/plant-tracker/website/assets/92038757/9b45cf23-121b-4d8a-a5ce-23c409725510)
![image](https://github.com/plant-tracker/website/assets/92038757/fd8940da-7e02-4236-87b3-52198e7ef393)

## Development
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
