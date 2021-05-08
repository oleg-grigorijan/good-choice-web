const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/good-choice'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/good-choice/index.html'));
});

app.listen(process.env.PORT || 4200);
