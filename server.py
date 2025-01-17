from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Import CORS for handling cross-origin requests

# Initialize the Flask app
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) to allow the frontend to access the backend from a different origin
CORS(app)

# Securely store your OpenWeatherMap API key
API_KEY = 'd9c81c2ed109bce85d1cb68713f1ca7e' 

@app.route('/api/weather', methods=['GET']) 
def get_weather():
    """
    Handle GET requests to fetch weather information for a specified city.
    The city name is passed as a query parameter.
    """
    city = request.args.get('city')  # Get the city name from the query parameters
    if not city:
        # Return an error response if the city parameter is missing
        return jsonify({'error': 'City parameter is required'}), 400

    # Construct the OpenWeatherMap API endpoint with query parameters
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    try:
        # Make an HTTP GET request to the OpenWeatherMap API
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError if the response status is not 200

        # Parse the API response JSON
        data = response.json()

        # Extract and filter only the necessary data for the frontend
        filtered_data = {
            "name": data.get("name"),  # City name
            "sys": {"country": data.get("sys", {}).get("country")},  # Country code
            "weather": data.get("weather", [{}])[0],  # Main weather description
            "main": data.get("main")  # Temperature and other main weather details
        }

        # Return the filtered data as a JSON response
        return jsonify(filtered_data)
    except requests.exceptions.RequestException as e:
        # Handle errors from the API request or connection issues
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    # `host='0.0.0.0'` makes the app accessible on the local network
    # `port=5000` specifies the port to run the app
    # `debug=True` enables debug mode for development purposes
