const { Op } = require("sequelize");
const { Player } = require("../models")

//Uppdatera spelare
async function onUpdatePlayer (req, res){
    const updatePlayer = await Player.findOne({
      where: { id: req.params.id },
    });
  
    if (updatePlayer == undefined) {
      res.status(404).send("Finns inte");
    }
  
    updatePlayer.name = req.body.name;
    updatePlayer.jersey = req.body.jersey;
    updatePlayer.position = req.body.position;
    updatePlayer.team = req.body.team;
    updatePlayer.id = req.body.id;
  
    await updatePlayer.save();
  
    res.status(204).send("Uppdaterat");
  }

//ny spelare
async function onNewPlayer (req, res){
    const play = {
      name: req.body.name,
      jersey: req.body.jersey,
      position: req.body.position,
      team: req.body.team,
    };
  
    await Player.create(play);
  
    console.log(req.body);
    res.status(201).send("Created");
  }

  async function onSortPagingSearchPlayer (req, res){
    let sortByName = req.query.sortByName || "name";
    let sortOrder = req.query.sortOrder || "asc";
    let q = req.query.q || "";
    const offset = Number(req.query.offset || 0); 
    const limit = Number(req.query.limit || 20);
    const players = await Player.findAndCountAll({
      where:{
          name:{
              [Op.like]: '%' + q + '%'
          }
      },
      order: [[sortByName, sortOrder]],
  
      offset: offset,
      limit:limit
    });
    const totalNr = players.count
    const result = players.rows.map((p) => {
      return {
        id: p.id,  
        name: p.name,
        jersey: p.jersey,
        position: p.position,
        team: p.team,
      };
    });
    return res.json({result, totalNr});
  }

async function onFindOnePlayer (req,res){
    console.log(req.params.userId)
    const thePlayer = await Player.findOne({
        where: {id: req.params.userId}
    })

    if(thePlayer == undefined){
        res.status(404).send('Finns inte')
    }
    res.json(thePlayer)

}

function onDeletePlayer(req, res) {
    let deletePlayer = players.find((player) => player.id == req.params.id);
    if (deletePlayer == undefined) {
      res.status(404).send("Finns inte");
    }
    players.splice(players.indexOf(deletePlayer), 1);
    res.status(204).send("");
  }

  module.exports = {
    onUpdatePlayer,
    onNewPlayer,
    onSortPagingSearchPlayer,
    onFindOnePlayer,
    onDeletePlayer
  }