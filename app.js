var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use('/', express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.env.NODE_ENV = 'production';

var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
]

app.route('/api/comments')
    .get(function (req, res) {
        res.send(data);
    })
    .post(function (req, res) {

        var newId = Date.now();
        
        data.push({
            id: newId,
            author: req.body.author,
            text: req.body.text
        });

        res.send({
            code: 200,
            id: newId
        });
    })

app.listen(3000, function () {
    console.log('Listening on: http://localhost:3000');
});