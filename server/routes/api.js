import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from "../data/restaurants.js";  
const router = express.Router();

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve restaurants' });
    }
});

router.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const restaurant = await getRestaurant(id); 
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve restaurant' });
    }
});

router.post('/restaurants', async (req, res) => {
    const newRestaurant = req.body;
    try {
        const createdRestaurant = await createRestaurant(newRestaurant); 
        res.status(201).json(createdRestaurant); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

router.delete('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await deleteRestaurant(id); 
        if (result) {
            res.status(204).send(); 
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        res.status(500).send('Failed to delete restaurant');
    }
});

export { router as backendRouter };
