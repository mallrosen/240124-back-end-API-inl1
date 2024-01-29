const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

const players = [{
    name: "Malin Rosén",
    jersey:13,
    position: "Goalie",
    id:1
},{
    name: "Stefan Stefan",
    jersey:9,
    position: "Forward",
    id:2
},{
    name: "Matilda Wallin",
    jersey:3,
    position: "Center",
    id:3
},{
    name: "Pelle Lindbergh",
    jersey:2,
    position: "Goalie",
    id:4
},{
    name: "Mats Sundin",
    jersey: 21,
    position: "Center",
    id:5
},{
    name: "Nicke Bergman",
    jersey:7,
    position: "Forward",
    id:6
}]





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.get('/players', (req, res)=>{
    res.json(players)
})


//ta det som finns i bodyn och skapar nytt objekt för att lägga in i arrayen.
app.post('/players', (req, res)=>{
    const play = {
        name: req.body.name,
        jersey: req.body.jersey,
        position: req.body.position,
        id: (players.length + 1)
    }
    players.push(play)

    console.log(req.body);
    res.status(201).send('Created')
})


app.get('/players/:userId',(req,res)=>{
    console.log(req.params.userId)
    let p = players.find(player=>player.id == req.params.userId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    res.json(p)

});



