const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const publicRoutes = require('./routes/routes');
const privRoutes = require('./routes/privatedRoutes');

const path = require ('path');
//const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');

require('./database/');

const app = express();

//app.use(cors());

//app.use(express.json());

//Onde vão ficar os arquivos publicos acessados pela aplicação
app.use(express.static(path.join(__dirname, '../', 'public')));
app.set('views', path.join(__dirname, '../', 'public'));
//definindo handlebars como linguagem marc front
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
 //Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(morgan('dev'));

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);


 //require('./controllers/projectController')(app);

app.get('/', (req, res) => {
    res.render('index.html')
}); 

app.get('/detalhepaciente', (req, res) => {
    res.render('detalhePaciente.html')
});

app.use(publicRoutes);
app.use(privRoutes);

app.listen(3000);   