require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const fs = require('fs');
//const auth = require('./authorization');
var cors = require('cors');
const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');
const NodeTable = require("nodetable");
const {format} = require('util');
const Multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
var Api2Pdf = require('api2pdf'); 
var handlebars = require('handlebars');
var moment = require('moment');
var a2pClient = new Api2Pdf('00f9d74d-3c00-4b51-8777-73b716f0a96b');
const app = express();
const request = require('request');
const rp = require('request-promise');
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const connection = require('./database');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "personals768@gmail.com",
    pass: "personals2020$@#",
  },
});
  
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);


//UTILS
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};









//         1.  WORKFORCE


// ALL WORKFORCE LISTING
app.get("/workforce/admin", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "username",
      dt: 1
    },
    {
      db: "center",
      dt: 2
    },
    {
      db: "position",
      dt: 3
    },
    {
      db: "email",
      dt: 4
    },

  ];
  // our database table name
  const tableName = "workforce"
  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  
  const nodeTable = new NodeTable(requestQuery, connection, tableName, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});




// ALL WORKFORCE LISTING
app.get("/medicine/admin", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "name",
      dt: 1
    },
    {
      db: "brand",
      dt: 2
    },
    {
      db: "type",
      dt: 3
    },
    {
      db: "company_name",
      dt: 4
    },
    {
      db: "company_type",
      dt: 5
    },

  ];
  // our database table name
  const tableName = "medicine"
  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  
  const nodeTable = new NodeTable(requestQuery, connection, tableName, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});

// UPLOAD PHOTO 

app.post('/workforce/photo/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('workforce_profile_image/' + time + '-' + token + '-' +req.file.originalname );
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});




 app.route('/workforce/activation-email/:email')
.post(function(req, res, next) {
  connection.query(
    "SELECT * FROM `workforce` WHERE email='" + req.params.email + "'   LIMIT 1",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No user found! Try again" });
    else {
      const mailOptions = {
        from: '"KKA Portal." <personals768@gmail.com>',
        to: req.params.email,
      };
    
      mailOptions.subject =  'Activate your KKA Staff Account';
      mailOptions.text = 'Dear Staff, \n\nSuccessful registration.Click on this link to activate account! https://kka-pj.web.app/activationStaff/'+ results[0].token +'/'+req.params.email + ' .\n Kindly contact our Admin at personals768@gmail.com / 012 345 6789 (WhatsApp & Call) for queries. \n\n\n\n Regards,\nKKA Clinic Team' ;
      return mailTransport.sendMail(mailOptions)
      .then(() => res.status(200).json({success : 'Check email for Account Activation link.'}))
      .catch((error) => res.status(500).json({ error: error }));
    }
   
    }
  );
});



app.get("/workforce/clinic/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;

  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "username",
      dt: 1
    },
    {
      db: "email",
      dt: 2
    },
    {
      db: "status",
      dt: 3
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM workforce WHERE clinicId='" + req.params.id + "' "; 
   

  const nodeTable = new NodeTable(requestQuery, connection, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});


app.get("/clinic/approvedId/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;

  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "ipv4",
      dt: 1
    },
    {
      db: "alias",
      dt: 2
    },
    {
      db: "description",
      dt: 3
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM clinic_ipv4 WHERE clinicId='" + req.params.id + "' "; 
   

  const nodeTable = new NodeTable(requestQuery, connection, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});

app.get("/workforce/onlyAccountAdmin/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;

  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "username",
      dt: 1
    },
    {
      db: "email",
      dt: 2
    },
    {
      db: "status",
      dt: 3
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM workforce WHERE accountId='" + req.params.id + "' and position='AccountAdmin' "; 
   

  const nodeTable = new NodeTable(requestQuery, connection, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});

app.get("/onlyClinic/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;

  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "name",
      dt: 1
    },
    {
      db: "address_city",
      dt: 2
    },
    {
      db: "address_state",
      dt: 3
    },
    {
      db: "status",
      dt: 4
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM clinic WHERE accountId='" + req.params.id + "' "; 
   

  const nodeTable = new NodeTable(requestQuery, connection, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});

