const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { query } = require('express');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const port = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(cors());
app.use(express.json())
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jufnc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("todoApp");
        const collection = database.collection("todo-collection");
        // create a document to insert

        //get api


        app.get("/api/todo", async (req, res) => {
            const cursor = collection.find({})
            const users = await cursor.toArray();
            res.send(users);

        })

        // single data for details page

        app.get("/api/todo/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collection.findOne(query);
            res.send(result);
        })
        // post api

        app.post("/api/todo", async (req, res) => {
            const newUser = req.body;
            const result = await collection.insertOne(newUser);
            // console.log(result);
            // console.log(newUser)
            res.json(result);//res.send . 
        })

        // update api -

        app.put("/api/todo/:id", async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            //    console.log(updatedUser)
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    title: updatedUser.title,
                    description: updatedUser.description,
                    status: updatedUser.status,

                },
            };
            const result = await collection.updateOne(filter, updateDoc, options);
            res.send(result)//res.json(result)
            // console.log("result : ",result);
        })

        // delete api

        app.delete("/api/todo/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collection.deleteOne(query);
            // console.log("deleting user with id ",id);
            // res.json(1)
            res.send(result);
            // console.log(result.deletedCount)
        })
        app.delete("/api/todo", async (req, res) => {
            const query = { status: true }
            const result = await collection.deleteMany(query);
            // console.log("deleting user with id ",id);
            // res.json(1)
            res.send(result);
            // console.log(result.deletedCount)
        })

        } finally {
        }
    }
run().catch(console.dir);


    app.get('/', (req, res) => {
        res.send('Server is ready');
    });

    app.listen(port, () => {
        console.log(`Serve at http://localhost:${port}`);
    });