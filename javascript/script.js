const gp2026 = [
    {
        name: "Australian GP",
        city: "Melbourne",
        country: "Australia",
        lat: -37.8136,
        lon: 144.9631,
        date: "6-8 Mar",
        venue: "Melbourne"
    },

    {
        name: "Chinese GP 🏁",
        city: "Shanghai",
        country: "China",
        lat: 31.2304,
        lon: 121.4737,
        date: "13-15 Mar",
        venue: "Shanghai",
        sprint: true
    },

    {
        name: "Japanese GP",
        city: "Suzuka",
        country: "Japan",
        lat: 34.84306,
        lon: 136.54056,
        date: "27-29 Mar",
        venue: "Suzuka"
    },

    {
        name: "Bahrain GP",
        city: "Sakhir",
        country: "Bahrain",
        lat: 26.0325,
        lon: 50.5106,
        date: "10-12 Apr",
        venue: "Sakhir"
    },

    {
        name: "Saudi Arabian GP",
        city: "Jeddah",
        country: "Saudi Arabia",
        lat: 21.3236,
        lon: 39.1022,
        date: "17-19 Apr",
        venue: "Jeddah"
    },

    {
        name: "Miami GP 🏁",
        city: "Miami",
        country: "USA",
        lat: 25.7617,
        lon: -80.1918,
        date: "1-3 May",
        venue: "Miami",
        sprint: true
    },

    {
        name: "Canadian GP 🏁",
        city: "Montreal",
        country: "Canada",
        lat: 45.5017,
        lon: -73.5673,
        date: "22-24 May",
        venue: "Montreal", 
        sprint: true
    },

    {
        name: "Monaco GP",
        city: "Monaco",
        country: "Monaco",
        lat: 43.7375,
        lon: 7.4167,
        date: "5-7 Jun",
        venue: "Monaco"
    },

    {
        name: "Spanish GP", 
        city: "Barcelona",
        country: "Spain",
        lat: 41.3851,
        lon: 2.1734,
        date: "12-14 Jun",
        venue: "Barcelona-Catalunya"
    },

    {
        name: "Austrian GP",
        city: "Spielberg",
        country: "Austria",
        lat: 47.2190,
        lon: 14.7643,
        date: "26-28 Jun",
        venue: "Spielberg"
    },

    {
        name: "British GP 🏁",
        city: "Silverstone",
        country: "UK",
        lat: 52.0734,
        lon: -1.0152,
        date: "3-5 Jul",
        venue: "Silverstone",
        sprint: true
    },

    {
        name: "Belgian GP",
        city: "Spa",
        country: "Belgium",
        lat: 50.4542,
        lon: 5.9523,
        date: "17-19 Jul",
        venue: "Spa-Francorchamps"
    },

    {
        name: "Hungarian GP",
        city: "Budapest",
        country: "Hungary",
        lat: 47.4719,
        lon: 19.0503,
        date: "24-26 Jul",
        venue: "Budapest"
    },

    {
        name: "Dutch GP 🏁",
        city: "Zandvoort",
        country: "Netherlands", 
        lat: 52.3700,
        lon: 4.5300,
        date: "21-23 Aug",
        venue: "Zandvoort",
        sprint: true
    },

    {
        name: "Italian GP",
        city: "Monza",
        country: "Italy",
        lat: 45.5833,
        lon: 9.2667,
        date: "4-6 Sep",
        venue: "Monza"
    },

    {
        name: "Azerbaijan GP",
        city: "Baku",
        country: "Azerbaijan",
        lat: 40.3953,
        lon: 49.8822,
        date: "24-26 Sep",
        venue: "Baku"
    },

    {
        name: "Singapore GP 🏁",
        city: "Singapore",
        country: "Singapore",
        lat: 1.3521,
        lon: 103.8198,
        date: "9-11 Oct",
        venue: "Singapore", 
        sprint: true
    },

    {
        name: "United States GP", 
        city: "Austin",
        country: "USA",
        lat: 30.2672,
        lon: -97.7431,
        date: "23-25 Oct",
        venue: "Austin"
    },

    {
        name: "Mexico City GP",
        city: "Mexico City",
        country: "Mexico",
        lat: 19.4342,
        lon: -99.1386,
        date: "30 Oct - 1 Nov",
        venue: "Mexico City"
    },

    {
        name: "Brazilian GP",
        city: "São Paulo",
        country: "Brazil",
        lat: -23.5475,
        lon: -46.6361,
        date: "6-8 Nov",
        venue: "Interlagos"
    },

    {
        name: "Las Vegas GP",
        city: "Las Vegas",
        country: "USA",
        lat: 36.1699, 
        lon: -115.1398,
        date: "19-21 Nov",
        venue: "Las Vegas"
    },

    {
        name: "Qatar GP",
        city: "Lusail",
        country: "Qatar",
        lat: 25.4667,
        lon: 51.4833,
        date: "27-29 Nov",
        venue: "Lusail"
    },

    {
        name: "Abu Dhabi GP",
        city: "Abu Dhabi",
        country: "UAE",
        lat: 24.4667,
        lon: 54.3500,
        date: "4-6 Dec",
        venue: "Yas Marina"
    }
];

