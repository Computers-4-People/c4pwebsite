import client from './redis-config';

export const setCache = async (key, value, expiryInSeconds = null) => {
    try {
        if (expiryInSeconds) {
            await client.set(key, JSON.stringify(value), { EX: expiryInSeconds });
        } else {
            await client.set(key, JSON.stringify(value));
        }
        return true;
    } catch (error) {
        console.error('Error setting cache:', error);
        return false;
    }
};

export const getCache = async (key) => {
    try {
        const value = await client.get(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting cache:', error);
        return null;
    }
};

export const deleteCache = async (key) => {
    try {
        await client.del(key);
        return true;
    } catch (error) {
        console.error('Error deleting cache:', error);
        return false;
    }
}; 