const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mayhaali:SsLi5KuHuTDNaWK6@cluster0.j8ysx6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

app.get('/process', async(req, res) => {
    const query = req.query.query;
    const type = req.query.type;
  
    console.log('User entered:', query);
    console.log('Search type:', type);

    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("Stock");
    const collection = db.collection("PublicCompanies");

    const results = await collection.find({ [type]: query }).toArray();

    results.forEach(c => {
        console.log(`Name: ${c.company}, Ticker: ${c.ticker}, Price: $${c.price}`);
    });

    let html = '<h2>Search Results</h2>';
    results.forEach(c => {
        html += `${c.name}, ${c.ticker}, $${c.price}`;
    });

    res.send(html);
});

app.listen(3000);
