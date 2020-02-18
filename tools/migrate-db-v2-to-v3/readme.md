# Migrate v2 Database to v3 Tool

Version 3 of the application uses a `_version` field on all documents to prevent accidental overwrites. This tool creates a new database created from the documents in the v2 database with the addition of the `_version` field.

The following environment variables are required:

| Name                   | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| BT_V2_MONGO            | Mongo server connection string containing the v2 database     |
| BT_V2_MONGO_DBNAME     | Name of the v2 database                                       |
| BT_V3_MONGO            | Mongo server connection string where you want the v3 database |
| BT_V3_MONGO_DBNAME     | Name of the desired v3 database                               |

Then use `npm start` to run the tool. For example,

```bash
export BT_V2_MONGO=mongodb://developer:changeit@localhost:27017/
export BT_V2_MONGO_DBNAME=brew-tracker-v2
export BT_V3_MONGO=mongodb://developer:changeit@localhost:27017/
export BT_V3_MONGO_DBNAME=brew-tracker-v3
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
