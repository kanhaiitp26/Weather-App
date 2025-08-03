import { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = 'd34339a8869ecc11b9189f6122ec8c0e';

  const getWeatherInfo = async () => {
    let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let jsonResponse = await response.json();

    if (response.ok) {
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      return result;
    } else {
      throw new Error(jsonResponse.message || 'Invalid city');
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    if (error) setError(false);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity('');
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SearchBox">
      <Card className="search-card" elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🌤️ Weather Forecast
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              label="Enter City Name"
              variant="outlined"
              fullWidth
              required
              value={city}
              onChange={handleChange}
              className="text-field"
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={!loading && <SearchIcon />}
              disabled={loading || !city.trim()}
              fullWidth
              className="submit-button"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </form>
          {error && (
            <Typography color="error" className="error-text">
              ❌ City not found. Please try again.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
