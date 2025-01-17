# Weather App Kata

This is a weather application built as part of a take-home kata project for an internship. The app fetches current weather data for a user-specified location using the OpenWeatherMap API and displays it in a clean, user-friendly interface.

## Features
- Fetches real-time weather data for any city using the OpenWeatherMap API.
- Displays:
  - Current temperature (converted to Fahrenheit).
  - Weather conditions (e.g., clear, cloudy, rainy).
  - High and low temperatures.
  - Humidity levels.
- Dynamic background visuals change based on weather conditions.
- Responsive search bar for location input.
- Robust error handling for invalid city names or missing parameters.

## Technologies Used
- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started
Follow these steps to run the project locally:

### Prerequisites
- Python 3.x installed on your machine
- An OpenWeatherMap API key (sign up [here](https://openweathermap.org/) if you don’t have one)

### Setup Instructions
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/muhanadk13/weather-app-kata.git
   cd weather-app-kata

Install the required Python libraries:

pip install flask flask-cors requests

Set up your API key:

Replace 'API_KEY' in server.py with your actual OpenWeatherMap API key.
Start the Flask server:


python server.py
The server will start running at http://127.0.0.1:5000 or http://192.168.x.x:5000 (your local IP).

Open the index.html file in your browser to view the app, or use Live Server in VS Code for development.

(Be sure to run the server.py code first then open the index.html with a liveserver)

Project Structure

weather-app-kata/
├── weather-app/
│   ├── static/
│   │   ├── images/         # Consolidated image folder
│   │   ├── index.html      # Frontend HTML
│   │   ├── style.css       # Frontend CSS
│   │   ├── script.js       # Frontend JavaScript
│   ├── server.py           # Flask backend
├── README.md               # Project documentation


Usage
Enter a city name in the search bar.
Click the search icon or press "Enter."
View the weather details and enjoy the dynamic background visuals.
Error Handling
If no city is entered, an error message is displayed.
If the API fails (e.g., invalid city or network error), the app will alert the user.

Challenges and Solutions
CORS Issues: Resolved using the flask-cors library to allow frontend-backend communication.
Dynamic Visuals: Used JavaScript to dynamically update the background and visuals based on weather conditions.
API Security: Kept the API key hidden in the backend to ensure security.

Future Enhancements
Add a loading spinner during API requests.
Provide weather forecasts for multiple days.
Include a comparison feature for two or more cities.

Author
Muhanad Khleifat

Contact
Feel free to reach out with questions or feedback:

Email: khleifa2@uwm.edu
GitHub: muhanadk13

