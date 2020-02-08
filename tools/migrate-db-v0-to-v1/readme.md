# Migrate v0 Database to v1 Tool

Version 1 of the application uses a different schema to store the notes on a brew. This tool creates a new database created from the documents in the v0 database with the converted collection of brews.

The following environment variables are required:

| Name                   | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| BT_V0_MONGO            | Mongo server connection string containing the v0 database     |
| BT_V0_MONGO_DBNAME     | Name of the v0 database                                       |
| BT_V1_MONGO            | Mongo server connection string where you want the v1 database |
| BT_V1_MONGO_DBNAME     | Name of the desired v1 database                               |

Run the script using `npm`

```bash
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
