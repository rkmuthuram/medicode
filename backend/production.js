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
const projectId = 'kka-pj-282016'
const {Storage} = require('@google-cloud/storage');
const keyFilename = './creds.json'
const storage = new Storage({projectId, keyFilename});
const Multer = require('multer');
var Api2Pdf = require('api2pdf'); 
var handlebars = require('handlebars');
var moment = require('moment');
const axios = require('axios');
// QUERY
var async = require("async");


var a2pClient = new Api2Pdf('00f9d74d-3c00-4b51-8777-73b716f0a96b');
const app = express();
app.use(cors());
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
const request = require('request');
const rp = require('request-promise');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const connection = require('./database');
var bcrypt = require('bcrypt');
const saltRounds = 10;

const mailTransport = nodemailer.createTransport({
  port: 465,
    secure: true,
    host: 'mail.enigmedsvcs.com',
  auth: {
    user: "noreply@enigmedsvcs.com",
    pass: "+D5ws}FhcSmS",
  },tls: {  
    rejectUnauthorized:false
}
});
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
const bucket = storage.bucket('medicode-staging');


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


function onJoin(room) {
  //console.log("Joining room: " + room);
  socket.join(room);
  //console.log(socket.id + " now in rooms ", getRoomsByUser(socket.id));
}

function getRoomsByUser(id){
 let usersRooms = [];
 let rooms = io.sockets.adapter.rooms;

 for(let room in rooms){
     if(rooms.hasOwnProperty(room)){
         let sockets = rooms[room].sockets;
         if(id in sockets)
             usersRooms.push(room);          
     }
 }

 return usersRooms;
}


app.route('/development/enigma/login')
  .post(function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7);
    }
   // console.log(ip);
    connection.query(
      "select  IFNULL((SELECT email FROM workforce WHERE email='" + req.body.email + "' LIMIT 1) ,0) as email,IFNULL((SELECT password FROM workforce WHERE email='" + req.body.email + "' LIMIT 1) ,0) as password,workforce.id as uid,account.id as accountId,account.company_name as accountName,account.status as accountStatus,clinic.id as clinicId,clinic.name as clinicName,clinic.status as clinicStatus,workforce.status as workforceStatus,clinic_settings.ip_status as ipStatus,IFNULL((SELECT count(*) as count FROM clinic_ipv4 WHERE clinicId=workforce.clinicId AND ipv4='" + ip + "' ) ,0) as validIP,workforce.position as userRole,workforce.photoUrl as photoURL,workforce.username as username,workforce.token as token from workforce  LEFT JOIN account on workforce.accountId=account.id LEFT JOIN clinic on workforce.clinicId=clinic.id LEFT JOIN clinic_settings on workforce.clinicId=clinic_settings.id where workforce.email='" + req.body.email + "' ",
      function(error, results, fields) {
        if (error) throw error;
        if (results.length === 0){
         return res.status(200).json({ error: "Login Error : Account not found" });
        }
        if (results[0].email === 0){
        return res.status(200).json({ error: "Login Error : Account not found" });
        }
        bcrypt.compare(req.body.password, results[0].password, function (err, result) {
          if (result == true) {
            if(results[0].accountStatus!=1){
             return res.status(200).json({error:'Login Error : '+ results[0].accountName +' Account not active at present.Kindly check with ENIGMA Administrator!'});
            }
            if(results[0].clinicStatus!=1){
              return res.status(200).json({error:'Login Error : '+ results[0].clinicName +' Account not active at present.Kindly check with Administrator!'});
             }
             if(results[0].workforceStatus!=1){
              return res.status(200).json({error:'Login Error : '+ results[0].username +' Account not active at present.Kindly check with Administrator!'});
             }
             if(results[0].ipStatus=='Enabled' && results[0].validIP==0){
              return res.status(200).json({error:'Login Error : This IP is Not Authorized for access at present.Kindly check with Administrator!',validIP:results[0].validIP,ip:ip});
             }
            else{
           
              var userInfo={
                displayName:results[0].username,
                email:results[0].email,
               // photoURL:results[0].photoURL,
                userRole:results[0].userRole,
                uid:results[0].uid,
                accessToken:results[0].token,
                clinicId:results[0].clinicId,
                clinicName:results[0].clinicName,
                accountId:results[0].accountId,
                accountName:results[0].accountName,
              };
            //  let privateKey = fs.readFileSync('./private.pem', 'utf8');
            //  let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
            var type = 'Workforce Login - '+userInfo.userRole;
            var description = 'Workforce Login - '+userInfo.userRole + ' from IP:' + ip;
            connection.query(
              "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId,workforceId)  VALUES ('" + type + "','" +  results[0].accountId + "','" +  results[0].clinicId + "','" + description + "','" + userInfo.displayName + "','" + userInfo.uid + "','" + userInfo.uid + "')",  //insert into history of succesful login
              function(error, results, fields) {
                if (error) return console.log(error)
                return  res.status(200).json({success:'Welcome back '+ userInfo.username +'!',userInfo:userInfo,accessToken:userInfo.accessToken});
                
                  }
               );
            }
           
      
        } else {
         return res.status(200).json({ error: 'Login Error : Incorrect password'});
        
        }
      });


      }
    );
  });



  app.route('/development/enigma/dashboard')
  .post(function(req, res) {
 
    var userInfo = req.body.userInfo;
    var clinics = [];
    var medicines = [];
    var checkouts = [];
    var patientWidget = [];
    var totalCheckouts=0;
    var totalSales=0;
    var activeTimeFrame = '12am-6am';
    var efficiency=0;
    var barSeries= [];
    var onDutyNurse = null;
    if(userInfo.userRole=='Nurse'){
 
      // single clinic only -> userInfo.clinicId
      clinics[0] = {
        clinicId:userInfo.clinicId,
        clinicName:userInfo.clinicId
       };
       var staffId = userInfo.uid;

       
     // get all clinics where equal to userInfo.accountId
     connection.query("select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
           " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
           " CASE"+
           "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
           "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
           "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
           "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
           "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
           "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                "   END as actualQuantity"+
                "    from clinic_inventory "+
                "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "       FROM clinic_checkins "+
                "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                "    GROUP BY clinic_checkins.productId "+
                "     ) ci ON clinic_inventory.productId=ci.productId "+
                "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "     FROM clinic_checkouts "+
                "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                "   GROUP BY clinic_checkouts.productId "+
                "     ) co ON clinic_inventory.productId=co.productId "+
                "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                "   ) as x ORDER BY movementPct DESC",  // WIDGET 1: ALL STOCK COUNT WHERE MOVEMENT PCT >50%
           function(error, results, fields) {
             if (error)  return res.status(200).json({ error: "Dashboard data unavailable at this time." });
             if(results.length!=0){
              medicines = results;              
             }
             connection.query(
               "SELECT  ( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND cast(create_time as date)=CURDATE() AND rollback IS NULL AND staffId='" + staffId + "') AS checkouts,( SELECT SUM(total_amount)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND cast(create_time as date)=CURDATE() AND rollback IS NULL   AND staffId='" + staffId + "') AS sales,( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'  AND staffId='" + staffId + "') AS totalCheckouts,( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'  AND staffId='" + staffId + "' AND rollback IS NULL) AS totalCheckoutsSuccess,( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND staffId='" + staffId + "'  AND HOUR(create_time) BETWEEN 0 AND 5) AS slotOne, (SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'   AND staffId='" + staffId + "' AND HOUR(create_time) BETWEEN 6 AND 11) AS slotTwo,(SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'  AND staffId='" + staffId + "' AND HOUR(create_time) BETWEEN 12 AND 17) AS slotThree,(SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND staffId='" + staffId + "'  AND HOUR(create_time) BETWEEN 18 AND 23) AS slotFour  ",  //insert into history of succesful login
               function(error, results, fields) {
                 if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                 if(results.length!=0){
                   checkouts = results[0].checkouts; 
                   sales = results[0].sales;
                   efficiency = ((results[0].totalCheckoutsSuccess/results[0].totalCheckouts)*100).toFixed(1);
                   if(results[0].slotTwo > results[0].slotOne && results[0].slotTwo > results[0].slotThree && results[0].slotTwo > results[0].slotFour) activeTimeFrame = '6am-12pm';
                   if(results[0].slotThree > results[0].slotOne && results[0].slotThree > results[0].slotTwo && results[0].slotThree > results[0].slotFour) activeTimeFrame = '12pm-6pm';
                   if(results[0].slotFour > results[0].slotOne && results[0].slotFour > results[0].slotThree && results[0].slotFour > results[0].slotTwo) activeTimeFrame = '6pm-12am';
                   if(sales==null) sales = 0;   
                   if(checkouts==null) checkouts = 0;
                   if(efficiency==null) efficiency =0;             
                  }

               
                  connection.query(
                   "SELECT  (    SELECT COUNT(*)     FROM ( SELECT NULL FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND staffId='" + staffId + "'  GROUP BY patientId  HAVING COUNT(*) =1) T1 ) as newPatients,  (                        SELECT COUNT(*)  FROM  (   SELECT NULL  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND staffId='" + staffId + "'  GROUP BY patientId  HAVING COUNT(*) >1 ) T1 ) AS recurringPatients",  // get new patients/recurring based on mrn/patient Id
                   function(error, results, fields) {
                     if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                   
                 
                  
                      patientWidget = [results[0].newPatients,results[0].recurringPatients];              
                      
                

                      connection.query(
                       "SELECT  ( "+
                       "  select count(*) from ( "+
                       " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
                       " CASE"+
                       "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
                       "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                       "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                       "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
                       "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                       "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                            "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                            "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                            "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                            "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                            "   END as actualQuantity"+
                            "    from clinic_inventory "+
                            "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                            "       FROM clinic_checkins "+
                            "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                            "    GROUP BY clinic_checkins.productId "+
                            "     ) ci ON clinic_inventory.productId=ci.productId "+
                            "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                            "     FROM clinic_checkouts "+
                            "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                            "   GROUP BY clinic_checkouts.productId "+
                            "     ) co ON clinic_inventory.productId=co.productId "+
                            "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                            "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                            "   ) as x where  CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))>30 "+
                            ") AS fastMoving," +
                            " ( select count(*) from ( "+
                       " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
                       " CASE"+
                       "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
                       "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                       "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                       "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
                       "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                       "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                            "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                            "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                            "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                            "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                            "   END as actualQuantity"+
                            "    from clinic_inventory "+
                            "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                            "       FROM clinic_checkins "+
                            "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                            "    GROUP BY clinic_checkins.productId "+
                            "     ) ci ON clinic_inventory.productId=ci.productId "+
                            "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                            "     FROM clinic_checkouts "+
                            "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                            "   GROUP BY clinic_checkouts.productId "+
                            "     ) co ON clinic_inventory.productId=co.productId "+
                            "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                            "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                            "   ) as x where  CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))<=30 AND CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))!=0  "+
                            ") AS slowMoving," +
                            " ( select count(*) from ( "+
                            " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
                            " CASE"+
                            "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
                            "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                            "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                            "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
                            "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                            "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                                 "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                                 "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                                 "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                                 "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                                 "   END as actualQuantity"+
                                 "    from clinic_inventory "+
                                 "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                                 "       FROM clinic_checkins "+
                                 "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                                 "    GROUP BY clinic_checkins.productId "+
                                 "     ) ci ON clinic_inventory.productId=ci.productId "+
                                 "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                                 "     FROM clinic_checkouts "+
                                 "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                                 "   GROUP BY clinic_checkouts.productId "+
                                 "     ) co ON clinic_inventory.productId=co.productId "+
                                 "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                                 "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                                 "   ) as x where CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))=0  "+
                                 ") AS nonMoving"
                            
                            ,
                       function(error, results, fields) {
                         if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                
                      
                          barSeries = [{
                           name: 'Stock Movement',
                           data: [results[0].fastMoving,results[0].slowMoving,results[0].nonMoving]
                         }];
                    
                                 
                         connection.query(
                          "select authorUsername as onDutyNurse from history where clinicId='" + clinics[0].clinicId + "' and type='Workforce Login - Nurse' order by create_time DESC LIMIT 1",
                          function(error, results, fields) {
                            if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                   
                         if(results.length!=0){
                           onDutyNurse = results[0].onDutyNurse;
                         }
                                    
                           
                     
    
                            return  res.status(200).json({success:'Dashboard data loaded.',clinics:clinics,medicines:medicines,checkouts:checkouts,patientWidget:patientWidget,sales:sales,barSeries:barSeries,efficiency:efficiency,activeTimeFrame:activeTimeFrame,onDutyNurse:onDutyNurse});
                            
                              }
                           );
                         
                           }
                        );
                     
                       }
                    );
                 
                   }
                );
             
               }
            );

    }
    else if(userInfo.userRole!='Nurse'){
       // single clinic only -> userInfo.clinicId
       clinics[0] = {
         clinicId:userInfo.clinicId,
         clinicName:userInfo.clinicId
        };

        
      // get all clinics where equal to userInfo.accountId
      connection.query("select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
            " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
            " CASE"+
            "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
            "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
            "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
            "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
            "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
            "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                 "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                 "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                 "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                 "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                 "   END as actualQuantity"+
                 "    from clinic_inventory "+
                 "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                 "       FROM clinic_checkins "+
                 "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                 "    GROUP BY clinic_checkins.productId "+
                 "     ) ci ON clinic_inventory.productId=ci.productId "+
                 "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                 "     FROM clinic_checkouts "+
                 "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                 "   GROUP BY clinic_checkouts.productId "+
                 "     ) co ON clinic_inventory.productId=co.productId "+
                 "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                 "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                 "   ) as x ORDER BY movementPct DESC",  // WIDGET 1: ALL STOCK COUNT WHERE MOVEMENT PCT >50%
            function(error, results, fields) {
              if (error)  return res.status(200).json({ error: "Dashboard data unavailable at this time." });
              if(results.length!=0){
               medicines = results;              
              }
              connection.query(
                "SELECT  ( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND cast(create_time as date)=CURDATE() AND rollback IS NULL ) AS checkouts,( SELECT SUM(total_amount)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' AND cast(create_time as date)=CURDATE() AND rollback IS NULL  ) AS sales,( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'  ) AS totalCheckouts,( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'   AND rollback IS NULL) AS totalCheckoutsSuccess,( SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'   AND HOUR(create_time) BETWEEN 0 AND 5) AS slotOne, (SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'   AND HOUR(create_time) BETWEEN 6 AND 11) AS slotTwo,(SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'   AND HOUR(create_time) BETWEEN 12 AND 17) AS slotThree,(SELECT count(*)  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "'  AND HOUR(create_time) BETWEEN 18 AND 23) AS slotFour  ",  //insert into history of succesful login
                function(error, results, fields) {
                  if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                  if(results.length!=0){
                    checkouts = results[0].checkouts; 
                    sales = results[0].sales;
                    efficiency = ((results[0].totalCheckoutsSuccess/results[0].totalCheckouts)*100).toFixed(1);
                    if(results[0].slotTwo > results[0].slotOne && results[0].slotTwo > results[0].slotThree && results[0].slotTwo > results[0].slotFour) activeTimeFrame = '6am-12pm';
                    if(results[0].slotThree > results[0].slotOne && results[0].slotThree > results[0].slotTwo && results[0].slotThree > results[0].slotFour) activeTimeFrame = '12pm-6pm';
                    if(results[0].slotFour > results[0].slotOne && results[0].slotFour > results[0].slotThree && results[0].slotFour > results[0].slotTwo) activeTimeFrame = '6pm-12am';
                    if(sales==null) sales = 0;   
                    if(checkouts==null) checkouts = 0;
                    if(efficiency==null) efficiency =0;             
                   }
                
                   connection.query(
                    "SELECT  (    SELECT COUNT(*)     FROM ( SELECT NULL FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' GROUP BY patientId  HAVING COUNT(*) =1) T1 ) as newPatients,  (                        SELECT COUNT(*)  FROM  (   SELECT NULL  FROM checkout WHERE clinicId='" + clinics[0].clinicId + "' GROUP BY patientId  HAVING COUNT(*) >1 ) T1 ) AS recurringPatients",  // get new patients/recurring based on mrn/patient Id
                    function(error, results, fields) {
                      if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                    
                  
                   
                       patientWidget = [results[0].newPatients,results[0].recurringPatients];              
                       
                 

                       connection.query(
                        "SELECT  ( "+
                        "  select count(*) from ( "+
                        " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
                        " CASE"+
                        "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
                        "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                        "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                        "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
                        "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                        "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                             "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                             "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                             "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                             "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                             "   END as actualQuantity"+
                             "    from clinic_inventory "+
                             "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                             "       FROM clinic_checkins "+
                             "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                             "    GROUP BY clinic_checkins.productId "+
                             "     ) ci ON clinic_inventory.productId=ci.productId "+
                             "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                             "     FROM clinic_checkouts "+
                             "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                             "   GROUP BY clinic_checkouts.productId "+
                             "     ) co ON clinic_inventory.productId=co.productId "+
                             "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                             "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                             "   ) as x where  CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))>30 "+
                             ") AS fastMoving," +
                             " ( select count(*) from ( "+
                        " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
                        " CASE"+
                        "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
                        "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                        "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                        "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
                        "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                        "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                             "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                             "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                             "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                             "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                             "   END as actualQuantity"+
                             "    from clinic_inventory "+
                             "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                             "       FROM clinic_checkins "+
                             "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                             "    GROUP BY clinic_checkins.productId "+
                             "     ) ci ON clinic_inventory.productId=ci.productId "+
                             "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                             "     FROM clinic_checkouts "+
                             "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                             "   GROUP BY clinic_checkouts.productId "+
                             "     ) co ON clinic_inventory.productId=co.productId "+
                             "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                             "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                             "   ) as x where  CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))<=30 AND CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))!=0  "+
                             ") AS slowMoving," +
                             " ( select count(*) from ( "+
                             " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
                             " CASE"+
                             "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
                             "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                             "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
                             "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
                             "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                             "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
                                  "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                                  "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                                  "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
                                  "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
                                  "   END as actualQuantity"+
                                  "    from clinic_inventory "+
                                  "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                                  "       FROM clinic_checkins "+
                                  "      WHERE clinic_checkins.clinicId = '" + clinics[0].clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                                  "    GROUP BY clinic_checkins.productId "+
                                  "     ) ci ON clinic_inventory.productId=ci.productId "+
                                  "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                                  "     FROM clinic_checkouts "+
                                  "     WHERE clinic_checkouts.clinicId = '" + clinics[0].clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                                  "   GROUP BY clinic_checkouts.productId "+
                                  "     ) co ON clinic_inventory.productId=co.productId "+
                                  "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
                                  "    WHERE clinic_inventory.clinicId='" + clinics[0].clinicId + "'  "+
                                  "   ) as x where CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))=0  "+
                                  ") AS nonMoving"
                             
                             ,
                        function(error, results, fields) {
                          if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                 
                       
                           barSeries = [{
                            name: 'Stock Movement',
                            data: [results[0].fastMoving,results[0].slowMoving,results[0].nonMoving]
                          }];
                     
                          connection.query(
                            "select authorUsername as onDutyNurse from history where clinicId='" + clinics[0].clinicId + "' and type='Workforce Login - Nurse' order by create_time DESC LIMIT 1",
                            function(error, results, fields) {
                              if (error) return res.status(200).json({ error: "Dashboard data unavailable at this time." });
                     
                           if(results.length!=0){
                             onDutyNurse = results[0].onDutyNurse;
                           }
                                      
                             
                       
      
                              return  res.status(200).json({success:'Dashboard data loaded.',clinics:clinics,medicines:medicines,checkouts:checkouts,patientWidget:patientWidget,sales:sales,barSeries:barSeries,efficiency:efficiency,activeTimeFrame:activeTimeFrame,onDutyNurse:onDutyNurse});
                              
                                }
                             );
                          
                            }
                         );
                      
                        }
                     );
                  
                    }
                 );
              
                }
             );

    }

  });


app.route('/development/stock-medicine/:productId/:clinicId')
  .get(function(req, res, next) {
    var stockInfo;
    connection.query(
      "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
      " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
      " CASE"+
      "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
      "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
      "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
      "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
      "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
      "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
           "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
           "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
           "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
           "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
           "   END as actualQuantity"+
           "    from clinic_inventory "+
           "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
           "       FROM clinic_checkins "+
           "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
           "    GROUP BY clinic_checkins.productId "+
           "     ) ci ON clinic_inventory.productId=ci.productId "+
           "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
           "     FROM clinic_checkouts "+
           "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
           "   GROUP BY clinic_checkouts.productId "+
           "     ) co ON clinic_inventory.productId=co.productId "+
           "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
           "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
           "   ) as x WHERE x.productId='" + req.params.productId + "' ",
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No medicine found" });
       return res.status(200).json({stockInfo:results[0] });
      }
    );
  });









  app.route('/development/neuron')
  .get(function(req, res, next) {
  

    var htmlFormat = '<p style="text-align: center;">&nbsp; <img style="align: center;" src="https://firebasestorage.googleapis.com/v0/b/dbc-asia.appspot.com/o/WebsiteResources%2Frodeo-b.png?alt=media&amp;token=fd180314-2bac-404a-887e-8bd5604a864b&quot;" alt="interactive connection" width="315" height="42" /></p>'+
    '<h2 style="text-align: center;"><strong>RODEO DOOH REPORT</strong></h2>'+
    '<p>&nbsp;</p>'+
    '<p>Client: <strong>Chester Venture Berhad</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Campaign Name: <strong>Chester 1</strong></p>'+
    '<p>Report Number: <strong>DTT-2020-001&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>Date of Report: <strong>29/12/2020</strong></p>'+
    '<p>Campaign Duration: <strong>From: 1/9/2020 To: 30/9/2020</strong></p>'+
    '<p><strong>A) Core Details&nbsp;</strong></p>'+
    '<table style="border-collapse: collapse; width: 50%; height: 48px;" border="1">'+
    '<tbody>'+
    '<tr style="height: 26px;">'+
    '<td style="width: 26.4263%; height: 26px; text-align: center;">Total Impressions</td>'+
    '<td style="width: 34.2702%; height: 26px; text-align: center;">Total Hours Played</td>'+
    '<td style="width: 39.3034%; height: 26px; text-align: center;">Total Distance Travelled (km)</td>'+
    '</tr>'+
    '<tr style="height: 22px;">'+
    '<td style="width: 26.4263%; height: 22px; text-align: center;"><strong>245k</strong></td>'+
    '<td style="width: 34.2702%; height: 22px; text-align: center;"><strong>360 hours</strong></td>'+
    '<td style="width: 39.3034%; height: 22px; text-align: center;"><strong>250k</strong></td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '<p><strong>B) Hours Online vs Total Impressions</strong></p>'+
    '<table style="border-collapse: collapse; width: 100%; height: 17px;" border="1">'+
    '<tbody>'+
    '<tr>'+
    '<td style="width: 40%; height: 17px;"><img src="https://quickchart.io/chart?bkg=white&amp;c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20width%3A%20200%2C%0A%20%20height%3A%2050%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%2721%25%20higher%20than%20last%20month%27%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20borderColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B100%2C200%2C321%2C294%5D%2C%0A%20%20%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20title%3A%20%7B%0A%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20text%3A%20%27Hours%20Online%27%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" /></td>'+
    '<td style="width: 20%; height: 17px;">'+
    '<p><strong>Monthly Average&nbsp;</strong></p>'+
    '<p><span style="color: #0000ff;">9500 hours online</span></p>'+
    '<p><span style="color: #0000ff;">510k impressions gained</span></p>'+
    '</td>'+
    '<td style="width: 40%; height: 17px;"><img src="https://quickchart.io/chart?bkg=white&amp;c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20width%3A%20200%2C%0A%20%20height%3A%2050%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%2715%25%20more%20impressions%20than%20last%20month%27%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27rgb(0%2C0%2C255)%27%2C%0A%20%20%20%20%20%20%20%20borderColor%3A%20%27rgb(0%2C0%2C255)%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B100%2C200%2C321%2C294%5D%2C%0A%20%20%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20title%3A%20%7B%0A%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20text%3A%20%27Impressions%27%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" /></td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '<p>&nbsp;</p>'+
    '<p>&nbsp;</p>'+
    '<p><strong>C) Distance Travelled vs Total Impressions</strong></p>'+
    '<table style="border-collapse: collapse; width: 100%; height: 17px;" border="1">'+
    '<tbody>'+
    '<tr>'+
    '<td style="width: 33.3333%; height: 17px;"><img src="https://quickchart.io/chart?bkg=white&amp;c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20width%3A%20200%2C%0A%20%20height%3A%2050%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%2721%25%20higher%20than%20last%20month%27%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20borderColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B100%2C200%2C321%2C294%5D%2C%0A%20%20%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20title%3A%20%7B%0A%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20text%3A%20%27Hours%20Online%27%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" /></td>'+
    '<td style="width: 21.6495%; height: 17px;">'+
    '<p><strong>Monthly Average&nbsp;</strong></p>'+
    '<p><span style="color: #0000ff;">9500 hours online</span></p>'+
    '<p><span style="color: #0000ff;">510k impressions gained</span></p>'+
    '</td>'+
    '<td style="width: 33.3333%; height: 17px;"><img src="https://quickchart.io/chart?bkg=white&amp;c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20width%3A%20200%2C%0A%20%20height%3A%200%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%2715%25%20more%20impressions%20than%20last%20month%27%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27rgb(0%2C0%2C255)%27%2C%0A%20%20%20%20%20%20%20%20borderColor%3A%20%27rgb(0%2C0%2C255)%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B100%2C200%2C321%2C294%5D%2C%0A%20%20%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20title%3A%20%7B%0A%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20text%3A%20%27Impressions%27%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" /></td>'+
    '</tr>'+
    '</tbody>'+
    '</table>'+
    '<p><strong>D) When Ads Were Served</strong></p>'+
    '<table style="border-collapse: collapse; width: 50%; height: 126px;" border="1">'+
    '<tbody>'+
    '<tr style="height: 21px;">'+
    '<td class="xl70" style="height: 21px; width: 56.0137%;" colspan="2" width="134" height="28">Time</td>'+
    '<td class="xl71" style="border-left: none; width: 52.2337%; height: 21px;" colspan="5" width="335">Total Ad Plays (All device)</td>'+
    '<td class="xl70" style="border-left: none; width: 13.9175%; height: 21px;" colspan="3" width="201">Percentage (%)</td>'+
    '</tr>'+
    '<tr style="height: 21px;">'+
    '<td class="xl67" style="height: 21px; width: 56.0137%;" colspan="2" height="28">6am to 12pm</td>'+
    '<td class="xl68" style="border-left: none; width: 52.2337%; height: 21px;" colspan="5">39,149</td>'+
    '<td class="xl69" style="border-left: none; width: 13.9175%; height: 21px;" colspan="3">31%</td>'+
    '</tr>'+
    '<tr style="height: 21px;">'+
    '<td class="xl67" style="height: 21px; width: 56.0137%;" colspan="2" height="28">12pm to 6pm</td>'+
    '<td class="xl68" style="border-left: none; width: 52.2337%; height: 21px;" colspan="5">60,620</td>'+
    '<td class="xl69" style="border-left: none; width: 13.9175%; height: 21px;" colspan="3">48%</td>'+
    '</tr>'+
    '<tr style="height: 21px;">'+
    '<td class="xl67" style="height: 21px; width: 56.0137%;" colspan="2" height="28">6pm to 12am</td>'+
    '<td class="xl68" style="border-left: none; width: 52.2337%; height: 21px;" colspan="5">21,468</td>'+
    '<td class="xl69" style="border-left: none; width: 13.9175%; height: 21px;" colspan="3">17%</td>'+
    '</tr>'+
    '<tr style="height: 21px;">'+
    '<td class="xl67" style="height: 21px; width: 56.0137%;" colspan="2" height="28">12am to 6am</td>'+
    '<td class="xl68" style="border-left: none; width: 52.2337%; height: 21px;" colspan="5">5,051</td>'+
    '<td class="xl69" style="border-left: none; width: 13.9175%; height: 21px;" colspan="3">4%</td>'+
    '</tr>'+
    '<tr style="height: 21px;">'+
    '<td class="xl64" style="height: 21px; width: 56.0137%;" colspan="2" height="28"><strong>Total</strong></td>'+
    '<td class="xl65" style="border-left: none; width: 52.2337%; height: 21px;" colspan="5"><strong>126,288</strong></td>'+
    '<td class="xl66" style="border-left: none; width: 13.9175%; height: 21px;" colspan="3"><strong>100%</strong></td>'+
    '</tr>'+
    '</tbody>'+
    '</table>';
    var options =  {
      "pageSize": "A4",
      "orientation": "landscape",
        "footerFontSize":"8",
        "footerRight":"RODEO DOOH REPORT(MONTHLY)",
        "footerFontName":"Geometric sans-serif",
        "title":"RODEO DOOH REPORT(MONTHLY).pdf",
    };
    
    return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'RODEO DOOH REPORT(MONTHLY).pdf', options = options).then(function(result) {
    const pdflink = result.pdf;
    return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
         
    
    
    
    }).catch((error) => console.error('There was an error', error));
   
  
  
   
  });
  










app.route('/development/clinic/download/reportInventory2/:clinicId')
.post(function(req, res, next) {

  var inventoryArray;
  var inventoryString="";
  connection.query(
    "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
    " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
    " CASE"+
    "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
    "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
    "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
    "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
    "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
    "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
         "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
         "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
         "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
         "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
         "   END as actualQuantity"+
         "    from clinic_inventory "+
         "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
         "       FROM clinic_checkins "+
         "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
         "    GROUP BY clinic_checkins.productId "+
         "     ) ci ON clinic_inventory.productId=ci.productId "+
         "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
         "     FROM clinic_checkouts "+
         "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
         "   GROUP BY clinic_checkouts.productId "+
         "     ) co ON clinic_inventory.productId=co.productId "+
         "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
         "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
         "   ) as x ORDER BY movementPct DESC",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
  
      inventoryArray = results;
      var index=0; var length = inventoryArray.length;
      inventoryArray.forEach(function(entry) {
        var currentQuantity;
        currentQuantity =  JSON.parse(entry.balanceQuantity).units;
        if(entry.prescription=='TABLETS'){
         
         
         currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
      
        }
        else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
         
          currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
         
         }
         else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
          
           currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
          
          }
      else if(entry.prescription=='per ampule'){
         
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
      
        }
       else if(entry.prescription=='BOTTLE'){
      
        currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
        }
        else  if(entry.prescription=='TUBE'){
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
        }
      /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
        
        
        } */
        var incomingQuantity = entry.incomingQuantity;
        var outgoingQuantity = entry.outgoingQuantity;
        var movementPct = entry.movementPct;
        if(entry.incomingQuantity==null){ incomingQuantity='NA'};
        if(entry.outgoingQuantity==null){ outgoingQuantity='NA'};
        if(entry.movementPct==null){ movementPct='NA'};
  
        inventoryString +=  '<tr>'+
        '<td>' + parseInt(index+1)  +'</td>'+
        '<td>' + entry.manufacturer  +'</td>'+
        '<td>' + entry.name  +'</td>'+
        '<td>' + entry.prescription  +'</td>'+
        '<td>' + incomingQuantity  +'</td>'+
        '<td>' + outgoingQuantity  +'</td>'+
        '<td>' + currentQuantity  +'</td>'+
        '<td>' + movementPct  +'</td>'+
      
      '</tr>';
        
      
             index++;
      });


      if(index==length){

        var htmlFormat = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<style>'+
        '#customers {'+
          'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
          'border-collapse: collapse;'+
          'width: 100%;'+
        '}'+
        '#customers td, #customers th {'+
          'border: 1px solid #ddd;'+
          'padding: 8px;'+
        '}'+
        '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
        '#customers tr:hover {background-color: #ddd;}'+
        '#customers th {'+
          'padding-top: 12px;'+
          'padding-bottom: 12px;'+
          'text-align: left;'+
          'background-color: #6D0A0A;'+
          'color: white;'+
     
        '}'+
        '#customers thead {'+
        'display: table-header-group'+
        '}'+
        '</style>'+
        '</head>'+
        '<body>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
          '<tr>'+
            '<thead>'+
            '<th>Index</th>'+
            '<th>Manufacturer</th>'+
            '<th>Product</th>'+
            '<th>Prescription</th>'+
            '<th>Total Incoming Stock Qty</th>'+
            '<th>Total Outgoing Stock Qty</th>'+
            '<th>Current Stock Qty</th>'+
            '<th>Movement</th>'+
          '</tr></thead>'+inventoryString+
        '</table>'+
       '</body>'+
        '</html>';
        var options =  {
          "pageSize": "A4",
          "orientation": "landscape",
            "footerFontSize":"8",
            "footerRight":"ENIGMA INVENTORY REPORT(MONTHLY)",
            "footerFontName":"Geometric sans-serif",
            "title":"Clinic Inventory Report.pdf",
        };
        
        return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Inventory Report(MONTHLY).pdf', options = options).then(function(result) {
        const pdflink = result.pdf;
        return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
             
        
        
        
        }).catch((error) => console.error('There was an error', error));

      }


    }
   
    }
  );
 


 
});





/*
    "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,SUM(clinic_checkins.quantity)  as incomingQuantity,SUM(clinic_checkouts.quantity)  as outgoingQuantity,clinic_inventory.quantity  as balanceQuantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription, CASE WHEN admin_medicine_inventory.packing_type='TABLETS' THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.tablets'))*100,1),'%')    WHEN (admin_medicine_inventory.packing_type='Vial / per cc' OR admin_medicine_inventory.packing_type='Vial / per 0.5 cc' OR admin_medicine_inventory.packing_type='vial per cc')  THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.mls'))*100,1),'%')    WHEN (admin_medicine_inventory.packing_type='Per vial' OR admin_medicine_inventory.packing_type='per vial' ) THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.vials'))*100,1),'%')    WHEN admin_medicine_inventory.packing_type='per ampule' THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.ampules'))*100,1),'%')    WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.unittotal'))*100,1),'%')    WHEN admin_medicine_inventory.packing_type='TUBE' THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.unittotal'))*100,1),'%')    WHEN (admin_medicine_inventory.packing_type='Per supp' OR admin_medicine_inventory.packing_type='SACHET' OR admin_medicine_inventory.packing_type='Sachet' OR admin_medicine_inventory.packing_type='box' OR admin_medicine_inventory.packing_type='Set' OR admin_medicine_inventory.packing_type='ROLLS' OR admin_medicine_inventory.packing_type='PIECES' OR admin_medicine_inventory.packing_type='pack' OR admin_medicine_inventory.packing_type='Diskus' ) THEN   concat(ROUND(SUM(clinic_checkouts.quantity)/(json_extract(clinic_inventory.quantity, '$.units'))*100,1),'%')    ELSE null    END  as movementPct from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId AND clinic_inventory.clinicId=clinic_checkouts.clinicId AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL LEFT JOIN  clinic_checkins on clinic_inventory.productId=clinic_checkins.productId AND clinic_inventory.clinicId=clinic_checkins.clinicId AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  WHERE clinic_inventory.clinicId='" + req.params.clinicId + "' GROUP BY clinic_inventory.productId ORDER BY movementPct DESC",

*/
app.route('/development/clinic/download/reportMovementPct/:clinicId')
.post(function(req, res, next) {
  var rawRequestString = req.params.clinicId;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
  var lowRange = req.body.lowRange;
  var highRange = req.body.highRange;
  var inventoryArray;
  var inventoryString="";

  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + clinicId + "'   "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + clinicId + "' AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + clinicId + "'  AND  ROUND((co.total/ci.total )*100,1) BETWEEN '" + lowRange + "' AND '" + highRange + "' ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
  
      inventoryArray = results;
      var index=0; var length = inventoryArray.length;
      inventoryArray.forEach(function(entry) {
        var currentQuantity;
        currentQuantity =  JSON.parse(entry.balanceQuantity).units;
        if(entry.prescription=='TABLETS'){
         
         
         currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
      
        }
        else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
         
          currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
         
         }
         else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
          
           currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
          
          }
      else if(entry.prescription=='per ampule'){
         
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
      
        }
       else if(entry.prescription=='BOTTLE'){
      
        currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
        }
        else  if(entry.prescription=='TUBE'){
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
        }
      /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
        
        
        } */
        var incomingQuantity = entry.incomingQuantity;
        var outgoingQuantity = entry.outgoingQuantity;
        if(entry.incomingQuantity==null){ incomingQuantity='NA'};
        if(entry.outgoingQuantity==null){ outgoingQuantity='NA'};
  
        inventoryString +=  '<tr>'+
        '<td>' + parseInt(index+1)  +'</td>'+
        '<td>' + entry.manufacturer  +'</td>'+
        '<td>' + entry.name  +'</td>'+
        '<td>' + entry.prescription  +'</td>'+
        '<td>' + incomingQuantity  +'</td>'+
        '<td>' + outgoingQuantity  +'</td>'+
        '<td>' + currentQuantity  +'</td>'+
        '<td>' + entry.movementPct  +'</td>'+
      
      '</tr>';
        
      
             index++;
      });


      if(index==length){

        var htmlFormat = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<style>'+
        '#customers {'+
          'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
          'border-collapse: collapse;'+
          'width: 100%;'+
        '}'+
        '#customers td, #customers th {'+
          'border: 1px solid #ddd;'+
          'padding: 8px;'+
        '}'+
        '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
        '#customers tr:hover {background-color: #ddd;}'+
        '#customers th {'+
          'padding-top: 12px;'+
          'padding-bottom: 12px;'+
          'text-align: left;'+
          'background-color: #6D0A0A;'+
          'color: white;'+
        '}'+
        '#customers thead {'+
        'display: table-header-group'+
        '}'+
        '</style>'+
        '</head>'+
        '<body>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
          '<thead><tr>'+
            '<th>Index</th>'+
            '<th>Manufacturer</th>'+
            '<th>Product</th>'+
            '<th>Prescription</th>'+
            '<th>Total Incoming</th>'+
            '<th>Total Outgoing</th>'+
            '<th>Current Stock</th>'+
            '<th>Movement Pct</th>'+
            
          '</tr></thead>'+inventoryString+
        '</table>'+
       '</body>'+
        '</html>';
        var options =  {
          "pageSize": "A4",
          "orientation": "landscape",
            "footerFontSize":"8",
            "footerRight":"ENIGMA MOVEMENT REPORT",
            "footerFontName":"Geometric sans-serif",
            "title":"Movement Report.pdf",
        };
        
        return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Movement Report.pdf', options = options).then(function(result) {
        const pdflink = result.pdf;
        return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
             
        
        
        
        }).catch((error) => console.error('There was an error', error));

      }


    }
   
    }
  );
 


 
});


app.route('/development/clinic/download/reportLowStock/:clinicId')
.post(function(req, res, next) {
  var rawRequestString = req.params.clinicId;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];


  var inventoryArray;
  var inventoryString="";
  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + clinicId + "'    "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + clinicId + "'  AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + clinicId + "'  ORDER BY movementPct DESC",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
  
      inventoryArray = results;
      var index=0; var length = inventoryArray.length; var myindex=1;
      inventoryArray.forEach(function(entry) {
        var currentQuantity;
        var lowQty = false;
        currentQuantity =  JSON.parse(entry.balanceQuantity).units;
        if(currentQuantity<=50){
          lowQty = true;
       }


        if(entry.prescription=='TABLETS'){
         
         
         currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
      
         if(JSON.parse(entry.balanceQuantity).tablets<=50){
            lowQty = true;
         }
      
        }
        else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
         
          currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
             if(JSON.parse(parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))<=15){
            lowQty = true;
         }
         
         }
         else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
          
           currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
           if(JSON.parse(entry.balanceQuantity).vials<=15){
            lowQty = true;
         }
          
          }
      else if(entry.prescription=='per ampule'){
         
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
         if(JSON.parse(entry.balanceQuantity).ampules<=15){
          lowQty = true;
       }
      
        }
       else if(entry.prescription=='BOTTLE'){
      
        currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
        if(parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle)<=20){
          lowQty = true;
       }

        }
        else  if(entry.prescription=='TUBE'){
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
         if(parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube)<=20){
          lowQty = true;
       }
        }
      /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
        
        
        } */
        var incomingQuantity = entry.incomingQuantity;
        var outgoingQuantity = entry.outgoingQuantity;
        if(entry.incomingQuantity==null){ incomingQuantity='NA'};
        if(entry.outgoingQuantity==null){ outgoingQuantity='NA'};
        
      if(lowQty==true){
        inventoryString +=  '<tr>'+
        '<td>' + parseInt(myindex)  +'</td>'+
        '<td>' + entry.manufacturer  +'</td>'+
        '<td>' + entry.name  +'</td>'+
        '<td>' + entry.prescription  +'</td>'+
        '<td>' + incomingQuantity  +'</td>'+
        '<td>' + outgoingQuantity  +'</td>'+
        '<td>' + entry.movementPct  +'</td>'+
        '<td>' + currentQuantity  +'</td>'+
      
      '</tr>';
        
          myindex++;
             index++;
      }

      if(lowQty==false){
        index++;
      }
      
      });


      if(index==length){

        var htmlFormat = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<style>'+
        '#customers {'+
          'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
          'border-collapse: collapse;'+
          'width: 100%;'+
        '}'+
        '#customers td, #customers th {'+
          'border: 1px solid #ddd;'+
          'padding: 8px;'+
        '}'+
        '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
        '#customers tr:hover {background-color: #ddd;}'+
        '#customers th {'+
          'padding-top: 12px;'+
          'padding-bottom: 12px;'+
          'text-align: left;'+
          'background-color: #6D0A0A;'+
          'color: white;'+
        '}'+
        '#customers thead {'+
        'display: table-header-group'+
        '}'+
        '</style>'+
        '</head>'+
        '<body>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
          '<thead><tr>'+
            '<th>Index</th>'+
            '<th>Manufacturer</th>'+
            '<th>Product</th>'+
            '<th>Prescription</th>'+
            '<th>Total Incoming</th>'+
            '<th>Total Outgoing</th>'+
            '<th>Movement Pct</th>'+
            '<th>Balance Stock</th>'+
            
          '</tr></thead>'+inventoryString+
        '</table>'+
       '</body>'+
        '</html>';
        var options =  {
          "pageSize": "A4",
          "orientation": "landscape",
            "footerFontSize":"8",
            "footerRight":"ENIGMA LOW STOCK REPORT",
            "footerFontName":"Geometric sans-serif",
            "title":"Clinic LOW STOCK Report.pdf",
        };
        
        return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Low Stock Report.pdf', options = options).then(function(result) {
        const pdflink = result.pdf;
        return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
             
        
        
        
        }).catch((error) => console.error('There was an error', error));

      }


    }
   
    }
  );
 


 
});

app.route('/development/clinic/download/reportInventory/:clinicId')
.post(function(req, res, next) {

  var inventoryArray;
  var inventoryString="";
  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  ORDER BY movementPct DESC",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
  
      inventoryArray = results;
      var index=0; var length = inventoryArray.length;
      inventoryArray.forEach(function(entry) {
        var currentQuantity;
        currentQuantity =  JSON.parse(entry.balanceQuantity).units;
        if(entry.prescription=='TABLETS'){
         
         
         currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
      
        }
        else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
         
          currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
         
         }
         else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
          
           currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
          
          }
      else if(entry.prescription=='per ampule'){
         
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
      
        }
       else if(entry.prescription=='BOTTLE'){
      
        currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
        }
        else  if(entry.prescription=='TUBE'){
      
         currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
        }
      /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
        
        
        } */
        var incomingQuantity = entry.incomingQuantity;
        var outgoingQuantity = entry.outgoingQuantity;
        if(entry.incomingQuantity==null){ incomingQuantity='NA'};
        if(entry.outgoingQuantity==null){ outgoingQuantity='NA'};
  
        inventoryString +=  '<tr>'+
        '<td>' + parseInt(index+1)  +'</td>'+
        '<td>' + entry.manufacturer  +'</td>'+
        '<td>' + entry.name  +'</td>'+
        '<td>' + entry.prescription  +'</td>'+
        '<td>' + incomingQuantity  +'</td>'+
        '<td>' + outgoingQuantity  +'</td>'+
        '<td>' + currentQuantity  +'</td>'+
      
      '</tr>';
        
      
             index++;
      });


      if(index==length){

        var htmlFormat = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<style>'+
        '#customers {'+
          'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
          'border-collapse: collapse;'+
          'width: 100%;'+
        '}'+
        '#customers td, #customers th {'+
          'border: 1px solid #ddd;'+
          'padding: 8px;'+
        '}'+
        '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
        '#customers tr:hover {background-color: #ddd;}'+
        '#customers th {'+
          'padding-top: 12px;'+
          'padding-bottom: 12px;'+
          'text-align: left;'+
          'background-color: #6D0A0A;'+
          'color: white;'+
        '}'+
        '#customers thead {'+
        'display: table-header-group'+
        '}'+
        '</style>'+
        '</head>'+
        '<body>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
          '<thead><tr>'+
            '<th>Index</th>'+
            '<th>Manufacturer</th>'+
            '<th>Product</th>'+
            '<th>Prescription</th>'+
            '<th>Total Incoming</th>'+
            '<th>Total Outgoing</th>'+
            '<th>Current Stock</th>'+
            
          '</tr></thead>'+inventoryString+
        '</table>'+
       '</body>'+
        '</html>';
        var options =  {
          "pageSize": "A4",
          "orientation": "landscape",
            "footerFontSize":"8",
            "footerRight":"ENIGMA INVENTORY REPORT",
            "footerFontName":"Geometric sans-serif",
            "title":"Clinic Inventory Report.pdf",
        };
        
        return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Inventory Report.pdf', options = options).then(function(result) {
        const pdflink = result.pdf;
        return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
             
        
        
        
        }).catch((error) => console.error('There was an error', error));

      }


    }
   
    }
  );
 


 
});


