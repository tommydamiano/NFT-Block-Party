const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const Twitter = require('twitter');
const { calculateSummaryStats } = require('./functionality');

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(cors())

app.post('/blockUser', function (req, res) {
    const response = req.body
    const token = response.token
    const secret = response.secret
    const userScreenName = response.userScreenName

    const client = new Twitter({
        consumer_key: 'no key 4 u',
        consumer_secret: 'no token 4 u',
        access_token_key: token,
        access_token_secret: secret
    })
    
    const uri = 'mongodb+srv://tommydamiano:nohackmedatabase4u'
    const mongoClient = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true});

    mongoClient.connect(async () => {
        const collection = mongoClient.db('nftblocker').collection('users_to_block_v2');
        const usersToBlock = await collection.aggregate([{ $sample: { size: 100 } }]).toArray();

        const summaryStats = calculateSummaryStats(usersToBlock)
        res.send({usersToBlock: usersToBlock, summaryStats: summaryStats})

        // const appUsersCollection = mongoClient.db('nftblocker').collection('app_users');
        // const userInDB = await appUsersCollection.findOne({ username: userScreenName })
        // if (userInDB == null) {
        //     await appUsersCollection.insertOne({ username: userScreenName, uses: 1 })
        // } else {
        //    await appUsersCollection.updateOne({ username: userScreenName }, { $set: { uses: userInDB.uses + 1 } })
        // }

        mongoClient.close();

        // for (userNum in usersToBlock) {
        //     let screenName =  usersToBlock[userNum]['username']
        //     let params = {screen_name: screenName, skip_status: 1}
        //     client.post('blocks/create.json', params, function(error, tweets) {
        //         if (error) {
        //             console.log(error) 
        //         }
        //   })
        // }
    })
})


app.listen(process.env.PORT || port, () => console.log(`Running on port ${port}`))
