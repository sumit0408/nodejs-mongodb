// CRUD : Creation of DB, Read(Query), Update, Delete ....


const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'Yaar';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function main() {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db(dbName);

    const collection = db.collection('profile');
    // await collection.insertMany([
    // {name:"Sumit Singh",
    //  age:21,
    //  section:"AIML"},
    // {name:"Raman Baliyan",
    //  age:21,
    //  section:"AIML"},
    // {name:"Yashi Chaudhary",
    //  age:22,
    //  section:"AI"},
    // {name:"Mukul Tyagi",
    //  age:24,
    //  section:"CSE"
    // },
    // {name:"Anshul Chauhan",
    //  age:20,
    //  section:"GNM"}
    // ]);
    // console.log('Document inserted successfully');

    // await collection.deleteMany({});

    await collection.updateOne({name:"Sumit Singh"},{$set:{age:23}})


    const documents = await collection.find({}).toArray();
    console.log('Documents:', documents);
  } 
  catch (error) {
    console.error('Error:', error);
  } 
  finally 
  {
    // Close the connection when done
    await client.close();
    console.log('Connection closed');
  }
}

main().catch(console.error);
