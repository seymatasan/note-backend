var express = require('express');
var path = require('path');
var fs = require ('fs');
var app = express();
var db = require('./helper/db')(); // db connection
const morgan = require('morgan');
app.use(morgan('dev'));
var cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

app.use(bodyParser.urlencoded({ extended: false })); //Encode(kodlanmış/şifrelenmiş) edilmiş urller üzerinde Body-Parser’ı kullanmak istiyorsanız eğer “extended” özelliğine true değerini vermeniz yeterlidir.
app.use(bodyParser.json()); //JSON veri tipinde gelecek olan dataların kullanılabilmesi için bu tanımlamanın yapılması gerekmektedir.
const port = process.env.PORT || 3000;



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  

app.use(cors()); // cors policy 


var routeUser =require('./routes/users');
var routeNote = require('./routes/notes');
var routeIndex = require('./routes/index');

app.use('/users',routeUser);
app.use('/notes',routeNote);
app.use('/index',routeIndex);

app.use ((req,res,next)=>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});

app.listen(port);


module.exports = app;

