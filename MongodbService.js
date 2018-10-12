const mongodb=require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';



// Database Name
const dbName = 'demo-db';
class MongodbService {
    async init(){
        const MongoClient=mongodb.MongoClient;
        const client=await MongoClient.connect(url);
        this.db=client.db(dbName);
    }
    async Registration(payload) {

        const result = await this.db.collection('registrations').findOneAndUpdate({
            email: payload.email,
        }, {
            $set: payload
        }, {
            upsert: true,
        });

        // Return data
        const registration = await this.db.collection('registrations').findOne({ email: payload.email });
        return registration;
    }
    async Auth(payload){
        console.log(payload);
       const result=await this.db .collection('registrations').findOne({
        email:payload.email, 
        password:payload.password, 
       });
       console.log(result);
       return result;
    }
 async outfit(){
     const result = await this.db.collection('outfit').find({}).toArray()
     
     console.log(result);
     return result;

    
}

} 

module.exports = MongodbService;
