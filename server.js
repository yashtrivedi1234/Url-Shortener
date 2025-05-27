import express from 'express';
import mongoose  from 'mongoose';
import { shortUrl, getOriginalUrl } from "./controllers/url.js";
import { config } from "dotenv";
const app = express();
config({path:'.env'})
app.use(express.urlencoded({extended: true}))

// Set view engine to ejs
app.set('view engine', 'ejs');

mongoose
  .connect(
    process.env.MONGO_URI,
    {
      dbName: "Node_js_mastery_course",
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// rendering the ejs file
app.get('/', (req,res)=>{
   res.render("index.ejs", {shortUrl: null})
})

//  shorting Url Logic
app.post('/short', shortUrl);

// redirect to original url using shortcode:- dynamic routing
 app.get('/:shortCode', getOriginalUrl)

const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`server is running on port ${port}`))