const { Router } = require("express");
const axios = require("axios");
const { Driver, Teams } = require("../db");

const router = Router();

router.get("/drivers", async (req, res) => {
  try {
    const { name } = req.query;
    const info = await axios(`http://localhost:5000/drivers`);
    const data = info.data;
    const driversBDD = await Driver.findAll({
      include: {
        model: Teams,
        attributes: ["name"],
      },
    });

    const filterInfo = data.map((d) => {
      return {
        id: d.id,
        name: d.name.forename + " " + d.name.surname,
        description: d.description,
        image: d.image.url,
        nationality: d.nationality,
        teams: d.teams,
      };
    });

    const fusion = [...driversBDD, ...filterInfo];

    if (name) {
      const filterName = fusion.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      if (fusion.length === 0) {
        return res
          .status(404)
          .json({ error: "Lo sentimos, no tenemos a ese corredor :(" });
      }

      return res.status(200).json(filterName);
    }

    return res.status(200).json(fusion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/drivers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios(`http://localhost:5000/drivers/`);
    const data = response.data;

    const driversBDD = await Driver.findAll({
      include: {
        model: Teams,
        attributes: ["name"],
      },
    });

    const filterInfo = data.map((d) => {
      return {
        id: d.id,
        name: d.name.forename + " " + d.name.surname,
        description: d.description,
        image: d.image.url,
        nationality: d.nationality,
        birthdate: d.dob,
        teams: d.teams,
      };
    });

    const fusion = [...driversBDD, ...filterInfo];
    const drivers = fusion.find((d) => d.id == id);

    if (!drivers) {
      return res
        .status(404)
        .json({ error: "Lo sentimos, no tenemos a ese corredor :(" });
    }
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const body = req.body;

    const createDriver = await Driver.create({
      id: body.id,
      name: body.name + " " + body.lastName,
      description: body.description,
      image: body.image,
      nationality: body.nationality,
      birthdate: body.birthdate,
    });

    const spread = [...body.teams];

    let tableTeam = await Teams.findAll({ where: { name: spread } });

    createDriver.addTeam(tableTeam);

    res.status(201).json(createDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/teams", async (req, res) => {
  try {
    const response = await axios(`http://localhost:5000/drivers/`);
    const data = response.data;

    const saveTeams = new Set();

    if (data) {
      data.forEach((d) => {
        if (d.teams) {
          let driversTeam = d.teams;

          driversTeam = driversTeam.replace(/,([^ ])/g, ", $1");

          const arrayDrivers = driversTeam.split(",").map((d) => d.trim());

          arrayDrivers.forEach((d) => {
            saveTeams.add(d);
          });
        }
      });

      const uniqueDriver = Array.from(saveTeams);

      await Promise.all(
        uniqueDriver.map(async (d) => {
          await Teams.findOrCreate({
            where: { name: d },
          });
        })
      );

      res.status(200).json(uniqueDriver);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
