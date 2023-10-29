// import required files and process env file
import express, { Application } from "express";
import dotenv from "dotenv";
import router from './router';
const route = router();
dotenv.config();
const { ENV, DEV_PORT, PROD_PORT } = process.env;

export const app: Application = express();
app.use(express.json()); // add body parser
app.use('/api', route); // add rounter

// default route handler
app.all('/*', function(req, res, next){
   res.send( { 
    message: "Invalid Route", validRoutes: 
    route.stack
    .filter(r => r.route)
    .map(r => {
      return {
        method: Object.keys(r.route.methods)[0].toUpperCase(),
        path: "{{BaseUrl}}/api"+r.route.path
      };})
})
});

// start server
const PORT = ENV == "PROD" ? PROD_PORT : DEV_PORT
app.listen(PORT || 5000, () => console.log("server running", PORT || 5000));