app.route('/workforce/forgot-password/:email')
.post(function(req, res, next) {
  connection.query(
    "SELECT * FROM `workforce` WHERE email='" + req.params.email + "'   LIMIT 1",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No user found! Try again" });
    else {
      const mailOptions = {
        from: '"Medicode Solutions."<personals768@gmail.com>',
        to: req.params.email,
        bcc:"personals768@gmail.com",
      };
    
      mailOptions.subject =  'Reset Password Link';
      mailOptions.text = 'Dear Staff, \n\nClick on this link to reset account password! https://kka-pj.web.app/forgotpasswordStaff/'+ results[0].token+'/'+req.params.email + ' .\n Kindly contact our Admin at personals768@gmail.com / 012 345 6789 (WhatsApp & Call) for queries.If you did not request for password reset,ignore this email. \n\n\n\n Regards,\nMedicode Team' ;
      return mailTransport.sendMail(mailOptions)
      .then(() => res.status(200).json({success : 'Check email for Reset Password link.'}))
      .catch((error) => res.status(500).json({ error: error }));
    }
   
    }
  );
});


app.route('/workforce/activate/:token/:email')
.post(function(req, res, next) {
  connection.query(
    "SELECT * FROM `workforce` WHERE token='" + req.params.token + "' AND email='" + req.params.email + "'  LIMIT 1",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No user found! Try again" });
    else  connection.query(
        "UPDATE  `workforce` SET status='1' WHERE email = ? ", req.params.email,
        function(error, results, fields) {
          if (error) return res.status(500).json({ error: error });
         return res.status(200).json({success : 'Staff Account Activated'});
        }
      );
   
    }
  );
});


app.route('/workforce/login')
  .post(function(req, res) {
    connection.query(
      "select workforce.username as username,workforce.password as password,workforce.id,workforce.status,workforce.accountId,account.name,account.status as accountStatus from workforce LEFT JOIN account ON workforce.accountId = account.id  WHERE workforce.email= '" + req.body.email + "' LIMIT 1 ",
      function(error, results, fields) {
        if (error) throw error;
        if (results.length === 0){
          res.status(200).json({ error: "Authentication Error : Staff not found" });
        }
    
      
        else{
         if(results[0].accountStatus==0){
          res.status(200).json({ error: "Authentication Error : Your account has been suspended. Contact Account Admin" });
         }
          bcrypt.compare(req.body.password, results[0].password, function (err, result) {
            if (result == true) {
              if(results[0].status == -1){
               return res.status(200).json({error:'Activate Account before logging in. Check email!'});
              }
              else{
                let privateKey = fs.readFileSync('./private.pem', 'utf8');
                let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
                res.status(200).json({ token:token,success:'Staff '+ results[0].username + ' login success!',staffInfo:results[0]});
              }
             
        
          } else {
            res.status(200).json({ error: 'Authentication Error : Incorrect password'});
          
          }
        });
        } 
       
      }
    );
  });










app.route('/workforce/reset-password/:token/:email')
.patch(function(req, res, next) {
var newPassword = req.body.newPassword;

connection.query(
  "SELECT password from `workforce` WHERE email= '" + req.params.email + "' AND token= '" + req.params.token + "' LIMIT 1 ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if (results.length === 0){
       return res.status(200).json({ error: "Password Reset Error : User not found" });
      }
      else{
            bcrypt.hash(newPassword, saltRounds, function (err,hash) {
                connection.query(
                    "UPDATE  `workforce` SET password= '" + hash +  "' WHERE email = ? ", req.params.email,
                    function(error, results, fields) {
                      if (error) return res.status(500).json({ error: error });
                   
                     return res.status(200).json({success : 'Your password has been updated. '});
                    }
                  );
                });
      }
    }
  );
});



// RESET PASSWORD

