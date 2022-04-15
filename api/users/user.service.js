const pool = require("../../config/database");
const moment = require('moment');
const res = require("express/lib/response");

module.exports = {
 create: (data,callback) => {
 console.log(data)

 token = accessToken(128);
 console.log(token)
 
//createAccessToken(token)
// console.log("isvalidemail",isValidEmail(data.email))
 if(isValidEmail(data.email) && isValidPhoneNo(data.phone_no) && isValidPassword(data.password) && isValidConfirmPassword(data.password,data.confirm_password))
    createAccessToken(token) 
 else{
  console.log("Invalid data inserted");
 }    
/*}
}
*/
 function createAccessToken(token){
 pool.query(`SELECT access_token FROM user_info WHERE access_token = '${token}'`,
 function(error,result,field){
   console.log(result.length)
   if(result.length === 0){
    console.log(result) // array is empty
    
  //  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    console.log(date)

    pool.query(
      `INSERT into user_info(full_name,email,password,phone_no,access_token,token_created_at) values(?,?,?,?,?,?)`,
      [
        data.full_name,
        data.email,
        data.password,
        data.phone_no,
        token,
        date
      ],
      (error,results,fields) => {
        if(error){
        return callback(error);
        }
        return callback(null,results)
      }
     );  
   }
   else{
      other_token = accessToken(128);
      //other_token = token;
      console.log(other_token)
      createAccessToken(other_token)
   }
 })
}
},
validate: (data,callback) => {
  console.log(data)
  pool.query(
    `SELECT * FROM user_info WHERE email = ?`,
    [
      data.email
    ],
    (error,results,fields) => {
    //  console.log(fields);
      if(error){
      return callback(error);
      }
      return callback(null,results)
    }
   );
},
updateToken: (data,callback) => {
  console.log(data)
 
  token = accessToken(128);
  console.log(token)
  
 createAccessToken(token)

  function createAccessToken(token){
  pool.query(`SELECT access_token FROM user_info WHERE access_token = '${token}'`,
  function(error,result,field){
    console.log(result.length)
    if(result.length === 0){
     console.log(result) // array is empty
     
   //  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');;
     var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
     console.log(date)
 
     pool.query(
       `Update user_info set access_token = ?, token_created_at = ? where email = ?`,
       [
         token,
         date,
         data.email
       ],
       (error,results,fields) => {
         if(error){
         return callback(error);
         }
         return callback(null,results)
       }
      );  
    }
    else{
       other_token = accessToken(128);
       //other_token = token;
       console.log(other_token)
       createAccessToken(other_token)
    }
  })
 }
 }
}

/*
 pool.query(
  `INSERT into user_info(full_name,email,access_token) values(?,?,?)`,
  [
    data.full_name,
    data.email,
    token
  ],
  (error,results,fields) => {
  //  console.log(fields);
    if(error){
    return callback(error);
    }
    return callback(null,results)
  }
 );
 } 
};
*/


function accessToken(length) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result.length)
  return result;
}

function isValidEmail(email){
  
  id = new RegExp(/\S+@+[a-z]+.+[a-z]/g)
  console.log(id.test(email))
  var result = id.test(email)
  if(result == true)
  return id.test(email)
  else{
  console.log("Invalid email") // with true still this is printing /* can't understand why */
  return id.test(email) 
  }
}

function isValidPhoneNo(phone_no){
  pattern = new RegExp(/^\d{10}$/)
  console.log(pattern.test(phone_no))
  var result = pattern.test(phone_no)
  if(result)
  return pattern.test(phone_no)
  else{
  console.log("Invalid phone number")
  return pattern.test(phone_no)  
  }
}

function isValidPassword(password){
  var count = password.length
  if(password.length < 8)
  {
  console.log("Password length is less than 8")
  return false
  }
  else
  return true
}

function isValidConfirmPassword(password,confirm_password){
  if(password === confirm_password){
    return true
  }
  else{
    console.log("confirm password does not matches with the password")
    return false 
  }
}