const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const WEATHER_URL = "https://www.google.com/search?q=weather+";
const LANG_SELECTOR ='#Rzn5id > div > a:nth-child(3)';
const TEMP_SELECTOR = '#wob_tm';
const NAME_SELECTOR = '#wob_loc';
const HUMIDIY_SELECTOR = '#wob_hm';
const WINDSPEED_SELECTOR = '#wob_ws';
const ICON_SELECTOR = '#wob_dc';

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:search', async (req, res, next) => {		
  console.log("Server got request: " + req.params.search);
  try {
    let weatherInfo = await crawl(req.params.search);
    res.json(weatherInfo);
  } catch (e) {
  //this will eventually be handled by your error handling middleware
  next(e) 
  } 
})

app.listen(3000, console.log('Weather Server is listening on port 3000!'));

async function crawl(search){
  let weatherInfo = {
    name: "",
    temp: 0,
    state: "",
    humidity: 0,
    windSpeed: 0
  };
  const browser = await puppeteer.launch({
    //headless: false,
    timeout: 0,
    args: ['--lang=en-us']
  });
  const page = await browser.newPage();
  let url = WEATHER_URL+encodeURIComponent(search);
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US'
  });
  await page.goto(url);
  await page.click(LANG_SELECTOR);
  await page.waitFor(500);

  weatherInfo.name = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, NAME_SELECTOR);
  weatherInfo.temp = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, TEMP_SELECTOR);
  weatherInfo.state = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, ICON_SELECTOR);
  weatherInfo.humidity = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, HUMIDIY_SELECTOR);
  weatherInfo.windSpeed = await page.evaluate((sel) => {
    return document.querySelector(sel).innerText;
  }, WINDSPEED_SELECTOR);
  console.log("done " + search);
  await browser.close();
  return weatherInfo;
}
