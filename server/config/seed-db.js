import { pool } from './database.js';

const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
        console.log('Tables dropped');
    } catch (error) {
        console.log('Error dropping tables:', error);
    }
};

const createTables = async () => {
    try {
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                rating INT NOT NULL,
                content TEXT NOT NULL,
                restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createTablesQuery);
        console.log('Tables created');
    } catch (error) {
        console.log('Error creating tables:', error);
    }
};

const insertData = async () => {
    try {
        const insertRestaurantsQuery = `
            INSERT INTO restaurants (name, phone, address, photo) 
            VALUES
                ('MOS BURGER', '+81 75-255-3275', 'Japan, 〒600-8002, Shimogyo Ward, Kyoto, 29-2 Otabicho', 'images/mosburger.jpg'),
                ('CoCo ICHIBANYA', '+81 3-5363-9883', 'Japan, 〒160-0022 Tokyo, Shinjuku City, Shinjuku, 
                2 Chome−9−20, Lions Mansion Shinjukugyoenmae, １Ｆ', 'images/coco.jpg'),
                ('Torikizoku', '+81 50-3623-4509', 'Japan, 〒542-0071, Dotonbori, Chuo Ward, Osaka, 
                1 Chome-6-15, Comrado Doton Building 3F', 'images/torikizoku.jpg'),
                ('Kuse ga Tsuyoi Menya Reiwa', 'N/A', 'Japan, 〒541-0059 Osaka, Chuo Ward, Bakuromachi, 
                4 Chome-7-1 Novakaneichi Honmachi Midou', 'images/jojo.jpg'),
                ('SHOGUN BURGER', '+81 3-5273-4829', 'Japan, 〒160-0021 Tokyo, Shinjuku City, Kabukicho,
                1 Chome-15-12 Piatt Building 1F', 'images/shogun.jpg'),
                ('the Lazy HOUSE', '+81 080-6334-1510', 'Japan, 〒454-0825 Aichi, Yoshimoto-cho,
                Nakagawa-ku, Nagoya, 3-3-1', 'images/lazyfuku.jpg');
        `;
        await pool.query(insertRestaurantsQuery);
        console.log('Restaurants inserted');

        const insertReviewsQuery = `
            INSERT INTO reviews (rating, content, restaurant_id) 
            VALUES
                (5, 'Excellent food and service!', 1),
                (4, 'Great taste, but a bit pricey.', 1),
                (3, 'Decent, but not worth the wait.', 2),
                (4, 'Good value for money.', 2),
                (5, 'Loved it! Will come again.', 3),
                (4, 'Nice, but I expected more.', 3);
        `;
        await pool.query(insertReviewsQuery);
        console.log('Reviews inserted');
    } catch (error) {
        console.log('Error inserting data:', error);
    }
};

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
};

setup();
