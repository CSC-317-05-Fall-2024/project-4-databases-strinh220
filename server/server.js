import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, getReviewsForRestaurant } from "./data/restaurants.js";
import { backendRouter } from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api', backendRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        if (Array.isArray(restaurants)) {
            res.render('restaurants', { restaurants });
        } else {
            res.status(500).send('Error: Data returned is not an array');
        }
    } catch (error) {
        console.error(error); 
        res.status(500).send('Error fetching restaurants');
    }
});

app.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); 

    try {
        const restaurant = await getRestaurant(id);
        const reviews = await getReviewsForRestaurant(id); 

        if (restaurant) {
            res.render('restaurant-details', { restaurant, reviews });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching restaurant details');
    }
});

app.get('/newrestaurants', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newrest.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
