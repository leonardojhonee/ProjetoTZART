var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/ranking", function (req, res) {
    medidaController.ranking(req, res);
});

router.get("/graficoBarra", function (req, res) {
    medidaController.graficoBarra(req, res);
});



module.exports = router;