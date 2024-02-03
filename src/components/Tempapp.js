



import React, { useEffect, useState } from 'react';
import "./CSS/style.css";

const Tempapp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [search, setSearch] = useState("mumbai");
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    useEffect(() => {
        const fetchapi = async () => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid={"your api key"}&units=${unit}`;
               
                const response = await fetch(url);
                const resjson = await response.json();
                setWeatherData(resjson);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeatherData(null);
            }
        };

        const fetchForecast = async () => {
            try {
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid={"Your api key"}&units=${unit}`;
                
                const forecastResponse = await fetch(forecastUrl);
                const forecastJson = await forecastResponse.json();
                setForecastData(forecastJson.list);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
                setForecastData(null);
            }
        };

        fetchapi();
        fetchForecast();
    }, [search, unit]);

    return (
        <>
            <div className='box'>
                <div className='tit'><h1>Weather Forecast Dashboard</h1></div>
                <div className='inputData'>
                    <input
                        type='search'
                        value={search}
                        className='searchfeild'
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }}
                    ></input>
                </div>
                {!weatherData ? (
                    <p>NO DATA FOUND</p>
                ) : (
                    <div>
                        <div className='info'>
                            <h2 className='location'>
                                <i className='fa-solid fa-street-view'></i>{search}
                            </h2>
                            <h1 className='temp'>
                                {weatherData.main && weatherData.main.temp} {unit === 'metric' ? '°C' : '°F'}
                            </h1>
                            <h3 className='tempminmax'>
                                Min: {weatherData.main && weatherData.main.temp_min} Cel | Max: {weatherData.main && weatherData.main.temp_max} Cel
                            </h3>
                            <p>Humidity: {weatherData.main && weatherData.main.humidity}%</p>
                            <p>Wind: {weatherData.wind && weatherData.wind.speed} m/s, {weatherData.wind && weatherData.wind.deg}°</p>
                            <p>Description: {weatherData.weather && weatherData.weather[0].description}</p>
                            {/* Add appropriate icon reflecting the current weather */}
                            <img src={weatherData.weather && `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" />
                        </div>
                        {/* <div className='wave-one'></div>
                        <div className='wave-two'></div>
                        <div className='wave-three'></div> */}
                    </div>
                )}

                {forecastData && (
                    <div className='forecast'>
                        {forecastData.slice(0, 5).map((item) => (
                            <div key={item.dt} className='forecast-item'>
                                <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                                <p>Avg Temp: {item.main && item.main.temp} {unit === 'metric' ? '°C' : '°F'}</p>
                                <p>Description: {item.weather && item.weather[0].description}</p>
                                <img src={item.weather && `http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" />
                            </div>
                        ))}
                    </div>
                )}

                <div className='unit-toggle'>
                    <button onClick={() => setUnit('metric')}>Celsius</button>
                    <button onClick={() => setUnit('imperial')}>Fahrenheit</button>
                </div>
            </div>
        </>
    );
}

export default Tempapp;

