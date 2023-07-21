const mongoose = require('mongoose');
const url = "mongodb+srv://amolmathur2001:xJX6M2NoGswbD5TE@cluster0.c8hby4o.mongodb.net/BarbequeCity?retryWrites=true&w=majority";

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn}`);
        const newData = mongoose.connection.db.collection("food_items");
        const newData1 = mongoose.connection.db.collection("foodCategory");
        const data = await newData.find({}).toArray();
        const data1 = await newData1.find({}).toArray();
        global.users = data;
        global.foodCategory = data1;

    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB