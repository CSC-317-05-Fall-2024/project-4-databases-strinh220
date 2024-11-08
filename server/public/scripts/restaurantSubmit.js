const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const newRestaurant = {};
    
    formData.forEach((value, key) => {
        newRestaurant[key] = value;
    });
    
    const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurant)
    });
    
    if (response.ok) {
        window.location.href = '/restaurants';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('restaurant-form');
    form.addEventListener('submit', handleSubmit);
});
