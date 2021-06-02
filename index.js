const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 8888; //eslint-disable-line
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, './../client/build'))); //eslint-disable-line
app.use(router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html')); //eslint-disable-line
});

app.listen(PORT, () => {  
  console.log(`Server running at http://localhost:${PORT}`); 
}); 