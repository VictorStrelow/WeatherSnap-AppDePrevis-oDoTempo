const gp2026 = [
    {
        name: "Australian GP",
        city: "Melbourne",
        country: "Australia",
        lat: -37.8497,
        lon: 144.968,
        date: "6-8 Mar",
        venue: "Melbourne"
    },
    {
        name: "Chinese GP 🏁",
        city: "Shanghai",
        country: "China",
        lat: 31.3389,
        lon: 121.2197,
        date: "13-15 Mar",
        venue: "Shanghai",
        sprint: true
    },
    {
        name: "Japanese GP",
        city: "Suzuka",
        country: "Japan",
        lat: 34.8431,
        lon: 136.5408,
        date: "27-29 Mar",
        venue: "Suzuka",
    },
    {
        name: "Bahrain GP",
        city: "Sakhir",
        country: "Bahrain",
        lat: 26.0325,
        lon: 50.5106,
        date: "10-12 Apr",
        venue: "Sakhir",
    },
    {
        name: "Saudi Arabian GP",
        city: "Jeddah",
        country: "Saudi Arabia",
        lat: 21.6319,
        lon: 39.1044,
        date: "17-19 Apr",
        venue: "Jeddah",
    },
    {
        name: "Miami GP 🏁",
        city: "Miami",
        country: "USA",
        lat: 25.9581,
        lon: -80.2389,
        date: "1-3 May",
        venue: "Miami",
        spint: true,
    },
    {
        name: "Canadian GP 🏁",
        city: "Montreal",
        country: "Canada",
        lat: 45.5,
        lon: -73.5228,
        date: "22-24 May",
        venue: "Montreal",
        sprint: true,
    },
    {
        name: "Monaco GP",
        city: "Monaco",
        country: "Monaco",
        lat: 43.7347,
        lon: 7.42056,
        date: "5-7 Jun",
        venue: "Monaco",
    },
    {
        name: "Spanish GP",
        city: "Barcelona",
        country: "Spain",
        lat: 41.57,
        lon: 2.2611,
        date: "12-14 Jun",
        venue: "Barcelona-Catalunya",
    },
    {
        name: "Austrian GP",
        city: "Spielberg",
        country: "Austria",
        lat: 47.2197,
        lon: 14.7647,
        date: "26-28 Jun",
        venue: "Spielberg",
    },
    {
        name: "British GP 🏁",
        city: "Silverstone",
        country: "UK",
        lat: 52.0786,
        lon: -1.0169,
        date: "3-5 Jul",
        venue: "Silverstone",
        sprint: true,
    },
    {
        name: "Belgian GP",
        city: "Spa",
        country: "Belgium",
        lat: 50.4372,
        lon: 5.9714,
        date: "17-19 Jul",
        venue: "Spa-Francorchamps",
    },
    {
        name: "Hungarian GP",
        city: "Budapest",
        country: "Hungary",
        lat: 47.5789,
        lon: 19.2486,
        date: "24-26 Jul",
        venue: "Budapest",
    },
    {
        name: "Dutch GP 🏁",
        city: "Zandvoort",
        country: "Netherlands",
        lat: 52.3888,
        lon: 4.5408,
        date: "21-23 Aug",
        venue: "Zandvoort",
        sprint: true,
    },
    {
        name: "Italian GP 🏁",
        city: "Monza",
        country: "Italy",
        lat: 45.6156,
        lon: 9.2811,
        date: "4-6 Sep",
        venue: "Madrid*",
    },
    {
        name: "Azerbaijan GP",
        city: "Baku",
        country: "Azerbaijan",
        lat: 40.3725,
        lon: 49.8533,
        date: "24-26 Sep",
        venue: "Baku",
    },
    {
        name: "Singapore GP 🏁",
        city: "Singapore",
        country: "Singapore",
        lat: 1.2914,
        lon: 103.864,
        date: "9-11 Oct",
        venue: "Singapore",
        sprint: true,
    },
    {
        name: "United States GP",
        city: "Austin",
        country: "USA",
        lat: 30.1328,
        lon: -97.6411,
        date: "23-25 Oct",
        venue: "Austin",
    },
    {
        name: "Mexico City GP",
        city: "Mexico City",
        country: "Mexico",
        lat: 19.4042,
        lon: -99.0907,
        date: "30 Oct - 1 Nov",
        venue: "Mexico City",
    },
    {
        name: "Brazilian GP",
        city: "São Paulo",
        country: "Brazil",
        lat: -23.7008,
        lon: -46.6969,
        date: "6-8 Nov",
        venue: "São Paulo",
    },
    {
        name: "Lav Vegas GP",
        city: "Las Vegas",
        country: "USA",
        lat: 36.1716,
        lon: -155.1485,
        date: "19-21 Nov",
        venue: "Las Vegas",
    },
    {
        name: "Qatar GP",
        city: "Lusail",
        country: "Qatar",
        lat: 25.49,
        lon: 51.4542,
        date: "27-29 Nov",
        venue: "Lusail",
    },
    {
        name: "Abu Dhabi GP",
        city: "Abu Dhabi",
        country: "UAE",
        lat: 24.4672,
        lon: 54.6031,
        date: "4-6 Dec",
        venue: "Yas Marina",
    },
]

