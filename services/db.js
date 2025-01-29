const mongoose = require("mongoose");
// mongoose.connect(config.connectionString);
mongoose.connect('mongodb+srv://auraserver:auratravel7489@auratravel.97nkx.mongodb.net/?retryWrites=true&w=majority&appName=auratravel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas successfully!");
    }).catch(err => {
        console.error("MongoDB connection error:", err);
    });


const User = mongoose.model('User', {
    fullname: String,
    email: String,
    mobno: Number,
    password: String,
    role: String,
    booking: [],
    bookingList: [],
    contactUs: [],
    createdDate: Date,
})

const Admin = mongoose.model('Admin', {
    fullname: String,
    email: String,
    mobno: Number,
    password: String,
    role: String, 
    usersList: [],
    userBookingList: [],
    userCancelCount: [],
    adminRejection: [],



})
module.exports = {
    User,
    Admin
}