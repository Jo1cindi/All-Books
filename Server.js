const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
const cors = require("cors");


//cors

//Set up a port
const port = 4005;

//Initiate the app
const app = express();

//Redis Client
const client = redis.createClient({
  legacyMode: true,
});

(async () => {
  await client.connect();
})();

console.log("Connecting to the Redis");

client.on("ready", () => {
  console.log("Connected!");
});

client.on("error", (err) => {
  console.log("Error in the Connection");
});

app.use(cors({ origin: "*" }));

//Set up body parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}))

//Method Override
app.use(methodOverride("_method"));

//Adding a book
app.post("/api/add-book", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  const bookData = {
    title: req.body.title,
    author: req.body.author,
  };
  const id  = Math.floor(Math.random()* 10000)
  
  client.hSet(
    `book:${id}`,
    ["id", id, "title", bookData.title, "author", bookData.author],
    (err, reply) => {
      if (err) {
        console.log("error", err);
      } else {
        if (reply) {
          console.log(reply);
          return res.status(200).send({ data: reply });
        }
      }
    }
  );
  // console.log(req.body);
});

//Updating a book
app.post("/api/update-book", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  const bookData = req.body.title;

  let id = Math.random(Math.floor() * 10000);

  client.hSet(`book`, "title", bookData, (err, reply) => {
    if (err) {
      console.log("error", err);
    } else {
      if (reply) {
        console.log(reply);
        return res.status(200).send({ data: reply });
      }
    }
  });
  console.log(req.body);
  console.log(id);
});

//Retrieving a book
app.get("/api/get-book", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  client.keys(`*`, (err, keys) => {
  const newBooks = []

    if (err) {
      console.log("error", err);
      res.status(500).send(err);
    } else {
      keys.forEach((key)=>{
        client.hGetAll(key, (err, value)=>{
          if(err){
            console.log(err)
          }else{
            // console.log(value)
            newBooks.push(value)
            console.log(newBooks)
            // res.send(newBooks)
          }
        })
      })
      
    }
  });
  console.log(req.body);
});

//Deleting a book
app.post("/api/delete-book", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  client.del(`book`, (err, reply) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log(reply);
      return res.status(200).send({ data: reply });
    }
  });
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
});
