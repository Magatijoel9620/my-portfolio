from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

@app.route('/')
def home():
    return "Portfolio API is up and running!"

# API endpoint for fetching projects
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = [
        {
            'title': ' Food Delivery App',
            'description': 'A minimal food delivery mobile app',
            'link': 'https://github.com/Magatijoel9620/fooddeliveryfirebase'
        },
        {
            'title': 'An Ecommerce App',
            'description': 'A minimal Ecommerce application easily customizable',
            'link': 'https://github.com/Magatijoel9620/miniEcommerceApp'
        },
        {
            'title': 'Personal CV App',
            'description': 'A Personal cv app',
            'link': 'https://github.com/Magatijoel9620/personalCV'
        }
        # Add more projects as needed
    ]
    return jsonify(projects)

# Endpoint to handle contact form submissions
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Here, you could process the data, e.g., save to a database or send an email
    print(f"Received contact form submission: {name}, {email}, {message}")

    # Process the data, such as saving it to a database or sending an email
    return jsonify({"message": "Thank you for reaching out!"})

if __name__ == '__main__':
    app.run(debug=True)
