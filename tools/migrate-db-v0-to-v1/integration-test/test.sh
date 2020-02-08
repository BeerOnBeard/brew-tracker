#!/bin/bash
set -e;

trap "docker-compose down" EXIT;

export BT_V0_MONGO=mongodb://developer:changeit@localhost:27017/
export BT_V0_MONGO_DBNAME=brew-tracker
export BT_V1_MONGO=mongodb://developer:changeit@localhost:27017/
export BT_V1_MONGO_DBNAME=brew-tracker-v1

docker-compose up -d;

# NOTE: This is not great and may fail if the images are not downloaded already.
#       I should check to see if the database is ready before moving on. ¯\_(ツ)_/¯
#       If the script fails when trying to connect to the database, try running again
#       or increasing the sleep a bit.
sleep 5;

echo 'Inserting brews...';
node insert-test-brews.js;

echo 'Running conversion...';
node ../index.js;

echo 'Verifying migration...';
node verify-migration.js;

echo 'All done!';
