const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://lawyer-db:PLlAcOXxetPxrRe@cluster0.v73oziy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const Services = client.db('lawyer').collection('services');
        const Reviews = client.db('lawyer').collection('review');
        const service = {
            name: 'divorce case',
            email: 'ab@gm.com'
        }
        const result = await Services.insertOne(service);
    }
    finally {

    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello from Lawyer server');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});