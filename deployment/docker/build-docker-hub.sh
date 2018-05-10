#!/bin/bash
export DOCKERHUB_IMAGE=emi
export DOCKERHUB_TAG=0.0.12

rm -rf deployment/docker/dist/
cp -R $FRONTEND_SHELL_PATH/dist deployment/docker/dist

docker build  -t $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:$DOCKERHUB_TAG -t $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:latest deployment/docker/
docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS
docker push $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:$DOCKERHUB_TAG
docker push $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:latest