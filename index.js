var express = require('express');
var http =  require('http');
var path =  require('path');
var nodemailer = require('nodemailer');


var app = express();
var server = http.Server(app);
var port = 8080;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "page/index.html")));

//Routing
app.use(express.static(path.join(__dirname, 'src/')));
app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "page/index.html"))
})

app.post("/send_email", function(req, response){
    
    var to = req.body.to;
    var subject = req.body.subject;
    var visitname = req.body.visitname
    var message = req.body.message;
    var adresse = req.body.adresse;
    var firm = req.body.firm;
    var fecha = req.body.fecha;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'cesarguayaink@gmail.com',
            pass: 'ycwtphlslgeqynmm'
        }
})

var mailOptions = {
    from: 'cesarguayaink@gmail.com',
    to: to,
    subject: subject,
    html: `
        <p><strong>Informe Detallado</strong></p>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th><strong>Nombre del visitado</strong></th>
                <td>${visitname}</td>
            </tr>
            <tr>
                <th><strong>Direccion</strong></th>
                <td>${adresse}</td>
            </tr>
            <tr>
                <th><strong>Firma</strong></th>
                <td>${firm}</td>
            </tr>
            <tr>
                <th><strong>Fecha</strong></th>
                <td>${fecha}</td>
            </tr>
            <tr>
                <th><strong>Detalle</strong></th>
                <td>${message}</td>
            </tr>
        </table>
    `,


}
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error)
    } else {
        console.log("email sent with" + info.response)
    }
    response.redirect('/')
})

})

//initialize web server path

server.listen(port, function(){
    console.log("Starting Server on port:" + port)
})
