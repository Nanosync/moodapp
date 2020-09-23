const app = require('../../server');
const supertest = require('supertest');
const request = supertest(app);

const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.promise = global.Promise;

const databaseName = "mooddb-test";

const Mood = require("../../models/mood");

beforeAll(async () => {
    const url = `mongodb://127.0.0.1:27017/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
});

describe('Mood', () => {
    it('should create a new mood', async (done) => {
        const data = {
            feeling: "Overjoyed",
            message: "Testing is fun"
        };
        const res = await request.post('/api/v1/moods').send(data);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.feeling).toBe(data.feeling);
        expect(res.body.message).toBe(data.message);
        
        const mood = await Mood.findOne({ _id: res.body._id })
        expect(mood).toBeTruthy()
        expect(mood.feeling).toBe(data.feeling)
        expect(mood.message).toBe(data.message)
        
        done();
    });
    
    it('should get a mood', async (done) => {
        let mood = await Mood.create({
            timestamp: Date.now(),
            feeling: "sad",
            message: "help"
        });

        const res = await request.get("/api/v1/moods/" + mood._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.feeling).toBe(mood.feeling);
        expect(res.body.message).toBe(mood.message);
        
        done();
    });

    it('should update a mood', async (done) => {
        let mood = await Mood.create({
            timestamp: Date.now(),
            feeling: "sad",
            message: "help"
        });

        let data = {
            timestamp: new Date(Date.now()).toISOString(),
            feeling: "sad",
            message: "delete me now"
        };

        const res = await request.put("/api/v1/moods/" + mood._id).send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.feeling).toBe(data.feeling);
        expect(res.body.message).toBe(data.message);
        expect(res.body.timestamp).toBe(data.timestamp);

        let mood2 = await Mood.findOne({ _id: res.body._id });
        expect(mood2).toBeTruthy();
        expect(mood2.feeling).toBe(data.feeling);
        expect(mood2.message).toBe(data.message);
        expect(mood2.timestamp.toISOString()).toBe(data.timestamp);
        
        done();
    });

    it('should update a mood attribute', async (done) => {
        let mood = await Mood.create({
            timestamp: Date.now(),
            feeling: "sad",
            message: "help"
        });

        let data = {
            feeling: "happy"
        };

        const res = await request.patch("/api/v1/moods/" + mood._id).send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.feeling).toBe(data.feeling);
        expect(res.body.timestamp).toBeTruthy();

        let mood2 = await Mood.findOne({ _id: res.body._id });
        expect(mood2).toBeTruthy();
        expect(mood2.feeling).toBe(data.feeling);
        
        done();
    });

    it('should delete a mood', async (done) => {
        let mood = await Mood.create({
            timestamp: Date.now(),
            feeling: "sad",
            message: "help"
        });

        const res = await request.delete("/api/v1/moods/" + mood._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body._id).toBeTruthy();
        expect(res.body.feeling).toBe(mood.feeling);
        expect(res.body.message).toBe(mood.message);
        expect(res.body.timestamp).toBe(mood.timestamp.toISOString());

        let mood2 = await Mood.findOne({ _id: res.body._id });
        expect(mood2).toBeNull();
        
        done();
    });
})

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
}

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            if (error.message === "ns not found") {
                return;
            }
            if (error.message.includes("a background operation is currently running")) {
                return;
            }
            console.log(error.message);
        }
    }
}

afterEach(async () => {
    await removeAllCollections();
});

afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
});