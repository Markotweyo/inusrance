const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const whatsappRoutes = require('./src/routes/whatsappRoutes');
const callbackRoutes = require('./src/routes/callbackRoutes');
const policyRoutes = require('./src/routes/policyRoutes');
const transactionRoutes = require("./src/routes/transactionRoutes");
const mpesaRoutes = require("./src/routes/mpesaRoutes");
const chatbotRoutes = require("./src/routes/chatbotRoutes");
const { PORT, DB_URI } = require('./src/utils/config');

require("dotenv").config();

const app = express();


app.use(express.json());
app.use(bodyParser.json());


// Route Integrations
app.use('/whatsapp', whatsappRoutes);
app.use('/callback', callbackRoutes);
app.use('/policies', policyRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/mpesa-payment", mpesaRoutes);
app.use("/api/chatbot", chatbotRoutes);


// Database Connection
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
