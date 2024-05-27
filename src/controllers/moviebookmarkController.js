const MovieBookmark = require('../models/movieBookmark');

// Controller to handle bookmarking a movie
const addBookmark = async (req, res) => {
    try {
        const { userId, movieId, tmdbId } = req.body;

        if (!userId || !movieId || !tmdbId ) {
            return res.status(400).send('User ID, Movie ID, TMDB ID');
        }

        // Check if the movie is already bookmarked by the user
        const existingBookmark = await MovieBookmark.findOne({ user: userId, movie: movieId });
        if (existingBookmark) {
            return res.status(400).send('Movie is already bookmarked');
        }

        // Create a new movie bookmark
        const newMovieBookmark = new MovieBookmark({
            user: userId,
            movie: movieId,
            movieId: tmdbId
        });

        await newMovieBookmark.save();
        res.status(201).send('Movie bookmarked successfully');
    } catch (error) {
        console.error('Error bookmarking movie:', error);
        res.status(500).send('Internal server error');
    }
};

// Controller to handle displaying a user's movie bookmarks
const showBookmarks = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters

        // Fetch all movie bookmarks for the user
        const bookmarks = await MovieBookmark.find({ user: userId }).populate('movie');

        res.status(200).json(bookmarks);
    } catch (error) {
        console.error('Error fetching movie bookmarks:', error);
        res.status(500).send('Internal server error');
    }
};

// Controller to handle removing a movie bookmark
const removeBookmark = async (req, res) => {
    try {
      const movieId = req.params.id;
  
      if (!movieId) {
        return res.status(400).send('Movie ID is required');
      }
  
      // Check if the movie bookmark exists
      const bookmark = await MovieBookmark.findById(movieId);
      if (!bookmark) {
        return res.status(404).send('Movie bookmark not found');
      }
  
      // Remove the movie bookmark
      await MovieBookmark.findByIdAndDelete(movieId);
  
      res.status(200).send('Movie bookmark removed successfully');
    } catch (error) {
      console.error('Error removing movie bookmark:', error);
      res.status(500).send('Internal server error');
    }
  };
  

module.exports = {
    addBookmark,
    showBookmarks,
    removeBookmark
};
