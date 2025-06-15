const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSeriesBookmarkSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    tvSeriesId: {
        type: Schema.Types.Mixed,  // Allow both String and Number
        required: true
    },
    bookmarkedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a compound index to ensure a user can't bookmark the same TV series twice
tvSeriesBookmarkSchema.index({ user: 1, tvSeriesId: 1 }, { unique: true });

const tvseriesbookmark = mongoose.model('TVSeriesBookmark', tvSeriesBookmarkSchema);

module.exports = tvseriesbookmark;
