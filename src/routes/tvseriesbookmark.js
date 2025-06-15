const express = require('express');
const router = express.Router();
const { addBookmark, showBookmarks, removeBookmark } = require('../controllers/tvseriesbookmarkcontroller');


// Route to add a TV series bookmark
router.post('/addbookmark/tvseries', addBookmark);

// Route to get a user's TV series bookmarks
router.get('/showbookmarks/tvseries/:userId', showBookmarks);

// Route to remove a TV series bookmark
router.delete('/deletebookmark/tvseries/:userId/:id', removeBookmark);

module.exports = router;