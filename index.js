import  express  from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res) => {
    res.render("index.ejs");
});

app.get("/contact", (req,res) => {
    res.render("contact.ejs");
});

app.get("/Blogs", (req,res) => {
    res.render("blog.ejs");
});

app.get("/anime", (req,res) => {
    res.render("anime.ejs");
})

app.get("/get-anime", async (req,res) => {
    const result1 = await axios.get("https://api.jikan.moe/v4/random/anime");
    //console.log(JSON.stringify(result.data.data));
    const result2 = await axios.get("https://api.jikan.moe/v4/random/anime");
    const result3 = await axios.get("https://api.jikan.moe/v4/random/anime");
    res.render("anime.ejs", {data1 : result1.data.data, data2: result2.data.data, data3: result3.data.data });
});

app.listen(port, (req,res) => {
    console.log(`Server running on port ${port}`);
});