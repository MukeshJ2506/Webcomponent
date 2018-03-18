/**Static server to launch the application 
*/
const express = require('express');
const app = express();
var path = require('path');
app.use(express.static("."));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(3000, () => console.log('App listening on port 3000!'));