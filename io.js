const async = require("async");
const config = require("./config");
const mongoDBConnect = require("./mongoDbConnection")
const { ObjectId } = require('mongodb');

io.on("connection", (socket) => {

    socket.on("login", async (data) => {

        let mongoClient
        try {
            mongoClient = await mongoDBConnect.connectToCluster(config.DB_URI);
            const db = mongoClient.db(config.COLLECTION);
            const collection = db.collection('user');
        
           
            const documents = await collection.find(data).toArray();
            if(documents == ""){
                return socket.emit("getUserData", "User is not existed")
            }else{
                return socket.emit("getUserData", documents)
            }
        
        } finally {
            await mongoClient.close();
        }  
       
    })

    socket.on("createEmployee", async (data) => {
        let mongoClient
        try {
            mongoClient = await mongoDBConnect.connectToCluster(config.DB_URI);
            const db = mongoClient.db(config.COLLECTION);
            const collection = db.collection('employee');
            data.created_at = new Date();
            data.updated_at = ""
            const documents = await collection.insertOne(data);
            if(documents == ""){
                return socket.emit("getEmployeeData", "Employee is not inserted")
            }else{
                return socket.emit("getEmployeeData", documents)
            }
        
        } finally {
            await mongoClient.close();
        }  
    })

    socket.on("getAllEmployee", async () => {
        let mongoClient
        try {
            mongoClient = await mongoDBConnect.connectToCluster(config.DB_URI);
            const db = mongoClient.db(config.COLLECTION);
            const collection = db.collection('employee');

            const documents = await collection.find({}).toArray();
            if(documents == ""){
                return socket.emit("getAllEmployeeData", "Employee is empty")
            }else{
                return socket.emit("getAllEmployeeData", documents)
            }
        
        } finally {
            await mongoClient.close();
        }  
    })

    socket.on("updateEmployee", async (data) => {
        let mongoClient
        try {
            let id = data.id;
            mongoClient = await mongoDBConnect.connectToCluster(config.DB_URI);
            const db = mongoClient.db(config.COLLECTION);
            const collection = db.collection('employee');
            data.updated_at = new Date()
            delete data.id;
            const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: data});
            if(result.modifiedCount === 0 ){
                return socket.emit("UpdateEmployeeData", "Not updated")
            }else{
                return socket.emit("UpdateEmployeeData", "Updated Successfully")
            }
        
        } finally {
            await mongoClient.close();
        }  
    })

    socket.on("deleteEmployee", async (data) => {
        let mongoClient
        try {
            mongoClient = await mongoDBConnect.connectToCluster(config.DB_URI);
            const db = mongoClient.db(config.COLLECTION);
            const collection = db.collection('employee');

            const result = await collection.deleteOne({_id: new ObjectId(data.id)});
            console.log(result)
            if(result.deletedCount === 1 ){
                return socket.emit("DeleteEmployeeData", "Not Deleted")
            }else{
                return socket.emit("DeleteEmployeeData", "Deleted Successfully")
            }
        
        } finally {
            await mongoClient.close();
        }  
    })
})