# Challenge - Digivox

## Development environment

### Build the application

- Usage docker

    - Build

          $ docker build -t node_app:dev .

    - Run

          $ docker run \
            -it \
            --rm \
            -v ${PWD}:/app \
            -v /app/node_modules \
            -p 3000:3000 \
            -e CHOKIDAR_USEPOLLING=true \
            node_app:dev

- Usage Docker Compose

      $ docker-compose up -d --build

## Production environment

- Usage docker

    - Build

          $ docker build -f Dockerfile.prod -t node_app:prod .

    - Run

          $ docker run -it --rm -p 3000:80 node_app:prod

- Usage Docker Compose

      $ docker-compose -f docker-compose.prod.yml up -d --build

## Verify the application is running

> Application listens on port 3000.
> http://localhost:3000
