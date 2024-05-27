const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieBookmarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    movieId: {
        type: Number, // Assuming movie IDs are numeric
        default: null
    },
    bookmarkedAt: {
        type: Date,
        default: Date.now
    }
});

const movieBookmark = mongoose.model('MovieBookmark', movieBookmarkSchema);

module.exports = movieBookmark;
