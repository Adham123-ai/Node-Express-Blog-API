const AppError = require("../utils/AppError");

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("Unauthorized", 403));
    }

    next();
  };
};

module.exports = roleMiddleware;