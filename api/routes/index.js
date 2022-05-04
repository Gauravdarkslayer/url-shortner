const router = require('express').Router();
const urlController = require('../controllers/url');

// You can require and use your routes here ;)


router.post('/api/v1/createShortUrl',urlController.createShortUrl);
module.exports = router;