const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSeriesBookmarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tvSeries: {
        type: Schema.Types.ObjectId,
        ref: 'TVSeries',
        required: true
    },
    tvSeriesId: {
        type: Number, // Assuming TV series IDs are numeric
        default: null
    },
    bookmarkedAt: {
        type: Date,
        default: Date.now
    }
});

const tvseriesbookmark = mongoose.model('TVSeriesBookmark', tvSeriesBookmarkSchema);

module.exports = tvseriesbookmark;
