const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl')
const turl = { full: 'https://facebook.com' };

describe('Test', () => {
    
    //Connect to Mongo DB
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    //Disconnect from MongoDB
    afterAll(async () => {
        mongoose.disconnect();

    })

    //TEST CASE 1: inputting full URL into function should create a data object with both the full URL inputed and short URL generated, as well a clicks variable
    //Success~!
    it('create & save URL successfully', async () => {
        const test = new ShortUrl(turl);
        const savedURL = await test.save();

        expect(savedURL.full).toEqual('https://facebook.com');
        expect(savedURL.short).toBeDefined();
        expect(savedURL.clicks).toBeDefined();
    });


    //TEST CASE 2: empty argument should result in error
    //Success~!
    it('nullURL should fail', async () => {
        const nullURL = new ShortUrl();
        let err;
        try {
            const savednullURL = await nullURL.save();
            error = savednullURL;

        } catch (error) {
            err = error
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);

    });
    

    
})