app.route('/workforce/personal/reset-password/:token/:email')
.patch(function(req, res, next) {
var oldPassword = req.body.oldPassword;
var newPassword = req.body.newPassword;

connection.query(
  "SELECT password from `workforce` WHERE email= '" + req.params.email + "' AND token= '" + req.params.token + "' LIMIT 1 ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if (results.length === 0){
       return res.status(200).json({ error: "Password Reset Error : User not found" });
      }
      else{
        bcrypt.compare(oldPassword, results[0].password, function (err, result) {
          if (result == true) {
            bcrypt.hash(newPassword, saltRounds, function (err,hash) {
                connection.query(
                    "UPDATE  `workforce` SET password= '" + hash +  "' WHERE id = ? ", req.body.workforceId,
                    function(error, results, fields) {
                      if (error) return res.status(500).json({ error: error });
                   
                     return res.status(200).json({success : 'Your password has been updated. '});
                    }
                  );
                });
      
        } else {
         return res.status(200).json({ error: 'Password Reset Error : Incorrect current password'});
        
        }
      });
      }
     
    }
  );

});






  app.route('/workforce')
  .post(function(req, res) {
    var token = cryptoRandomString({length: 10, type: 'url-safe'});
   
    connection.query(
      "SELECT email from `workforce` WHERE email= '" + req.body.email + "' and accountId='" + req.body.accountId + "' ",
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if (results.length === 0){
          connection.query(
            "SELECT ic_no from `workforce` WHERE ic_no= '" + req.body.ic_no + "' and accountId='" + req.body.accountId + "' ",
            function(error, results, fields) {
              if (error) return res.status(500).json({ error: error });
              if (results.length === 0){
                bcrypt.hash(req.body.password, saltRounds, function (err,hash) {
                  
                  connection.query(
                    "INSERT INTO `workforce` (username,email,provider,tel_no,password,hash_algorithm,status,position,clearance,token,center,photoUrl,access,accountId,clinicId,ic_no)  VALUES ('" +  req.body.username + "','" + req.body.email  + "','Email & Password','" +  req.body.tel_no + "','" + hash  + "','bcrypt-saltrounds-10','0','" +  req.body.position + "','','" + token + "','" +  req.body.center + "','" +  req.body.photoUrl + "','" +  req.body.access + "','" +  req.body.accountId + "','" +  req.body.clinicId + "','" +  req.body.ic_no + "') ", 
                    function(error, results, fields) {
                      if (error) return res.status(500).json({ error: error });
                
                      const mailOptions = {
                          from: '"Medicode Solutions." <personals768@gmail.com>',
                          to: req.body.email,
                        };
                      
                        mailOptions.subject =  'Activate your Medicode Workforce Account';
                        mailOptions.text = 'Dear Staff, \n\nSuccessful registration.Click on this link to activate account! https://kka-pj.web.app/activationStaff/'+token+'/'+req.body.email + ' .\n After that, click on Forgot Password to reset your account password. Kindly contact our Admin at personals768@gmail.com / 012 345 6789 (WhatsApp & Call) for queries. \n\n\n Regards,\nMedicode Team' ;
                        return mailTransport.sendMail(mailOptions)
                        .then(() => res.status(200).json({success : 'New Workforce Registration Success. Check email for Account Activation link.'}))
                        .catch((error) => res.status(500).json({ error: error }));
      
                      
                        }
                     );
                  });
              }
              else{
                
                  return res.status(200).json({ error: 'Registration Error : Account with same IC Number already exists' });
            
              }
             
            }
          );

         
        }
        else{
          
            return res.status(200).json({ error: 'Registration Error : Email already exists' });
      
        }
       
      }
    );

 
  });


  app.route('/workforce/:id')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `workforce` WHERE id = ? LIMIT 1", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No user found" });
        return res.status(200).json({success : 'Workforce Info',workforceInfo:results});
      }
    );
  });

  


  app.route('/coresettings')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `core_settings` WHERE id=1 LIMIT 1", 
           function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No record found" });
        return res.status(200).json({success : 'Settings Info',settingsInfo:results});
      }
    );
  });

  app.route('/coresettings/:id')
  .patch(function(req, res, next) {
    connection.query(
      "UPDATE  `core_settings` SET whatsapp=" + req.body.whatsapp +  " WHERE id = ? ", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No user found" });
       return res.status(200).json({success : 'Settings updated successfully!' });
      }
    );
  });




  app.route('/workforce/status/:id')
  .patch(function(req, res, next) {
    connection.query(
      "UPDATE  `workforce` SET status= " + req.body.status +  " WHERE id = ? ", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No user found" });
       return res.status(200).json({success : 'Workforce Status Changed to :' + req.body.status});
      }
    );
  });

  app.route('/account/status/:id')
  .patch(function(req, res, next) {
    connection.query(
      "UPDATE  `account` SET status= " + req.body.status +  " WHERE id = ? ", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No account found" });
       return res.status(200).json({success : 'Account Status Changed'});
      }
    );
  });

  app.route('/clinic/status/:id')
  .patch(function(req, res, next) {
    connection.query(
      "UPDATE  `clinic` SET status= " + req.body.status +  " WHERE id = ? ", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No account found" });
       return res.status(200).json({success : 'Clinic Status Changed'});
      }
    );
  });
  
  app.route('/workforce/:id')
  .patch(function(req, res, next) {
    connection.query(
      "UPDATE  `workforce` SET  photoUrl= '" + req.body.photoUrl +  "',center= '" + req.body.center +  "',username= '" + req.body.username +  "',tel_no= '" + req.body.tel_no +  "',position= '" + req.body.position +  "',access= '" + req.body.access +  "' WHERE id = ? ", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No user found" });
       return res.status(200).json({success : 'Workforce ' + req.params.id + ' updated. '});
      }
    );
  });
  
  app.route('/workforce/reset-password/:token/:email')
  .patch(function(req, res, next) {
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  
  connection.query(
      "SELECT password from `workforce` WHERE email= '" + req.params.email + "' AND token= '" + req.params.token + "' LIMIT 1 ",
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if (results.length === 0){
         return res.status(200).json({ error: "Password Reset Error : User not found" });
        }
        else{
          bcrypt.compare(oldPassword, results[0].password, function (err, result) {
            if (result == true) {
              bcrypt.hash(newPassword, saltRounds, function (err,hash) {
                  connection.query(
                      "UPDATE  `workforce` SET password= '" + hash +  "' WHERE id = ? ", req.params.id,
                      function(error, results, fields) {
                        if (error) return res.status(500).json({ error: error });
                     
                       return res.status(200).json({success : 'Workforce ' + req.params.id + ' password updated . '});
                      }
                    );
                  });
        
          } else {
           return res.status(200).json({ error: 'Password Reset Error : Incorrect current password'});
          
          }
        });
        }
       
      }
    );
  
  });


