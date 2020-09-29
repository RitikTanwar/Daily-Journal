const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const _ = require('lodash');
// const ejs = require("ejs");


const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.use('/static',express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "template"));

// app.get('/',(req,res)=>{
  //     res.status(200).render('home.pug',homeStartingContent);
  // });
const posts=[];

app.get('/',(req,res)=>{
    const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
    // const post=JSON.stringify(posts)
    const params={'title':'Home','cont':homeStartingContent,'data':posts};
    res.status(200).render('home.pug',params);
    // console.log(posts);
  });
  
  app.get('/about',(req,res)=>{
  const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
  const params={'title':'About','cont':aboutContent};
  res.status(200).render('about.pug',params);
});

app.get('/contact',(req,res)=>{
  const params={'title':'Contact Us','cont':contactContent};
  res.status(200).render('contact.pug',params);
});

app.get('/compose',(req,res)=>{
  res.status(200).render('compose.pug');
});

app.get('/post/:postName',(req,res)=>{
  // res.status(202)
  const reqTitle=req.params.postName;
  const req_title=_.lowerCase(req.params.postName);
  // _.lowerCase(req_title);
  posts.forEach((ele)=>{
    _.lowerCase(ele.text);
    // console.log(req_title);
    // console.log(ele.text);

    if(req_title===_.lowerCase(ele.text)) {
      // console.log('Match Found!');
      const param={'title':ele.text,'content':ele.textarea};
      res.status(200).render('post.pug',param);
    } 
    // else console.log('No Match Found');
  });
  // console.log(req.params);
});

// app.post('/post/:postName',(req,res)=>{
//   const req_text=_.lowerCase(req.params.postName);
//   res.redirect('/post/req_text');
// });

app.post('/compose',(req,res)=>{ 
  const data={
    text:req.body.text,
    textarea:req.body.textarea
  };
  //  const text=req.body.text;
  // const post=JSON.stringify(data);
  
  posts.push(data);
  res.redirect("/");
})

// app.get('/',(req,res)=>{
//   res.status(200).render('home.pug');
// });


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
