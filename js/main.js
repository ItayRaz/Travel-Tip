console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js';


let gCurrCoords = { lat: 32.0749831, lng: 34.9120554 };
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');

if(myParam) {
    gCurrCoords=myParam;
}


locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap(gCurrCoords.lat, gCurrCoords.lng)
        .then(() => {
            mapService.addMarker( gCurrCoords);
            getWeather( gCurrCoords )

        })
        .catch(console.log('INIT MAP ERROR'));


    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.my-pos-btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    let coords = locService.getPosition();
        coords.then((res) => {
            mapService.panTo(res)
            mapService.addMarker(res)
            getWeather(res)
            gCurrCoords = res;
        })
    })


function getWeather(coords) {
    weatherService.getWeatherByLocation(coords.lat, coords.lng)
        .then(res => {
            renderWeather(res);
        })
}


function renderWeather(weather) {
    var strHTML = `
        <h4><span>${weather.name}<h4>
        <h5>${weather.text} with ${weather.temp}°C and ${weather.humidity}% humidity</span></h5>`
    document.querySelector('.weather-stats').innerHTML = strHTML;
}

document.querySelector('.search-btn').onclick = () => {
    let searchVal = document.querySelector('.search').value;
    locService.getLocBySearch(searchVal)
        .then(res => {
            mapService.panTo(res);
            mapService.addMarker(res);
            getWeather(res)
            gCurrCoords = res;
        })
};

document.querySelector('.copy-btn').onclick = () => {
    getLocLink()
};



function getLocLink() {
    let locUrl = `https://itayraz.github.io/Travel-Tip?lat=${gCurrCoords.lat}&lng=${gCurrCoords.lng}`
    let elLocUrl = document.querySelector('.url') 
    elLocUrl.value= locUrl;
    elLocUrl.select();
    elLocUrl.setSelectionRange(0, 99999);
    document.execCommand("copy");
}