// ACCOUNT

// INSERT
app.route('/account')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  connection.query(
    "INSERT INTO `account` (name,ref_id,pic_name,pic_email,pic_tel_no,billing_name,billing_email,billing_tel_no,address_street,address_city,address_state,address_street2,address_city2,address_state2,photoUrl,status,token,attachments,mmc_id,company_type,company_date)  VALUES ('" +  req.body.name + "','" +  req.body.ref_id + "','" +  req.body.pic_name + "','" +  req.body.pic_email + "','" +  req.body.pic_tel_no + "','" +  req.body.billing_name + "','" +  req.body.billing_email + "','" +  req.body.billing_tel_no + "','" +  req.body.address_street + "','" +  req.body.address_city + "','" +  req.body.address_street2 + "','" +  req.body.address_city2 + "','" +  req.body.address_state2 + "','" +  req.body.photoUrl + "','1','" + token + "','" +  req.body.attachments + "','" +  req.body.mmc_id + "','" +  req.body.company_type + "','" +  req.body.company_date + "') ", 
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });

       return res.status(200).json({success : 'Account creation succesfull!'});
      

      
        }
     );


});


// ACCOUNT

// INSERT
app.route('/medicine')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  connection.query(
    "INSERT INTO `medicine` (name,brand,type,company_name,company_type,status,token)  VALUES ('" +  req.body.name + "','" +  req.body.brand + "','" +  req.body.type + "','" +  req.body.company_name + "','" +  req.body.company_type + "','1','" + token + "') ", 
    function(error, results, fields) {
      if (error)  {

        console.log(error);
        return   res.status(500).json({ error: error });
      } 

       return res.status(200).json({success : 'Medicine creation succesfull!'});
      

      
        }
     );


});


app.route('/medicine/:id')
.patch(function(req, res, next) {

  return connection.query(
    "UPDATE  `medicine` SET  name='" + req.body.name +  "',brand='" + req.body.brand +  "',type='" + req.body.type +  "',company_name='" + req.body.company_name +  "',company_type='" + req.body.company_type +  "' WHERE id = ? ", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No medicine found" });
     return res.status(200).json({success : 'Medicine updated successfully!' });
    }
  );
});

app.route('/medicine/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `medicine` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
    }
  );
});

// VENDOR

