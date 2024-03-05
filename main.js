const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { check } = require("express-validator");
const playerController = require("./contollers/playerController.js")
const { validateCreatePlayer } = require('./validators/playerValidator.js')
const { sequelize, Player } = require("./models");
const migrationhelper = require("./migrationhelper");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  })
);


//Paging, sortera och söka spelare
app.get("/players", check("q").escape(), playerController.onSortPagingSearchPlayer);

//ta det som finns i bodyn och skapar nytt objekt för att lägga in i arrayen.
app.post("/players", validateCreatePlayer, playerController.onNewPlayer);

// Hitte en spelare
app.get('/players/:userId', playerController.onFindOnePlayer);

//Uppdatera - replacea hela objektet
app.put("/players/:id", playerController.onUpdatePlayer );

//För att kunna radera
app.delete("/players/:id", playerController.onDeletePlayer);



app.listen(port, async () => {
  await migrationhelper.migrate();
  await sequelize.authenticate();
  console.log(`Example app listening2 on port ${port}`);
});
