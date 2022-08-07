const express = require('express');
const exphdb = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('handlebars' , exphdb.engine({defaultLayout : 'main'}));
app.set('view engine' , 'handlebars');

app.use(express.static('public'));


//為了將目前頁面加入 .active   需要做params的比對
const Handlebars = require('handlebars');
Handlebars.registerHelper('ifCond', function (v1,v2,options) {
  if (v1 === v2)
      return options.fn(this);
  else
      return options.inverse(this);
});

Handlebars.registerHelper('exCond', function (v1,v2,options) {
  if (v1 !== v2)
      return options.fn(this);
  else
      return options.inverse(this);
});



app.get('/' , (req , res) => {
  res.render('index');
})

app.get('/:link' , (req , res) => {
  const navLink = req.params.link;

  res.render(navLink , {page : navLink});
})

app.listen(port , () => {
  console.log(`The express server is running on port ${port}`);
})