// INSERT
app.route('/vendor')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});

  connection.query(
    "INSERT INTO `vendor` (name,pic_name,pic_email,pic_tel_no,billing_name,billing_email,billing_tel_no,address_street,address_city,address_state,address_street2,address_city2,address_state2,status,token,submittedId)  VALUES ('" +  req.body.name + "','" +  req.body.pic_name + "','" +  req.body.pic_email + "','" +  req.body.pic_tel_no + "','" +  req.body.billing_name + "','" +  req.body.billing_email + "','" +  req.body.billing_tel_no + "','" +  req.body.address_street + "','" +  req.body.address_city + "','" +  req.body.address_state + "','" +  req.body.address_street2 + "','" +  req.body.address_city2 + "','" +  req.body.address_state2 + "','1','" + token + "','" +  req.body.submittedId + "') ", 
    function(error, results, fields) {
      if (error) 
      { console.log(error);
        return res.status(500).json({ error: error })};

       return res.status(200).json({success : 'Vendor creation succesfull!'});
      

      
        }
     );


});


app.route('/vendor/:id')
.patch(function(req, res, next) {

  return connection.query(
    "UPDATE  `vendor` SET  name='" + req.body.name +  "',pic_name='" + req.body.pic_name +  "',pic_email='" + req.body.pic_email +  "',pic_tel_no='" + req.body.pic_tel_no +  "',billing_name='" + req.body.billing_name +  "',billing_email='" + req.body.billing_email +  "',billing_tel_no='" + req.body.billing_tel_no +  "',address_street='" + req.body.address_street +  "',address_city='" + req.body.address_city +  "',address_state='" + req.body.address_state +  "',address_street2='" + req.body.address_street2 +  "',address_city2='" + req.body.address_city2 +  "',address_state2='" + req.body.address_state2 +  "',submittedId='" + req.body.submittedId +  "' WHERE id = ? ", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No vendor found" });
     return res.status(200).json({success : 'Vendor updated successfully!' });
    }
  );
});


//get single account

app.route('/vendor/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `vendor` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Vendor Info',vendorInfo:results});
    }
  );
});

// INSERT
app.route('/clinic')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  connection.query(
    "INSERT INTO `clinic` (accountId,name,ref_id,pic_name,pic_email,pic_tel_no,address_street,address_city,address_state,photoUrl,status,token)  VALUES ('" +  req.body.accountId + "','" +  req.body.name + "','" +  req.body.ref_id + "','" +  req.body.pic_name + "','" +  req.body.pic_email + "','" +  req.body.pic_tel_no + "','" +  req.body.address_street + "','" +  req.body.address_city + "','" +  req.body.address_state + "','" +  req.body.photoUrl + "','1','" + token + "') ", 
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
        
  connection.query(
    "INSERT INTO `clinic_settings` (id,staffCount,ip_status)  VALUES ('" +  results.insertId + "','15','Disabled') ", 
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
        console.log(results)
       return res.status(200).json({success : 'Clinic creation succesfull!'});
      

      
        }
     );
   
      

      
        }
     );


});



// INSERT
app.route('/clinic_ipv4')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  connection.query(
    "INSERT INTO `clinic_ipv4` (ipv4,alias,description,clinicId)  VALUES ('" +  req.body.ipv4 + "','" +  req.body.alias + "','" +  req.body.description + "','" +  req.body.clinicId + "') ", 
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      return res.status(200).json({success : 'IP Approval succesfull!'});
        }
     );
});



app.route('/account/:id')
.patch(function(req, res, next) {

  return connection.query(
    "UPDATE  `account` SET  name='" + req.body.name +  "',ref_id='" + req.body.ref_id +  "',pic_name='" + req.body.pic_name +  "',pic_email='" + req.body.pic_email +  "',pic_tel_no='" + req.body.pic_tel_no +  "',billing_name='" + req.body.billing_name +  "',billing_email='" + req.body.billing_email +  "',billing_tel_no='" + req.body.billing_tel_no +  "',address_street='" + req.body.address_street +  "',address_city='" + req.body.address_city +  "',address_state='" + req.body.address_state +  "',address_street2='" + req.body.address_street2 +  "',address_city2='" + req.body.address_city2 +  "',address_state2='" + req.body.address_state2 +  "',photoUrl='" + req.body.photoUrl +  "',attachments='" + req.body.attachments +  "',mmc_id='" + req.body.mmc_id +  "',company_type='" + req.body.company_type +  "',company_date='" + req.body.company_date +  "' WHERE id = ? ", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No account found" });
     return res.status(200).json({success : 'Account updated successfully!' });
    }
  );
});

