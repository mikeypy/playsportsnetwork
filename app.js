const express = require('express');
const {readSFile, db} = require('./utils')
require('dotenv').config();
const {google} = require('googleapis')





//start express
const app = express();

//read from search filter
let filter = readSFile('./search_filter')


// get title and publishedAt from Youtube api for GlobalCyclingNetwork and store in database
app.get('/GlobalCyclingNetwork', (req, res) => {
    if (req.method === 'GET') {
    for(var i in filter) {
      google.youtube('v3').search.list({
        key:process.env.YOUTUBE_API,
        part:'snippet',
        q:req.url + filter[i],
      }).then((response) => {
        const {data} = response;
        for (i in data.items) {  
          let post = {title : data.items[i].snippet['title'], date: data.items[i].snippet['publishedAt'] }
          let sql = 'INSERT INTO videos SET ?';
          db.query(sql, post, (err, result) => {
            if(err) throw err;
            console.log(result)
            
          })
        }
        }).catch((err) => console.log(err))
    } 
    res.json({'message': 'Database Populated!!'})
     }   
})
  
// get title and publishedAt from Youtube api for globalmtb and store in database
app.get('/GlobalMountainBikeNetwork', (req, res) => {
  if (req.method === 'GET') {
  for(var i in filter) {
    google.youtube('v3').search.list({
      key:process.env.YOUTUBE_API,
      part:'snippet',
      q:req.url + filter[i],
    }).then((response) => {
      const {data} = response;
      for (i in data.items) {  
        let post = {title : data.items[i].snippet['title'], date: data.items[i].snippet['publishedAt'] }
        let sql = 'INSERT INTO videos SET ?';
        db.query(sql, post, (err, result) => {
          if(err) throw err;
          console.log(result)
        })
      }
      }).catch((err) => console.log(err))
  } 
  res.json({'message': 'Database Populated!!'})   

   } 
})


//API endpoint that will fetch the results from store
app.get('/getposts', (req, res) => {
  if (req.method === 'GET') {
  let sql = 'SELECT * FROM videos';
  db.query(sql, (error, fetched_results)=> {
    if(error) throw error;
    console.log(fetched_results) 
    res.json(fetched_results) 
   
  })
} 
  
})


//API endpoint that will fetch the results from store by ID
app.get('/getpost/:id', (req, res) => {
  if (req.method === 'GET') {
  let sql = `SELECT * FROM videos where id = ${req.params.id}`;
  db.query(sql, (error, fetched_results)=> {
    if(error) throw error;
    console.log(fetched_results) 
    res.json(fetched_results) 
   
  })
} 
  
})

//API endpoint that will delete the result from store
app.delete('/deletepost/:id', (req, res) => {
  if (req.method === 'DELETE') {
  let sql = `DELETE FROM videos where id = ${req.params.id}`;
  db.query(sql, (error, fetched_results)=> {
    if(error) throw error;
    console.log(fetched_results) 
    res.json({'message':'post deleted'}) 
   
  })
}  
})

//API endpoint that will fetch the id and title only from store based on filter parameter from search_filter file
app.get('/getposts/:search', (req, res) => {
  if (req.method === 'GET') {
  let sql = `SELECT id, title FROM videos where title like '%${req.params.search}%' `;
  db.query(sql, (error, fetched_results)=> {
    if(error) throw error;
    console.log(fetched_results) 
    res.json(fetched_results) 
   
  })
}
})
      



//environment PORT number
const PORT = process.env.PORT || 3000

//start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))