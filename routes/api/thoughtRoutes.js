const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    // addReaction,
    // removeReaction
    } = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought);

// /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;