app.route('/clinic/:id')
.patch(function(req, res, next) {

  return connection.query(
    "UPDATE  `clinic` SET  name='" + req.body.name +  "',ref_id='" + req.body.ref_id +  "',pic_name='" + req.body.pic_name +  "',pic_email='" + req.body.pic_email +  "',pic_tel_no='" + req.body.pic_tel_no +  "',address_street='" + req.body.address_street +  "',address_city='" + req.body.address_city +  "',address_state='" + req.body.address_state +  "',photoUrl='" + req.body.photoUrl +  "' WHERE id = ? ", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No account found" });
     return res.status(200).json({success : 'Account updated successfully!' });
    }
  );
});





// UPLOAD PHOTO 

app.post('/account/photo/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('account_logo/' + time + '-' + token + '-' +req.file.originalname );
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

// UPLOAD PHOTO 

app.post('/account/documents/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('account_documents/' + time + '-' + token + '-' +req.file.originalname );
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

//
// ALL WORKFORCE LISTING
app.get("/account/admin", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "name",
      dt: 1
    },
    {
      db: "pic_name",
      dt: 2
    },
    {
      db: "address_city",
      dt: 3
    },
    {
      db: "status",
      dt: 4
    },

  ];
  // our database table name
  const tableName = "account"
  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  
  const nodeTable = new NodeTable(requestQuery, connection, tableName, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});


app.get("/vendor-public/admin", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "name",
      dt: 1
    },
    {
      db: "pic_name",
      dt: 2
    },
    {
      db: "address_city",
      dt: 3
    },
    {
      db: "submittedId",
      dt: 4
    },

  ];
  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM vendor WHERE submittedId='ADMIN'  "; 
   

  const nodeTable = new NodeTable(requestQuery, connection, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});

app.get("/vendor-private/admin", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  /**
   * This is array of objects which maps 
   * the database columns with the Datatables columns
   * db - represents the exact name of the column in your table
   * dt - represents the order in which you want to display your fetched values
   * If your want any column to display in your datatable then
   * you have to put an enrty in the array , in the specified format
   * carefully setup this structure to avoid any errors
   */
  let columnsMap = [
    {
      db: "id",
      dt: 0
    },
    {
      db: "name",
      dt: 1
    },
    {
      db: "pic_name",
      dt: 2
    },
    {
      db: "address_city",
      dt: 3
    },
    {
      db: "submittedId",
      dt: 4
    },

  ];
  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM vendor WHERE submittedId!='ADMIN'  "; 
   

  const nodeTable = new NodeTable(requestQuery, connection, query, primaryKey, columnsMap);
 
  nodeTable.output((err, data)=>{
    if (err) {
      console.log(err);
      return;
    }
    // Directly send this data as output to Datatable
    res.send(data)
  })
  
});


app.route('/all/vendors')
.get(function(req, res, next) {
  connection.query(
    "SELECT * from `vendor` WHERE submittedId='ADMIN' ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
     return res.status(200).json({success : 'Vendor Info',vendorInfo:results});
    }
  );
});

app.route('/all/medicines')
.get(function(req, res, next) {
  connection.query(
    "SELECT * from `medicine` ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
     return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
    }
  );
});


//get single account

app.route('/account/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `account` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Account Info',accountInfo:results});
    }
  );
});

app.route('/clinic/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `clinic` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Clinic Info',accountInfo:results});
    }
  );
});

app.route('/clinic_settings/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `clinic_settings` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });
      return res.status(200).json({success : 'Clinic Info',settingsInfo:results});
    }
  );
});
app.route('/clinic_settings/:id')
.patch(function(req, res, next) {

  return connection.query(
    "UPDATE  `clinic_settings` SET  staffCount='" + req.body.staffCount +  "',ip_status='" + req.body.ip_status +  "' WHERE id = ? ", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });
     return res.status(200).json({success : 'Clinic updated successfully!' });
    }
  );
});
app.get('/', (req, res) => res.status(200).send('MEDICODE PHASE 1 BACKEND API - BY SUNRISERS TECH SOLUTIONS')  );







const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


module.exports = app;