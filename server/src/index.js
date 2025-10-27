import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import authRoute from './routes/auth.route.js';
import adminRoute from './routes/admin.route.js';
import postRoute from './routes/post.route.js';
import categoryRoute from './routes/category.route.js';
import commentRoute from './routes/comment.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/comments', commentRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
