# Migrate v1 Database to v2 Tool

Version 2 of the application uses a different schema to store the notes on a brew. This tool creates a new database created from the documents in the v1 database with the converted collection of brews.

The following environment variables are required:

| Name                   | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| BT_V1_MONGO            | Mongo server connection string containing the v1 database     |
| BT_V1_MONGO_DBNAME     | Name of the v1 database                                       |
| BT_V2_MONGO            | Mongo server connection string where you want the v2 database |
| BT_V2_MONGO_DBNAME     | Name of the desired v2 database                               |

Then use `npm start` to run the tool. For example,

```bash
export BT_V1_MONGO=mongodb://developer:changeit@localhost:27017/
export BT_V1_MONGO_DBNAME=brew-tracker-v1
export BT_V2_MONGO=mongodb://developer:changeit@localhost:27017/
export BT_V2_MONGO_DBNAME=brew-tracker-v2
npm start
```

## Running Tests

Both unit and integration tests are available.

Running unit tests:

```bash
npm test
```

Running integration tests:
```bash
npm run integration-test
```
