import React, { useState } from 'react';
import './App.css';

function App() {
  // State untuk menyimpan nama kota yang diinputkan oleh pengguna
  const [city, setCity] = useState('');

  // State untuk menyimpan data cuaca yang diterima dari API
  const [weather, setWeather] = useState(null);

  // API key dari OpenWeatherMap untuk mengakses data cuaca
  const apiKey = '7a597a63c7b7422fb1bfb0ddf3ab682d'; // Ganti dengan API key Anda

  // Fungsi untuk mengambil data cuaca dari API OpenWeatherMap
  const fetchWeather = async () => {
    try {
      // Mengirim permintaan GET ke API OpenWeatherMap dengan parameter kota dan apiKey
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      const data = await response.json();

      // Jika responsenya berhasil (status OK)
      if (response.ok) {
        // Menyimpan data cuaca ke dalam state weather
        setWeather(data);
      } else {
        // Jika responsenya tidak berhasil, menghapus data cuaca dan menampilkan pesan error
        setWeather(null);
        alert(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      {/* Input untuk memasukkan nama kota */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      {/* Tombol untuk mengambil data cuaca */}
      <button onClick={fetchWeather}>Get Weather</button>

      {/* Menampilkan informasi cuaca jika data cuaca tersedia */}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].main}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
