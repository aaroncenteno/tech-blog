const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const { route } = require('./user-routes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;