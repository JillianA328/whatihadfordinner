const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes');
//  const linkRoutes = require('./link-routes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
// router.use('/link', linkRoutes);

module.exports = router;