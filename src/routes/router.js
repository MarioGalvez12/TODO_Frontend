const fetch = require('node-fetch');
const router = require('express').Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.route("/").get(authMiddleware.authntMiddleware, (req, res) => {
    res.render("home", {
        API_URL: process.env.API_URL
    });
})

router.route("/tasks").get(authMiddleware.authMiddleware, (req, res) => {
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
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    let tasks = JSON.parse(result).tasks
                    tasks.forEach(e => {
                        let milliseconds = parseInt((e.timeEstimate % 1000) / 100),
                            seconds = Math.floor((e.timeEstimate / 1000) % 60),
                            minutes = Math.floor((e.timeEstimate / (1000 * 60)) % 60),
                            hours = Math.floor((e.timeEstimate / (1000 * 60 * 60)) % 24);

                        hours = (hours < 10) ? "0" + hours : hours;
                        minutes = (minutes < 10) ? "0" + minutes : minutes;
                        seconds = (seconds < 10) ? "0" + seconds : seconds;
                        let timeEstimateText = hours + ":" + minutes;
                        e.timeEstimateText = timeEstimateText;
                        let createdAt = new Date(e.createdAt)
                        e.createdAt = `${monthNames[createdAt.getMonth()]} ${createdAt.getDate()} ${createdAt.getFullYear()}`
                        if (e.starTime > 0) {
                            let starTime = new Date(e.starTime)
                            e.starTime = `${monthNames[starTime.getMonth()]} ${starTime.getDate()} ${starTime.getFullYear()}`
                        }
                        if (e.endTime > 0) {
                            let endTime = new Date(e.endTime)
                            e.endTime = `${monthNames[endTime.getMonth()]} ${endTime.getDate()} ${endTime.getFullYear()}`
                        }
                        e.all = JSON.stringify(e)
                    });
                    res.render("tasks", {
                        layout: "tasksLayout",
                        API_URL: process.env.API_URL,
                        tasks
                    });
                    break;
                default:
                    console.log(JSON.parse(result).message)
                    break;
            }
        })
        .catch(error => console.log(error));
})


module.exports = router;