let currentGP = null;
let searchTimeout = null;

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
                    ${gp.sprint ? '<span class="text-xs text-yellow-400">Sprint</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

async function selectGP(index) {
    currentGP = gp2026[index];
    
    document.getElementById('citySuggestions').classList.add('hidden');
    document.getElementById('cityInput').value = '';
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
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,windspeed_10m,relativehumidity_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=4`
        );

        const data = await response.json();
        displayWeather(data, gpName, cityName);

    } catch (error) {
        console.error(error);
        container.innerHTML = '<div class="text-center py-20"><p class="text-red-500 text-xl">Erro ao carregar previsão.</p></div>';
    }
}

function getWeatherInfo(code) {
    const weatherCodes = {
        0: {
            desc: 'Céu Limpo',
            icon: '☀️'
        },

        1: {
            desc: 'Principalmente Limpo',
            icon: '🌤️'
        },

        2: {
            desc: 'Parcialmente Nublado',
            icon: '⛅'
        },

        3: {
            desc: 'Nublado',
            icon: '☁️'
        },

        45: {
            desc: 'Neblina',
            icon: '🌫️'
        },

        48: {
            desc: 'Neblina Gelada',
            icon: '🌫️'
        },

        51: {
            desc: 'Garoa Leve',
            icon: '🌦️'
        },

        53: {
            desc: 'Garoa Moderada',
            icon: '🌧️'
        },

        55: {
            desc: 'Garoa Intensa',
            icon: '🌧️'
        },

        61: {
            desc: 'Chuva Leve',
            icon: '🌧️'
        },

        63: {
            desc: 'Chuva Moderada',
            icon: '🌧️'
        },

        65: {
            desc: 'Chuva Forte',
            icon: '⛈️'
        },

        80: {
            desc: 'Pancadas de Chuva',
            icon: '⛈️'
        },

        95: {
            desc: 'Tempestade',
            icon: '⛈️'
        }
    };

    return weatherCodes[code] || { desc: 'Variável', icon: '🌡️' };
}

function getTireRecommendation(weather_code, temp, precipitation_current, prob_daily) {
    const chuva = Number(precipitation_current);
    const code = Number(weather_code);
    const prob = Number(prob_daily);

    if (code >= 63 || chuva > 1.0) {
        return { tire: 'WET (Chuva)', color: '#0066ff', reason: 'Pista encharcada', suggestion: '🌧️ Muita água na pista! Risco de aquaplanagem.' };

    } else if ((code >= 51 && code <= 61) || chuva > 0.1 || (prob >= 75 && code > 1)) {
        return { tire: 'INTERMEDIATE', color: '#00cc00', reason: 'Pista úmida ou risco alto', suggestion: '☔ Asfalto escorregadio. Cuidado nas zebras.' };

    } else {
        if (temp > 35) {
            return { tire: 'HARD (Duro)', color: '#ffffff', reason: 'Calor extremo', suggestion: '🔥 Asfalto fervendo! Economize pneus.'};

        } else if (temp < 18) {
            return { tire: 'SOFT (Macio)', color: '#ff0000', reason: 'Baixa temperatura', suggestion: '❄️ Use pneu macio para aquecer rápido.' };

        } else {
            return { tire: 'MEDIUM (Médio)', color: '#ffff00', reason: 'Condições ideais', suggestion: '🏎️ Pé embaixo! Condições perfeitas para corrida.' };
        }
    }
}

function applyTheme(weatherCode) {
    const body = document.body;
    body.classList.remove('weather-sunny', 'weather-cloudy', 'weather-rainy');

    if (weatherCode <= 1) {
        body.classList.add('weather-sunny');

    } else if (weatherCode <= 48) {
        body.classList.add('weather-cloudy');

    } else body.classList.add('weather-rainy');
}

async function displayWeather(data, gpName = '', cityName = '') {
    const current = data.current;
    const daily = data.daily;
    const container = document.getElementById('weatherContainer');

    const wCode = current.weather_code !== undefined ? current.weather_code : 0;
    const probChuvaHoje = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;
    const chuvaAgora = current.precipitation !== undefined ? current.precipitation : 0;

    const weatherInfo = getWeatherInfo(wCode);
    applyTheme(wCode);

    const tireRec = getTireRecommendation(wCode, current.temperature_2m, chuvaAgora, probChuvaHoje);
    const displayName = gpName || cityName || (currentGP ? currentGP.city : 'Local');
    const isGP = !!gpName; 

    let forecastHTML = daily.time.map((time, i) => {
        const date = new Date(time + 'T12:00:00'); 
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const dayNum = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' });
        const codeDia = daily.weather_code ? daily.weather_code[i] : 0;
        const weather = getWeatherInfo(codeDia);
        
        return `
            <div class="text-center p-4 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-10">
                <p class="text-gray-300 font-bold mb-2 uppercase text-sm">${dayName}</p>
                <p class="text-xs text-gray-400 mb-2">${dayNum}</p>
                <div class="text-3xl mb-2">${weather.icon}</div>
                <p class="text-sm font-bold">${Math.round(daily.temperature_2m_max[i])}°C</p>
                <p class="text-xs text-blue-300 mt-1">☂️ ${daily.precipitation_probability_max[i]}%</p>
            </div>
        `;
    }).join('');

    let middleCardHTML = isGP ? `
        <div class="bg-black bg-opacity-30 rounded-xl p-6 mb-8 border border-white border-opacity-10 flex items-center gap-6">
            <div class="h-24 w-24 rounded-full border-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center bg-gray-900 shrink-0" style="border-color: ${tireRec.color}">
                <span class="text-2xl font-black italic text-white text-center leading-none" style="font-size: 1rem;">P ZERO</span>
            </div>

            <div>
                <h3 class="text-xl font-bold mb-1" style="color: ${tireRec.color}">${tireRec.tire}</h3>
                <p class="text-sm text-gray-300 mb-1">${tireRec.reason}</p>
                <p class="text-xs text-gray-400 italic">"${tireRec.suggestion}"</p>
            </div>
        </div>
    ` : `
        <div class="bg-black bg-opacity-30 rounded-xl p-6 mb-8 border border-white border-opacity-10 flex items-center gap-6">
            <div class="text-5xl">💡</div>
        
            <div>
                <h3 class="text-xl font-bold mb-1 text-white">Dica do Dia</h3>
                <p class="text-sm text-gray-300">${tireRec.suggestion.replace('Pista', 'Rua').replace('Asfalto', 'Chão').replace('aquaplanagem', 'poças d\'água')}</p>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="flex justify-between items-start mb-8">
                <div>
                    <h2 class="text-4xl font-black italic tracking-tighter mb-1">${displayName}</h2>
                    <p class="text-xl text-gray-200 flex items-center gap-2">${weatherInfo.desc}</p>
                </div>

                <div class="text-right">
                    <div class="text-6xl font-black tracking-tighter">${Math.round(current.temperature_2m)}°</div>

                    <div class="flex justify-end gap-4 text-sm mt-2 font-mono">
                        <span title="Vento">💨 ${Math.round(current.windspeed_10m)} km/h</span>
                        <span title="Umidade">💧 ${current.relativehumidity_2m}%</span>
                        <span title="Probabilidade de Chuva Hoje" class="${probChuvaHoje > 0 ? 'text-blue-400' : 'text-gray-400'}">☂️ ${probChuvaHoje}%</span>
                    </div>
                </div>
            </div>

            ${middleCardHTML}
            <h3 class="font-bold mb-4 text-xl border-b border-white border-opacity-10 pb-2">PRÓXIMOS DIAS</h3>
            <div class="grid grid-cols-4 gap-4">${forecastHTML}</div>
        </div>
    `;
}

const cityInput = document.getElementById('cityInput');
const suggestionsList = document.getElementById('citySuggestions');

cityInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();

    clearTimeout(searchTimeout);

    if (query.length < 3) {
        suggestionsList.classList.add('hidden');
        return;
    }

    searchTimeout = setTimeout(async () => {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=pt&format=json`
            );
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                renderSuggestions(data.results);
            } else {
                suggestionsList.classList.add('hidden');
            }
        } catch (error) {
            console.error("Erro na busca", error);
        }
    }, 300);
});

function renderSuggestions(locations) {
    suggestionsList.innerHTML = locations.map(loc => `
        <li class="px-4 py-3 hover:bg-red-600 hover:text-white cursor-pointer border-b border-gray-700 last:border-0 transition"
            onclick="selectCity('${loc.name}', ${loc.latitude}, ${loc.longitude}, '${loc.country || ''}')">
            <div class="font-bold">${loc.name}</div>
            <div class="text-xs text-gray-400 font-mono">${loc.admin1 || ''}, ${loc.country || ''}</div>
        </li>
    `).join('');
    
    suggestionsList.classList.remove('hidden');
}

window.selectCity = async (name, lat, lon, country) => {
    suggestionsList.classList.add('hidden');
    cityInput.value = name;
    
    document.querySelectorAll('.gp-item').forEach(item => item.classList.remove('active'));
    currentGP = null;

    const fullName = country ? `${name}, ${country}` : name;
    await fetchWeather(lat, lon, null, fullName);
};

document.addEventListener('click', (e) => {
    if (!cityInput.contains(e.target) && !suggestionsList.contains(e.target)) {
        suggestionsList.classList.add('hidden');
    }
});

renderGPList();