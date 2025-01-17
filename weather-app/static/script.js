// Base URL for Flask backend
const BASE_URL = 'http://192.168.0.149:5000/api/weather'; // The endpoint to fetch weather data

// Fetch Weather Data from the Backend
async function fetchWeather(location) {
  try {
    // Send GET request to Flask backend with the city as a query parameter
    const response = await fetch(`${BASE_URL}?city=${encodeURIComponent(location)}`);
    
    // Check if the response status is not OK (e.g., 404, 500) and throw an error
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    // Parse the JSON response
    const data = await response.json();
    
    // Check if the backend returned an error and throw it
    if (data.error) throw new Error(data.error);
    
    return data; // Return the weather data for further processing
  } catch (error) {
    // Display an error message in case of issues (e.g., network errors, invalid city name)
    alert('Error: ' + error.message);
  }
}

// Update UI with Weather Data
function updateUI(data) {
  // Get references to DOM elements
  const overlayLocation = document.getElementById('overlayLocation');
  const overlayTemperature = document.getElementById('overlayTemperature');
  const overlayCondition = document.getElementById('overlayCondition');
  const highTemp = document.getElementById('highTemp');
  const lowTemp = document.getElementById('lowTemp');
  const feelsLike = document.getElementById('feelsLike');
  const humidity = document.getElementById('humidity');
  const weatherOutsideImage = document.getElementById('weatherOutsideImage');

  // Convert temperatures from Celsius to Fahrenheit
  const tempF = (data.main.temp * 9) / 5 + 32;
  const highTempF = (data.main.temp_max * 9) / 5 + 32;
  const lowTempF = (data.main.temp_min * 9) / 5 + 32;
  const feelsLikeF = (data.main.feels_like * 9) / 5 + 32;

  // Update text content of the UI elements with the fetched weather data
  overlayLocation.textContent = `${data.name}, ${data.sys.country}`;
  overlayTemperature.textContent = `${tempF.toFixed(0)}°F`;
  overlayCondition.textContent = data.weather.description || 'Unknown';
  highTemp.textContent = `${highTempF.toFixed(0)}°F`;
  lowTemp.textContent = `${lowTempF.toFixed(0)}°F`;
  feelsLike.textContent = `${feelsLikeF.toFixed(0)}°F`;
  humidity.textContent = `${data.main.humidity}%`;

  // Determine background and weather image based on the main weather condition
  const mainCondition = data.weather.main.toLowerCase();
  let imageUrl = '';
  switch (mainCondition) {
    case 'clear':
      imageUrl = 'images/clear.jpg';
      document.body.style.background = 'linear-gradient(to bottom, #87CEFA, #ffffff)';
      break;
    case 'clouds':
      imageUrl = 'images/cloud.jpg';
      document.body.style.background = 'linear-gradient(to bottom, #b0c4de, #d3d3d3)';
      break;
    case 'rain':
      imageUrl = 'images/rain.avif';
      document.body.style.background = 'linear-gradient(to bottom, #708090, #2f4f4f)';
      break;
    case 'snow':
      imageUrl = 'images/snow.jpg';
      document.body.style.background = 'linear-gradient(to bottom, #ffffff, #d9d9d9)';
      break;
    case 'thunderstorm':
      imageUrl = 'images/thunder.avif';
      document.body.style.background = 'linear-gradient(to bottom, #4b4b4b, #000000)';
      break;
    case 'mist':
    case 'haze':
    case 'fog':
      imageUrl = 'images/mist.jpg';
      document.body.style.background = 'linear-gradient(to bottom, #d3d3d3, #b0b0b0)';
      break;
    default:
      imageUrl = 'images/default.jpg';
      document.body.style.background = 'linear-gradient(to bottom, #ececec, #ffffff)';
  }

  // Set the source of the weather image
  weatherOutsideImage.src = imageUrl;
}

// Event Listeners for User Interactions

// Handle search icon click event (Search button)
document.getElementById('searchIcon').addEventListener('click', async () => {
  const location = document.getElementById('searchLocation').value; // Get the user's input
  if (!location) {
    alert('Please enter a location!'); // Alert if no input is provided
    return;
  }
  const weatherData = await fetchWeather(location); // Fetch weather data
  if (weatherData) updateUI(weatherData); // Update UI if data is fetched successfully
});

// Handle form submission event (Enter)
document.getElementById('weatherForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior (e.g., page reload)
  const location = document.getElementById('searchLocation').value; // Get the user's input
  if (!location) {
    alert('Please enter a location!'); // Alert if no input is provided
    return;
  }
  const weatherData = await fetchWeather(location); // Fetch weather data
  if (weatherData) updateUI(weatherData); // Update UI if data is fetched successfully
});
