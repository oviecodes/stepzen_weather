const express = require('express')
const cors = require('cors')
const axios = require('axios')
const port = 3200
require('dotenv').config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post('/', async(req, res, next) => {

    try {
        

        const response = await axios(
            process.env.STEPZEN_ENDPOINT,
            {
            method: 'POST',
            headers: {
              'Authorization': `${process.env.STEPZEN_AUTH}`,
            },
            data: req.body
        })
        
        // console.log(response.data)

        return res.status(200).json(response.data)

    } catch (error) {
        console.log('error', (error.response.data.errors))
    }

})


app.listen(port, () => {
    console.log(`App is running on *${port}`)
}) 