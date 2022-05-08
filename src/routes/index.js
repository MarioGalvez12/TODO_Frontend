const fetch = require('node-fetch');
const router = require('express').Router();

router.route("/").get((req, res) => {
    res.render("home", {
        API_URL: process.env.API_URL
    });
})
router.route("/tasks").get((req, res) => {
    let requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": req.cookies.Authorization
        }
    };
    let status = 0
    fetch(process.env.API_URL + "/api/tasks", requestOptions)
        .then(response => {
            status = response.status
            return response.text()
        })
        .then(result => {
            switch (status) {
                case 200:
                    res.render("tasks", {
                        layout: "tasksLayout",
                        API_URL: process.env.API_URL,
                        tasks: JSON.parse(result).tasks
                    });
                    break;
                default:
                    console.log(JSON.parse(result).message)
                    break;
            }
        })
        .catch(error => console.log(error));
})

router.route("/location").post((req, res) => {
    console.log(req.headers)
    console.log(req.body)
    res.sendStatus(200);
})

module.exports = router;