let currentGP = null;

function renderGPList() {
    const gpList = document.getElementById('gpList');
    gpList.innerHTML = gp2026.map((gp, index) => `
        <div class="gp-item p-3 rounded-lg" onclick="selectGP(${index})">
            <div class="flex justify-between items-center">
                <div class="flex-1">
                    <p class="font-bold">${gp.name}</p>
                    <p class="text-sm text-gray-400">${gp.venue}</p>
                </div>

                <div class="text-right">
                    <span class="text-xs text-red-500 font-semibold block">${gp.date}</span>
                    ${gp.spint ? '<span class="text-xs text-yellow-400">Sprint</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

async function selectGP(index) {
    currentGP = gp2026[index];
    document.querySelectorAll('.gp-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    await fetchWeather(currentGP.lat, currentGP.lon, currentGP.name, currentGP.city);
}

async function fetchWeather(lat, lon, gpName = null, cityName = null) {
    const container = document.getElementById('weatherContainer');
    container.innerHTML = '<div class="flex justify-center items-center py-20"><div class="loading"></div></div>';

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=4`
        );
        const data = await response.json();

        displayWeather(data, gpName, cityName);

    } catch (error) {
        container.innerHTML = '<div class="text-center py-20"><p class="text=red-500 text-xl">Erro ao buscar dados do tempo</p></div>';
    }
}

function getWeatherInfo(code) {
    const weatherCodes = {
        0: {
            desc: 'Céu Limpo',
            icon: '☀️',
            theme: 'weather-sunny',
        },
        1: {
            desc: 'Principalmente Limpo',
            icon: '🌤️',
            theme: 'weather-sunny',
        },
        2: {
            desc: 'Parcialmente Nublado',
            icon: '⛅',
            theme: 'weather-cloudy',
        },
        3: {
            desc: 'Nublado',
            icon: '☁️',
            theme: 'weather-cloudy',
        },
        45: {
            desc: 'Neblina',
            icon: '🌫️',
            theme: 'weather-cloudy'
        },
        48: {
            desc: 'Neblina Gelada',
            icon: '🌫️',
            theme: 'weather-cloudy'
        },
        51: {
            desc: 'Garoa Leve',
            icon: '🌦️',
            theme: 'weather-rainy',
        },
        53: {
            desc: 'Garoa Moderada',
            icon: '🌧️',
            theme: 'weather-rainy',
        },
        55: {
            desc: 'Garoa Intensa',
            icon: '🌧️',
            theme: 'weather-rainy',
        },
        61: {
            desc: 'Chuva Leve',
            icon: '🌧️',
            theme: 'weather-rainy',
        },
        63: {
            desc: 'Chuva Moderada',
            icon: '🌧️',
            theme: 'weather-rainy',
        },
        65: {
            desc: 'Chuva Forte',
            icon: '⛈️',
            theme: 'weather-rainy',
        },
        80: {
            desc: 'Pancadas de Chuva',
            icon: '⛈️',
            theme: 'weather-rainy',
        },
        95: {
            desc: 'Tempestade',
            icon: '⛈️',
            theme: 'weather-rainy',
        }
    };
    return weatherCodes[code] || { 
        desc: 'Desconhecido',
        icon: '🌡️',
        theme: 'weather-cloudy',
    };
}

function getTireRecommendation(weatherCode, temp, humidity, precipitation) {
    if (weatherCode >= 61 || precipitation > 60) {
        return {
            tire: 'Pneu de Chuva (Wet)',
            color: '#0066ff',
            reason: 'Condições de chuva detectadas',
            suggestion: '🌧️ Leve um guarda-chuva! Condições molhadas no circuito',
        };

    } else if (weatherCode >= 51 || precipitation > 30) {
        return {
            tire: 'Intermediário',
            color: '#00cc00',
            reason: 'Pista úmida ou garoa',
            suggestion: '☔ Possível chuva. Melhor levar um casaco!'
        };

    } else if (temp > 30) {
        return {
            tire: 'Pneu Macio (Soft)',
            color: '#ff0000',
            reason: 'Temperatura alta, melhor grip',
            suggestion: '☀️ Tempo quente! Ideal para atividades ao ar livre.'
        };

    } else if (temp > 20) {
        return {
            tire: 'Médio (Medium)',
            color: '#ffff00',
            reason: 'Temperatura moderada, equilibrado',
            suggestion: '🌤️ Tempo agradável para uma caminhada!',
        };

    } else {
        return {
            tire: 'Duro (Hard)',
            color: '#ffffff',
            reason: 'Temperatura baixa, maior durabilidade',
            suggestion: '🧥 Está fresco! Vista algo confortável.',
        };
    }
}

