// Initialize Google Autocomplete
function initMap() {
    const pickupInput = document.getElementById('pickup-input');
    const dropoffInput = document.getElementById('dropoff-input');

    const options = { componentRestrictions: { country: "us" } };
    new google.maps.places.Autocomplete(pickupInput, options);
    new google.maps.places.Autocomplete(dropoffInput, options);
}

// Function to get distance and then call Flask API
async function getFare() {
    const origin = document.getElementById('pickup-input').value;
    const destination = document.getElementById('dropoff-input').value;

    const service = new google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
    }, async (response, status) => {
        if (status === 'OK') {
            const distanceText = response.rows[0].elements[0].distance.text;

            // Call your Flask REST API
            const res = await fetch('/api/calculate-fare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    distance: distanceText,
                    vehicle: document.getElementById('vehicle-select').value
                })
            });

            const data = await res.json();
            document.getElementById('fare-display').innerText = `Estimated Fare: $${data.fare}`;
        }
    });
}

window.onload = initMap;