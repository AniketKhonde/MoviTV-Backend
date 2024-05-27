const MovieBookmark = require('../models/tvseriesbookmark');

// Controller to handle bookmarking a movie
const addTVSeriesBookmark = async (req, res) => {
    try {
        const { userId, tvSeriesId, tmdbId } = req.body;

        if (!userId || !tvSeriesId || !tmdbId ) {
            return res.status(400).send('User ID, tvSeriesId, TMDB ID');
        }

        // Check if the movie is already bookmarked by the user
        const existingBookmark = await MovieBookmark.findOne({ user: userId, movie: tvSeriesId });
        if (existingBookmark) {
            return res.status(400).send('Movie is already bookmarked');
        }

        // Create a new movie bookmark
        const newMovieBookmark = new MovieBookmark({
            user: userId,
            tvSeries: tvSeriesId,
            tvSeriesId: tmdbId
        });

        await newMovieBookmark.save();
        res.status(201).send('tvseries bookmarked successfully');
    } catch (error) {
        console.error('Error bookmarking tvseries:', error);
        res.status(500).send('Internal server error');
    }
};

// Controller to handle displaying a user's movie bookmarks
const showTVSeriesBookmarks = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters

        // Fetch all movie bookmarks for the user
        const bookmarks = await MovieBookmark.find({ user: userId }).populate('tvSeries');

        res.status(200).json(bookmarks);
    } catch (error) {
        console.error('Error fetching movie bookmarks:', error);
        res.status(500).send('Internal server error');
    }
};

// Controller to handle removing a movie bookmark
const removeTVSeriesBookmark = async (req, res) => {
    try {
      const tvSeriesId = req.params.id;
  
      if (!tvSeriesId) {
        return res.status(400).send('tvSeries ID is required');
      }
  
      // Check if the movie bookmark exists
      const bookmark = await MovieBookmark.findById(tvSeriesId);
      if (!bookmark) {
        return res.status(404).send('tvSeries bookmark not found');
      }
  
      // Remove the movie bookmark
      await MovieBookmark.findByIdAndDelete(tvSeriesId);
  
      res.status(200).send('tvSeries bookmark removed successfully');
    } catch (error) {
      console.error('Error removing tvSeries bookmark:', error);
      res.status(500).send('Internal server error');
    }
  };
module.exports = {
    addTVSeriesBookmark,
    showTVSeriesBookmarks,
    removeTVSeriesBookmark
};