function displayWeather(data, gpName, cityName) {
    const current = data.current;
    const daily = data.daily;
    const weatherInfo = getWeatherInfo(current.weatherCode);
    const tireRec = getTireRecommendation(
        current.weatherCode,
        current.temperature_2m,
        current.relativehumidity_2m,
        daily.precipitation_probability_max[0]
    );

    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 20;
    const theme = isNight ? 'weather-night' : weatherInfo.theme;

    const title = gpName ? `🏁 ${gpName}` : `📍 ${cityName}`;

    const forecastHTML = [0, 1, 2, 3].map(i => {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Hoje' : date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const weather = getWeatherInfo(daily.weathercode[i]);

        return `
            <div class="text-center p-4 bg-white bg-opacity-10 rounded-lg">
                <p class="font-semibold mb-1">${dayName}</p>
                <p class="text-xs text-gray-400 mb-2">${dateStr}</p>
                <p class="text-3xl mb-2">${weather.icon}</p>
                <p class="text-sm mb-1">${weather.desc}</p>
                <p class="font-bold text-lg">${Math.round(daily.temperature_2m_max[i])}°C</p>
                <p class="text-sm text-gray-400">${Math.round(daily.temperature_2m_min[i])}°C</p>
            </div>
        `;
    }).join('');

    document.getElementById('weatherContainer').innerHTML = `
        <div class="${theme} rounded-xl p-8 transition-all duration-500">
            <h2 class="text-3xl font-black mb-6">${title}</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="text-center">
                    <p class="text-8xl mb-4">${weatherInfo.icon}</p>
                    <p class="text-5xl font-black mb-2">${Math.round(current.temperature_2m)}°C</p>
                    <p class="text-xl mb-4">${weatherInfo.desc}</p>

                    <div class="flex justify-center gap-4 text-sm">
                        <span>💨 ${Math.round(current.windspeed_10m)} km/h</span>
                        <span>💧 ${current.relativehumidity_2m}%</span>
                    </div>
                </div>

                ${gpName ? `
                <div class="flex flex-col justify-center items-center bg-black bg-opacity-30 rounded-xl p-6">
                    <h3 class="text-xl font-bold mb-4 text-red-500">🏎️ RECOMENDAÇÃO DE PNEU</h3>

                    <div class="tire-indicator mb-4" style="background: ${tireRec.color};"></div>

                    <p class="text-2xl font-bold mb-2">${tireRec.tire}</p>
                    <p class="text-sm text-gray-300 mb-4 text-center">${tireRec.reason}</p>

                    <div class="bg-white bg-opacity-10 rounded-lg p-4 w-full">
                        <p class="text-sm text-center">${tireRec.suggestion}</p>
                    </div>
                </div>

                ` : `

                <div class="flex items-center justify-center">
                    <div class="bg-black bg-opacity-30 rounded-xl p-6 text-center">
                        <p class="text-lg mb-2">💡 Dica do Dia</p>
                        <p class="text-sm">${tireRec.suggestion}</p>
                    </div>
                </div>
                `}
            </div>

            <div>
                <h3 class="text-xl font-bold mb-4">📅 Próximos 4 Dias</h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${forecastHTML}
                </div>
            </div>
        </div>
    `;
}

async function searchCity() {
    const input = document.getElementById('cityInput');
    const city = input.value.trim();

    if (!city) return;

    const container = document.getElementById('weatherContainer');
    container.innerHTML = `
        <div class="flex justify-center items-center py-20"><div class="loading"></div></div>
    `;

    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            container.innerHTML = `
                <div class="text-center py-20"><p class="text-red-500 text-xl">Cidade não encontrada</p></div>
            `;
            return;
        }

        const location = geoData.results[0];
        document.querySelectorAll('.gp-item').forEach(item => item.classList.remove('active'));
        currentGP = null;
        
        await fetchWeather(location.latitude, location.longitude, null, location.name);

    } catch (error) {
        container.innerHTML = `
            <div class="text-center py-20"><p class="text-red-500 text-xl">Erro ao buscar cidade</p></div>
        `;
    } 
}

document.getElementById('searchBtn').addEventListener('click', searchCity);
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCity();
});

renderGPList();