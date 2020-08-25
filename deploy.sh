#!/usr/bin/env sh

# abort on errors
set -e

rm -rf dist
mkdir dist
cd dist
git init

REPO_URL=gitlab.com/alejandro.cepeda/user-activity-front.git 
PASSWORD=maracaibo-22
USER=alejandro.cepeda

git remote add origin https://$USER:$PASSWORD@$REPO_URL 
git pull origin dist

docker restart traffikp-nginx
cd -

