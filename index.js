const {MongoClient} = require("mongodb");
const uri = 'mongodb://localhost:27017';
const dbName = "Hello";
const client = new MongoClient(uri, {useUnifiedTopology: true});

async function main(){
    try{
        await client.connect();
        console.log('Connected to the Database..');

        const db = client.db(dbName);
        const collection = db.collection("super");

        // insertion (ONE && MANY)...
        // await collection.insertOne({
        //     item: 'canvas',
        //     qty: 100,
        //     tags: ['cotton'],
        //     size: { h: 28, w: 35.5, uom: 'cm' }
        //   });

        // await collection.insertMany([
        //     {
        //       item: 'journal',
        //       qty: 25,
        //       tags: ['blank', 'red'],
        //       size: { h: 14, w: 21, uom: 'cm' }
        //     },
        //     {
        //       item: 'mat',
        //       qty: 85,
        //       tags: ['gray'],
        //       size: { h: 27.9, w: 35.5, uom: 'cm' }
        //     },
        //     {
        //       item: 'mousepad',
        //       qty: 25,
        //       tags: ['gel', 'blue'],
        //       size: { h: 19, w: 22.85, uom: 'cm' }
        //     }
        //   ]);

        // await collection.deleteOne({item:"canvas"});
        
        // updation....
        await collection.updateOne(
            { item: 'mousepad' },
            {
              $set: { 'size.uom': 'cm', status: 'P' },
              $currentDate: { lastModified: true }
            }
          );
        
        const documents = await collection.find({}).toArray();
        console.log(documents);

    }
    catch(error){
        console.log('Error:',error);
    }
    finally{
        await client.close();
        console.log('Connection Closed.');
    }
}

main().catch(console.error);