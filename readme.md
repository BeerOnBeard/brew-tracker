# Brew Tracker

I've been using a word document to track my recipes and brews and it's becoming overwhelming. I need the ability to track recipes and the brews I make with them.

## How to Run

```bash
npm start;
```

## How to Run Development

```bash
docker-compose up -d;

# wait for the database and mongo-express to come up

npm run dev;
```

Docker Compose will create a MongoDB database instance and spin up a Mongo Express instance to provide easy access to the data. Then run the NodeJS server configured to point to the MongoDB database.

## Upgrades

- [Migrate v0 Database to v1](tools/migrate-db-v0-to-v1/readme.md)
- [Migrate v1 Database to v2](tools/migrate-db-v1-to-v2/readme.md)
- [Migrate v2 Database to v3](tools/migrate-db-v2-to-v3/readme.md)
