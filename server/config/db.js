const mongoose = require('mongoose');

const connectUsersDB = async () => {
    try {
        console.log(process.env.MONGO_DB_URL);
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Users MongoDB connection established successfully');
    } catch (error) {
        console.error('Error connecting to Users MongoDB:', error);
    }
};

module.exports = connectUsersDB;