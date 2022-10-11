const validator=require('validator');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/learning')
.then(()=>console.log('connection successful'))
.catch((err)=>console.log('error in connection',err))

const users_schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5,
        uppercase:true
        },
        email:{
            type:String,
            unqiue:true,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
    age:Number,
    location:String
})

const usersData=new mongoose.model('usersData',users_schema);

const createDocument=async()=>{
    try {
        const document=usersData({
            name:'aashish',
            age:24,
            email:'aashis@goku.com',
            location:'udaipur'
        })
        const document2=usersData({
            name:'vidya',
            age:22,
            email:'vidya@gmail.com',
            location:'udaipur'
        })
        // const result=await document.save();
        const result=await usersData.insertMany([document,document2]);
        console.log(result);
    } catch (error) {
        console.log(error)
    }
}

createDocument();
const getDocument=async()=>{
    const result= await usersData.find();
    console.log(result)
}
// getDocument();

const deleteDocument=async()=>{
    // const result=await usersData.deleteMany({name:'vidya'}) // returns only count of deleted document
    const result=await usersData.findByIdAndDelete({_id:'6344580bebb4486ca783c96c'})//returns deleted document
    console.log(result);
}
// deleteDocument();

const updateDocument=async()=>{
    // usersData.findByIdAndUpdate() returns old data by default, if you want modified data in return
    // use {new:true} parameter
    const result=await usersData.findByIdAndUpdate('63444750d7801d9ddfbaf9bc',{$set:{name:'nitya lohar'}},{new:true})
    console.log(result)
}

// updateDocument();