app.route('/development/clinic/download/reportSummary/:clinicId')
.post(function(req, res, next) {

  var inventoryArray;
  var inventoryString="";
  var checkoutArray;
  var checkoutString="";

  
  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND cast(clinic_checkins.create_time as date)=CURDATE()  "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND cast(clinic_checkouts.create_time as date)=CURDATE()  AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + req.params.clinicId + "' AND (ci.total IS NOT NULL OR co.total  IS NOT NULL) ORDER BY outgoingQuantity desc",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
  
      inventoryArray = results;
      connection.query(
        "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "' AND cast(create_time as date)=CURDATE()",
        function(error, results, fields) {
          checkoutArray = results;
          var htmlFormat="";
       


          var index=0; var length = inventoryArray.length;
inventoryArray.forEach(function(entry) {


  var currentQuantity;
  currentQuantity =  JSON.parse(entry.balanceQuantity).units;
  if(entry.prescription=='TABLETS'){
   
   
   currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";

  }
  else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
   
    currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
   
   }
   else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
    
     currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
    
    }
else if(entry.prescription=='per ampule'){
   

   currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";

  }
 else if(entry.prescription=='BOTTLE'){

  currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
  }
  else  if(entry.prescription=='TUBE'){

   currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
  }
/*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
  
  
  } */
  var incomingQuantity = entry.incomingQuantity;
  var outgoingQuantity = entry.outgoingQuantity;
  if(entry.incomingQuantity==null){ incomingQuantity='-'};
  if(entry.outgoingQuantity==null){ outgoingQuantity='-'};

  inventoryString +=  '<tr>'+
  '<td>' + parseInt(index+1) +'</td>'+
  '<td>' + entry.manufacturer  +'</td>'+
  '<td>' + entry.name  +'</td>'+
  '<td>' + entry.prescription  +'</td>'+
  '<td>' + incomingQuantity  +'</td>'+
  '<td>' + outgoingQuantity  +'</td>'+
  '<td>' + currentQuantity  +'</td>'+

'</tr>';
  

       index++;
});


if(index==length){

  htmlFormat += '<!DOCTYPE html>'+
  '<html>'+
  '<head>'+
  '<style>'+
  '#customers {'+
    'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
    'border-collapse: collapse;'+
    'width: 100%;'+
  '}'+
  '#customers td, #customers th {'+
    'border: 1px solid #000000;'+
    'padding: 8px;'+
  '}'+
  '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
  '#customers tr:hover {background-color: #ddd;}'+
  '#customers th {'+
    'padding-top: 12px;'+
    'padding-bottom: 12px;'+
    'text-align: left;'+
    'background-color: #6D0A0A;'+
    'color: white;'+
    'font-weight: bold;'+
  '}'+
  '#customers thead {'+
  'display: table-header-group'+
  '}'+
  '</style>'+
  '</head>'+
  '<body>'+
  '<h1 style="text-align:center">DAILY SUMMARY REPORT</h1><br>'+
  '<h2><b>Daily Movement ['+moment().format("Do MMM YY") +']</b></h2>'+
  '<table id="customers" style="page-break-inside: avoid;">'+
  '<thead>'+
    '<tr>'+
      '<th>Num.</th>'+
      '<th>Manufacturer</th>'+
      '<th>Product</th>'+
      '<th>Prescription</th>'+
      '<th>Incoming Today</th>'+
      '<th>Outgoing Today</th>'+
      '<th>Balance Stock</th>'+
      
    '</tr></thead>'+inventoryString+
  '</table>';

  var index2=0; var length2 = checkoutArray.length;
  checkoutArray.forEach(function(entry) {
    var data = JSON.parse(entry.allProducts);
 

var i=0;
var finalData="";
    data.forEach(function(entry2) {
      
      if(entry2.packing_type=='TABLETS'){
        if(entry2.quantity_strips==0){
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tablets + " tab</mark></b><br>";
        }
       else if(entry2.quantity_tablets==0){
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips</mark></b><br>";
        }
        else{
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips & " + entry2.quantity_tablets + " tab</mark></b><br>";
        }
           
          }
          if(entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per 0.5 cc' || entry2.packing_type=='per vial' || entry2.packing_type=='Per vial' || entry2.packing_type=='vial per cc'){
            if(entry2.quantity_mls==0){
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_vials + "vials</mark></b><br>";
            }
            else if(entry2.quantity_vials==0){
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML<br></mark></b>";
            }
            else{
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML  & " + entry2.quantity_vials + "vials</mark></b><br>";
            }
         
          }
         if(entry2.packing_type=='per ampule'){    
         finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_ampules+" ampules</mark></b><br>";
          }
            if(entry2.packing_type=='BOTTLE'){

              if(entry2.quantity_bottles==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + "</mark></b><br>" ;
              }
              else if(entry2.quantity_unittotal==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_bottles + " bottles</mark></b><br>" ;
              }
              else{
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + " & " + entry2.quantity_bottles + " bottles</mark></b><br>" ;
              }
              
         
          }
            if(entry2.packing_type=='TUBE'){

              if(entry2.quantity_tubes==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + "</mark></b><br>" ;    
              }
              else if(entry2.quantity_unittotal==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tubes + " tubes</mark></b><br>" ;    
              }
              else{
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + " & " + entry2.quantity_tubes + " tubes</mark></b><br>" ;    
              }
                
          }
          else if(entry2.packing_type=='Per supp' || entry2.packing_type=='SACHET' || entry2.packing_type=='Sachet' || entry2.packing_type=='box' || entry2.packing_type=='Set' || entry2.packing_type=='ROLLS' || entry2.packing_type=='PIECES' || entry2.packing_type=='pack' || entry2.packing_type=='Diskus') {
            finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_units+" units</mark></b><br>";
          }
     i++;
   
});

if(data.length==i){

var amt = parseFloat(entry.total_amount); var rollback = "";
if(entry.rollback=='true'){
 rollback =  "  <span style='color:red;'>~ROLLED BACK~</span>";
}
    checkoutString +=  '<tr>'+
    '<td>' + parseInt(index2+1)  + rollback + '</td>'+
    '<td>' + entry.patientId  +'</td>'+
    '<td>' + amt.toFixed(2)  +'</td>'+
    '<td>' + moment(entry.create_time).format('Do MMMM YYYY hh:mm a')  +'</td>'+
    '<td>' + finalData +'</td>'+
    '<td>' + entry.staffName  +'</td>'+
   
  '</tr>';
    
  
         index2++;
}        





    
  });



  if(index2==length2){

    htmlFormat +=  '<h2 style="page-break-before:always;"><b>Daily Checkouts ['+moment().format("Do MMM YY") +']</b></h2>'+
    '<table id="customers" style="page-break-inside: avoid;">'+
    '<thead>'+
      '<tr>'+
        '<th>Transaction ID</th>'+
        '<th>Patient MRN Num.</th>'+
        '<th>Amount (RM)</th>'+
        '<th>Date</th>'+
        '<th>Products</th>'+
        '<th>Staff</th>'+
      '</tr></thead>'+checkoutString+
    '</table>'+
   '</body>'+
    '</html>';
    var options =  {
      "pageSize": "A4",
      "orientation": "landscape",
        "footerFontSize":"8",
        "footerRight":"ENIGMA SUMMARY REPORT ["+moment().format("Do MMM YY") +"]",
        "footerFontName":"Geometric sans-serif",
        "title":"Clinic Summary Report.pdf",
    };
    
    return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Summary Report.pdf', options = options).then(function(result) {
    const pdflink = result.pdf;
    return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
         
    
    
    
    }).catch((error) => console.error('There was an error', error));

  }


}

















        }
      );


    }
   
    }
  );
 


 
});


app.route('/development/clinic/email/reportSummary/:clinicId')
.get(function(req, res, next) {

  var inventoryArray;
  var inventoryString="";
  var checkoutArray;
  var checkoutString="";
  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND cast(clinic_checkins.create_time as date)=CURDATE()  "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND cast(clinic_checkouts.create_time as date)=CURDATE()  AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + req.params.clinicId + "' AND (ci.total IS NOT NULL OR co.total  IS NOT NULL) ORDER BY outgoingQuantity desc",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
  
      inventoryArray = results;
      connection.query(
        "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "' AND cast(create_time as date)=CURDATE()",
        function(error, results, fields) {
          checkoutArray = results;
          var htmlFormat="";
       


          var index=0; var length = inventoryArray.length;
inventoryArray.forEach(function(entry) {


  var currentQuantity;
  currentQuantity =  JSON.parse(entry.balanceQuantity).units;
  if(entry.prescription=='TABLETS'){
   
   
   currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";

  }
  else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
   
    currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
   
   }
   else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
    
     currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
    
    }
else if(entry.prescription=='per ampule'){
   

   currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";

  }
 else if(entry.prescription=='BOTTLE'){

  currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
  }
  else  if(entry.prescription=='TUBE'){

   currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
  }
/*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
  
  
  } */
  var incomingQuantity = entry.incomingQuantity;
  var outgoingQuantity = entry.outgoingQuantity;
  if(entry.incomingQuantity==null){ incomingQuantity='-'};
  if(entry.outgoingQuantity==null){ outgoingQuantity='-'};

  inventoryString +=  '<tr>'+
  '<td>' + parseInt(index+1) +'</td>'+
  '<td>' + entry.manufacturer  +'</td>'+
  '<td>' + entry.name  +'</td>'+
  '<td>' + entry.prescription  +'</td>'+
  '<td>' + incomingQuantity  +'</td>'+
  '<td>' + outgoingQuantity  +'</td>'+
  '<td>' + currentQuantity  +'</td>'+

'</tr>';
  

       index++;
});


if(index==length){

  htmlFormat += '<!DOCTYPE html>'+
  '<html>'+
  '<head>'+
  '<style>'+
  '#customers {'+
    'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
    'border-collapse: collapse;'+
    'width: 100%;'+
  '}'+
  '#customers td, #customers th {'+
    'border: 1px solid #000000;'+
    'padding: 8px;'+
  '}'+
  '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
  '#customers tr:hover {background-color: #ddd;}'+
  '#customers th {'+
    'padding-top: 12px;'+
    'padding-bottom: 12px;'+
    'text-align: left;'+
    'background-color: #6D0A0A;'+
    'color: white;'+
    'font-weight: bold;'+
  '}'+
  '#customers thead {'+
  'display: table-header-group'+
  '}'+
  '</style>'+
  '</head>'+
  '<body>'+
  '<h1 style="text-align:center">DAILY SUMMARY REPORT</h1><br>'+
  '<h2><b>Daily Movement ['+moment().format("Do MMM YY") +']</b></h2>'+
  '<table id="customers" style="page-break-inside: avoid;">'+
  '<thead>'+
    '<tr>'+
      '<th>Num.</th>'+
      '<th>Manufacturer</th>'+
      '<th>Product</th>'+
      '<th>Prescription</th>'+
      '<th>Incoming Today</th>'+
      '<th>Outgoing Today</th>'+
      '<th>Balance Stock</th>'+
      
    '</tr></thead>'+inventoryString+
  '</table>';

  var index2=0; var length2 = checkoutArray.length;
  checkoutArray.forEach(function(entry) {
    var data = JSON.parse(entry.allProducts);
 

var i=0;
var finalData="";
    data.forEach(function(entry2) {
      
      if(entry2.packing_type=='TABLETS'){
        if(entry2.quantity_strips==0){
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tablets + " tab</mark></b><br>";
        }
       else if(entry2.quantity_tablets==0){
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips</mark></b><br>";
        }
        else{
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips & " + entry2.quantity_tablets + " tab</mark></b><br>";
        }
           
          }
          if(entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per 0.5 cc' || entry2.packing_type=='per vial' || entry2.packing_type=='Per vial' || entry2.packing_type=='vial per cc'){
            if(entry2.quantity_mls==0){
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_vials + "vials</mark></b><br>";
            }
            else if(entry2.quantity_vials==0){
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML<br></mark></b>";
            }
            else{
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML  & " + entry2.quantity_vials + "vials</mark></b><br>";
            }
         
          }
         if(entry2.packing_type=='per ampule'){    
         finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_ampules+" ampules</mark></b><br>";
          }
            if(entry2.packing_type=='BOTTLE'){

              if(entry2.quantity_bottles==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + "</mark></b><br>" ;
              }
              else if(entry2.quantity_unittotal==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_bottles + " bottles</mark></b><br>" ;
              }
              else{
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + " & " + entry2.quantity_bottles + " bottles</mark></b><br>" ;
              }
              
         
          }
            if(entry2.packing_type=='TUBE'){

              if(entry2.quantity_tubes==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + "</mark></b><br>" ;    
              }
              else if(entry2.quantity_unittotal==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tubes + " tubes</mark></b><br>" ;    
              }
              else{
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + " & " + entry2.quantity_tubes + " tubes</mark></b><br>" ;    
              }
                
          }
          else if(entry2.packing_type=='Per supp' || entry2.packing_type=='SACHET' || entry2.packing_type=='Sachet' || entry2.packing_type=='box' || entry2.packing_type=='Set' || entry2.packing_type=='ROLLS' || entry2.packing_type=='PIECES' || entry2.packing_type=='pack' || entry2.packing_type=='Diskus') {
            finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_units+" units</mark></b><br>";
          }
     i++;
   
});

if(data.length==i){

var amt = parseFloat(entry.total_amount); var rollback = "";
if(entry.rollback=='true'){
 rollback =  "  <span style='color:red;'>~ROLLED BACK~</span>";
}
    checkoutString +=  '<tr>'+
    '<td>' + parseInt(index2+1)  + rollback + '</td>'+
    '<td>' + entry.patientId  +'</td>'+
    '<td>' + amt.toFixed(2)  +'</td>'+
    '<td>' + moment(entry.create_time).format('Do MMMM YYYY hh:mm a')  +'</td>'+
    '<td>' + finalData +'</td>'+
    '<td>' + entry.staffName +'</td>'+
   
  '</tr>';
    
  
         index2++;
}        





    
  });



  if(index2==length2){

    htmlFormat +=  '<h2 style="page-break-before:always;"><b>Daily Checkouts ['+moment().format("Do MMM YY") +']</b></h2>'+
    '<table id="customers" style="page-break-inside: avoid;">'+
    '<thead>'+
      '<tr>'+
        '<th>Transaction ID</th>'+
        '<th>Patient MRN Num.</th>'+
        '<th>Amount (RM)</th>'+
        '<th>Date</th>'+
        '<th>Products</th>'+
        '<th>Staff</th>'+
      '</tr></thead>'+checkoutString+
    '</table>'+
   '</body>'+
    '</html>';
    var options =  {
      "pageSize": "A4",
      "orientation": "landscape",
        "footerFontSize":"8",
        "footerRight":"ENIGMA SUMMARY REPORT ["+moment().format("Do MMM YY") +"]",
        "footerFontName":"Geometric sans-serif",
        "title":"Clinic Summary Report.pdf",
    };
    
    return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Summary Report.pdf', options = options).then(function(result) {
    const pdflink = result.pdf;
    const mailOptions = {
      from: '"KKA Portal." <personals768@gmail.com>',
      to: 'rkram016@gmail.com,jegaint54@gmail.com',
      attachments: [
        {   // utf-8 string as an attachment
            filename: 'Summary Report.pdf',
            path:pdflink
        }
    ]
    };
  
    mailOptions.subject =  'Daily Summary Report';
    mailOptions.text = 'Dear Team, \n\Kindly find attached the summary report for your clinic.\n Kindly contact our Admin at personals768@gmail.com / 012 345 6789 (WhatsApp & Call) for queries. \n\n\n\n Regards,\nKKA Clinic Team' ;
    return mailTransport.sendMail(mailOptions)
    .then(() => res.status(200).json({success : 'Check email for Account Activation link.'}))
    .catch((error) => res.status(500).json({ error: error }));
         
    
    
    
    }).catch((error) => console.error('There was an error', error));

  }


}

















        }
      );


    }
   
    }
  );
 


 
});

app.route('/development/clinic/download/reportCheckout/:clinicId')
.post(function(req, res, next) {

  var checkoutArray;
  var checkoutString="";
  var type = req.body.type;
  var sql;
  var r1;
  var r2;
  var range;
  if(req.body.timeRange!='All'){
    var r = req.body.timeRange+"";
    range = r.split(",");
    r1 = moment(new Date(range[0])).add(8, 'hours').toISOString();
    r2 = moment(new Date(range[1])).add(8, 'hours').toISOString();

  }

  if(type=='alltime'){
  sql =  "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "'";
  }
  if(type=='daily'){
    sql =  "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "' AND create_time = CURDATE()";
    }
    if(type=='weekly'){
      sql =  "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "' AND YEARWEEK(`create_time`, 1) = YEARWEEK(CURDATE(), 1)";
      }
      if(type=='monthly'){
        sql =  "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "' AND MONTH(create_time) = MONTH(CURRENT_DATE()) AND YEAR (create_time) = YEAR(CURRENT_DATE())";
        }
        if(type=='timeRange'){
          sql =  "SELECT * FROM checkout WHERE clinicId='" + req.params.clinicId + "' AND create_time BETWEEN '" + r1 + "' AND '" + r2 + "'";
          }
  connection.query(
   sql,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No checkouts recorded during time frame." });
    else {
  
      checkoutArray = results;
      var index=0; var length = checkoutArray.length;
      checkoutArray.forEach(function(entry) {
        var data = JSON.parse(entry.allProducts);
     
  
    var i=0;
    var finalData="";
        data.forEach(function(entry2) {
        
          if(entry2.packing_type=='TABLETS'){
            if(entry2.quantity_strips==0){
              finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tablets + " tab</mark></b><br>";
            }
           else if(entry2.quantity_tablets==0){
              finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips</mark></b><br>";
            }
            else{
              finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips & " + entry2.quantity_tablets + " tab</mark></b><br>";
            }
               
              }
              if(entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per 0.5 cc' || entry2.packing_type=='per vial' || entry2.packing_type=='Per vial' || entry2.packing_type=='vial per cc'){
                if(entry2.quantity_mls==0){
                  finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_vials + "vials</mark></b><br>";
                }
                else if(entry2.quantity_vials==0){
                  finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML<br></mark></b>";
                }
                else{
                  finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML  & " + entry2.quantity_vials + "vials</mark></b><br>";
                }
             
              }
             if(entry2.packing_type=='per ampule'){    
             finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_ampules+" ampules</mark></b><br>";
              }
                if(entry2.packing_type=='BOTTLE'){
    
                  if(entry2.quantity_bottles==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + "</mark></b><br>" ;
                  }
                  else if(entry2.quantity_unittotal==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_bottles + " bottles</mark></b><br>" ;
                  }
                  else{
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + " & " + entry2.quantity_bottles + " bottles</mark></b><br>" ;
                  }
                  
             
              }
                if(entry2.packing_type=='TUBE'){
    
                  if(entry2.quantity_tubes==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + "</mark></b><br>" ;    
                  }
                  else if(entry2.quantity_unittotal==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tubes + " tubes</mark></b><br>" ;    
                  }
                  else{
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + " & " + entry2.quantity_tubes + " tubes</mark></b><br>" ;    
                  }
                    
              }
              else if(entry2.packing_type=='Per supp' || entry2.packing_type=='SACHET' || entry2.packing_type=='Sachet' || entry2.packing_type=='box' || entry2.packing_type=='Set' || entry2.packing_type=='ROLLS' || entry2.packing_type=='PIECES' || entry2.packing_type=='pack' || entry2.packing_type=='Diskus') {
                finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_units+" units</mark></b><br>";
              }
         i++;
       
   });

   if(data.length==i){
    var amt = parseFloat(entry.total_amount); var rollback = "";
    if(entry.rollback=='true'){
     rollback =  "  <span style='color:red;'>~ROLLED BACK~</span>";
    }
        checkoutString +=  '<tr>'+
        '<td>' + entry.id  + rollback + '</td>'+
        '<td>' + entry.patientId  +'</td>'+
        '<td>' + amt.toFixed(2)  +'</td>'+
        '<td>' + moment(entry.create_time).format('Do MMMM YYYY hh:mm a')  +'</td>'+
        '<td>' + finalData +'</td>'+
        '<td>' + entry.staffName  +'</td>'+
       
      '</tr>';
        
      
             index++;
   }        





        
      });


      if(index==length){

        var htmlFormat = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<style>'+
        '#customers {'+
          'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
          'border-collapse: collapse;'+
          'width: 100%;'+
        '}'+
        '#customers td, #customers th {'+
          'border: 1px solid #000000;'+
          'padding: 8px;'+
        '}'+
        '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
        '#customers tr:hover {background-color: #ddd;}'+
        '#customers th {'+
          'padding-top: 12px;'+
          'padding-bottom: 12px;'+
          'text-align: left;'+
          'background-color: #6D0A0A;'+
          'color: white;'+
          'font-weight: bold;'+
        '}'+
        '#customers thead {'+
  'display: table-header-group'+
  '}'+
        '</style>'+
        '</head>'+
        '<body>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
          '<thead>'+
          '<tr>'+
            '<th>Transaction ID</th>'+
            '<th>Patient MRN Num.</th>'+
            '<th>Amount (RM)</th>'+
            '<th>Date</th>'+
            '<th>Products</th>'+
            '<th>Staff</th>'+
          '</tr></thead>'+checkoutString+
        '</table>'+
       '</body>'+
        '</html>';
        var options =  {
          "pageSize": "A4",
          "orientation": "landscape",
            "footerFontSize":"8",
            "footerRight":"ENIGMA CHECKOUT REPORT",
            "footerFontName":"Geometric sans-serif",
            "title":"Clinic Checkout Report.pdf",
        };
        
        return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Checkout Report.pdf', options = options).then(function(result) {
        const pdflink = result.pdf;
        return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
             
        
        
        
        }).catch((error) => console.error('There was an error', error));

      }


    }
   
    }
  );
 


 
});




