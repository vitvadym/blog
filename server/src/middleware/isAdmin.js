import jwt from 'jsonwebtoken';
import 'dotenv/config';
import ApiError from '../utils/apiError.js';

const isAdmin = (req, _, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ApiError(401, 'No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return next(new ApiError(403, 'Invalid token'));
    }

    if (decoded.role !== 'admin') {
      return next(new ApiError(403, 'Access denied'));
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
