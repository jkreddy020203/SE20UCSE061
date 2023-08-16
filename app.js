const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

async function urlFetch(url) {
        return axios.get(url)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching from ${url}:`, error);
                return null;
            })
}

app.get('/numbers', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'No URLs provided in query parameters' });
    }

    try {
        const numbers = await urlFetch(url);
        res.json({ numbers });
    } catch (error) {
        res.status(500).json({ error: 'error occured', error });
    }
});

app.listen(PORT, () => {
    console.log(`server is listening on the port ${PORT}`);
});
