require('dotenv').config()
const express = require('express')
const redis = require('redis')
const axios = require('axios')
const app = express()

const port = process.env.port || 4000
// const port_redis = process.env.PORT || 6379

const redis_client = redis.createClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// https://geo.api.gouv.fr/communes?codePostal=&fields=centre&format=json&geometry=centre

const cacheFallback = async (url, res, key) => {
    try {
        const foreCast = await axios.get(url)
        redis_client.set(key, JSON.stringify(foreCast.data))
        res.send(foreCast.data)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

const getSecsToNextHour = () => {
    
}


app.post('/weather', (req, res) => {
    const { lon, lat } = req.body
    const key = `${lon};${lat}`
    const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&units=metric&exclude=minutely&appid=${process.env.WEATHER_API_KEY}`
    console.log("key", key)

    redis_client.get(key, (err, reply) => {
        if (err) {
            cacheFallback(url, res, key)
        }
        if (!reply) {
            cacheFallback(url, res, key)
        } else {
            res.send(reply)
        }
    })
})

app.post('/getlocations', async (req, res) => {
    try {
        const locations = await axios.get(`https://geo.api.gouv.fr/communes?codePostal=${req.body.code}&fields=centre&format=json&geometry=centre`)
        res.send(locations.data)
    } catch (error) {
        console.error("error", error)
        res.sendStatus(500)
    }
})

app.listen(port, () => { console.log(`Server is running on port ${port}`); })