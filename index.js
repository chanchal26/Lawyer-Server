const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://lawyer-db:PLlAcOXxetPxrRe@cluster0.v73oziy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function dbConnect() {
    try {

        await client.connect();
        console.log('database connected');

    }
    catch (error) {
        console.log(error.name, error.message);
    }
}

dbConnect();


const Services = client.db('lawyer').collection('services');
const Reviews = client.db('lawyer').collection('reviews');

app.post('/reviews', async (req, res) => {
    try {
        const result = await Reviews.insertOne(req.body);
        if (result.insertedId) {
            res.send({
                success: true,
                message: `Successfully created the review with id ${result.insertedId}`
            })
        } else {
            res.send({
                success: false,
                message: "Couldn't create the review"
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});


app.get('/reviews', async (req, res) => {
    try {
        const cursor = await Reviews.find({});
        const reviews = await cursor.toArray();
        res.send({
            success: true,
            message: `Successfully got the data`,
            data: reviews
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

app.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Reviews.deleteOne({ _id: ObjectId(id) });
        if (result.deletedCount) {
            res.send({
                success: true,
                message: `Successfully Deleted The Review`
            })
        } else {

        }
    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
});

app.get('/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Reviews.findOne({ _id: ObjectId(id) })
        res.send({
            success: true,
            data: review
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

app.patch('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Reviews.updateOne({ _id: ObjectId(id) }, { $set: req.body });
        if (result.matchedCount) {
            res.send({
                success: true,
                message: 'Successfully Updated Your Review'
            })
        } else {
            res.send({
                success: false,
                message: "Couldn't Update the review"
            })
        }
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


app.get('/', (req, res) => {
    res.send('Hello from Lawyer server');
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});