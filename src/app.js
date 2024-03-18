const express = require("express")
const app = express()
const port = process.env.port || 3000

const path = require("path")
const x = path.join(__dirname,'../public')
app.use(express.static(x))

app.set('view engine', 'hbs')

const weather = require("./tools/weather")

app.get('/', (req,res)=> {
    res.render('index', {title:"Weather Now"})
})

app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send("Error : You must provide an address")
    }
    weather(req.query.address, (error, data)=>{
        if(error) {
            return res.send({error})
        }
        res.send(data)
    })
})






app.get('*', (req,res)=>{
    res.send('Page not found')
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})