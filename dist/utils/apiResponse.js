export const generateApiResponse = (res, { data = null, message = "", statusCode = 200, error = null, } = {}) => {
    const response = {
        data,
        message,
        statusCode,
        error,
        success: statusCode >= 200 && statusCode < 300,
    };
    res.status(statusCode).json(response);
    return response;
};
