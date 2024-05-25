var express = require("express");
var router = express.Router();

var estufasController = require ("../controllers/estufasController");

router.get("/:token", function(req, res){
  estufasController.buscarEstufasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
    estufasController.cadastrar(req, res);
});


module.exports = router;