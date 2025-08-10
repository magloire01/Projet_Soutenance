const notFound = (req, res, next) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found`,
    code: 'ROUTE_NOT_FOUND'
  });
};

module.exports = { notFound };