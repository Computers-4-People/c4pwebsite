import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', err => console.log('Redis Client Error', err));

const initializeRedis = async () => {
    try {
        await client.connect();
        console.log('Successfully connected to Redis');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
};

const keyCount = async () => {

    const keyCount = await client.dbSize();
    console.log('Number of keys:', keyCount);
    // if (keyCount > 50) {
    //     await client.flushAll();
    //     console.log('Redis flushed');
    // }
}




initializeRedis();
keyCount();

export default client;
