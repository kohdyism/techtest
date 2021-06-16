const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()
const port = 4500

//connect to MongoDB Database
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/testing', {
  useNewUrlParser: true, useUnifiedTopology: true
})

//set view engine ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {

  //retrieve all data objects in MongoDB
  const shortUrls = await ShortUrl.find()

  console.log(shortUrls.length)

  //if no shortUrls created, last URl is "okay" value, if shortUrls created, lastUrl is the latest URL created.
  if (shortUrls.length>=1){
    var lastUrl = shortUrls[shortUrls.length -1].short

  }else if (shortUrls.length==0 || undefined) {
    var lastUrl = "okay"
    //console.log(shortUrls.length)
    //console.log("oh no")
  }
  //render and send variables to index.ejs
  //console.log(lastUrl)
  res.render('index', { shortUrls: shortUrls, lastUrl:lastUrl })
  
})

// receive POST request from index.ejs, using the long URL as arg to create a data object in MongoDB consisting of full URL, short URl, and clicks. 
app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  console.log({ full: req.body.fullUrl })

  res.redirect('/')
})

// when shortUrl is used, connect to database to retrieve long URL and redirect users to it on the browser, and add 1 to number of clicks on the short link.
app.get('/:shortUrl', async (req, res) => {

  //validify shorturl
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  //reject invalid shorturls
  if (shortUrl == null) return res.sendStatus(404)


  //count clicks and save in database
  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})


app.listen(process.env.PORT || port , () => {
  console.log('Server listening on PORT ' + port)

});