function asyncErrorBoundary (func) {
  return (req, res, next) => {
    try {
      return func(req, res, next);
    } catch (error) {
      return next({status: 505, message: error.message})
    }
  }
}

module.exports = asyncErrorBoundary;