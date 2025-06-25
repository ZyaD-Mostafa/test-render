const ex = require("express")
const app = ex()
const Article = require("./models/Article.js")
app.use(ex.json())
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://zyadmostafa9011:v02bsM9uMfJMUnah@cluster0.viwqegk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected successfully");
})
.catch((error)=>{
    console.log("arror with connection with DB" , error);
})


app.get("/" , (req , res ) => {
    res.send("welcome in Root page ")
})
app.get("/numbers" , (req , res ) => {
    let number = ""
    for(let i = 0 ; i<= 100 ; i++){
        number += i +' - '
    }
    res.send(` the number is  ${number}`)
})

app.post("/zyad" , (req , res ) => {
    res.send("Zyad Mostafa")
})
app.get("/zyadpost" , (req , res ) => {
    res.send("Zyad Mostafa")
})

app.delete("/testdel" , (req , res ) => {
    res.send("test delete ")
})

app.put("/test11" , (req , res ) =>{
    res.send(`hi we are test ${req.body.phone}`)
})

app.get('/findSummation/:num1/:num2' , (req , res ) =>{
    console.log(req.params);
    const num1 = req.params.num1
    const num2 = req.params.num2
    res.send(`wait the result .... total is ${ Number(num1) + Number(num2)}`)
})
app.get('/sayhello' , (req , res ) =>{
    // console.log(req.body.name);
    // let name = req.body.name
    // res.send(`Hi ${name}  yor age ${req.query.age}`)
    res.json({
        name : req.body.name,
        age : req.query.age,
        "creatd BY" :  "zyad mostafa"
    })
})



// =========================== Aritcle End points 

app.post("/articles" ,async (req , res ) =>{
    const newArticle  = new Article()
    // newArticle.title = "my first article3"
    // newArticle.body = "hi we test first article3"
    newArticle.title =req.body.title
    newArticle.body = req.body.body
    newArticle.numberOfLike = 10
    await newArticle.save()
    // res.send(`The new article has been stored  \n the title ${newArticle.title}`)
    res.json(newArticle)
})

app.get("/articles" ,  async (req ,res)=>{
   const articles =  await Article.find()
   res.json(articles)
})
app.get("/articles/:articleId" ,  async (req ,res)=>{
    const id = req.params.articleId

    try{
        const articles =  await Article.findById(id)
        res.json(articles)
        return
    }catch(error){
        console.log("error with get the article id " , id , " " + error);
        return res.json(error)
    }
})

app.delete("/articles/:articleId" , async ( req , res )=> {
    const id = req.params.articleId 
    try{
        const article = await Article.findByIdAndDelete(id)
         if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(article)

    }catch(error){
        console.log("error with delete the article id " , id , " " + error);
        return res.json(error)
    }
})


app.get("/showAllArticle" , async ( req , res )=> {

    try{
        const articles = await Article.find() 
        res.render("article.ejs" , {
            allArticles : articles
        })

        // res.json(art)
    }catch(error){
        return json("eror " + error)
    }
})





app.listen(3000 , ()=>{
    console.log("i'am listening in port 3000")
})