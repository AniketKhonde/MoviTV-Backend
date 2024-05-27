const express = require('express');
const router = express.Router();
const { addBookmark, showBookmarks, removeBookmark } = require('../controllers/moviebookmarkController');

// Route to add a bookmark
router.post('/addmoviebookmark/movie',  addBookmark);

// Route to get a user's movie bookmarks
router.get('/showmoviebookmarks/movies/:userId',  showBookmarks);

// Route to remove a bookmark
router.delete('/deletemoviebookmark/movie/:id',  removeBookmark);

module.exports = router;