const router = require('express').Router();

router.route("/").get((req,res)=>{
    res.render("home");
})

router.route("/location").post((req,res)=>{
    console.log(req.headers)
    console.log(req.body)
    res.sendStatus(200);
})

module.exports = router;