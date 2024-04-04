const express = require("express");
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

global.config = require("./config");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use('/user', require('./routes/user'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
  res.render('index',{user})
})
app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
