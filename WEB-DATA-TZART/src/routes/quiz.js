var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/cadastrarRespostas", function (req, res){
    quizController.cadastrarRespostas(req, res);
});


module.exports = router;

