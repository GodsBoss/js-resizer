#!/bin/bash

docker run \
  --rm \
  --interactive \
  --tty \
  --user node:node \
  --mount type=bind,src=`pwd`,dst=/home/node \
  --workdir /home/node \
  node:8.11.4-alpine \
  /bin/sh