app.route('/development/clinic/download/reportCheckIn/:clinicId')
.post(function(req, res, next) {

  var checkinArray;
  var checkinString="";
  var type = req.body.type;
  var sql;
  if(type=='alltime'){
  sql =  "SELECT * FROM checkin WHERE clinicId='" + req.params.clinicId + "'";
  }
  if(type=='daily'){
    sql =  "SELECT * FROM  checkin WHERE clinicId='" + req.params.clinicId + "' AND create_time = CURDATE()";
    }
    if(type=='weekly'){
      sql =  "SELECT * FROM  checkin  WHERE clinicId='" + req.params.clinicId + "' AND YEARWEEK(`create_time`, 1) = YEARWEEK(CURDATE(), 1)";
      }
      if(type=='monthly'){
        sql =  "SELECT * FROM  checkin WHERE clinicId='" + req.params.clinicId + "' AND MONTH(create_time) = MONTH(CURRENT_DATE()) AND YEAR (create_time) = YEAR(CURRENT_DATE())";
        }
  connection.query(
   sql,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No checkins recorded during time frame." });
    else {
  
      checkinArray = results;
      var index=0; var length = checkinArray.length;
      checkinArray.forEach(function(entry) {
        var data = JSON.parse(entry.allProducts);
     
  
    var i=0;
    var finalData="";
        data.forEach(function(entry2) {
        
          if(entry2.packing_type=='TABLETS'){
               finalData +=  i+1+") "+ entry2.product_name + "-> "+entry2.quantity_strips+" strips & " + entry2.quantity_tablets + "loose tab<br> ";
              }
              if(entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per 0.5 cc' || entry2.packing_type=='per vial' || entry2.packing_type=='Per vial' || entry2.packing_type=='vial per cc'){
               finalData += i+1+") "+ entry2.product_name + "-> "+entry2.quantity_mls+" loose ML  & " + entry2.quantity_vials + "vials <br> ";
              }
             if(entry2.packing_type=='per ampule'){    
             finalData += i+1+") "+ entry2.product_name + "-> "+entry2.quantity_ampules+" ampules | ";
              }
                if(entry2.packing_type=='BOTTLE'){
                finalData +=  i+1+") "+ entry2.product_name + "-> "+entry2.quantity_unittotal + entry2.quantity_unitperbottle + " loose & " + entry2.quantity_bottles + " bottles <br> " ;
              }
                if(entry2.packing_type=='TUBE'){
                          finalData +=  i+1+") "+ entry2.product_name + "-> "+entry2.quantity_unittotal + entry2.quantity_unitpertube + " loose & " + entry2.quantity_tubes + " tubes <br> " ;     
              }
              else if(entry2.packing_type=='Per supp' || entry2.packing_type=='SACHET' || entry2.packing_type=='Sachet' || entry2.packing_type=='box' || entry2.packing_type=='Set' || entry2.packing_type=='ROLLS' || entry2.packing_type=='PIECES' || entry2.packing_type=='pack' || entry2.packing_type=='Diskus') {
                finalData += i+1+") "+ entry2.product_name + "-> "+entry2.quantity_units+" units<br> ";
              }
         i++;
       
   });

   if(data.length==i){
    var amt = parseFloat(entry.total_amount);
        checkoutString +=  '<tr>'+
        '<td>' + entry.id  +'</td>'+
        '<td>' + entry.patientId  +'</td>'+
        '<td>' + amt.toFixed(2)  +'</td>'+
        '<td>' + moment(entry.create_time).format('Do MMMM YYYY hh:mm a')  +'</td>'+
        '<td>' + finalData +'</td>'+
        '<td>' + entry.staffName  +'</td>'+
       
      '</tr>';
        
      
             index++;
   }        





        
      });


      if(index==length){

        var htmlFormat = '<!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<style>'+
        '#customers {'+
          'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
          'border-collapse: collapse;'+
          'width: 100%;'+
        '}'+
        '#customers td, #customers th {'+
          'border: 1px solid #ddd;'+
          'padding: 8px;'+
        '}'+
        '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
        '#customers tr:hover {background-color: #ddd;}'+
        '#customers th {'+
          'padding-top: 12px;'+
          'padding-bottom: 12px;'+
          'text-align: left;'+
          'background-color: #6D0A0A;'+
          'color: white;'+
        '}'+
        '#customers thead {'+
  'display: table-header-group'+
  '}'+
        '</style>'+
        '</head>'+
        '<body>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
        '<thead>'+
          '<tr>'+
            '<th>Id</th>'+
            '<th>Invoice Num.</th>'+
            '<th>Amount (RM)</th>'+
            '<th>Date</th>'+
            '<th>Products</th>'+
            '<th>Staff</th>'+
          '</tr></thead>'+checkinString+
        '</table>'+
       '</body>'+
        '</html>';
        var options =  {
          "pageSize": "A4",
          "orientation": "landscape",
            "footerFontSize":"8",
            "footerRight":"ENIGMA CHECKOUT REPORT",
            "footerFontName":"Geometric sans-serif",
            "title":"Clinic Checkin Report.pdf",
        };
        
        return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Checkin Report.pdf', options = options).then(function(result) {
        const pdflink = result.pdf;
        return res.status(200).json({success : 'Report sent successfully. ',pdfLink:pdflink});
             
        
        
        
        }).catch((error) => console.error('There was an error', error));

      }


    }
   
    }
  );
 


 
});


//         1.  WORKFORCE


