import Hapi from '@hapi/hapi';
import database from './config/database';

import userRoute from './routes/user';
import postRoute from './routes/post';

const PORT = 3000;

const server = Hapi.server({
        port: PORT,
        host: 'localhost',
        routes: {
            json: {
                space: 4,
            },
        },
});

userRoute(server);
postRoute(server);

server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello World from Hapi!'
});

database.connect().then(async () => {
    try {
        await server.start();
        console.log(`Server listening to port ${PORT} -> ${server.info.uri}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
});


