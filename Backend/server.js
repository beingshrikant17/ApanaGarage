
import express from "express";
import mongoose from "mongoose";
import GarageOwnerRoutes from './src/routes/GarageOwner.route.js';
import ApanaGarageRoutes from './src/routes/ApanaGarage.route.js';

const app=express()   
mongoose.set('strictQuery',false);
app.use(express.json({limit: "30mb", extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.listen(9992,function check(err)
{
    if(err)
        console.log("Error .....!!!!!")
    else
        console.log("Started .....!!!!!")
});

const password = encodeURIComponent("Shrikant@123");
const DB = `mongodb+srv://Shrikant:${password}@apanagarage.wdr3fcf.mongodb.net/ApanaGarage?retryWrites=true&w=majority`;

mongoose.connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Connection Error:", err);
  });


// mongoose.connect("mongodb://127.0.0.1:27017/ApanaGarage", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Successfully connected to MongoDB"))
//   .catch((error) => console.log("Error connecting to MongoDB:", error));

app.use('/YourGarage', GarageOwnerRoutes); 
app.use('/ApanaGarage', ApanaGarageRoutes); 
app.get('/',function (req,res){res.status(200).json({message:"123"})})

app.use(express.json());