// ALL WORKFORCE LISTING
app.get("/development/workforce/admin", (req, res, next) => {
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

app.get("/development/precheckin/admin", (req, res, next) => {
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
      db: "clinicId",
      dt: 1
    },
    {
      db: "clinicName",
      dt: 2
    },
    {
      db: "orderId",
      dt: 3
    },
    {
      db: "comments",
      dt: 4
    },
    {
      db: "attachments",
      dt: 5
    },
    {
      db: "status",
      dt: 6
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "select precheckin.id as id,clinic.id as clinicId,clinic.name as clinicName,precheckin.orderId as orderId,precheckin.comments as comments,precheckin.attachments as attachments,precheckin.status as status from precheckin left join clinic on precheckin.clinicId=clinic.id "; 
   

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





app.get("/development/checkin/admin", (req, res, next) => {
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
      db: "clinicId",
      dt: 1
    },
    {
      db: "clinicName",
      dt: 2
    },
    {
      db: "invoiceId",
      dt: 3
    },
    {
      db: "totalAmount",
      dt: 4
    },
    {
      db: "attachments",
      dt: 5
    },
    {
      db: "status",
      dt: 6
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "select checkin.id as id,clinic.id as clinicId,clinic.name as clinicName,checkin.invoiceId as invoiceId,checkin.totalAmount as totalAmount,checkin.attachments as attachments,checkin.status as status from checkin left join clinic on checkin.clinicId=clinic.id "; 
   

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




// ALL WORKFORCE LISTING
app.get("/development/medicine/admin", (req, res, next) => {
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
      db: "internal_qrcode",
      dt: 0
    },
    {
      db: "manufacturer_barcode",
      dt: 1
    },
    {
      db: "internal_barcode",
      dt: 2
    },
    {
      db: "product_name",
      dt: 3
    },
    {
      db: "manufacturer",
      dt: 4
    },
    {
      db: "product_category",
      dt: 5
    },
    {
      db: "company_name",
      dt: 6
    },
    {
      db: "packing_type",
      dt: 7
    },

  ];
  // our database table name
  const tableName = "admin_medicine_inventory"
  // NodeTable requires table's primary key to work properly
  const primaryKey = "internal_qrcode"
  
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

app.post('/development/workforce/photo/upload', multer.single('file'), (req, res, next) => {
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




 app.route('/development/workforce/activation-email/:email')
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



app.get("/development/workforce/clinic/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  const requestQuery = req.query;
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
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
      db: "position",
      dt: 3
    },
    {
      db: "status",
      dt: 4
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT CONCAT(`id`,'_',`token`) as id,position,username,email,status FROM workforce WHERE clinicId='" + clinicId + "' "; 
   

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


app.get("/development/fast/inventory/clinic/admin/:clinicId", (req, res, next) => {
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
      db: "productId",
      dt: 0
    },
    {
      db: "manufacturerBarcode",
      dt: 1
    },
    {
      db: "clinicBarcode",
      dt: 2
    },
    {
      db: "manufacturer",
      dt: 3
    },
    {
      db: "name",
      dt: 4
    },
    {
      db: "prescription",
      dt: 5
    },
    {
      db: "incomingQuantity",
      dt: 6
    },
    {
      db: "outgoingQuantity",
      dt: 7
    },
    {
      db: "balanceQuantity",
      dt: 8
    },
    {
      db: "movementPct",
      dt: 9
    },

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
   " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
   " CASE"+
   "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
   "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
   "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
   "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
        "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
        "   END as actualQuantity"+
        "    from clinic_inventory "+
        "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
        "       FROM clinic_checkins "+
        "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
        "    GROUP BY clinic_checkins.productId "+
        "     ) ci ON clinic_inventory.productId=ci.productId "+
        "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
        "     FROM clinic_checkouts "+
        "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
        "   GROUP BY clinic_checkouts.productId "+
        "     ) co ON clinic_inventory.productId=co.productId "+
        "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
        "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
        "   ) as x where CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))>=50 ORDER BY movementPct DESC";
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



app.get("/development/slow/inventory/clinic/admin/:clinicId", (req, res, next) => {
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
      db: "productId",
      dt: 0
    },
    {
      db: "manufacturerBarcode",
      dt: 1
    },
    {
      db: "clinicBarcode",
      dt: 2
    },
    {
      db: "manufacturer",
      dt: 3
    },
    {
      db: "name",
      dt: 4
    },
    {
      db: "prescription",
      dt: 5
    },
    {
      db: "incomingQuantity",
      dt: 6
    },
    {
      db: "outgoingQuantity",
      dt: 7
    },
    {
      db: "balanceQuantity",
      dt: 8
    },
    {
      db: "movementPct",
      dt: 9
    },

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
   " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
   " CASE"+
   "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
   "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
   "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
   "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
        "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
        "   END as actualQuantity"+
        "    from clinic_inventory "+
        "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
        "       FROM clinic_checkins "+
        "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
        "    GROUP BY clinic_checkins.productId "+
        "     ) ci ON clinic_inventory.productId=ci.productId "+
        "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
        "     FROM clinic_checkouts "+
        "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
        "   GROUP BY clinic_checkouts.productId "+
        "     ) co ON clinic_inventory.productId=co.productId "+
        "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
        "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
        "   ) as x where CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))<=30 AND CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))!=0  ORDER BY movementPct ASC";
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




app.get("/development/zero/inventory/clinic/admin/:clinicId", (req, res, next) => {
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
      db: "productId",
      dt: 0
    },
    {
      db: "manufacturerBarcode",
      dt: 1
    },
    {
      db: "clinicBarcode",
      dt: 2
    },
    {
      db: "manufacturer",
      dt: 3
    },
    {
      db: "name",
      dt: 4
    },
    {
      db: "prescription",
      dt: 5
    },
    {
      db: "incomingQuantity",
      dt: 6
    },
    {
      db: "outgoingQuantity",
      dt: 7
    },
    {
      db: "balanceQuantity",
      dt: 8
    },
    {
      db: "movementPct",
      dt: 9
    },

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
   " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
   " CASE"+
   "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
   "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
   "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
   "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
        "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
        "   END as actualQuantity"+
        "    from clinic_inventory "+
        "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
        "       FROM clinic_checkins "+
        "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
        "    GROUP BY clinic_checkins.productId "+
        "     ) ci ON clinic_inventory.productId=ci.productId "+
        "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
        "     FROM clinic_checkouts "+
        "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
        "   GROUP BY clinic_checkouts.productId "+
        "     ) co ON clinic_inventory.productId=co.productId "+
        "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
        "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
        "   ) as x where  CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2))=0  ORDER BY movementPct ASC";
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


app.get("/development/incoming/inventory/clinic/admin/:clinicId", (req, res, next) => {
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
      db: "productId",
      dt: 0
    },
    {
      db: "manufacturerBarcode",
      dt: 1
    },
    {
      db: "clinicBarcode",
      dt: 2
    },
    {
      db: "manufacturer",
      dt: 3
    },
    {
      db: "name",
      dt: 4
    },
    {
      db: "prescription",
      dt: 5
    },
    {
      db: "incomingQuantity",
      dt: 6
    },
    {
      db: "outgoingQuantity",
      dt: 7
    },
    {
      db: "balanceQuantity",
      dt: 8
    },
    {
      db: "movementPct",
      dt: 9
    },

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
   " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
   " CASE"+
   "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
   "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
   "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
   "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
        "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
        "   END as actualQuantity"+
        "    from clinic_inventory "+
        "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
        "       FROM clinic_checkins "+
        "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
        "    GROUP BY clinic_checkins.productId "+
        "     ) ci ON clinic_inventory.productId=ci.productId "+
        "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
        "     FROM clinic_checkouts "+
        "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
        "   GROUP BY clinic_checkouts.productId "+
        "     ) co ON clinic_inventory.productId=co.productId "+
        "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
        "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
        "   ) as x where x.incomingQuantity>0 ORDER BY x.incomingQuantity DESC";
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



app.get("/development/inventory/clinic/admin/:clinicId", (req, res, next) => {
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
      db: "productId",
      dt: 0
    },
    {
      db: "manufacturerBarcode",
      dt: 1
    },
    {
      db: "clinicBarcode",
      dt: 2
    },
    {
      db: "manufacturer",
      dt: 3
    },
    {
      db: "name",
      dt: 4
    },
    {
      db: "prescription",
      dt: 5
    },
    {
      db: "incomingQuantity",
      dt: 6
    },
    {
      db: "outgoingQuantity",
      dt: 7
    },
    {
      db: "balanceQuantity",
      dt: 8
    },
    {
      db: "movementPct",
      dt: 9
    },

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
   " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
   " CASE"+
   "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
   "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
   "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
   "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
   "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
        "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
        "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
        "   END as actualQuantity"+
        "    from clinic_inventory "+
        "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
        "       FROM clinic_checkins "+
        "      WHERE clinic_checkins.clinicId = '" + req.params.clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
        "    GROUP BY clinic_checkins.productId "+
        "     ) ci ON clinic_inventory.productId=ci.productId "+
        "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
        "     FROM clinic_checkouts "+
        "     WHERE clinic_checkouts.clinicId = '" + req.params.clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE()) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
        "   GROUP BY clinic_checkouts.productId "+
        "     ) co ON clinic_inventory.productId=co.productId "+
        "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
        "    WHERE clinic_inventory.clinicId='" + req.params.clinicId + "'  "+
        "   ) as x ORDER BY movementPct DESC";
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


app.get("/development/inventory/clinic/checkins/:clinicId/:productId", (req, res, next) => {
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
      db: "checkInId",
      dt: 1
    },
    {
      db: "quantity",
      dt: 2
    },
    {
      db: "create_time",
      dt: 3
    }

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select id,checkInId,quantity,create_time from clinic_checkins where clinicId='" + req.params.clinicId +"' AND productId='" + req.params.productId +"'   ";
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

app.get("/development/inventory/clinic/checkouts/:clinicId/:productId", (req, res, next) => {
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
      db: "checkOutId",
      dt: 1
    },
    {
      db: "quantity",
      dt: 2
    },
    {
      db: "create_time",
      dt: 3
    }

  

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id";
  /*const query = "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as name,SUM(clinic_inventory.quantity)-IFNULL(clinic_checkouts.quantity,0)  as quantity,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode LEFT JOIN  clinic_checkouts on clinic_inventory.productId=clinic_checkouts.productId  WHERE clinic_inventory.clinicId='" + req.params.id + "' GROUP BY clinic_inventory.productId"; */
  const query = "select clinic_checkouts.id as id,clinic_checkouts.checkOutId as checkOutId,clinic_checkouts.create_time as create_time,CASE WHEN checkout.rollback='true' THEN CONCAT(clinic_checkouts.quantity,' -> This record was rolled back on ', checkout.update_time) ELSE clinic_checkouts.quantity  END as quantity from clinic_checkouts  left join checkout on clinic_checkouts.checkOutId=checkout.id  where clinic_checkouts.clinicId='" + req.params.clinicId + "' AND clinic_checkouts.productId='" + req.params.productId + "' ";
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
app.get("/development/inventory/clinic/product/admin/:clinicId/:productId", (req, res, next) => {
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
      db: "checkInId",
      dt: 0
    },
    {
      db: "quantity",
      dt: 1
    },
    {
      db: "create_time",
      dt: 2
    }

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId"
  const query = "select * FROM clinic_inventory WHERE clinicId='" + req.params.clinicId + "'  AND productId='" + req.params.productId + "'    "; 
   

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

app.get("/development/inventory/clinic/product2/admin/:clinicId/:productId", (req, res, next) => {
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
      db: "checkOutId",
      dt: 0
    },
    {
      db: "quantity",
      dt: 1
    },
    {
      db: "create_time",
      dt: 2
    }

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "productId"
  const query = "select * FROM clinic_checkouts WHERE clinicId='" + req.params.clinicId + "'  AND productId='" + req.params.productId + "'    "; 
   

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



app.get("/development/inventory/clinic/product3/admin/:clinicId/:productId", (req, res, next) => {
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
      db: "preChange",
      dt: 0
    },
    {
      db: "postChange",
      dt: 1
    },
    {
      db: "remarks",
      dt: 2
    },
    {
      db: "create_time",
      dt: 3
    }

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "preChange"
  const query = "select remarks,JSON_EXTRACT(preChange, '$.quantity') as preChange,JSON_EXTRACT(postChange, '$.quantity') as postChange,create_time FROM clinic_inventory_ammends WHERE clinicId='" + req.params.clinicId + "'  AND productId='" + req.params.productId + "'    "; 
   

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

app.route('/development/enigma/forgot-password/:email')
.post(function(req, res, next) {
  connection.query(
    "SELECT * FROM `workforce` WHERE email='" + req.params.email + "'  LIMIT 1",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No user found! Try again" });
    else {

      if(results[0].status=='0'){
        return res.status(200).json({error : 'Account is suspended! Contact Support team for assistance.'});
       }
       
         readHTMLFile('emails/passwordreset.html', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        username:results[0].username,
        link:'https://enigma.medicodesolution.com/reset-password/'+ results[0].token+'/'+req.params.email,
    }; 
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: '"Password Recovery - ENIGMA Inventory" <noreply@medicodesolution.com>',
      to: req.params.email,
      subject : 'Password Recovery',
        html : htmlToSend
     };
    mailTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        } 
      
      return res.status(200).json({success : ' Check email for Reset Password link.'});
   });
});

 
    }
   
    }
  );
});

app.get("/development/single/checkin/admin/:id", (req, res, next) => {
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
      db: "invoiceId",
      dt: 1
    },
    {
      db: "attachments",
      dt: 2
    },
    {
      db: "totalAmount",
      dt: 3
    },
    {
      db: "status",
      dt: 4
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM checkin WHERE clinicId='" + req.params.id + "' "; 
   

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

app.get("/development/single/precheckin/admin/:id", (req, res, next) => {
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
      db: "orderId",
      dt: 1
    },
    {
      db: "attachments",
      dt: 2
    },
    {
      db: "comments",
      dt: 3
    },
    {
      db: "status",
      dt: 4
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM precheckin WHERE clinicId='" + req.params.id + "' "; 
   

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




app.get("/development/single/checkout/admin/:id", (req, res, next) => {
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
      db: "patientId",
      dt: 1
    },
    {
      db: "allProducts",
      dt: 2
    },
    {
      db: "total_amount",
      dt: 3
    },
    {
      db: "create_time",
      dt: 4
    },
    {
      db: "staffName",
      dt: 5
    },
    {
      db: "rollback",
      dt: 6
    },
    {
      db: "rollback_comments",
      dt: 7
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT id,patientId,allProducts,total_amount,DATE_FORMAT(create_time, '%r,%e %b %Y') as create_time,staffName,rollback,rollback_comments FROM checkout WHERE clinicId='" + req.params.id + "'   "; 
   

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



app.get("/development/single/checkout/today/admin/:id", (req, res, next) => {
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
      db: "patientId",
      dt: 1
    },
    {
      db: "allProducts",
      dt: 2
    },
    {
      db: "total_amount",
      dt: 3
    },
    {
      db: "create_time",
      dt: 4
    },
    {
      db: "staffName",
      dt: 5
    },
    {
      db: "rollback",
      dt: 6
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT id,patientId,allProducts,total_amount,DATE_FORMAT(create_time, '%r,%e %b %Y') as create_time,staffName,rollback FROM checkout WHERE clinicId='" + req.params.id + "' AND cast(create_time as date)=CURDATE()  "; 
   

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



app.get("/development/single/checkout2/admin/:id/:staffId", (req, res, next) => {
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
      db: "patientId",
      dt: 1
    },
    {
      db: "allProducts",
      dt: 2
    },
    {
      db: "total_amount",
      dt: 3
    },
    {
      db: "create_time",
      dt: 4
    },
    {
      db: "staffName",
      dt: 5
    },
    {
      db: "status",
      dt: 6
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM checkout WHERE clinicId='" + req.params.id + "'  AND staffId='" + req.params.staffId + "' "; 
   

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


app.get("/development/single/fileManager2/admin/:id/:staffId", (req, res, next) => {
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
      db: "staffName",
      dt: 1
    },
    {
      db: "title",
      dt: 2
    },
    {
      db: "description",
      dt: 3
    },
    {
      db: "attachments",
      dt: 4
    },
    {
      db: "create_time",
      dt: 5
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT * FROM file_manager WHERE staffId='" + req.params.staffId + "' "; 
   

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


app.get("/development/single/fileManager/admin/:id", (req, res, next) => {
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
      db: "staffName",
      dt: 1
    },
    {
      db: "title",
      dt: 2
    },
    {
      db: "description",
      dt: 3
    },
    {
      db: "attachments",
      dt: 4
    },
    {
      db: "create_time",
      dt: 5
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT id,staffName,title,description,attachments,DATE_FORMAT(create_time, '%r,%e %b %Y') AS create_time FROM file_manager WHERE clinicId='" + req.params.id + "' "; 
   

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


app.get("/development/clinic/approvedId/admin/:id", (req, res, next) => {
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

app.get("/development/workforce/onlyAccountAdmin/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable

  const requestQuery = req.query;
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var accountId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];
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
  const query = "SELECT CONCAT(`id`,'_',`token`) as id,username,email,status FROM workforce WHERE accountId='" + accountId + "' and position='Account Admin' "; 

   

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

app.get("/development/onlyClinic/admin/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var accountId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];
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
  const query = "SELECT CONCAT(`id`,'_',`token`) as id,name,address_city,address_state,status FROM clinic WHERE accountId='" + accountId + "' "; 
   

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




app.get("/development/admin/accountHistory/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable

  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var accountId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];

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
      db: "clinicId",
      dt: 1
    },
    {
      db: "type",
      dt: 2
    },
    {
      db: "description",
      dt: 3
    },

    {
      db: "author",
      dt: 4
    },
    {
      db: "time",
      dt: 5
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT history.id,history.type,history.accountId,history.description,DATE_FORMAT(history.create_time, '%r,%e %b %Y') AS time,CASE   WHEN history.clinicId='0' THEN 'NA'  ELSE CONCAT(clinic.name,' (Id:',history.clinicId,')')  END as clinicId,CONCAT(history.authorUsername,'(Id:',history.authorId,')') as author FROM history LEFT JOIN clinic ON history.clinicId=clinic.id WHERE history.accountId='" + accountId + "' "; 
   

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


app.get("/development/admin/staffHistory/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable

  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var workforceId = sanitizedRequestString[0];
  var workforceToken = sanitizedRequestString[1];

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
      db: "type",
      dt: 1
    },
    {
      db: "description",
      dt: 2
    },

    {
      db: "author",
      dt: 3
    },
    {
      db: "time",
      dt: 4
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT history.id,history.type,history.accountId,history.description,DATE_FORMAT(history.create_time, '%r,%e %b %Y') AS time,CASE   WHEN history.clinicId='0' THEN 'NA'  ELSE CONCAT(clinic.name,' (Id:',history.clinicId,')')  END as clinicId,CONCAT(history.authorUsername,'(Id:',history.authorId,')') as author FROM history LEFT JOIN clinic ON history.clinicId=clinic.id WHERE history.workforceId='" + workforceId + "' "; 
   

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



app.get("/development/admin/clinicHistory/:id", (req, res, next) => {
  // Get the query string paramters sent by Datatable

  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];

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
      db: "type",
      dt: 1
    },
    {
      db: "description",
      dt: 2
    },

    {
      db: "author",
      dt: 3
    },
    {
      db: "time",
      dt: 4
    },

  ];

  // NodeTable requires table's primary key to work properly
  const primaryKey = "id"
  const query = "SELECT history.id,history.type,history.accountId,history.description,DATE_FORMAT(history.create_time, '%r,%e %b %Y') AS time,CASE   WHEN history.clinicId='0' THEN 'NA'  ELSE CONCAT(clinic.name,' (Id:',history.clinicId,')')  END as clinicId,CONCAT(history.authorUsername,'(Id:',history.authorId,')') as author FROM history LEFT JOIN clinic ON history.clinicId=clinic.id WHERE history.clinicId='" + clinicId + "' "; 
   

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


app.route('/development/workforce/forgot-password/:email')
.post(function(req, res, next) {
  connection.query(
    "SELECT * FROM `workforce` WHERE email='" + req.params.email + "'   LIMIT 1",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ error: "No user found! Try again" });
    else {
      var type = 'Workforce Request Password Reset - '+results[0].position;
      var description = 'Workforce Request Password Reset - '+ results[0].position +' ('+ results[0].username+' /'+ results[0].email +  '/ Id:' + results[0].id + ')';
      var username = results[0].username;
      var token = results[0].token;
       connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId,workforceId)  VALUES ('" + type + "','" +  results[0].accountId + "','" +  results[0].clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1','" + results[0].id + "')",  //insert into history of forgot password
        function(error, results, fields) {
          if (error) return console.log(error)
          readHTMLFile('emails/passwordreset.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
              username:username,
              link:'https://enigma@medicodesolution.com/forgotpasswordMember/'+ token+'/'+req.params.email,
            }; 
            var htmlToSend = template(replacements);
            var mailOptions = {
              from: '"Forgot Password - ENIGMA Inventory" <noreply@medicodesolution.com>',
              to: req.params.email,
              subject : 'Retrieve Password for your Medicode Workforce Account',
                html : htmlToSend
             };
            mailTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                } 
                else res.status(200).json({success : 'Check email for Reset Password link.'});
           });
        });                     
          
            }
         );
  
  
    
    }
   
    }
  );
});


app.route('/development/workforce/activate/:token/:email')
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













app.route('/development/enigma/reset-password/:token/:email')
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

app.route('/development/enigma/change-password/:uid')
.patch(function(req, res, next) {
var oldPassword = req.body.oldPassword;
var newPassword = req.body.newPassword;

connection.query(
  "SELECT password from `workforce` WHERE id= '" + req.params.uid + "' LIMIT 1 ",
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
                    "UPDATE  `workforce` SET password= '" + hash +  "' WHERE id = ? ", req.params.uid,
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




app.route('/development/workforce/non-admin')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
//  var rawRequestString = req.body.clinicId;
  //var sanitizedRequestString = rawRequestString.split("_");
 var clinicId = req.body.clinicId;
  //var clinicToken = sanitizedRequestString[1];
  var accountId = req.body.accountId;
  var maxStaffCount=0;
  var emailRes;

  connection.query(
    "SELECT email from `workforce` WHERE email= '" + req.body.email + "'  ", //checking for duplicate e-mail accounts
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if (results.length === 0){
        connection.query(
          "SELECT ic_no from `workforce` WHERE ic_no= '" + req.body.ic_no + "' and accountId='" + req.body.accountId + "' ",  //checking for duplicate ic accounts
          function(error, results, fields) {
            if (error) return res.status(500).json({ error: error });
            emailRes = results;
            connection.query(
              "SELECT staffCount FROM `clinic_settings` WHERE id = ? LIMIT 1", clinicId,  //get max staff count of clinic account
              function(error, results, fields) {
                if (error) return res.status(500).json({ error: error });
                if(results.length === 0) return res.status(500).json({ error: "No user found" });
                maxStaffCount = results[0].staffCount;

                connection.query(
                  "SELECT count(*) as count FROM `workforce` WHERE clinicId = ?", clinicId,
                  function(error, results, fields) {
                    if (error) return res.status(500).json({ error: error });
                    if(results.length < maxStaffCount){   //checking for max staff accounts

                      if (emailRes.length === 0){
                        bcrypt.hash(token, saltRounds, function (err,hash) {
                         
                           connection.query(
                             "INSERT INTO `workforce` (username,email,provider,tel_no,password,hash_algorithm,status,position,clearance,token,photoUrl,accountId,clinicId,ic_no)  VALUES ('" +  req.body.username + "','" + req.body.email  + "','Email & Password','" +  req.body.tel_no + "','" + hash  + "','bcrypt-saltrounds-10','1','" +  req.body.position + "','','" + token + "','" +  req.body.photoUrl + "','" +  accountId + "','" +  clinicId + "','" +  req.body.ic_no + "') ", 
                             function(error, results, fields) {
                               if (error) return res.status(500).json({ error: error });
                              var type = 'Workforce Account Creation - '+req.body.position;
                              var description = 'Workforce Account Creation - '+ req.body.position +' ('+req.body.username+' /'+ req.body.email +  '/ Id:' + results.insertId+ ')';
                           
                               connection.query(
                                "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId,workforceId)  VALUES ('" + type + "','" +  accountId + "','" +  clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1','" + results.insertId + "')",  //insert into history of account creation
                                function(error, results, fields) {
                                  if (error) return res.status(500).json({ error: error });
                                  readHTMLFile('emails/accountactivation.html', function(err, html) {
                                    var template = handlebars.compile(html);
                                    var replacements = {
                                        username:req.body.username,
                                        password:token,
                                    }; 
                                    var htmlToSend = template(replacements);
                                    var mailOptions = {
                                      from: '"Account Activation - ENIGMA Inventory" <noreply@medicodesolution.com>',
                                      to: req.body.email,
                                      subject : 'Activate your Medicode Workforce Account',
                                        html : htmlToSend
                                     };
                                    mailTransport.sendMail(mailOptions, function (error, response) {
                                        if (error) {
                                            console.log(error);
                                            callback(error);
                                        } 
                                        else res.status(200).json({success : 'Account creation succesful!'});
                                   });
                                });
                                                          
                                  
                                    }
                                 );


               
                               
                                 }
                              );
                           });
                       }
                       else{
                         
                           return res.status(200).json({ error: 'Registration Error : Account with same IC Number already exists' });
                     
                       }


                    }
                    else if(results.length >= maxStaffCount){
                      return res.status(200).json({ error: 'Registration Error : This clinic has reach maximum number of staffs that can be added.Request SuperAdmin to add capacity.' });
                    }

                  }
                );

                
               
             





              }
            );



           
           
          }
        );

       
      }
      else{
        
          return res.status(200).json({ error: 'Registration Error : Email already exists' });
    
      }
     
    }
  );


});

  app.route('/development/workforce/admin')
  .post(function(req, res) {
    var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
    var rawRequestString = req.body.accountId;
    var sanitizedRequestString = rawRequestString.split("_");
    var accountId = sanitizedRequestString[0];
    var accountToken = sanitizedRequestString[1];

    var emailRes;

    connection.query(
      "SELECT email from `workforce` WHERE email= '" + req.body.email + "'  ", //checking for duplicate e-mail accounts
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if (results.length === 0){
          connection.query(
            "SELECT ic_no from `workforce` WHERE ic_no= '" + req.body.ic_no + "' and accountId='" + req.body.accountId + "' ",  //checking for duplicate ic accounts
            function(error, results, fields) {
              if (error) return res.status(500).json({ error: error });
              bcrypt.hash(token, saltRounds, function (err,hash) {
                         
                connection.query(
                  "INSERT INTO `workforce` (username,email,provider,tel_no,password,hash_algorithm,status,position,clearance,token,photoUrl,accountId,ic_no)  VALUES ('" +  req.body.username + "','" + req.body.email  + "','Email & Password','" +  req.body.tel_no + "','" + hash  + "','bcrypt-saltrounds-10','1','" +  req.body.position + "','','" + token + "','" +  req.body.photoUrl + "','" +  accountId + "','" +  req.body.ic_no + "') ", 
                  function(error, results, fields) {
                    if (error) return res.status(500).json({ error: error });
                   var type = 'Workforce Account Creation - '+req.body.position;
                   var description = 'Workforce Account Creation - '+ req.body.position +' ('+req.body.username+' /'+ req.body.email +  '/ Id:' + results.insertId+ ')';
                
                    connection.query(
                     "INSERT INTO `history` (type,accountId,description,authorUsername,authorId,workforceId)  VALUES ('" + type + "','" +  accountId + "','" +  description + "','SUPER ADMINISTRATOR','1','" + results.insertId + "')",  //insert into history of account creation
                     function(error, results, fields) {
                       if (error) return res.status(500).json({ error: error });
                       readHTMLFile('emails/accountactivation.html', function(err, html) {
                         var template = handlebars.compile(html);
                         var replacements = {
                             username:req.body.username,
                             password:token,
                         }; 
                         var htmlToSend = template(replacements);
                         var mailOptions = {
                           from: '"Account Activation - ENIGMA Inventory" <noreply@medicodesolution.com>',
                           to: req.body.email,
                           subject : 'Activate your Medicode Admin Account',
                             html : htmlToSend
                          };
                         mailTransport.sendMail(mailOptions, function (error, response) {
                             if (error) {
                                 console.log(error);
                                 callback(error);
                             } 
                             else res.status(200).json({success : 'Account creation succesful!'});
                        });
                     });
                                               
                       
                         }
                      );


    
                    
                      }
                   );
                });


             
             
            }
          );

         
        }
        else{
          
            return res.status(200).json({ error: 'Registration Error : Email already exists' });
      
        }
       
      }
    );

 
  });


  app.route('/development/workforce/:id')
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




  


  app.route('/development/coresettings')
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

  app.route('/development/packingTypes')
  .get(function(req, res, next) {
    var doctors=[];
    connection.query(
      "SELECT DISTINCT packing_type FROM `admin_medicine_inventory`  ", 
           function(error, results, fields) {
            if (error) return res.status(500).json({ error: error });
            if(results.length === 0) return res.status(500).json({ error: "No user found" });
            doctors = results.map(function (obj) {
              return obj.packing_type;
            });
            
           return res.status(200).json({success : 'Race Info',packingTypes:doctors});
      }
    );
  });

  app.route('/development/manufacturerTypes')
  .get(function(req, res, next) {
    var doctors=[];
    connection.query(
      "SELECT DISTINCT manufacturer FROM `admin_medicine_inventory`  ", 
           function(error, results, fields) {
            if (error) return res.status(500).json({ error: error });
            if(results.length === 0) return res.status(500).json({ error: "No user found" });
            doctors = results.map(function (obj) {
              return obj.manufacturer
            });
         //   console.log(doctors)
            
           return res.status(200).json({success : 'Manu Info',manufacturerTypes:doctors});
      }
    );
  });

  app.route('/development/manufacturerBarcodes')
  .get(function(req, res, next) {
    var doctors=[];
    connection.query(
      "SELECT DISTINCT manufacturer_barcode FROM `admin_medicine_inventory` WHERE manufacturer_barcode!='null'  ", 
           function(error, results, fields) {
            if (error) return res.status(500).json({ error: error });
            if(results.length === 0) return res.status(500).json({ error: "No user found" });
            doctors = results.map(function (obj) {
              return obj.manufacturer_barcode
            });
           
            
           return res.status(200).json({success : 'Manu Info',manufacturerBarcodes:doctors});
      }
    );
  });

  app.route('/development/coresettings/:id')
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




  app.route('/development/workforce/status/:id')
  .patch(function(req, res, next) {
    var rawRequestString = req.params.id;
    var sanitizedRequestString = rawRequestString.split("_");
    var workforceId = sanitizedRequestString[0];
    var workforceToken = sanitizedRequestString[1];
    var accountId = req.body.accountId;
    var clinicId = req.body.clinicId;
    var workforceId = req.params.id;
    connection.query(
      "UPDATE  `workforce` SET status= " + req.body.status +  " WHERE id = ? ", workforceId,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No user found" });
    
       var description = 'Workforce status changed from Active to Suspended ('+ 'Id:' + workforceId+ ')';
       var type = 'Workforce Suspension';
        if(req.body.status==1){
           description = 'Workforce status changed from Suspended to Active ('+ 'Id:' + workforceId+ ')';
           type = 'Workforce Activation';
        }
       connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId,workforceId)  VALUES ('" +  type + "','" +  accountId + "','" +  clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1','" +  workforceId + "')", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return res.status(200).json({success : 'Account Status Changed'});
          
    
          
            }
         );
      }
    );
  });

  app.route('/development/account/status/:id')
  .patch(function(req, res, next) {
    var rawRequestString = req.params.id;
    var sanitizedRequestString = rawRequestString.split("_");
    var accountId = sanitizedRequestString[0];
    var accountToken = sanitizedRequestString[1];
    connection.query(
      "UPDATE  `account` SET status= " + req.body.status +  " WHERE id = ? ", req.params.id,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No account found" });
       var description = 'Account status changed from Active to Suspended.';
       var type = 'Account Suspension';
        if(req.body.status==1){
           description = 'Account status changed from Suspended to Active.';
           type = 'Account Activation';
        }
       connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('" +  type + "','" +  accountId + "','NA','" +  description + "','SUPER ADMINISTRATOR','1')", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return res.status(200).json({success : 'Account Status Changed'});
          
    
          
            }
         );
      }
    );
  });

  app.route('/development/clinic/status/:id')
  .patch(function(req, res, next) {
    var rawRequestString = req.params.id;
    var sanitizedRequestString = rawRequestString.split("_");
    var clinicId = sanitizedRequestString[0];
    var clinicToken = sanitizedRequestString[1];
    var accountId = req.body.accountId;
    connection.query(
      "UPDATE  `clinic` SET status= " + req.body.status +  " WHERE id = ? ", clinicId,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No account found" });
        var description = 'Clinic status changed from Active to Suspended.';
        var type = 'Clinic Suspension';
         if(req.body.status==1){
            description = 'Clinic status changed from Suspended to Active.';
            type = 'Clinic Activation';
         }
        connection.query(
         "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('" +  type + "','" +  accountId + "','" +  clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1')", 
         function(error, results, fields) {
           if (error) return console.log(error);
           
           return res.status(200).json({success : 'Clinic Status Changed'});
           
     
           
             }
          );
       return res.status(200).json({success : 'Clinic Status Changed'});
      }
    );
  });
  
  app.route('/development/workforce/:id')
  .patch(function(req, res, next) {
    var rawRequestString = req.params.id;
    var sanitizedRequestString = rawRequestString.split("_");
    var workforceId = sanitizedRequestString[0];
    var workforceToken = sanitizedRequestString[1];
    var accountId = req.body.accountId;
    var clinicId = req.body.clinicId;
    connection.query(
      "UPDATE  `workforce` SET  photoUrl= '" + req.body.photoUrl +  "',username= '" + req.body.username +  "',tel_no= '" + req.body.tel_no +  "',position= '" + req.body.position +  "' WHERE id = ? ", workforceId,
      function(error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        if(results.length === 0) return res.status(500).json({ error: "No user found" });
        var type='Workforce Details Update -'+req.body.position;
        var description = 'Workforce Details Update - '+ req.body.position +' ('+req.body.username+ '/' + 'Id:' + workforceId+ ')';
        connection.query(
          "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId,workforceId)  VALUES ('" +  type + "','" +  accountId + "','" +  clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1','" +  workforceId + "')", 
          function(error, results, fields) {
            if (error) return console.log(error);
            
            return res.status(200).json({success : 'Workforce ' + req.params.id + ' updated. '});
            
      
            
              }
           );
     
      }
    );
  });
  
  app.route('/development/workforce/reset-password/:token/:email')
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
app.route('/development/account')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  connection.query(
    "INSERT INTO `account` (company_name,ref_id,pic_name,pic_email,pic_tel_no,billing_name,billing_email,billing_tel_no,address_street,address_city,address_state,address_street2,address_city2,address_state2,photoUrl,status,token,attachments,mmc_id,company_type,company_date)  VALUES ('" +  req.body.company_name + "','" +  req.body.ref_id + "','" +  req.body.pic_name + "','" +  req.body.pic_email + "','" +  req.body.pic_tel_no + "','" +  req.body.billing_name + "','" +  req.body.billing_email + "','" +  req.body.billing_tel_no + "','" +  req.body.address_street + "','" +  req.body.address_city + "','" +  req.body.address_state + "','" +  req.body.address_street2 + "','" +  req.body.address_city2 + "','" +  req.body.address_state2 + "','" +  req.body.photoUrl + "','1','" + token + "','" +  req.body.attachments + "','" +  req.body.mmc_id + "','" +  req.body.company_type + "','" +  req.body.company_date + "') ", 
    function(error, results, fields) {
      if (error) return console.log(error);
      
     
  connection.query(
    "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('Account Creation','" +  results.insertId + "','NA','New account creation.','SUPER ADMINISTRATOR','1')", 
    function(error, results, fields) {
      if (error) return console.log(error);
      
       return res.status(200).json({success : 'New Account creation succesfull!',id:results.insertId+token});
      

      
        }
     );
      

      
        }
     );


});


// INSERT
app.route('/development/fileManager')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  connection.query(
    "INSERT INTO `file_manager` (title,description,clinicId,staffId,staffName,attachments)  VALUES ('" +  req.body.title + "','" +  req.body.desc + "','" +  req.body.clinicId + "','" +  req.body.staffId + "','" +  req.body.staffName + "',?) ",req.body.attachments, 
    function(error, results, fields) {
      if (error) return console.log(error);
      
      else {
        const mailOptions = {
          from: '"Enigma Automailer" <noreply@enigmedsvcs.com>',
          to: 'support@enigmedsvcs.com',
      
        };
      
        mailOptions.subject =  'New File Upload';
        mailOptions.text = 'Dear Admin, \n User  ' + req.body.staffId  + ' has uploaded a new file titled '+ req.body.title+ ' for your purview. \n Regards,\nEnigma Team\n' ;
        return mailTransport.sendMail(mailOptions)
        .then(() => res.status(200).json({success : 'Files Upload succesfull.'}))
        .catch((error) => res.status(500).json({ error: error }));
        
      }
      

      
        }
     );


});

// INSERT
app.route('/development/precheckin/submit')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});

 
  connection.query(
    "INSERT INTO `precheckin` (clinicId,vendorId,orderId,comments,attachments,allProducts,status,token,staffId)  VALUES ('" +  req.body.clinicId + "','" +  req.body.vendorId + "', '" +  req.body.orderId + "', '" +  req.body.comments + "', '" +  req.body.attachments + "', ?, '0', '" + token + "' ,'" +  req.body.staffId + "' ) ",req.body.allProducts, 
    function(error, results, fields) {
      if (error) return console.log(error);
      
       return res.status(200).json({success : 'Pre Check In succesfull!'});
      

      
        }
     );


});


// INSERT
app.route('/development/checkout/submit')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  var sql = "INSERT INTO `checkout` (clinicId,patientId,total_amount,allProducts,status,token,staffId,staffName)  VALUES ('" +  req.body.clinicId + "','" +  req.body.patientId + "','" +  req.body.total_amount + "', ?, '1', '" + token + "' ,'" +  req.body.staffId + "','" +  req.body.staffName + "' ) "
  if(req.body.ammend==true){
  sql = "INSERT INTO `checkout` (clinicId,patientId,total_amount,allProducts,status,token,staffId,staffName,create_time,ammend,ammendId)  VALUES ('" +  req.body.clinicId + "','" +  req.body.patientId + "','" +  req.body.total_amount + "', ?, '1', '" + token + "' ,'" +  req.body.staffId + "','" +  req.body.staffName + "','" +  req.body.create_time + "','true','" +  req.body.ammendId + "' ) "

  }
  connection.query(
    sql,req.body.allProducts, 
    function(error, results, fields) {
      if (error) return console.log(error);
      var finalProducts = req.body.finalProducts;
      var checkOutId = results.insertId;
      var length = finalProducts.length;
      var stmt='';var index=0;
      var stm2='';
      finalProducts.forEach(function(entry) {
       qty = JSON.parse(entry.quantity);
    //   console.log(qty.vials);
      if(entry.packing_type=='TABLETS'){
         var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.strips', JSON_EXTRACT(quantity, '$.strips')-"+ qty.strips +"),quantity=JSON_SET(quantity, '$.tablets', JSON_EXTRACT(quantity, '$.tablets')-"+ qty.totaltablets +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
         var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.totaltablets + "') ";
           }
            if(entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.vials', JSON_EXTRACT(quantity, '$.vials')-"+ qty.vials +"),quantity=JSON_SET(quantity, '$.mls', JSON_EXTRACT(quantity, '$.mls')-"+ qty.totalmls +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.totalmls + "') ";
           }
           if(entry.packing_type=='Per vial' || entry.packing_type=='per vial' ){
            var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.vials', JSON_EXTRACT(quantity, '$.vials')-"+ qty.vials +"),quantity=JSON_SET(quantity, '$.mls', JSON_EXTRACT(quantity, '$.mls')-"+ qty.totalmls +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
            var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.vials + "') ";
            }
             if(entry.packing_type=='per ampule'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.ampules', JSON_EXTRACT(quantity, '$.ampules')-"+ qty.totalampules +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.totalampules + "') ";
           }
                if(entry.packing_type=='BOTTLE'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.bottles', JSON_EXTRACT(quantity, '$.bottles')-"+ qty.bottles +"),quantity=JSON_SET(quantity, '$.unittotal', JSON_EXTRACT(quantity, '$.unittotal')-"+ qty.totalunits +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.totalunits + "') ";
           }
             if(entry.packing_type=='TUBE'){
              var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.tubes', JSON_EXTRACT(quantity, '$.tubes')-"+ qty.tubes +"),quantity=JSON_SET(quantity, '$.unittotal', JSON_EXTRACT(quantity, '$.unittotal')-"+ qty.totalunits +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
              var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.totalunits + "') ";
           }
        
              if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.units', JSON_EXTRACT(quantity, '$.units')-"+ qty.totalunits +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkouts` (clinicId,checkOutId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  checkOutId + "','" +  entry.productId + "','" +  qty.totalunits + "') ";
           } 
    
           
        connection.query(
          stmt, 
          function(error, results, fields) {
            if (error) return console.log(error);
            connection.query(
              stmt2, 
              function(error, results, fields) {
                if (error) return console.log(error);
              
                
                  }
               );
            
              }
           );
       
     
            index++;
     });
    
 //   console.log(stmt);
     if(index==length){
  
              
      return res.status(200).json({success : 'Products checked out of inventory successfully!'});
              
        
     }

      
        }
     );


});




