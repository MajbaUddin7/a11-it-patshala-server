const express = require('express')
const app = express()
var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// MiddleWate 
app.use(cors());
app.use(express.json());


// Password : S6zUSsVfeRgJNPm8
// UserName: it-patshala

const uri = "mongodb+srv://it-patshala:S6zUSsVfeRgJNPm8@cluster0.l8cbgjs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('it-patshala').collection('services');
        const reviewCollection = client.db('it-patshala').collection('reviews');


        // Service Part Functionality
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            // const serviceLimited = await cursor.limit(3).toArray();
            res.send(services);
        });

        app.get('/home-services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            // const serviceLimited = await cursor.limit(3).toArray();
            res.send(services);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id);
            const query = { _id: ObjectId(id) };
            const services = await serviceCollection.find({}).toArray();
            const service = services.find(abc => abc._id === id);
            res.send(service);
        });

        app.post('/services', async (req, res) => {
            const service = req.body;
            // console.log(service);
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        });

        // Review Section Functionality
        app.post('/reviews', async (req, res) => {
            const service = req.body;
            // console.log(service);
            const result = await reviewCollection.insertOne(service);
            res.send(result);
        });

        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const reviews = await reviewCollection.findOne(query);
            res.send(reviews);
        });
    }
    finally {

    }
}
run().catch(err => console.error(err));




app.get('/', (req, res) => {
    res.send('Welcome to IT Patshala Server!')
})

app.listen(port, () => {
    console.log(`IT Patshala Server app listening on port ${port}`)
})