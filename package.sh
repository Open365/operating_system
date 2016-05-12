#!/bin/sh

set -e
set -u
set -x


if [ ! -f /.dockerinit ]; then
        npm install
        bower install -f
fi

grunt build-client

mkdir pkgs
tar -czvf pkgs/operating_systemArtifact.tar.gz ./build/ bower.json

