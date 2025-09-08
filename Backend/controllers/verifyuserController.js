import { createError } from "../utitls/error.js";
export const verifyUserRole = (allowedRoles) => (req, res, next) => {
  
    if (req.user && req.user.userType && allowedRoles.includes(req.user.userType)) {
      next();
    } else {
      return next(createError(403, "You are not authorized."));
    }
  };