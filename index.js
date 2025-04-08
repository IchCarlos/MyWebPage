import  express  from "express";
import axios from "axios";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
//import mysql from "mysql2/promise";


const port = 3000;
const app = express();
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
// const mydb = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "rootroot",
//     database: "blog"
// });

db.connect();
//mydb.connect();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res) => {
    res.render("index.ejs");
});

app.get("/contact", (req,res) => {
    res.render("contact.ejs");
});

app.get("/Blogs", async (req,res) => {
    const results = await db.query("SELECT id, title, message, user_name, created_at FROM fullpost ORDER BY id ASC");
    console.log(results.rows);
    res.render("blog.ejs", { data: results.rows});
});

app.post("/updatePost", async (req, res) => {
    console.log(req.body);
    try {
        await db.query("UPDATE fullpost SET title=$1, message=$2 WHERE id=$3", [req.body.updateTitle, req.body.updateMessage, req.body.id]);
        res.redirect("/Blogs");
    } catch (error) {
        console.log(error);
    }
});

app.post("/deletePost", async (req, res) => {
    console.log(req.body);
    try {
        await db.query("DELETE FROM fullpost WHERE id=$1", [req.body.delete]);
        res.redirect("/Blogs");
    } catch (error) {
        console.log(error);
    }
});

app.post("/createPost", async (req, res) => {
    console.log(req.body);
    try {
        await db.query("INSERT INTO fullpost (title, message, user_name) VALUES ($1, $2, 'admin')", [req.body.title, req.body.message]);
        res.redirect("/Blogs");
    } catch (error) {
        console.log(error);
    }
});

app.get("/anime", (req,res) => {
    res.render("anime.ejs");
})

app.get("/get-anime", async (req,res) => {
    const result1 = await axios.get("https://api.jikan.moe/v4/random/anime");
    const result2 = await axios.get("https://api.jikan.moe/v4/random/anime");
    const result3 = await axios.get("https://api.jikan.moe/v4/random/anime");
    res.render("anime.ejs", {data1 : result1.data.data, data2: result2.data.data, data3: result3.data.data });
});

app.listen(port, (req,res) => {
    console.log(`Server running on port ${port}`);
});