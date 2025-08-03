import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './InfoBox.css';

export default function InfoBox({ info }) {
  const INIT_URL =
    'https://images.unsplash.com/photo-1722858343990-1604f540c15d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const HOT_URL =
    'https://images.unsplash.com/photo-1493936734716-77ba6da66365?w=800&auto=format&fit=crop&q=60';
  const COLD_URL =
    'https://images.unsplash.com/photo-1544037837-c8ccd60016f8?w=800&auto=format&fit=crop&q=60';
  const RAIN_URL =
    'https://plus.unsplash.com/premium_photo-1670002344425-f274ee445f76?q=80&w=1470&auto=format&fit=crop';

  const getWeatherIcon = () => {
    if (info.humidity > 80) return <ThunderstormIcon fontSize="large" color="primary" />;
    if (info.temp > 15) return <WbSunnyIcon fontSize="large" color="warning" />;
    return <AcUnitIcon fontSize="large" color="info" />;
  };

  const getImage = () => {
    if (info.humidity > 80) return RAIN_URL;
    if (info.temp > 15) return HOT_URL;
    return COLD_URL;
  };

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card elevation={6}>
          <CardMedia sx={{ height: 200 }} image={getImage()} title="Weather Image" />
          <CardContent>
            <Typography variant="h5" component="div" className="card-header">
              {info.city} {getWeatherIcon()}
            </Typography>
            <Typography variant="body2" component="div" className="card-body">
              <p>🌡️ Temperature: {info.temp}&deg;C</p>
              <p>💧 Humidity: {info.humidity}%</p>
              <p>🔻 Min Temp: {info.tempMin}&deg;C</p>
              <p>🔺 Max Temp: {info.tempMax}&deg;C</p>
              <p>
                📝 Weather: <i>{info.weather}</i>
              </p>
              <p>🤔 Feels Like: {info.feelsLike}&deg;C</p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
