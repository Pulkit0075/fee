import {useState, useEffect} from 'react';

export function useWeather(){

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        async function getWeatherFromIp(){

        try{
            const ipapiResponse = await fetch('https://ipapi.co/json/');


            if (!ipapiResponse.ok) {
            throw new Error('Location request failed');
            }

            const location = await ipapiResponse.json();

            const weather = await fetch( `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${location.latitude}` +
            `&longitude=${location.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset` +
            `&timezone=auto`,
            );

            if(!weather.ok){
                throw new Error('Weather request failed');
            }

            const weatherData = await weather.json();

            setWeather({
            location: {
                city: location.city,
                region: location.region,
                country: location.country_name,
                latitude: location.latitude,
                longitude: location.longitude,
            },

            current: weatherData.current,
            currentUnits: weatherData.current_units,

            daily: weatherData.daily,
            dailyUnits: weatherData.daily_units,
            });

        }
        catch(err){
            if (!controller.signal.aborted) {
                setError(err.message);
            }
        }      

        }
        getWeatherFromIp();
    }, [] );

    return{
        weather,
        error
    }
}

