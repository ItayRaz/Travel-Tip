
export default {
    getLocs,
    getPosition,
    getLocBySearch
}

var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}

function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
        .then(res => {
            return {
                lat: res.coords.latitude,
                lng: res.coords.longitude
            }
        })
}

function getLocBySearch(str) {
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyCbhn96qgXx4hd50UPQZexxY5UqPA8jBuQ`
    let prmRes = axios.get(apiUrl)
        let loc= prmRes.then(res => {
        return {
            lat : res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng
        }
    })
    return loc
}

