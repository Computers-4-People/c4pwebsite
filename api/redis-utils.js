import client from './redis-config';
import crypto from 'crypto';

export const setCache = async (key, value, typeOfData, expiryInSeconds = 3600) => {
    try {
        if (expiryInSeconds) {
            const hash = crypto.createHash('sha256').update(key).digest('hex');
            const code = hash + typeOfData;
            console.log(code);
            await client.set(code, JSON.stringify(value), { EX: expiryInSeconds });
        } else {
            const hash = crypto.createHash('sha256').update(key).digest('hex');
            await client.set(hash, JSON.stringify(value));
        }
        return true;

    } catch (error) {
        console.error('Error setting cache:', error);
        return false;
    }
};

export const getCache = async (key, typeOfData) => {
    try {
        const hash = crypto.createHash('sha256').update(key).digest('hex');
        const code = hash + typeOfData;
        console.log(code);
        const value = await client.get(code);
        console.log(value);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting cache:', error);
        return null;
    }
};

export const deleteCache = async (key, typeOfData) => {
    try {
        const hash = crypto.createHash('sha256').update(key).digest('hex');
        const code = hash + typeOfData;
        console.log(code);
        await client.del(code);
        return true;
    } catch (error) {
        console.error('Error deleting cache:', error);
        return false;
    }
}; 