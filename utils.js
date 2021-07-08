const fs = require('fs')
const mysql = require('mysql');


//read seach filter file
const readSFile = filename =>
fs.readFileSync(filename)
.toString('UTF8')
.split('\n');


//create  connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'mydb'
});

//Connect
db.connect((err)=> {
  if(err){
    throw err;
  }
  console.log('Database connection Successful!!!')
})


module.exports ={
  readSFile,
  db
}