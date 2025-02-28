require('dotenv').config();

const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes');
const uploadImageRoutes = require('./routes/imageRoutes');
const cors = require('cors');
const morgan = require('morgan');
connectDB();

const app = express();

//middleware
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(morgan("tiny"));


app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});