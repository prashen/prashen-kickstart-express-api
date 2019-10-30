var express = require("express");
var mysql = require('mysql');
var app =  express();

var connection = mysql.createPool({
  connectionLimit:50,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_db'
})

//home api
app.get('/api', function(req, res) {
   res.send('This is home page');
})

//post listing api
app.get('/api/posts', function(req, res){
   //mysql
   connection.getConnection(function(error, temp){
      if (!!error) {
         console.log('error')
      } else{
         console.log('connected')
         temp.query('SELECT * FROM post_table', function(error, rows, fields){
            temp.release();
            if (!!error) {
               console.log('error in query')
            } else{
               res.send(rows);
            }
         })
      }
   })
})

//details page of post details api
app.get('/api/posts/:id', function(req, res) {

   connection.getConnection(function(error, temp){
      if (!!error) {

         console.log('error')

      } else{

         // console.log('connected')
         temp.query('SELECT ID, POST_TITLE FROM post_table', function(error, rows, fields){

            temp.release();

            if (!!error) {
               console.log('error in query')
            } else{
               let data = rows.find((par)=>par.ID === parseInt(req.params.id));

               if(!data){
                  res.status(404).send('404 id is not exist')
               }

               res.send(data)
            }
         })

      }
   })
})

//post api
app.post('/api/postscreate', function(req, res) {
   console.log('res',res)
   connection.getConnection(function(error, temp){
      if (!!error) {

         console.log('error')

      } else{

         // console.log('connected')
        
         temp.query(`INSERT INTO post_table (ID, POST_TITLE) 
         VALUES (4, 'title four')`, function(error, rows, fields){

            temp.release();

            if (!!error) {
               console.log('error in query')
            } else{
               // console.log('row', row)
               // let data = rows.find((par)=>par.ID === parseInt(req.params.id));
               // let post = {
               //    ID: rows.length + 1,
               //    POST_TITLE:'hello this is third post'
               // }
               // rows.push(post) 
               // if(!data){
               //    res.status(404).send('404 id is not exist')
               // }
               
               res.send(rows)
            }
         })

      }
   })
})


//port environment
const port = process.env.port || 1106

app.listen(port, ()=> console.log(`Running on port no: ${port}`));




