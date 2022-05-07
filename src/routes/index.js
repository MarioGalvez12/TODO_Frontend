const router = require('express').Router();
router.route("/").get((req,res)=>{
    res.render("home", {
        API_URL: process.env.API_URL
    });
})
router.route("/tasks").get((req,res)=>{
    res.render("tasks", {
        layout: "tasksLayout",
        API_URL: process.env.API_URL
    });
})

router.route("/location").post((req,res)=>{
    console.log(req.headers)
    console.log(req.body)
    res.sendStatus(200);
})

module.exports = router;