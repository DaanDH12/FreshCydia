const express = require('express');
const app = express()
const cors = require('cors');
const axios = require('axios')
const fs = require('fs')

// Set the port for the API to listen to
const port = 8080

app.use(express.json());
app.use(cors());

// Gather data from Parcility
async function gatherData() {
    // Featured
    let featured = await axios.get('https://api.parcility.co/db/repos/featured')
    const featuredArray = []
    featured.data.data.forEach(async function (e) {
        let sileo = await axios.get(e.SileoDepiction)
        featuredArray.push({
            "name": e.Name,
            "icon": e.Icon,
            "repo": e.repo.url,
            "id": e.Package,
            "banner": sileo.data.headerImage
        })
    });

    // Popular
    let popular = await axios.get('https://api.parcility.co/db/popular')
    const popularArray = []
    popular.data.data.forEach(e => {
        popularArray.push({
            "name": e.Label,
            "icon": e.Icon,
            "repo": e.repo
        })
    });
    return { popularArray, featuredArray }
};

// Updating cache.json
async function updateCache() {
    var data = 
    fs.writeFileSync('./cache.json', JSON.stringify({
        "featured": (await gatherData()).featuredArray,
        "popular": (await gatherData()).popularArray
    }))
};

// Update cache on startup, and run every x minutes
updateCache()
setInterval(() => {
    updateCache()
}, 10 * 60 * 1000);

app.get('/parcility', async function (req, res) {
    return res.send(fs.readFileSync('./cache.json', 'utf8'))
});

// Start API
app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
});