import {createConnection} from "typeorm";

createConnection({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "hackaslc",
    synchronize: true,
    logging: false,
    entities: [
    "./src/models/*.ts"
    ]
})

