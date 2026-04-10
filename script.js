const apiKey = "ffcdd1f7c16593e111d6927b38a92eb3";
async function getWeather(city) {

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);

        if (!response.ok) {

            throw new Error(`Erro: ${response.status} - Cidade não encontrada`);

        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        showError(error.message);

    }

}

function displayWeather(data) {

    const weatherDisplay = document.getElementById('weatherDisplay');

    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDisplay.innerHTML = `

<h2>${data.name}, ${data.sys.country}</h2>

<img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">

<p>Temperatura: ${data.main.temp}°C</p>

<p>Condição: ${data.weather[0].description}</p>

<p>Umidade: ${data.main.humidity}%</p>

`;

}

function showError(message) {

    const weatherDisplay = document.getElementById('weatherDisplay');

    weatherDisplay.innerHTML = `<p class="error">${message}</p>`;

}

document.getElementById('getWeatherBtn').addEventListener('click', () => {

    const city = document.getElementById('cityInput').value;

    getWeather(city);

});