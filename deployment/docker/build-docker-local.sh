#!/bin/bash
export DOCKERHUB_IMAGE=keycloak
export DOCKERHUB_TAG=local

rm -rf dist/
cp -R ../../dist/emi/dist ./dist

docker build  -t $DOCKERHUB_NAMESPACE/$DOCKERHUB_IMAGE:$DOCKERHUB_TAG mods/