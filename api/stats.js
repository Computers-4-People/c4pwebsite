// Stats from Zoho Creator dashboard
// Update these values periodically (or set up Custom API in Zoho Creator for live data)
// Last updated: 2026-01-31
const STATS = {
    computersDonated: 6478,
    poundsRecycled: 83780
};

export default async function handler(req, res) {
    console.log('Returning stats:', STATS);
    res.json(STATS);
}
