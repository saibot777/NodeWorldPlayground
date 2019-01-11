const Hapi = require('hapi');

const server = new Hapi.Server({
    host: 'localhost',
    port: 3001
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

const start =  async function() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();