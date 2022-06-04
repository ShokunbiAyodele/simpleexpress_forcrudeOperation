const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://abdulfatah:ayodele@cluster0.xxwv6.mongodb.net/test?retryWrites=true&w=majority', {
}).then(client => {
    console.log('connected')
const db = client.db('expresstable')
const quotescollection = db.collection('quotes')

app.get('/', (req,res) => {
    const cusor = db.collection('quotes').find().toArray().then(result => {
        console.log(result)
        res.render('index.ejs',{quotes : result});
        // res.status(200).json(result);
    }).catch(error=> {
        console.log(error)
    });
    
})


app.post('/quotes', (req,res) => {
    if(req.method !== 'POST'){
        res.json('request not Allowed')
        
    }
    quotescollection.insertOne(req.body).then( result => res.redirect('/')).catch(error => console.log(error))
})

app.put('/quotes' , (req,res) => {
    if(req.method !== 'PUT'){
        res.json('request not Allowed')
    }
    quotescollection.findOneAndUpdate(
        {name : req.body.name},
        {
            $set: {
                name : req.body.name,
                quote : req.body.quote
            }
        },
        {
            upsert : true
        }
    ).then(result => {
        res.json('success')
    }).catch(error => console.log(error))
})

app.delete('/quotes', (req,res) => {
    quotescollection.deleteOne(
        { name : req.body.name }).
        then(result => {
            if(result.deletedCount === 0){
                return res.json('no quotes to delete')
            }
            res.json('deleted successfully')
        }).
        catch(error => console.log(error))

})

}).catch(error => console.log(error))





app.listen(3000, () => {
    console.log("server is listening on port 3000");
})  

