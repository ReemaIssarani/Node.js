const {create} = require('./user.service')
const {validate} = require('./user.service')
const {updateToken} = require('./user.service')
const moment = require('moment');

module.exports = {
 createUser: (req,res) => {
   const body = req.body;
   create(body,(err,results)=>{
   if(err){
    console.log(err);
    return res.status(500).json({
      success: 0,
      message: "Database connection error"  
    })
   }
   return res.status(200).json({
      success: 1,
      data: results 
   });
   }); 
 },
 validateUser: (req,res) => {
  const body = req.body;
  console.log(body)
  validate(body,(err,results)=>{ 
   
    var now = moment(new Date()); //current date
    var end = moment(results[0].token_created_at).format('YYYY-MM-DD'); // another date
    console.log(now)
    console.log(end)
    var duration = moment.duration(now.diff(end));
    var days = duration.asDays();
    console.log(days)

   if(err){
   console.log(err);
   return res.status(500).json({
     success: 0,
     message: "Database connection error"  
   })
  }
   else if(days >= 1){
   return res.status(200).json({
     success: 0,
     message: "Please login again.Token is expired"
   });  
   }
  return res.status(200).json({
     success: 1,
     data: results
  });
  }); 
},
loginUser: (req,res) => {
  const body = req.body;
  updateToken(body,(err,results)=>{
  if(err){
   console.log(err);
   return res.status(500).json({
     success: 0,
     message: "Database connection error"  
   })
  }
  return res.status(200).json({
     success: 1,
     data: results 
  });
  }); 
},
}

/*function isValidEmail(email){
id = new RegExp(/\S+@+[a-z]+.+[a-z]/g)
return id.test(email)
}
*/