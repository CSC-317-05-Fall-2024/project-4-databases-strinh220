document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.deletebtn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const restaurantId = event.target.getAttribute('data-id');
            try {
                const response = await fetch(`/api/restaurants/${restaurantId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    const restaurantCard = event.target.closest('.foods');
                    restaurantCard.remove();
                } else {
                    console.error('Failed to delete the restaurant:', await response.text());
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