// INSERT
app.route('/development/rollback/checkout/:checkOutId')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  connection.query(
    "UPDATE `checkout` SET rollback='true',rollback_comments='" + req.body.rollback_comments  + "'  WHERE id='"+ req.params.checkOutId  +"'", 
    function(error, results, fields) {
      if (error) return console.log(error);
      
      var finalProducts = req.body.finalProducts;
      var checkOutId = req.params.checkOutId;
      var length = finalProducts.length;
      var stmt='';var index=0;var stmt2="";
     // console.log(length); console.log(index);
      finalProducts.forEach(function(entry) {
       qty = JSON.parse(entry.quantity);
      if(entry.packing_type=='TABLETS'){
         var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.strips', JSON_EXTRACT(quantity, '$.strips')+"+ qty.strips +"),quantity=JSON_SET(quantity, '$.tablets', JSON_EXTRACT(quantity, '$.tablets')+"+ qty.totaltablets +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
         var stmt2 = "update clinic_checkouts SET status='-1' where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"' AND checkOutId='"+  checkOutId +"' ";
 
           }
            if(entry.packing_type=='Per vial' || entry.packing_type=='per vial' || entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.vials', JSON_EXTRACT(quantity, '$.vials')+"+ qty.vials +"),quantity=JSON_SET(quantity, '$.mls', JSON_EXTRACT(quantity, '$.mls')+"+ qty.totalmls +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "update clinic_checkouts SET status='-1' where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"' AND checkOutId='"+  checkOutId +"' ";
        
           }
             if(entry.packing_type=='per ampule'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.ampules', JSON_EXTRACT(quantity, '$.ampules')+"+ qty.totalampules +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "update clinic_checkouts SET status='-1' where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"' AND checkOutId='"+  checkOutId +"' ";
   
           }
                if(entry.packing_type=='BOTTLE'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.bottles', JSON_EXTRACT(quantity, '$.bottles')+"+ qty.bottles +"),quantity=JSON_SET(quantity, '$.unittotal', JSON_EXTRACT(quantity, '$.unittotal')+"+ qty.totalunits +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "update clinic_checkouts SET status='-1' where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"' AND checkOutId='"+  checkOutId +"' ";

           }
             if(entry.packing_type=='TUBE'){
              var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.tubes', JSON_EXTRACT(quantity, '$.tubes')+"+ qty.tubes +"),quantity=JSON_SET(quantity, '$.unittotal', JSON_EXTRACT(quantity, '$.unittotal')+"+ qty.totalunits +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
              var stmt2 = "update clinic_checkouts SET status='-1' where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"' AND checkOutId='"+  checkOutId +"' ";
            
           }
        
              if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.units', JSON_EXTRACT(quantity, '$.units')+"+ qty.totalunits +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "update clinic_checkouts SET status='-1' where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"' AND checkOutId='"+  checkOutId +"' ";
       
           } 
    
           
        connection.query(
          stmt, 
          function(error, results, fields) {
            if (error) return console.log(error);
            connection.query(
              stmt2, 
              function(error, results, fields) {
                if (error) return console.log(error);
                          
                  }
               ); 
              }
           );
       
     
            index++;
           ;
     });
    
 //   console.log(stmt);
     if(index==length){
    
              
      return res.status(200).json({success : 'Checkout rolled back from inventory successfully!'});
              
        
     }

      
        }
     );


});


// INSERT
app.route('/development/clinic/liveInventory/:clinicId')
.patch(function(req, res) {
  var entry = JSON.parse(req.body.postChange);

  var preChange;

  connection.query(
    "SELECT * FROM `clinic_inventory` where clinicId='"+ req.params.clinicId +"' AND productId='"+  entry.productId +"'",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      preChange = results[0];
      preChange = JSON.stringify(preChange);

   connection.query(
    "INSERT INTO `clinic_inventory_ammends` (clinicId,productId,preChange,postChange,remarks)  VALUES ('" +  req.params.clinicId + "','" +  entry.productId + "',?,?,?) ",[preChange,req.body.postChange,req.body.remarks], 
    function(error, results, fields) {
      if (error) return console.log(error);
      var clinicId = req.params.clinicId;
      var stmt='';
   
   
     var stmt = "update clinic_inventory SET quantity='"+ entry.quantity +"' where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
      /*if(entry.packing_type=='TABLETS'){
         var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.strips',"+ qty.strips +"),quantity=JSON_SET(quantity, '$.tablets',"+ qty.tablets +") where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
     
           }
            if(entry.packing_type=='Per vial' || entry.packing_type=='per vial' || entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.vials',"+ qty.vials +"),quantity=JSON_SET(quantity, '$.mls',"+ qty.mls +") where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
     
           }
             if(entry.packing_type=='per ampule'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.ampules',"+ qty.ampules +") where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
       
           }
                if(entry.packing_type=='BOTTLE'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.bottles',"+ qty.bottles +"),quantity=JSON_SET(quantity, '$.unittotal',"+ qty.unittotal +") where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
          
           }
             if(entry.packing_type=='TUBE'){
              var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.tubes', "+ qty.tubes +"),quantity=JSON_SET(quantity, '$.unittotal', "+ qty.unittotal +") where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
            
           }
        
              if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.units',"+ qty.units +") where clinicId='"+ clinicId +"' AND productId='"+  entry.productId +"'";
          
           } */
    
           
     return   connection.query(
          stmt, 
          function(error, results, fields) {
            if (error) return console.log(error);
        else   return res.status(200).json({success : 'Product stock count ammended successfully!'});
            
              }
           );
       
     
    
          }
          );
    
    }
  );



    
              
        
  

});

// INSERT
app.route('/development/clinicInventory/approve/submit')
.post(function(req, res) {
 // 1. Check for any existing product record in inventory
 var productId = []; var clinicId = req.body.clinicId;
 connection.query(
  "SELECT productId FROM `clinic_inventory` WHERE  clinicId='" + clinicId + "' ", 
  function(error, results, fields) {
    if (error) return res.status(500).json({ error: error });

  // 1. NO EXISTING RECORDS AT ALL
    /*if(results.length === 0) 
    {


      var finalProducts = req.body.finalProducts;
      var length = finalProducts.length;
      var stmt='';var index=0; var stmt2='';
      finalProducts.forEach(function(entry) {
        qty = JSON.parse(entry.quantity);
        if(index!=0){
          stmt += ",("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";

        }
        else {
          stmt += "("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
          
        }
     
            index++;
     });
    
     if(index==length){
      connection.query(
        "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES "+stmt, 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return  connection.query(
            "UPDATE `checkin` SET status='1' WHERE id='" + finalProducts[0].checkInId+ "'   ", 
            function(error, results, fields) {
              if (error) return console.log(error);
              
               return res.status(200).json({success : 'Products confirmed & added to inventory!'});
              
        
              
                }
             );
          
            }
         );
     }


    }  */
     // END OF   1. NO EXISTING RECORDS AT ALL

      var productId = [];
   



      if(results.length!==0){
        productId = results.map(function (obj) {
          return obj.productId;
        });
      }
   

      var finalProducts = req.body.finalProducts;
      var length = finalProducts.length;
      var stmt=''; var stmt2=''; var index=0;
      var stmt3=''; var stmt4='';
      finalProducts.forEach(function(entry) {
       if(productId.includes(entry.productId)){

        qty = JSON.parse(entry.quantity);
   



        if(entry.packing_type=='TABLETS'){
         var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.strips', JSON_EXTRACT(quantity, '$.strips')+"+ qty.strips +"),quantity=JSON_SET(quantity, '$.tablets', JSON_EXTRACT(quantity, '$.tablets')+"+ qty.tablets +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
         var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.tablets + "') ";
           }
            if(entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
            //  console.log("mls"+qty.mls);
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.vials', JSON_EXTRACT(quantity, '$.vials')+"+ qty.vials +"),quantity=JSON_SET(quantity, '$.mls', JSON_EXTRACT(quantity, '$.mls')+"+ qty.mls +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.mls + "') ";
           }
           if(entry.packing_type=='Per vial' || entry.packing_type=='per vial'){
            var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.vials', JSON_EXTRACT(quantity, '$.vials')+"+ qty.vials +"),quantity=JSON_SET(quantity, '$.mls', JSON_EXTRACT(quantity, '$.mls')+"+ qty.mls +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
            var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.vials + "') ";
            }
             if(entry.packing_type=='per ampule'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.ampules', JSON_EXTRACT(quantity, '$.ampules')+"+ qty.ampules +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.ampules + "') ";
           }
                if(entry.packing_type=='BOTTLE'){
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.bottles', JSON_EXTRACT(quantity, '$.bottles')+"+ qty.bottles +"),quantity=JSON_SET(quantity, '$.unittotal', JSON_EXTRACT(quantity, '$.unittotal')+"+ qty.unittotal +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.unittotal + "') ";
           }
             if(entry.packing_type=='TUBE'){
              var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.tubes', JSON_EXTRACT(quantity, '$.tubes')+"+ qty.tubes +"),quantity=JSON_SET(quantity, '$.unittotal', JSON_EXTRACT(quantity, '$.unittotal')+"+ qty.unittotal +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
              var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.unittotal + "') ";
           }
        
              if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
        /*  var quantity = {
             boxes:Number(qty_boxes),
             unitperbox:Number(qty_unitperbox),
             units:Number(qty_units),
           }; */
           var stmt = "update clinic_inventory SET quantity=JSON_SET(quantity, '$.boxes', JSON_EXTRACT(quantity, '$.boxes')+"+ qty.boxes +"),quantity=JSON_SET(quantity, '$.units', JSON_EXTRACT(quantity, '$.units')+"+ qty.units +") where clinicId='"+ entry.clinicId +"' AND productId='"+  entry.productId +"'";
           var stmt2 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.units + "') ";
           }
      

        connection.query(
          stmt, 
          function(error, results, fields) {
            if (error) return console.log(error);
            connection.query(
              stmt2, 
              function(error, results, fields) {
                if (error) return console.log(error);
              
                
                  }
               );
            
              }
           );
       }


       else if(!productId.includes(entry.productId)){
  
        qty = JSON.parse(entry.quantity);
   



        if(entry.packing_type=='TABLETS'){
         var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
         var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.tablets + "') ";
           }
            if(entry.packing_type=='Vial / per cc' || entry.packing_type=='Vial / per 0.5 cc' || entry.packing_type=='vial per cc'){
              var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
           var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.mls + "') ";
           }
           if(entry.packing_type=='Per vial' || entry.packing_type=='per vial'){
            var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
         var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.vials + "') ";
         }
             if(entry.packing_type=='per ampule'){
              var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
           var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.ampules + "') ";
           }
                if(entry.packing_type=='BOTTLE'){
                  var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
           var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.unittotal + "') ";
           }
             if(entry.packing_type=='TUBE'){
              var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
              var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.unittotal + "') ";
           }
        
              if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){
      
           var stmt3 = "INSERT INTO `clinic_inventory` (clinicId,checkInId,productId,quantity)  VALUES ("+entry.clinicId+","+entry.checkInId+","+entry.productId+",'"+entry.quantity+"')";
           var stmt4 = "INSERT INTO `clinic_checkins` (clinicId,checkInId,productId,quantity)  VALUES ('" +  entry.clinicId + "','" +  entry.checkInId + "','" +  entry.productId + "','" +  qty.units + "') ";
           }
      

        connection.query(
          stmt3, 
          function(error, results, fields) {
            if (error) return console.log(error);
            connection.query(
              stmt4, 
              function(error, results, fields) {
                if (error) return console.log(error);
              
                
                  }
               );
            
              }
           );

       }
     
            index++;
     });
    
     if(index==length){
  
              
      return  connection.query(
        "UPDATE `checkin` SET status='1' WHERE id='" + finalProducts[0].checkInId+ "'   ", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
           return res.status(200).json({success : 'Products confirmed & added to inventory!'});
          
    
          
            }
         );
              
        
     }

     
    //return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
  }
);


 // 2. If existing, update that specific record


 // 3. If new insert new record




    


});


// INSERT
app.route('/development/clinicInventory/approve/reject/:checkInId')
.post(function(req, res) {
 
  return  connection.query(
    "UPDATE `checkin` SET status='-1' WHERE id='" + req.params.checkInId+ "'   ", 
    function(error, results, fields) {
      if (error) return console.log(error);
      
       return res.status(200).json({success : 'Check In Rejected!'});
      

      
        }
     );

    


});



// INSERT
app.route('/development/checkin/submit')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  connection.query(
    "INSERT INTO `checkin` (clinicId,preCheckInId,invoiceId,totalAmount,comments,attachments,allProducts,status,token,staffId)  VALUES ('" +  req.body.clinicId + "','" +  req.body.preCheckInId + "', '" +  req.body.invoiceId + "','" +  req.body.totalAmount + "', '" +  req.body.comments + "', '" +  req.body.attachments + "', ?, '0', '" + token + "','" +  req.body.staffId + "' ) ",req.body.allProducts, 
    function(error, results, fields) {
      if (error) return console.log(error);
      
     return connection.query(
        "UPDATE `precheckin`  SET status='1'  WHERE id='" +  req.body.preCheckInId + "'  ", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
           return res.status(200).json({success : 'Check In succesfull!'});
          
    
          
            }
         );

      
        }
     );


});


// ACCOUNT

// INSERT
app.route('/development/medicine')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
 
  return connection.query("INSERT INTO `admin_medicine_inventory` (company_name,product_category,manufacturer,product_name,ingredient,color,packing_type,packing_quantity,manufacturer_barcode,internal_barcode,status,token)  VALUES ('" +  req.body.company_name + "','" +  req.body.product_category + "','" +  req.body.manufacturer + "','" +  req.body.product_name + "','" +  req.body.ingredient + "','" +  req.body.color + "','" +  req.body.packing_type + "',?,?,?,'1','" + token + "') ",[req.body.packing_quantity,req.body.manufacturer_barcode, req.body.internal_barcode], 
    function(error, results, fields) {
      if (error)  {
        console.log(error);
        return   res.status(500).json({ error: error });
      } 
      return res.status(200).json({success : 'Medicine Record creation succesfull!'});

      
        }
     );


});


app.route('/development/medicine/:id')
.patch(function(req, res, next) {

  return connection.query(
    "UPDATE  `admin_medicine_inventory` SET  company_name='" + req.body.company_name +  "',product_category='" + req.body.product_category +  "',manufacturer='" + req.body.manufacturer +  "',product_name='" + req.body.product_name +  "',ingredient='" + req.body.ingredient +  "',color='" + req.body.color +  "',packing_type='" + req.body.packing_type +  "',packing_quantity=?,manufacturer_barcode='" + req.body.manufacturer_barcode +  "',internal_barcode='" + req.body.internal_barcode +  "',internal_qrcode=? WHERE internal_qrcode = ? ", [req.body.packing_quantity,req.body.internal_qrcode,req.params.id],
    function(error, results, fields) {
      if (error) console.log(error)
     return res.status(200).json({success : 'Medicine updated successfully!' });
    }
  );
});

app.route('/development/crons')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `clinic` ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });

      var Array = results;
     
              
              let promises = []; 
              for (let i = 0; i < Array.length; i++) {        
                promises.push(axios.post('https://backend.enigmedsvcs.com/development/dailyReport/'+Array[i].id ,{
                  emailPrimary:Array[i].pic_email,
                  namePrimary:Array[i].pic_name,
                  clinicName:Array[i].name,
                  emailSecondary:Array[i].billing_email
                } ));
            }

            axios.all(promises)
            .then(axios.spread((...args) => {
                for (let i = 0; i < args.length; i++) {
                  
                               
              //   console.log(i);
                    
                }
            }))
            .then((results) => {
             
              return res.status(200).json({success : 'Medicine Info'});
        
            }, (error) => {
              console.log(error.message)
            });


     
    }
  );
});




app.route('/development/crons2')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `clinic` ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });

      var Array = results;
     
              
              let promises = []; 
              for (let i = 0; i < Array.length; i++) {        
                promises.push(axios.get('https://backend.enigmedsvcs.com/development/cron/lowStockAlert/'+Array[i].id ,{
               
                } ));
            }

            axios.all(promises)
            .then(axios.spread((...args) => {
                for (let i = 0; i < args.length; i++) {
                  
                               
              //   console.log(i);
                    
                }
            }))
            .then((results) => {
             
              return res.status(200).json({success : 'Stock Info'});
        
            }, (error) => {
              console.log(error.message)
            });


     
    }
  );
});






app.route('/development/crons3')
.get(function(req, res, next) {
  var pendingArray = [];
  connection.query(
    "SELECT checkin.id as id,checkin.preCheckInId as preCheckInId,checkin.invoiceId as invoiceId,checkin.totalAmount as totalAmount,checkin.comments as comments,checkin.attachments as attachments,checkin.clinicId as clinicId,checkin.create_time as create_time,checkin.status as status,clinic.name as clinicName  FROM `checkin` LEFT JOIN `clinic` on checkin.clinicId=clinic.id  where checkin.status=0 ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) 
      {
        return res.status(200).json({ success: "No records pending" });
      }
      if(results.length != 0) 
      {
        pendingArray = results;
        var message = pendingArray.length + " Check Ins pending approval.";
        connection.query(
          "INSERT INTO `notifications_admin` (title,message,affectedJson,readReceipt)  VALUES ('Daily Check In Alert','" +  message + "',?,'[]') ",[ JSON.stringify(pendingArray)], 
          function(error, results, fields) {
            if (error) return console.log(error);
            return res.status(200).json({ success:'done' });
      
            
            
      
            
              }
           );


      
      }

    

     
    }
  );
});

