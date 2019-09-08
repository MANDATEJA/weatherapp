const  path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()// creating a const app variable to srtore express application

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')// app.set('key', 'value')
app.set('views', viewsPath)// Pointing views to a customised views directory; By default, it will look for app_dir/views
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Teja Manda'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Teja Manda'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help page for Weather App!',
        title: 'Help',
        name: 'Teja Manda'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    //console.log(address)
    if(!address) {
        return res.send({
            error: 'You mush provide address to get weather information'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecastData,
                address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Teja Manda'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Teja Manda'
    })
})

app.listen(3000, ()=> {
    console.log('Server is up in port 3000.')
})