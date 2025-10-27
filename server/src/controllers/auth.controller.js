import { eq } from 'drizzle-orm';
import db from '../config/db.js';
import { user } from '../db/schema/user.js';
import ApiError from '../utils/apiError.js';
import createToken from '../utils/createToken.js';
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));
    const isAdminPasswordCorrect = password === process.env.ADMIN_PASSWORD;

    if (!foundUser || !isAdminPasswordCorrect) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    const payload = {
      userId: foundUser?.id,
      role: foundUser?.role,
      email: foundUser?.email,
    };

    const token = createToken(payload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return res
      .status(200)
      .json({
        message: 'Login successful',
        role: foundUser.role,
        name: foundUser.name,
        isAuth: true,
      });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(200)
        .json({ message: 'Success', name: null, role: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new ApiError(403, 'Invalid token'));
    }

    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, decoded.userId));

    if (!foundUser) {
      return next(new ApiError(404, 'User not found'));
    }

    // const { password, id, email, ...userInfo } = foundUser;
    return res
      .status(200)
      .json({ message: 'Success', name: foundUser.name, role: foundUser.role , isAuth: true});
  } catch (error) {
    next(error);
  }
};
export { login, logout, me };
