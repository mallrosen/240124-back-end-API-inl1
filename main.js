const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

const { sequelize, Player } = require('./models')
const migrationhelper = require('./migrationhelper')

app.listen(port, async () => {await migrationhelper.migrate()
    await sequelize.authenticate()
    console.log(`Example app listening2 on port ${port}`)
})

// const players = [{
//     name: "Malin Rosén",
//     jersey:13,
//     position: "Goalie",
//     id:1
// },{
//     name: "Stefan Stefan",
//     jersey:9,
//     position: "Forward",
//     id:2
// },{
//     name: "Matilda Wallin",
//     jersey:3,
//     position: "Center",
//     id:3
// },{
//     name: "Pelle Lindbergh",
//     jersey:2,
//     position: "Goalie",
//     id:4
// },{
//     name: "Mats Sundin",
//     jersey: 21,
//     position: "Center",
//     id:5
// },{
//     name: "Nicke Bergman",
//     jersey:7,
//     position: "Forward",
//     id:6
// }]




let players = []

app.post('/players', async (req, res) => {
    const { name, jersey, position } = req.body;
    const player = {
        name,
        jersey,
        position
    };

    players.push(player);
    console.log('Player added:', player);
    res.sendStatus(201); // Created
});



// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

app.get('/players', async (req, res)=>{
    res.json(players)
})

app.get('/api/players',async (req,res)=>{
    let players = await Player.findAll()
    let result = players.map(p=>({
        userid: p.userid,
        name: p.name
    }))
     res.json(result)
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


app.get('/players/:userId',async (req,res)=>{
    console.log(req.params.userId)
    let p = players.find(player=>player.id == req.params.userId)
    // 404???
    if(p == undefined){
        res.status(404).send('Finns inte')
    }
    res.json(p)

});

//Uppdatera - replacea hela objektet
app.put('/players/:userId',(req,res)=>{
    //Hittar spelaren
    let updatePlayer = players.find(player=>player.id == req.params.userId)
    // 404??? Om den inte finns
    if(updatePlayer == undefined){
        res.status(404).send('Finns inte')
    }
    updatePlayer.name = req.body.name
    updatePlayer.jersey = req.body.jersey
    updatePlayer.position = req.body.position
    updatePlayer.id = req.body.id
    res.status(204).send('Uppdaterat')

})


//För att kunna radera
app.delete('/players/:userId',(req,res)=>{
    let deletePlayer = players.find(player=>player.id == req.params.userId)
    // 404???
    if(deletePlayer == undefined){
        res.status(404).send('Finns inte')
    }
    players.splice(players.indexOf(deletePlayer),1)
    res.status(204).send('')  
});