app.route('/development/dailyReport/:clinicId')
.post(function(req, res, next) {
 // console.log(req.params.clinicId)
  var inventoryArray;
var inventoryString="";
var checkoutArray;
var checkoutString="";
var clinicId = req.params.clinicId;
var currDay = moment().date();
var totalDays = moment().daysInMonth();
var monthName  = moment().format('MMMM');
var fullInventoryArray;
var fullInventoryString="";


if(currDay==totalDays){





  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + clinicId + "'  AND cast(clinic_checkins.create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)  "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + clinicId + "' AND cast(clinic_checkouts.create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)  AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + clinicId + "' AND (ci.total IS NOT NULL OR co.total  IS NOT NULL) ORDER BY outgoingQuantity desc",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
     // if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
      inventoryArray = results;
    
      connection.query(
        "select x.productId as productId,x.manufacturerBarcode as manufacturerBarcode,x.clinicBarcode as clinicBarcode,x.manufacturer as manufacturer,x.name as name,x.prescription as prescription,x.actualQuantity as actualQuantity,x.incomingQuantity as incomingQuantity,x.outgoingQuantity as outgoingQuantity,x.balanceQuantity as balanceQuantity,CAST(((IFNULL(x.outgoingQuantity, 0)/((IFNULL(x.actualQuantity, 0) + IFNULL(x.outgoingQuantity, 0) - IFNULL(x.incomingQuantity, 0))+IFNULL(x.incomingQuantity, 0)))*100) AS DECIMAL(6,2)) as movementPct from (  "+
        " select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity, "+
        " CASE"+
        "     WHEN admin_medicine_inventory.packing_type='TABLETS' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.tablets')"+
        "      WHEN admin_medicine_inventory.packing_type='BOTTLE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
        "      WHEN admin_medicine_inventory.packing_type='TUBE' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.unittotal')"+
        "     WHEN admin_medicine_inventory.packing_type='per ampule' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.ampules')"+
        "      WHEN admin_medicine_inventory.packing_type='Per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
        "      WHEN admin_medicine_inventory.packing_type='per vial' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.vials')"+
             "     WHEN admin_medicine_inventory.packing_type='Vial / per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
             "      WHEN admin_medicine_inventory.packing_type='Vial / per 0.5 cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
             "      WHEN admin_medicine_inventory.packing_type='vial per cc' THEN JSON_EXTRACT(clinic_inventory.quantity, '$.mls')"+
             "     ELSE JSON_EXTRACT(clinic_inventory.quantity,'$.units')"+
             "   END as actualQuantity"+
             "    from clinic_inventory "+
             "    LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
             "       FROM clinic_checkins "+
             "      WHERE clinic_checkins.clinicId = '" + clinicId + "'  AND MONTH(clinic_checkins.create_time) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND YEAR(clinic_checkins.create_time) = YEAR(CURRENT_DATE())  "+
             "    GROUP BY clinic_checkins.productId "+
             "     ) ci ON clinic_inventory.productId=ci.productId "+
             "   LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
             "     FROM clinic_checkouts "+
             "     WHERE clinic_checkouts.clinicId = '" + clinicId + "' AND MONTH(clinic_checkouts.create_time) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND YEAR(clinic_checkouts.create_time) = YEAR(CURRENT_DATE()) AND clinic_checkouts.status IS NULL "+
             "   GROUP BY clinic_checkouts.productId "+
             "     ) co ON clinic_inventory.productId=co.productId "+
             "    LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
             "    WHERE clinic_inventory.clinicId='" + clinicId + "'  "+
             "   ) as x ORDER BY movementPct DESC",
        function(error, results, fields) {
          if (error) return res.status(500).json({ error: error });
        else {
      
          fullInventoryArray = results;
      

          connection.query(
            "SELECT * FROM checkout WHERE clinicId='" + clinicId + "' AND cast(create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)",
            function(error, results, fields) {
              checkoutArray = results;
              var htmlFormat="";
              var index=0; var length = inventoryArray.length;
      inventoryArray.forEach(function(entry) {
      
      
      var currentQuantity;
      currentQuantity =  JSON.parse(entry.balanceQuantity).units;
      if(entry.prescription=='TABLETS'){
       
       
       currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
      
      }
      else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
       
        currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
       
       }
       else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
        
         currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
        
        }
      else if(entry.prescription=='per ampule'){
       
      
       currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
      
      }
      else if(entry.prescription=='BOTTLE'){
      
      currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
      }
      else  if(entry.prescription=='TUBE'){
      
       currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
      }
      /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
      
      
      } */
      var incomingQuantity = entry.incomingQuantity;
      var outgoingQuantity = entry.outgoingQuantity;
      if(entry.incomingQuantity==null){ incomingQuantity='-'};
      if(entry.outgoingQuantity==null){ outgoingQuantity='-'};
      
      inventoryString +=  '<tr>'+
      '<td>' + parseInt(index+1) +'</td>'+
      '<td>' + entry.manufacturer  +'</td>'+
      '<td>' + entry.name  +'</td>'+
      '<td>' + entry.prescription  +'</td>'+
      '<td>' + incomingQuantity  +'</td>'+
      '<td>' + outgoingQuantity  +'</td>'+
      '<td>' + currentQuantity  +'</td>'+
      
      '</tr>';
      
      
           index++;
      });
      
      
      if(index==length){
      
      htmlFormat += '<!DOCTYPE html>'+
      '<html>'+
      '<head>'+
      '<style>'+
      '#customers {'+
        'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
        'border-collapse: collapse;'+
        'width: 100%;'+
      '}'+
      '#customers td, #customers th {'+
        'border: 1px solid #000000;'+
        'padding: 8px;'+
      '}'+
      '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
      '#customers tr:hover {background-color: #ddd;}'+
      '#customers th {'+
        'padding-top: 12px;'+
        'padding-bottom: 12px;'+
        'text-align: left;'+
        'background-color: #6D0A0A;'+
        'color: white;'+
        'font-weight: bold;'+
      '}'+
      '#customers thead {'+
      'display: table-header-group'+
      '}'+
      '</style>'+
      '</head>'+
      '<body>'+
      '<h1 style="text-align:center">DAILY & '+moment().format("MMMM") +' SUMMARY REPORT</h1><br>'+
      '<h2><b>Daily Movement ['+moment().format("Do MMM YY") +']</b></h2>'+
      '<table id="customers" style="page-break-inside: avoid;">'+
      '<thead>'+
        '<tr>'+
          '<th>Num.</th>'+
          '<th>Manufacturer</th>'+
          '<th>Product</th>'+
          '<th>Prescription</th>'+
          '<th>Incoming Today</th>'+
          '<th>Outgoing Today</th>'+
          '<th>Balance Stock</th>'+
          
        '</tr></thead>'+inventoryString+
      '</table>';
      
      var index2=0; var length2 = checkoutArray.length;
      checkoutArray.forEach(function(entry) {
        var data = JSON.parse(entry.allProducts);
      
      
      var i=0;
      var finalData="";
        data.forEach(function(entry2) {
          
          if(entry2.packing_type=='TABLETS'){
            if(entry2.quantity_strips==0){
              finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tablets + " tab</mark></b><br>";
            }
           else if(entry2.quantity_tablets==0){
              finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips</mark></b><br>";
            }
            else{
              finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips & " + entry2.quantity_tablets + " tab</mark></b><br>";
            }
               
              }
              if(entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per 0.5 cc' || entry2.packing_type=='per vial' || entry2.packing_type=='Per vial' || entry2.packing_type=='vial per cc'){
                if(entry2.quantity_mls==0){
                  finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_vials + "vials</mark></b><br>";
                }
                else if(entry2.quantity_vials==0){
                  finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML<br></mark></b>";
                }
                else{
                  finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML  & " + entry2.quantity_vials + "vials</mark></b><br>";
                }
             
              }
             if(entry2.packing_type=='per ampule'){    
             finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_ampules+" ampules</mark></b><br>";
              }
                if(entry2.packing_type=='BOTTLE'){
      
                  if(entry2.quantity_bottles==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + "</mark></b><br>" ;
                  }
                  else if(entry2.quantity_unittotal==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_bottles + " bottles</mark></b><br>" ;
                  }
                  else{
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + " & " + entry2.quantity_bottles + " bottles</mark></b><br>" ;
                  }
                  
             
              }
                if(entry2.packing_type=='TUBE'){
      
                  if(entry2.quantity_tubes==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + "</mark></b><br>" ;    
                  }
                  else if(entry2.quantity_unittotal==0){
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tubes + " tubes</mark></b><br>" ;    
                  }
                  else{
                    finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + " & " + entry2.quantity_tubes + " tubes</mark></b><br>" ;    
                  }
                    
              }
              else if(entry2.packing_type=='Per supp' || entry2.packing_type=='SACHET' || entry2.packing_type=='Sachet' || entry2.packing_type=='box' || entry2.packing_type=='Set' || entry2.packing_type=='ROLLS' || entry2.packing_type=='PIECES' || entry2.packing_type=='pack' || entry2.packing_type=='Diskus') {
                finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_units+" units</mark></b><br>";
              }
         i++;
       
      });
      
      if(data.length==i){
      
      var amt = parseFloat(entry.total_amount); var rollback = "";
      if(entry.rollback=='true'){
      rollback =  "  <span style='color:red;'>~ROLLED BACK~</span>";
      }
        checkoutString +=  '<tr>'+
        '<td>' + parseInt(index2+1)  + rollback + '</td>'+
        '<td>' + entry.patientId  +'</td>'+
        '<td>' + amt.toFixed(2)  +'</td>'+
        '<td>' + moment(entry.create_time).format('Do MMMM YYYY hh:mm a')  +'</td>'+
        '<td>' + finalData +'</td>'+
        '<td>' + entry.staffName  +'</td>'+
       
      '</tr>';
        
      
             index2++;
      }        
      
      
      
      
      
        
      });
      
      
      
      if(index2==length2){
      
        htmlFormat +=  '<h2 style="page-break-before:always;"><b>Daily Checkouts ['+moment().format("Do MMM YY") +']</b></h2>'+
        '<table id="customers" style="page-break-inside: avoid;">'+
        '<thead>'+
          '<tr>'+
            '<th>Transaction ID</th>'+
            '<th>Patient MRN Num.</th>'+
            '<th>Amount (RM)</th>'+
            '<th>Date</th>'+
            '<th>Products</th>'+
            '<th>Staff</th>'+
          '</tr></thead>'+checkoutString+
        '</table>';

    /*   '</body>'+
        '</html>'; */

      
        var index3=0; var length3 = fullInventoryArray.length;
        fullInventoryArray.forEach(function(entry) {
          var currentQuantity;
          currentQuantity =  JSON.parse(entry.balanceQuantity).units;
          if(entry.prescription=='TABLETS'){
           
           
           currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
        
          }
          else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
           
            currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
           
           }
           else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
            
             currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
            
            }
        else if(entry.prescription=='per ampule'){
           
        
           currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
        
          }
         else if(entry.prescription=='BOTTLE'){
        
          currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
          }
          else  if(entry.prescription=='TUBE'){
        
           currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
          }
        /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
          
          
          } */
          var incomingQuantity = entry.incomingQuantity;
          var outgoingQuantity = entry.outgoingQuantity;
          var movementPct = entry.movementPct;
          if(entry.incomingQuantity==null){ incomingQuantity='NA'};
          if(entry.outgoingQuantity==null){ outgoingQuantity='NA'};
          if(entry.movementPct==null){ movementPct='NA'};
    
          fullInventoryString +=  '<tr>'+
          '<td>' + parseInt(index3+1)  +'</td>'+
          '<td>' + entry.manufacturer  +'</td>'+
          '<td>' + entry.name  +'</td>'+
          '<td>' + entry.prescription  +'</td>'+
          '<td>' + incomingQuantity  +'</td>'+
          '<td>' + outgoingQuantity  +'</td>'+
          '<td>' + currentQuantity  +'</td>'+
          '<td>' + movementPct  +'</td>'+
        
        '</tr>';
          
        
               index3++;
        });
  
  
        if(index3==length3){
         
          htmlFormat += '<h2 style="page-break-before:always;"><b>'+moment().format("MMMM") +' Inventory Summary</b></h2>'+
          '<table id="customers" style="page-break-inside: avoid;">'+
            '<tr>'+
              '<thead>'+
              '<th>Index</th>'+
              '<th>Manufacturer</th>'+
              '<th>Product</th>'+
              '<th>Prescription</th>'+
              '<th>Total Incoming Stock Qty</th>'+
              '<th>Total Outgoing Stock Qty</th>'+
              '<th>Current Stock Qty</th>'+
              '<th>Movement</th>'+
            '</tr></thead>'+fullInventoryString+
          '</table>'+
          '</body>'+
          '</html>';
          var options =  {
            "pageSize": "A4",
            "orientation": "landscape",
              "footerFontSize":"8",
              "footerRight":"ENIGMA SUMMARY REPORT ["+moment().format("MMMM") +"]",
              "footerFontName":"Geometric sans-serif",
              "title":"Clinic Summary Report.pdf",
          };
          
          return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Summary Report.pdf', options = options).then(function(result) {
          const pdflink = result.pdf;
        
        
        
          
          readHTMLFile('emails/dailysummary.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                username:req.body.namePrimary,
                clinicName:req.body.clinicName,
            }; 
            var htmlToSend = template(replacements);
            var mailOptions = {
              from: '"' +moment().format("MMMM") +' Summary - ENIGMA Inventory" <noreply@medicodesolution.com>',
              to: req.body.emailPrimary+','+req.body.emailSecondary,
              subject : 'Summary Report',
                html : htmlToSend,
                attachments: [
                  {   // utf-8 string as an attachment
                      filename: 'Summary Report.pdf',
                      path:pdflink
                  }
              ]
             };
            mailTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                } 
              
              return res.status(200).json({success : ' Check email for Reset Password link.'});
           });
        });
          
          
          }).catch((error) => console.error('There was an error', error));
  
        }
  





      
      }
      
      
      }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
            }
          );
    
        }


       
        }
      );
  
    }
   
    }
  );





}



if(currDay!=totalDays){

  connection.query(
    "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
    "from clinic_inventory "+ 
    "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
                "FROM clinic_checkins "+
                "WHERE clinic_checkins.clinicId = '" + clinicId + "'  AND cast(clinic_checkins.create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)  "+
                "GROUP BY clinic_checkins.productId "+
              ") ci ON clinic_inventory.productId=ci.productId "+
    "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
                "FROM clinic_checkouts "+
                "WHERE clinic_checkouts.clinicId = '" + clinicId + "' AND cast(clinic_checkouts.create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)  AND clinic_checkouts.status IS NULL "+
                "GROUP BY clinic_checkouts.productId "+
              ") co ON clinic_inventory.productId=co.productId "+
    "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
    "WHERE clinic_inventory.clinicId='" + clinicId + "' AND (ci.total IS NOT NULL OR co.total  IS NOT NULL) ORDER BY outgoingQuantity desc",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
     // if(results.length === 0) return res.status(200).json({ error: "Empty inventory" });
    else {
      inventoryArray = results;
      connection.query(
        "SELECT * FROM checkout WHERE clinicId='" + clinicId + "' AND cast(create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)",
        function(error, results, fields) {
          checkoutArray = results;
          var htmlFormat="";
          var index=0; var length = inventoryArray.length;
  inventoryArray.forEach(function(entry) {
  
  
  var currentQuantity;
  currentQuantity =  JSON.parse(entry.balanceQuantity).units;
  if(entry.prescription=='TABLETS'){
   
   
   currentQuantity =  JSON.parse(entry.balanceQuantity).tablets+" tab("+ parseInt(JSON.parse(entry.balanceQuantity).tablets/JSON.parse(entry.balanceQuantity).tabletsperstrip)+" strips)";
  
  }
  else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
   
    currentQuantity =  parseInt(JSON.parse(entry.balanceQuantity).mls +" CC("+ parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial))+ "vials";
   
   }
   else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
    
     currentQuantity =  JSON.parse(entry.balanceQuantity).vials+ " vials";
    
    }
  else if(entry.prescription=='per ampule'){
   
  
   currentQuantity =  JSON.parse(entry.balanceQuantity).ampules + "ampules";
  
  }
  else if(entry.prescription=='BOTTLE'){
  
  currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitperbottle+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle) + " bottles)";
  }
  else  if(entry.prescription=='TUBE'){
  
   currentQuantity =  JSON.parse(entry.balanceQuantity).unittotal + JSON.parse(entry.balanceQuantity).unitpertube+ "("+ parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube) + " tubes)";
  }
  /*  else if(entry.packing_type=='Per supp' || entry.packing_type=='SACHET' || entry.packing_type=='Sachet' || entry.packing_type=='box' || entry.packing_type=='Set' || entry.packing_type=='ROLLS' || entry.packing_type=='PIECES' || entry.packing_type=='pack' || entry.packing_type=='Diskus'){}
  
  
  } */
  var incomingQuantity = entry.incomingQuantity;
  var outgoingQuantity = entry.outgoingQuantity;
  if(entry.incomingQuantity==null){ incomingQuantity='-'};
  if(entry.outgoingQuantity==null){ outgoingQuantity='-'};
  
  inventoryString +=  '<tr>'+
  '<td>' + parseInt(index+1) +'</td>'+
  '<td>' + entry.manufacturer  +'</td>'+
  '<td>' + entry.name  +'</td>'+
  '<td>' + entry.prescription  +'</td>'+
  '<td>' + incomingQuantity  +'</td>'+
  '<td>' + outgoingQuantity  +'</td>'+
  '<td>' + currentQuantity  +'</td>'+
  
  '</tr>';
  
  
       index++;
  });
  
  
  if(index==length){
  
  htmlFormat += '<!DOCTYPE html>'+
  '<html>'+
  '<head>'+
  '<style>'+
  '#customers {'+
    'font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;'+
    'border-collapse: collapse;'+
    'width: 100%;'+
  '}'+
  '#customers td, #customers th {'+
    'border: 1px solid #000000;'+
    'padding: 8px;'+
  '}'+
  '#customers tr:nth-child(even){background-color: #f2f2f2;}'+
  '#customers tr:hover {background-color: #ddd;}'+
  '#customers th {'+
    'padding-top: 12px;'+
    'padding-bottom: 12px;'+
    'text-align: left;'+
    'background-color: #6D0A0A;'+
    'color: white;'+
    'font-weight: bold;'+
  '}'+
  '#customers thead {'+
  'display: table-header-group'+
  '}'+
  '</style>'+
  '</head>'+
  '<body>'+
  '<h1 style="text-align:center">DAILY SUMMARY REPORT</h1><br>'+
  '<h2><b>Daily Movement ['+moment().format("Do MMM YY") +']</b></h2>'+
  '<table id="customers" style="page-break-inside: avoid;">'+
  '<thead>'+
    '<tr>'+
      '<th>Num.</th>'+
      '<th>Manufacturer</th>'+
      '<th>Product</th>'+
      '<th>Prescription</th>'+
      '<th>Incoming Today</th>'+
      '<th>Outgoing Today</th>'+
      '<th>Balance Stock</th>'+
      
    '</tr></thead>'+inventoryString+
  '</table>';
  
  var index2=0; var length2 = checkoutArray.length;
  checkoutArray.forEach(function(entry) {
    var data = JSON.parse(entry.allProducts);
  
  
  var i=0;
  var finalData="";
    data.forEach(function(entry2) {
      
      if(entry2.packing_type=='TABLETS'){
        if(entry2.quantity_strips==0){
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tablets + " tab</mark></b><br>";
        }
       else if(entry2.quantity_tablets==0){
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips</mark></b><br>";
        }
        else{
          finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_strips+" strips & " + entry2.quantity_tablets + " tab</mark></b><br>";
        }
           
          }
          if(entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per cc' || entry2.packing_type=='Vial / per 0.5 cc' || entry2.packing_type=='per vial' || entry2.packing_type=='Per vial' || entry2.packing_type=='vial per cc'){
            if(entry2.quantity_mls==0){
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_vials + "vials</mark></b><br>";
            }
            else if(entry2.quantity_vials==0){
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML<br></mark></b>";
            }
            else{
              finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b> "+entry2.quantity_mls+" ML  & " + entry2.quantity_vials + "vials</mark></b><br>";
            }
         
          }
         if(entry2.packing_type=='per ampule'){    
         finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_ampules+" ampules</mark></b><br>";
          }
            if(entry2.packing_type=='BOTTLE'){
  
              if(entry2.quantity_bottles==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + "</mark></b><br>" ;
              }
              else if(entry2.quantity_unittotal==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_bottles + " bottles</mark></b><br>" ;
              }
              else{
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitperbottle + " & " + entry2.quantity_bottles + " bottles</mark></b><br>" ;
              }
              
         
          }
            if(entry2.packing_type=='TUBE'){
  
              if(entry2.quantity_tubes==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + "</mark></b><br>" ;    
              }
              else if(entry2.quantity_unittotal==0){
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+ entry2.quantity_tubes + " tubes</mark></b><br>" ;    
              }
              else{
                finalData +=  i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_unittotal + entry2.quantity_unitpertube + " & " + entry2.quantity_tubes + " tubes</mark></b><br>" ;    
              }
                
          }
          else if(entry2.packing_type=='Per supp' || entry2.packing_type=='SACHET' || entry2.packing_type=='Sachet' || entry2.packing_type=='box' || entry2.packing_type=='Set' || entry2.packing_type=='ROLLS' || entry2.packing_type=='PIECES' || entry2.packing_type=='pack' || entry2.packing_type=='Diskus') {
            finalData += i+1+") "+ entry2.product_name + "("+ entry2.manufacturer + ")-> <mark><b>"+entry2.quantity_units+" units</mark></b><br>";
          }
     i++;
   
  });
  
  if(data.length==i){
  
  var amt = parseFloat(entry.total_amount); var rollback = "";
  if(entry.rollback=='true'){
  rollback =  "  <span style='color:red;'>~ROLLED BACK~</span>";
  }
    checkoutString +=  '<tr>'+
    '<td>' + parseInt(index2+1)  + rollback + '</td>'+
    '<td>' + entry.patientId  +'</td>'+
    '<td>' + amt.toFixed(2)  +'</td>'+
    '<td>' + moment(entry.create_time).format('Do MMMM YYYY hh:mm a')  +'</td>'+
    '<td>' + finalData +'</td>'+
    '<td>' + entry.staffName  +'</td>'+
   
  '</tr>';
    
  
         index2++;
  }        
  
  
  
  
  
    
  });
  
  
  
  if(index2==length2){
  
    htmlFormat +=  '<h2 style="page-break-before:always;"><b>Daily Checkouts ['+moment().format("Do MMM YY") +']</b></h2>'+
    '<table id="customers" style="page-break-inside: avoid;">'+
    '<thead>'+
      '<tr>'+
        '<th>Transaction ID</th>'+
        '<th>Patient MRN Num.</th>'+
        '<th>Amount (RM)</th>'+
        '<th>Date</th>'+
        '<th>Products</th>'+
        '<th>Staff</th>'+
      '</tr></thead>'+checkoutString+
    '</table>'+
   '</body>'+
    '</html>';
    var options =  {
      "pageSize": "A4",
      "orientation": "landscape",
        "footerFontSize":"8",
        "footerRight":"ENIGMA SUMMARY REPORT ["+moment().format("Do MMM YY") +"]",
        "footerFontName":"Geometric sans-serif",
        "title":"Clinic Summary Report.pdf",
    };
    
    return a2pClient.wkhtmltopdfFromHtml(htmlFormat, inline = true, filename = 'Clinic Summary Report.pdf', options = options).then(function(result) {
    const pdflink = result.pdf;
  
  
  
    
    readHTMLFile('emails/dailysummary.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
          username:req.body.namePrimary,
          clinicName:req.body.clinicName,
      }; 
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: '"Daily Summary - ENIGMA Inventory" <noreply@medicodesolution.com>',
        to: req.body.emailPrimary+','+req.body.emailSecondary,
        subject : 'Summary Report',
          html : htmlToSend,
          attachments: [
            {   // utf-8 string as an attachment
                filename: 'Summary Report.pdf',
                path:pdflink
            }
        ]
       };
      mailTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          } 
        
        return res.status(200).json({success : ' Check email for Reset Password link.'});
     });
  });
    
    
    }).catch((error) => console.error('There was an error', error));
  
  }
  
  
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        }
      );
  
  
    }
   
    }
  );



}




});

