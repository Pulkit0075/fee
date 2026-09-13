import { useWeather } from "./getWeather";

function App(){
    
    const {weather, error} = useWeather();

    if (error) return <p className="weather-card message error" role="alert">Unable to load weather: {error}</p>;
    if (!weather) return <p className="weather-card message" role="status">Loading weather...</p>;
    
    return(
        <main className="weather-card">
      <p className="eyebrow">Current weather</p>
      <h2>
        {weather.location.city}, {weather.location.country}
      </h2>

      <div className="temperature-box">
      <div className="temperature">
        {weather.current.temperature_2m}
        {weather.currentUnits.temperature_2m}
      </div>

      </div>

      <div className="weather-details">
      <div className="weather-detail">
        <span>Feels like</span>
        <strong>{weather.current.apparent_temperature}{weather.currentUnits.apparent_temperature}</strong>
      </div>

      <div className="weather-detail">
        <span>Humidity</span>
        <strong>{weather.current.relative_humidity_2m}%</strong>
      </div>

      <div className="weather-detail">
        <span>Cloud cover</span>
        <strong>{weather.current.cloud_cover}%</strong>
      </div>

      <div className="weather-detail">
        <span>Wind</span>
        <strong>{weather.current.wind_speed_10m}{' '}{weather.currentUnits.wind_speed_10m}</strong>
      </div>
      </div>
    </main>
    )
}

export default App;
