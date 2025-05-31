import { getCache, setCache, deleteCache } from './redis-utils';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'GET') {

        const { key, typeOfData } = req.query;



        if (!key || !typeOfData) {
            return res.status(400).json({ error: 'Cache key is required' });
        }

        try {
            const cachedData = await getCache(key, typeOfData);
            if (cachedData) {
                return res.json({ data: cachedData});
            }
            return res.status(404).json({ error: 'Cache miss' });
        } catch (error) {
            console.error('Error fetching from cache:', error);
            return res.status(500).json({ error: 'Failed to fetch from cache' });
        }
    }

    if (req.method === 'POST') {
        const { key, value, typeOfData, expiryInSeconds } = req.body;
        if (!key || !value || !typeOfData) {
            return res.status(400).json({ error: 'Cache key and value are required' });
        }

        try {
            await setCache(key, value, typeOfData, expiryInSeconds);
            return res.json({ success: true });
        } catch (error) {
            console.error('Error setting cache:', error);
            return res.status(500).json({ error: 'Failed to set cache' });
        }
    }

    if (req.method === 'DELETE') {
        const { key, typeOfData } = req.query;
        if (!key || !typeOfData) {
            return res.status(400).json({ error: 'Cache key is required' });
        }

        try {
            await deleteCache(key, typeOfData);
            return res.json({ success: true, message: 'Cache deleted successfully' });
        } catch (error) {
            console.error('Error deleting from cache:', error);
            return res.status(500).json({ error: 'Failed to delete from cache' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
} 