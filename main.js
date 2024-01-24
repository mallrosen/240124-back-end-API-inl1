const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
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
    id:52
},{
    name: "Nicke Bergman",
    jersey:7,
    position: "Forward",
    id:6
}]


app.get('/players/:userId', (req, res)=>{
    console.log(req.params.userId)

    let p = players.find(e=>e.id == req.params.userId)


    if(p == undefined){
        res.status(404).send('Not found')
    }
    res.json(p)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.get('/players', (req, res)=>{
    res.json(players)
})
