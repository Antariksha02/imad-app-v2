var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'antariksha02',
    database : 'antariksha02',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
        title: 'Article One | Antariksha Gupta',
        heading: 'Article One',
        date: 'Feb 16, 2017',
        content: `
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one.  
                </p>
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one.  
                </p>
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. 
                </p>
                    `
    },
    'article-two' : {
        title: 'Article Two | Antariksha Gupta',
        heading: 'Article Two',
        date: 'Feb 12, 2017',
        content: `
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one.  
                </p>
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one.  
                </p>
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. 
                </p>
     `
    },
    'article-three' : {
        title: 'Article Three | Antariksha Gupta',
        heading: 'Article Three',
        date: 'Feb 12, 2017',
        content: `
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one.  
                </p>
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one.  
                </p>
                <p>
                    This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. This is just a simple para for Article one. 
                </p>
     `
    }
}

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title} 
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href=/ui/style.css rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/"> Home </a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toSateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
  //make a select request
  //return a response with the results
  pool.query('SELECT * FROM test', function(err, result){
      if(err) {
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result.rows));
      }
  } );
});


app.get('/article/:articleName', function (req, res) {
  pool.query("SELECT * FROM article where title = '" + req.params.articleName + "'", function(err, result){
      if(err) {
          res.status(500).send(err.toString());
      } else{
          if(result.rows.length === 0){
              res.status(404).send('Article Not Found');
          }else{
              var articleData = result.rows[0];
              res.send(createTemplate(articleData));    
          }
      }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
