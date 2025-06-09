module.exports = {
    successResponse: (res, data, message = 'Success') => {
        res.status(200).json({
            status: 'success',
            message,
            data
        });
    },

    errorResponse: (res, error, message = 'An error occurred') => {
        res.status(error.status || 500).json({
            status: 'error',
            message,
            error: error.message || error
        });
    },

    notFoundResponse: (res, message = 'Resource not found') => {
        res.status(404).json({
            status: 'error',
            message
        });
    }
};