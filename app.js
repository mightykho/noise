const fs = require('fs')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'))
app.set('view engine', 'pug')

var options = {
  root: __dirname,
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

app.get('/', (req, res) => {
  res.render('index', { pageId: 0 });
})

app.get('/p/:pageId', (req, res) => {
  var pageId = req.params.pageId;


  if (fs.existsSync(__dirname + '/views/page_' + pageId + '.pug')) {
    res.render(`page_${pageId}`, { pageId: pageId });
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
