const express = require('express');
const { setAIRoutes } = require('./aiRoutes');

const setRoutes = (app) => {
    const router = express.Router();

    setAIRoutes(router);

    app.use('/api', router);
};

module.exports = { setRoutes };