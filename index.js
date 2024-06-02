require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://stride:La3kBghqdxf0wzCS@cluster0.40hja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const productDB = client.db("productDB");
    const shoeCollection = productDB.collection("shoeCollection");

    app.post("/shoes", async(req, res) => {
      const shoesData = req.body;
      const result = await shoeCollection.insertOne(shoesData)
      console.log(result)
      res.send(result)
    })

    app.get("/shoes", async(req, res) => {
      const shoesData = shoeCollection.find();
      const result = await shoesData.toArray()
      console.log(result)
      res.send(result)
    })

    app.get("/shoes/:id", async(req, res) => {
      const id = req.params.id;
      const result = await shoeCollection.findOne({_id: new ObjectId(id)})
      console.log(result)
      res.send(result)
    })

    app.patch("/shoes/:id", async(req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await shoeCollection.updateOne({_id: new ObjectId(id)}, {$set:updateData})
      console.log(result)
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// stride
// La3kBghqdxf0wzCS