app.route('/development/cron/lowStockAlert/:id')
.get(function(req, res, next) {
  var clinicId = req.params.id;
  var lowStockInventory = [];
  var allInventory = [];
connection.query(
  "select clinic_inventory.productId,ci.total as incomingQuantity,co.total as outgoingQuantity,admin_medicine_inventory.product_name as name,admin_medicine_inventory.manufacturer_barcode as manufacturerBarcode,admin_medicine_inventory.internal_barcode as clinicBarcode,admin_medicine_inventory.company_name as distributor,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.packing_type as prescription,clinic_inventory.quantity  as balanceQuantity,ROUND((co.total/ci.total )*100,1) as movementPct "+
  "from clinic_inventory "+ 
  "LEFT JOIN ( SELECT clinic_checkins.productId,SUM(clinic_checkins.quantity) as total "+
              "FROM clinic_checkins "+
              "WHERE clinic_checkins.clinicId = '" + clinicId + "'  AND cast(clinic_checkins.create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)  "+
              "GROUP BY clinic_checkins.productId "+
            ") ci ON clinic_inventory.productId=ci.productId "+
  "LEFT JOIN ( SELECT clinic_checkouts.productId,SUM(clinic_checkouts.quantity) as total "+
              "FROM clinic_checkouts "+
              "WHERE clinic_checkouts.clinicId = '" + clinicId + "' AND cast(clinic_checkouts.create_time as date)=SUBDATE(CURDATE(), INTERVAL 1 DAY)  AND clinic_checkouts.status IS NULL "+
              "GROUP BY clinic_checkouts.productId "+
            ") co ON clinic_inventory.productId=co.productId "+
  "LEFT JOIN admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode "+
  "WHERE clinic_inventory.clinicId='" + clinicId + "' ",
  function(error, results, fields) {
    if (error) return res.status(500).json({ error: error });
    if(results.length==0){
      return res.status(200).json({ success:'done' });
    }
    if(results.length!=0){
     
    allInventory = results;
      async.each(allInventory, function(entry, callback) {

        var currentQuantity;
currentQuantity =  JSON.parse(entry.balanceQuantity).units;
if(entry.prescription=='TABLETS'){
 
  if(JSON.parse(entry.balanceQuantity).tablets<50){
    lowStockInventory.push(entry);
  }
}
else if(entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per cc' || entry.prescription=='Vial / per 0.5 cc' || entry.prescription=='vial per cc'){
  if(parseInt(JSON.parse(entry.balanceQuantity).mls/JSON.parse(entry.balanceQuantity).mlpervial)<15){
    lowStockInventory.push(entry);
  } 
 }
 else if(entry.prescription=='per vial' || entry.prescription=='Per vial'){
  if(JSON.parse(entry.balanceQuantity).vials<15){
    lowStockInventory.push(entry);
  } 
 
  }
else if(entry.prescription=='per ampule'){
 
  if(JSON.parse(entry.balanceQuantity).ampules<15){
    lowStockInventory.push(entry);
  } 


}
else if(entry.prescription=='BOTTLE'){
  if(parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).perbottle)<20){
    lowStockInventory.push(entry);
  } 
}
else  if(entry.prescription=='TUBE'){
  if(parseInt(JSON.parse(entry.balanceQuantity).unittotal/JSON.parse(entry.balanceQuantity).pertube)<20){
    lowStockInventory.push(entry);
  } 
}

else {
  if(currentQuantity<20){
    lowStockInventory.push(entry);
  }
}
        callback(); 
    },function(err) {
       if(err) {
           console.log("There was an error" + err);
       } else {
         
          if(lowStockInventory.length!=0){
            var message = lowStockInventory.length + " products running low on stock";
            connection.query(
              "INSERT INTO `notifications` (title,message,affectedJson,readReceipt,clinicId)  VALUES ('Daily Low Stock Alert','" +  message + "',?,'[]','" +  clinicId + "') ",[ JSON.stringify(lowStockInventory)], 
              function(error, results, fields) {
                if (error) return console.log(error);
                return res.status(200).json({ success:'done' });
          
                
                
          
                
                  }
               );
          }
          else if(lowStockInventory.length==0){
            return res.status(200).json({ success:'done' });
          }
   
 
       }
   });


    }



  }
 
);
});



app.route('/development/enigma/notifications/:clinicId/:workforceId')
.get(function(req, res, next) {
  var clinicId = req.params.clinicId;
  var workforceId = req.params.workforceId;
 // console.log(workforceId)
  var allNotifications=[];
  var unreadNotifications=0;
  connection.query(
    "SELECT id as idx,title,message as msg,DATE_FORMAT(create_time, '%e %b %Y') as create_time,affectedIds,readReceipt FROM `notifications` WHERE clinicId='" + clinicId + "' order by id DESC",
    function(error, results, fields) {
      if (error) console.log(error);
      if(results.length === 0)   return res.status(200).json({success : 'Notifications Info',allNotifications:allNotifications,unreadNotifications:unreadNotifications});
      else if(results.length != 0){

        allNotifications = results;
        async.each(allNotifications, function(entry, callback) {
          var readReceipt = JSON.parse(entry.readReceipt);
         // console.log(readReceipt)
          entry.readStatus = 1;
          if(entry.readReceipt.includes(workforceId)==false){
            entry.readStatus = 0;
            unreadNotifications++;
          //  console.log('x')
          }


          callback(); 
      },function(err) {
         if(err) {
             console.log("There was an error" + err);
         } else {
           
           return res.status(200).json({success : 'Notifications Info',allNotifications:allNotifications,unreadNotifications:unreadNotifications});
   
         }
     });

      } 
   
    }
  );
});


app.route('/development/admin/notifications/:workforceId')
.get(function(req, res, next) {
 
  var workforceId = req.params.workforceId;
 // console.log(workforceId)
  var allNotifications=[];
  var unreadNotifications=0;
  connection.query(
    "SELECT id as idx,title,message as msg,DATE_FORMAT(create_time, '%e %b %Y') as create_time,affectedIds,readReceipt FROM `notifications_admin` ",
    function(error, results, fields) {
      if (error) console.log(error);
      if(results.length === 0)   return res.status(200).json({success : 'Notifications Info',allNotifications:allNotifications,unreadNotifications:unreadNotifications});
      else if(results.length != 0){

        allNotifications = results;
        async.each(allNotifications, function(entry, callback) {
          var readReceipt = JSON.parse(entry.readReceipt);
         // console.log(readReceipt)
          entry.readStatus = 1;
          if(entry.readReceipt.includes(workforceId)==false){
            entry.readStatus = 0;
            unreadNotifications++;
          //  console.log('x')
          }


          callback(); 
      },function(err) {
         if(err) {
             console.log("There was an error" + err);
         } else {
           
           return res.status(200).json({success : 'Notifications Info',allNotifications:allNotifications,unreadNotifications:unreadNotifications});
   
         }
     });

      } 
   
    }
  );
});


app.route('/development/enigma/single-notifications/:notificationId')
.get(function(req, res, next) {
  var notificationId = req.params.notificationId;
  var alertDetails =[];
  connection.query(
    "SELECT id as idx,title,message as msg,affectedJson as affected,DATE_FORMAT(create_time, '%e %b %Y') as create_time,affectedIds,readReceipt FROM `notifications` WHERE id='" + notificationId + "' ",
    function(error, results, fields) {
      if (error) console.log(error);
      if(results.length === 0)   return res.status(200).json({error : 'Not found'});
      else if(results.length != 0){

        alertDetails = results[0];
        affectedJson = JSON.parse(results[0].affected);
       return res.status(200).json({success : 'Notifications Info',alertDetails:alertDetails,affectedJson:affectedJson});

      } 
   
    }
  );
});


app.route('/development/admin/single-notifications/:notificationId')
.get(function(req, res, next) {
  var notificationId = req.params.notificationId;
  var alertDetails =[];
  connection.query(
    "SELECT id as idx,title,message as msg,affectedJson as affected,DATE_FORMAT(create_time, '%e %b %Y') as create_time,affectedIds,readReceipt FROM `notifications_admin` WHERE id='" + notificationId + "' ",
    function(error, results, fields) {
      if (error) console.log(error);
      if(results.length === 0)   return res.status(200).json({error : 'Not found'});
      else if(results.length != 0){

        alertDetails = results[0];
        affectedJson = JSON.parse(results[0].affected);
       return res.status(200).json({success : 'Notifications Info',alertDetails:alertDetails,affectedJson:affectedJson});

      } 
   
    }
  );
});


app.route('/development/enigma/single-notifications/:notificationId/:workforceId')
.patch(function(req, res, next) {
  var notificationId = req.params.notificationId;
  var workforceId = req.params.workforceId;
  connection.query(
    "UPDATE `notifications` SET readReceipt=JSON_ARRAY_INSERT(readReceipt, '$[0]', " + workforceId + ") WHERE id='" + notificationId + "' ",
    function(error, results, fields) {
      if (error) console.log(error);
      return res.status(200).json({success : 'Notifications Info Updated'});
   
    }
  );
});


app.route('/development/admin/single-notifications/:notificationId/:workforceId')
.patch(function(req, res, next) {
  var notificationId = req.params.notificationId;
  var workforceId = req.params.workforceId;
  connection.query(
    "UPDATE `notifications_admin` SET readReceipt=JSON_ARRAY_INSERT(readReceipt, '$[0]', " + workforceId + ") WHERE id='" + notificationId + "' ",
    function(error, results, fields) {
      if (error) console.log(error);
      return res.status(200).json({success : 'Notifications Info Updated'});
   
    }
  );
});

app.route('/development/medicine/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `admin_medicine_inventory` WHERE internal_qrcode = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
    }
  );
});


app.route('/development/precheckin/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `precheckin` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Pre Check In Info',preCheckInInfo:results});
    }
  );
});

app.route('/development/precheckin/:id')
.delete(function(req, res, next) {
  connection.query(
    "DELETE FROM `precheckin` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Pre Check In Info'});
    }
  );
});

app.route('/development/workforce/:id')
.delete(function(req, res, next) {
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var workforceId = sanitizedRequestString[0];
  var workforceToken = sanitizedRequestString[1];

  connection.query(
    "DELETE FROM `workforce` WHERE id = ? LIMIT 1", workforceId,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Deleted workforce'});
    }
  );
});

app.route('/development/checkout/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `checkout` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Check Out Info',checkOutInfo:results});
    }
  );
});

app.route('/development/checkin/:id')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM `checkin` WHERE id = ? LIMIT 1", req.params.id,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
      return res.status(200).json({success : 'Check In Info',checkInInfo:results});
    }
  );
});

// VENDOR

// INSERT
app.route('/development/vendor')
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


app.route('/development/vendor/:id')
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

app.route('/development/vendor/:id')
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
app.route('/development/clinic')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  var rawRequestString = req.body.accountId;
  var sanitizedRequestString = rawRequestString.split("_");
  var accountId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];
  connection.query(
    "INSERT INTO `clinic` (accountId,name,ref_id,pic_name,pic_email,pic_tel_no,address_street,address_city,address_state,photoUrl,status,token)  VALUES ('" +  accountId + "','" +  req.body.name + "','" +  req.body.ref_id + "','" +  req.body.pic_name + "','" +  req.body.pic_email + "','" +  req.body.pic_tel_no + "','" +  req.body.address_street + "','" +  req.body.address_city + "','" +  req.body.address_state + "','" +  req.body.photoUrl + "','1','" + token + "') ", 
    function(error, results, fields) {
      if (error) console.log(error);
        var clinicId = results.insertId;
  connection.query(
    "INSERT INTO `clinic_settings` (id,staffCount,ip_status)  VALUES ('" +  results.insertId + "','15','Disabled') ", 
    function(error, results, fields) {
      if (error) console.log(error);
    
       connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('Clinic Creation','" +  accountId + "','" +  clinicId + "','New clinic creation.','SUPER ADMINISTRATOR','1')", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return res.status(200).json({success : 'Clinic creation succesfull!'});
          
    
          
            }
         );

      
        }
     );
   
      

      
        }
     );


});



// INSERT
app.route('/development/clinic_ipv4')
.post(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  var rawRequestString = req.body.clinicId;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
  var accountId = req.body.accountId;
  connection.query(
    "INSERT INTO `clinic_ipv4` (ipv4,alias,description,clinicId)  VALUES ('" +  req.body.ipv4 + "','" +  req.body.alias + "','" +  req.body.description + "','" +  clinicId + "') ", 
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      var description = 'New IP Record Creation ('+ req.body.ipv4 + '/ Id :'+ results.insertId+')';
      connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('New IP Record Creation','" +  accountId + "','" +  clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1')", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return res.status(200).json({success : 'IP Creation succesfull!'});
          
    
          
            }
         );
        }
     );
});


app.route('/development/clinic_ipv4/:id')
.patch(function(req, res) {
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  var rawRequestString = req.body.clinicId;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
  var accountId = req.body.accountId;
  connection.query(
    "UPDATE `clinic_ipv4`  SET  ipv4='" +  req.body.ipv4 + "',alias='" +  req.body.alias + "',description='" +  req.body.description + "' WHERE id='" +  req.params.id + "'  ", 
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      var description = 'IP Record Update ('+ req.body.ipv4 + '/ Id :+'+ req.params.id+')';
      connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('IP Record Update','" +  accountId + "','" +  clinicId + "','" +  description + "','SUPER ADMINISTRATOR','1')", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return res.status(200).json({success : 'IP Creation succesfull!'});
          
    
          
            }
         );
        }
     );
});



app.route('/development/account/:id')
.patch(function(req, res, next) {
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var accountId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];

  return connection.query(
    "UPDATE  `account` SET  company_name='" + req.body.company_name +  "',ref_id='" + req.body.ref_id +  "',pic_name='" + req.body.pic_name +  "',pic_email='" + req.body.pic_email +  "',pic_tel_no='" + req.body.pic_tel_no +  "',billing_name='" + req.body.billing_name +  "',billing_email='" + req.body.billing_email +  "',billing_tel_no='" + req.body.billing_tel_no +  "',address_street='" + req.body.address_street +  "',address_city='" + req.body.address_city +  "',address_state='" + req.body.address_state +  "',address_street2='" + req.body.address_street2 +  "',address_city2='" + req.body.address_city2 +  "',address_state2='" + req.body.address_state2 +  "',photoUrl='" + req.body.photoUrl +  "',attachments='" + req.body.attachments +  "',mmc_id='" + req.body.mmc_id +  "',company_type='" + req.body.company_type +  "',company_date='" + req.body.company_date +  "' WHERE id = ? ", accountId,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No account found" });
      connection.query(
        "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('Account Update','" +  accountId + "','NA','Account details update.','SUPER ADMINISTRATOR','1')", 
        function(error, results, fields) {
          if (error) return console.log(error);
          
          return res.status(200).json({success : 'Account updated successfully!' });
          
    
          
            }
         );
  
    }
  );
});

app.route('/development/clinic/:id')
.patch(function(req, res, next) {
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
  var accountId = req.body.accountId;
  return connection.query(
    "UPDATE  `clinic` SET  name='" + req.body.name +  "',ref_id='" + req.body.ref_id +  "',pic_name='" + req.body.pic_name +  "',pic_email='" + req.body.pic_email +  "',pic_tel_no='" + req.body.pic_tel_no +  "',address_street='" + req.body.address_street +  "',address_city='" + req.body.address_city +  "',address_state='" + req.body.address_state +  "',photoUrl='" + req.body.photoUrl +  "' WHERE id = ? ", clinicId,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No account found" });
 
     connection.query(
      "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('Clinic Update','" +  accountId + "','" +  clinicId + "','Clinic details update.','SUPER ADMINISTRATOR','1')", 
      function(error, results, fields) {
        if (error) return console.log(error);
        
        return res.status(200).json({success : 'Clinic updated successfully!' });
        
  
        
          }
       );
    }
  );
});


app.post('/development/precheckin/attachments/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('precheckin/' + time + '-' + token + '-' +req.file.originalname );
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

app.post('/development/fileManager/attachments/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('fileManager/' + time + '-' + token + '-' +req.file.originalname );
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


app.post('/development/checkin/attachments/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('checkin/' + time + '-' + token + '-' +req.file.originalname );
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

app.post('/development/account/photo/upload', multer.single('file'), (req, res, next) => {
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

app.post('/development/clinic/photo/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  var time = Date.now();
  var token = cryptoRandomString({length: 10, type: 'url-safe'});
  
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file('clinic_logo/' + time + '-' + token + '-' +req.file.originalname );
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

app.post('/development/account/documents/upload', multer.single('file'), (req, res, next) => {
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
app.get("/development/account/admin", (req, res, next) => {
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
      db: "company_name",
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
  const primaryKey = "id"
  const query = "SELECT CONCAT(`id`,'_',`token`) as id,company_name,pic_name,address_city,status FROM account  "; 
   

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


app.get("/development/vendor-public/admin", (req, res, next) => {
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

app.get("/development/vendor-private/admin", (req, res, next) => {
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


app.route('/development/all/vendors')
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
app.route('/development/all/precheckins/:id')
.get(function(req, res, next) {
  connection.query(
    "select precheckin.id as preId,precheckin.status as status,precheckin.vendorId as vendorId,precheckin.orderId as orderId,precheckin.attachments as attachments ,precheckin.comments as comments,precheckin.allProducts as allProducts,vendor.name as vendorName,precheckin.create_time as created from precheckin LEFT JOIN vendor ON precheckin.vendorId=vendor.id WHERE precheckin.status='0' AND clinicId='" + req.params.id + "'  ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
    //  console.log(results)
     return res.status(200).json({success : 'Pre Check In Info',preInfo:results});
    }
  );
});

app.route('/development/all/inventory/:id')
.get(function(req, res, next) {
  connection.query(
    "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as product_name,admin_medicine_inventory.product_category as product_category,clinic_inventory.quantity as quantity,admin_medicine_inventory.manufacturer_barcode as barcode,admin_medicine_inventory.internal_barcode as internal_barcode,admin_medicine_inventory.company_name as company_name,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.color as color,admin_medicine_inventory.packing_quantity as packing_quantity,admin_medicine_inventory.packing_type as packing_type from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode   WHERE clinic_inventory.clinicId='" + req.params.id + "'  ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
     return res.status(200).json({success : 'Inventory Info',inventoryInfo:results});
    }
  );
});
app.route('/development/all/accounts')
.get(function(req, res, next) {
  connection.query(
    "SELECT * from `account`  ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No user found" });
     return res.status(200).json({success : 'Vendor Info',vendorInfo:results});
    }
  );
});

app.route('/development/all/medicines')
.get(function(req, res, next) {
  connection.query(
    "SELECT * from `admin_medicine_inventory` ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No meds found" });
     return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
    }
  );
});
app.route('/development/search/medicines/:searchQuery')
.get(function(req, res, next) {
  connection.query(
    "SELECT * from `admin_medicine_inventory` WHERE product_name LIKE '%"+ req.params.searchQuery +"%' OR product_category LIKE '%"+ req.params.searchQuery +"%' OR manufacturer LIKE '%"+ req.params.searchQuery +"%' OR manufacturer_barcode LIKE '%"+ req.params.searchQuery +"%' OR internal_qrcode LIKE '%"+ req.params.searchQuery +"%' OR internal_barcode LIKE '%"+ req.params.searchQuery +"%' ",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ medicineInfo:[] });
     return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
    }
  );
});
app.route('/development/search/liveInventory/:clinicId/:searchQuery')
.get(function(req, res, next) {
  connection.query(
    "select clinic_inventory.productId as productId,admin_medicine_inventory.product_name as product_name,admin_medicine_inventory.product_category as product_category,clinic_inventory.quantity as quantity,admin_medicine_inventory.company_name as company_name,admin_medicine_inventory.manufacturer as manufacturer,admin_medicine_inventory.color as color,admin_medicine_inventory.packing_quantity as packing_quantity,admin_medicine_inventory.packing_type as packing_type from clinic_inventory LEFT JOIN  admin_medicine_inventory on clinic_inventory.productId=admin_medicine_inventory.internal_qrcode   WHERE clinic_inventory.clinicId='" + req.params.clinicId + "' AND product_name LIKE '%"+ req.params.searchQuery +"%' OR product_category LIKE '%"+ req.params.searchQuery +"%' OR manufacturer LIKE '%"+ req.params.searchQuery +"%'  OR admin_medicine_inventory.manufacturer_barcode LIKE '%"+ req.params.searchQuery +"%' OR admin_medicine_inventory.internal_qrcode LIKE '%"+ req.params.searchQuery +"%' OR admin_medicine_inventory.internal_barcode LIKE '%"+ req.params.searchQuery +"%' GROUP BY clinic_inventory.productId",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(200).json({ medicineInfo:[] });
     return res.status(200).json({success : 'Medicine Info',medicineInfo:results});
    }
  );
});


//get single account

app.route('/development/account/:id')
.get(function(req, res, next) {
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var accountId = sanitizedRequestString[0];
  var accountToken = sanitizedRequestString[1];
  connection.query(
    "SELECT * FROM `account` WHERE id = ? LIMIT 1", accountId,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No account found" });
      return res.status(200).json({success : 'Account Info',accountInfo:results,id:accountId});
    }
  );
});

app.route('/development/clinic/:id')
.get(function(req, res, next) {
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
  connection.query(
    "SELECT * FROM `clinic` WHERE id = ? LIMIT 1", clinicId,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });
      return res.status(200).json({success : 'Clinic Info',accountInfo:results});
    }
  );
});
app.route('/development/all/clinics')
.get(function(req, res, next) {

  connection.query(
    "SELECT id,name,accountId FROM `clinic`",
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });
      return res.status(200).json({success : 'Clinic Info',clinics:results});
    }
  );
});

app.route('/development/clinic_settings/:id')
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
app.route('/development/clinic_settings/:id')
.patch(function(req, res, next) {
  var rawRequestString = req.params.id;
  var sanitizedRequestString = rawRequestString.split("_");
  var clinicId = sanitizedRequestString[0];
  var clinicToken = sanitizedRequestString[1];
  var accountId = req.body.accountId;
  return connection.query(
    "UPDATE  `clinic_settings` SET  staffCount='" + req.body.staffCount +  "',ip_status='" + req.body.ip_status +  "' WHERE id = ? ", clinicId,
    function(error, results, fields) {
      if (error) return res.status(500).json({ error: error });
      if(results.length === 0) return res.status(500).json({ error: "No clinic found" });
 
     connection.query(
      "INSERT INTO `history` (type,accountId,clinicId,description,authorUsername,authorId)  VALUES ('Clinic Settings Update','" +  accountId + "','" +  clinicId + "','Clinic Settings updated.','SUPER ADMINISTRATOR','1')", 
      function(error, results, fields) {
        if (error) return console.log(error);
        
        return res.status(200).json({success : 'Clinic updated successfully!' });
        
  
        
          }
       );
    }
  );
});
app.get('/development', (req, res) => res.status(200).send('ENIGMA BACKEND API - BY SUNRISE TECH VENTURES')  );

app.route('/development/test')
.get(function(req, res, next) {
  /*var arg = {
    text:'Testing notifications',
    color:'success',
    title:'Push notifications r working'
  }; */
 // console.log(io.to('room1').emit("displayNotifications", arg));
 //return 
});




io.on("connection", (socket) => {
 // console.log(socket.handshake.query.auth); // Set { <socket.id> }
});

http.listen(7000, () => {
 // console.log('listening on *:7000');
});

module.exports = app;