const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.set('view engine', 'ejs');
app.set('views', './views');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/', function(req, res) {
    res.render('quiz'); 
});
app.get('/getQuiz', function(req, res) {
    getQuiz(res);
});
function getQuiz(res){
    var url = "mongodb://localhost/quiz";
    let list = [];
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db('quiz');
        dbo.collection("quiz").find({}).toArray((err, quiz) => {
            if(err){
                console.log('error');
            }else{
                res.send(quiz);
            }
        })
        db.close();
    });
}

app.listen(9000, () => console.log("port 5000 listening"));