
const jwt =require('jsonwebtoken') 

// Secret keys for user and admin tokens
const ADMIN_SECRET_KEY = 'adminkey7895461230';
const USER_SECRET_KEY = 'userkey4569871230';
 
const db=require('./db')
// db = {
//   "starkindu@gmail.com": { fullname: "Sarang", email: "starkindu@gmail.com", mobno: 8301056189, password: "12345678", role: "user", booking: [], bookingList: [] },
// }
// adminDb = {
//   "admin@gmail.com": { fullname: "Admin", email: "admin@gmail.com", mobno: 1234567890, password: 'admin5789', role: "admin", usersList:[],userBookingList: [] ,userCancelCount:[],adminRejection:[]}
// };



//   register

const register = async (fullname, email, mobno, password) => {
  const user = await db.User.findOne({
    email
  });
  console.log(user);
  if (user) {
    return {
      status: false,
      message: "Already registered .... Please Log in",
      statusCode: 401,
    };
  }
  else {
    const currentDate = new Date().toISOString();
    const newUser = new db.User({
      fullname,
      email,
      mobno,
      password,
      role: "user",
      booking: [],
      bookingList: [],
      contactUs: [],
      createdDate: currentDate,
    });
    const AdminDb =db.Admin
    if (AdminDb["admin@gmail.com"] &&AdminDb["admin@gmail.com"].usersList) {
          AdminDb["admin@gmail.com"].usersList.push({
            fullname,
            email,
            mobno,
            password,
            createdDate: currentDate,
          });
        }
    newUser.save();
    console.log(newUser);
    return {
      status: true,
      message: "Register successfully",
      statusCode: 200,
    };
  }
}
  // if (email in db) {
  //   return {
  //     status: false,
  //     message: "Already registered .... Please Log in",
  //     statusCode: 401,
  //   }
  // }
  // else {
  //   const currentDate = new Date().toISOString();
  //   db[email] =
  //   {
  //     fullname,
  //     email,
  //     mobno,
  //     password,
  //     booking: [],
  //     bookingList: [],
  //     contactUs: [],
  //     createdDate: currentDate,
  //     role: "user"

  //   }
  //   if (adminDb["admin@gmail.com"] &&adminDb["admin@gmail.com"].usersList) {
  //     adminDb["admin@gmail.com"].usersList.push({
  //       fullname,
  //       email,
  //       mobno,
  //       password,
  //       createdDate: currentDate,
  //     });
  //   }
  //   console.log(db);
  //   console.log(db);
  //   console.log(adminDb);
  //   console.log(adminDb["admin@gmail.com"].usersList);
    
    
  //   return {
  //     status: true,
  //     message: "Register successfully",
  //     statusCode: 200,
  //   }

  // }

// login
const login = (email, password) => {
  if (email in adminDb) {
    if (password == adminDb[email]["password"]) {
      currentUser =adminDb[email];
      username = adminDb[email]["fullname"];
      customerMail = email;
     token = jwt.sign({
        customerMail:email
      },ADMIN_SECRET_KEY)
      return {
        role: "admin",
        status: true,
        message: "Admin login successfull",
        statusCode: 200,
        currentUser,
        customerMail,
        username,
        token
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect Admin Password",
        statusCode: 401,
      }
    }
  }
  else if (email in db) {
    if (password == db[email]["password"]) {
      currentUser = db[email];
      username = db[email]["fullname"];
      customerMail = email;
    token=jwt.sign({
        customerMail:email
      },USER_SECRET_KEY)
      console.log("currentuser",currentUser)    
      return {
        role: "user",
        status: true,
        message: "User Login successfull",
        statusCode: 200,
        currentUser,
        customerMail,
        username,
        token
      }
    }
    else {
      return {
        status: false,
        message: "Incorrect User Password",
        statusCode: 401,
      }
    }
  }
  else {
    return {
      status: false,
      message: "User does not exist!! Please Create an account",
      statusCode: 401,
    }
  }
}
// booking
const bookingconfirm =(customerName, email,mobno, password, tripInfo, preferences) => {
  const user = db[email];

  if (email in db) {
    if (password == db[email]["password"]) {
      db[email]["booking"].push({
        FullName: customerName,
        Mobile: mobno,
        From: tripInfo.from,
        Destination: tripInfo.destination,
        DepartureDate: tripInfo.selectDate,
        ReturnDate: tripInfo.returnDate,
        CountPeople: tripInfo.countPeople,
        SelectedHotel: preferences.selectedHotel,
        SelectedFlight: preferences.selectedFlight,
        status: "Pending",
      })
      db[email].bookingList.push({
        FullName: customerName,
        Mobile: mobno,
        From: tripInfo.from,
        Destination: tripInfo.destination,
        DepartureDate: tripInfo.selectDate,
        ReturnDate: tripInfo.returnDate,
        CountPeople: tripInfo.countPeople,
        SelectedHotel: preferences.selectedHotel,
        SelectedFlight: preferences.selectedFlight,
        status: "Pending",
      })
      
      return{
        status:true,
        message:"Booking confirmed",
        statusCode:200
      } 
    }
    else {
      return {
        status:false,
        message:"Incorrect Password",
        statusCode:401
      }
    }
  }
  else {
    return{
      status:false,
      message:"User does not exist",
      statusCode:401
    }
  }
}


//   exports

module.exports = {
  register,
  login,
  bookingconfirm,
  USER_SECRET_KEY
}