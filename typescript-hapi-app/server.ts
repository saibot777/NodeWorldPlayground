import Hapi from "./app";

const server = new Hapi.Server({
    host: 'localhost',
    port: process.env.port || 3001
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return 'Hello, world!';
    }
});

server.start();