const express = require("express");
const middleware = require('./middlewares/middleware');
const mongoose = require("mongoose");
require('dotenv').config();
const moviesRoutes = require('./routes/movies');
const tvseriesRoutes = require('./routes/tvseries');
const trendingmoviesRoutes = require('./routes/trendingmovies');
const reginsterRoutes = require('./routes/registration');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/showProfile');
const saveprofileRoutes=require('./routes/profile')
const moviebookmark = require('./routes/moviebookmark')
const tvseriesbookmark= require('./routes/tvseriesbookmark');
const detailinfo = require('./routes/detailinfo')
const recommendRoutes = require('./routes/recommend')
const searchRoutes = require('./routes/search')




const app = express();

// Use middleware
app.use(middleware.parseJson);
app.use(middleware.handleCors);
app.use(middleware.secureHeaders);
app.use(middleware.logRequests);


// MongoDB Connection
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error occurred during database connection: ${error}`);
    }
})();


app.use('/api/recommend',recommendRoutes);
app.use('/api', searchRoutes);
app.use('/api/movies',moviesRoutes);
app.use('/api/tvseries',tvseriesRoutes);
app.use('/api/trendingmovies',trendingmoviesRoutes);
app.use('/api/register', reginsterRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/saveProfile', saveprofileRoutes);
app.use('/api', moviebookmark);
app.use('/api', tvseriesbookmark);
app.use('/api/detailinfo', detailinfo);



