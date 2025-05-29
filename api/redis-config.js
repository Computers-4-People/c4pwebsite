import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'y4R88qdmxyCHUxN1ZAaonHFKGJzNXXRX',
    socket: {
        host: 'redis-10589.c62.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 10589
    }
});

client.on('error', err => console.log('Redis Client Error', err));


(async () => {
    try {
        await client.connect();
        console.log('Successfully connected to Redis');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
})();

export default client; 