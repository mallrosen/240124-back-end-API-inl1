const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

const { sequelize, Player } = require('./models')
const migrationhelper = require('./migrationhelper')

app.listen(port, async () => {
    await migrationhelper.migrate()
    await sequelize.authenticate()
    console.log(`Example app listening2 on port ${port}`)
})


app.get('/players',async (req,res)=>{
    let players = await Player.findAll()
    let result = players.map(p=>({
        name: p.name,
        jersey: p.jersey,
        position: p.position,
        team: p.team
    }))
     res.json(result)
})


//ta det som finns i bodyn och skapar nytt objekt för att lägga in i arrayen.
app.post('/players', async (req, res)=>{
    const play = {
        name: req.body.name,
        jersey: req.body.jersey,
        position: req.body.position,
        team: req.body.team
    }

    await Player.create(play)

    console.log(req.body);
    res.status(201).send('Created')
})

//HITTA EN PLAYER (BEHÖVS EJ)

// app.get('/players/:userId',async (req,res)=>{
//     console.log(req.params.userId)
//     const thePlayer = await Player.findOne({
//         where: {id: req.params.userId}
//     })

//     if(thePlayer == undefined){
//         res.status(404).send('Finns inte')
//     }
//     res.json(thePlayer)

// });

//Uppdatera - replacea hela objektet
app.put('/players/:userId',(req,res)=>{
    //Hittar spelaren
    let updatePlayer = Player.find(player=>player.id == req.params.userId)
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
