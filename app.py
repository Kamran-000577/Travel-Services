from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Route to serve the main frontend
@app.route('/')
def index():
    return render_template('index.html')

# REST API Endpoint for pricing logic
@app.route('/api/calculate-fare', methods=['POST'])
def calculate_fare():
    data = request.json
    distance_text = data.get('distance') # e.g., "15.5 mi"
    vehicle = data.get('vehicle', 'sedan')
    
    # Convert "15.5 mi" string to float
    distance_val = float(distance_text.split(' ')[0])
    
    # Pricing: Base $20 + $3.50 per mile. SUV adds 20% premium.
    base = 20
    per_mile = 3.50
    total = base + (distance_val * per_mile)
    
    if vehicle == 'suv':
        total *= 1.2
        
    return jsonify({
        "fare": round(total, 2),
        "currency": "USD"
    })


@app.route('/booking')
def booking():
    # You can reuse index.html or make a specific booking.html
    return render_template('index.html') 

@app.route('/fleet')
def fleet():
    return render_template('fleet.html')

@app.route('/services')
def services():
    return render_template('services.html')



if __name__ == '__main__':
    app.run(debug=True)