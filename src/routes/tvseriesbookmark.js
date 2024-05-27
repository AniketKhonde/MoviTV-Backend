const express = require('express');
const router = express.Router();
const { addTVSeriesBookmark, showTVSeriesBookmarks, removeTVSeriesBookmark } = require('../controllers/tvseriesbookmarkcontroller');


// Route to add a TV series bookmark
router.post('/addbookmark/tvseries',  addTVSeriesBookmark);

// Route to get a user's TV series bookmarks
router.get('/showbookmarks/tvseries/:userId' ,showTVSeriesBookmarks);

// Route to remove a TV series bookmark
router.delete('/deletebookmark/tvseries/:id', removeTVSeriesBookmark);

module.exports = router;