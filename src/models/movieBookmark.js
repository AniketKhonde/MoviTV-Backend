const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieBookmarkSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    movieId: {
        type: Schema.Types.Mixed,  // Allow both String and Number
        required: true
    },
    bookmarkedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a compound index to ensure a user can't bookmark the same movie twice
movieBookmarkSchema.index({ user: 1, movieId: 1 }, { unique: true });

const movieBookmark = mongoose.model('MovieBookmark', movieBookmarkSchema);

module.exports = movieBookmark;
