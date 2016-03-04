var express = require('express'),
        app = express();
        
app.use(express.static('public'));

app.get('/', function(req, res) {
    var data = getData(req.headers);
    res.send(data);
});


app.listen(process.env.PORT, function() {
    console.log('server started...');
});

function getData(headers) {
    var ip = headers['x-forwarded-for'];
    
    var language = parseLanguage(headers['accept-language']);
    
    var os =parseOs(headers['user-agent']); 
    
    return { ipaddress: ip, language: language, software: os };
}

function parseOs(str) {
    var regex = /\(([^)]+)\)/;
    
    return regex.exec(str)[1];
}

function parseLanguage(str) {
    var index = str.indexOf(',');
    
    return str.substring(0, index);
}