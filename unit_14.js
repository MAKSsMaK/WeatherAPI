
const cities = {
    2643743 : "London",
    689558 : "Vinnytsia",
    706369 : "Khmelnytskyi",
    703448 : "Kyiv",
}

const param = {
    'url' : 'https://api.openweathermap.org/data/2.5/',
    'appid' : 'ec082bdecb0205615d1ecdc7cf41ba7b',
}

const selectVal = document.createElement('select');

function selectCities() {
    for (const citesKey in cities) {
        let options = document.createElement('option');
        options.value = citesKey;
        options.textContent = cities[citesKey];
        selectVal.appendChild(options);
    }
    document.querySelector('.town-select').appendChild(selectVal);
}
selectCities();

function getWeather(){
    fetch(`${param.url}weather?id=${selectVal.value}&appid=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}


function showWeather(data) {
    console.log(data);
    let out = document.querySelectorAll('.out-inf');
    out[0].innerHTML = `${Math.round(+data.main.temp - 273, 0)}&deg`;
    out[1].textContent = data.name;
    out[2].textContent = data.weather[0].description;
    out[3].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    out[4].textContent = `Humidity: ${data.main.humidity}%`;
    out[5].textContent = `Pressure: ${data.main.pressure}hPa`;
    out[6].textContent = `${data.wind.speed}m/s`;
    out[7].style.transform = `rotate(${data.wind.deg - 270}deg)`;
}

getWeather();
selectVal.onchange = getWeather;

