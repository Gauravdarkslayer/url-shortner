const router = require('express').Router();
const urlController = require('../controllers/url');

// You can require and use your routes here ;)


router.post('/api/v1/createShortUrl',urlController.createShortUrl);
router.get('/api/v1/getLongUrl',urlController.getLongUrl);

module.exports = router;