console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather.service.js';



locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            getWeather({ lat: 32.0749831, lng: 34.9120554 })

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

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    let coords = locService.getPosition();
        coords.then((res) => {
            mapService.panTo(res)
            mapService.addMarker(res)
            getWeather(res)
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

