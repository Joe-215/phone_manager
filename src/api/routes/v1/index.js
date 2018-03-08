const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./docs/swagger');
const numberRoutes = require('./number.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/number', numberRoutes);

module.exports = router;
