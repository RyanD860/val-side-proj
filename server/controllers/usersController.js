const axios = require('axios')
const bcrypt = require('bcrypt')
const router = require('express').Router()
require('dotenv').config()
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper
const db = require('../db')
const _ = require("underscore")

const users = []

router.get('/users', (req, res) => {
    res.json(users)
})

router.post('/createuser', asyncWrapper(async(req,res,next) => {
    try {
        let {username, password, tag} = req.body
        const queryText = 'SELECT * from USERS'
        db.query(queryText).then(async (resp) => {
            const rows = resp.rows
            if(!_.findWhere(rows, {username})){
                const queryText1 = 'INSERT INTO USERS(username, password, tag, created_on) VALUES($1, $2, $3, $4) RETURNING user_id'
                const salt = await bcrypt.genSalt()
                const hashedPass = await bcrypt.hash(password, salt)
                db.query(queryText1, [username, hashedPass, tag, new Date()]).then(resp => {
                    res.status(200).send("User Added")
        }).catch(err => {
            console.log(err)
        })
    } else {
        res.status(200).send('User Already Exists')
    }
        }).catch(err => {
            console.log(err)
        })
   
    }
    catch(err) {
        res.status(500).send(err)
    }
}))

router.post('/login', asyncWrapper(async(req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if(user == null){
        return res.status(400).send('User does not exist')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(200).send('Success')
        }
        else {
            res.status(400).send('Wrong Pass')
        }
    }
    catch{
        res.status(500).send()  
    }
}))

// GET api/user/:username/:tag
// GET USER INFO (puuid, region, account level, cards, etc.)
router.get("/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URL + `v1/account/${req.params.username}/${req.params.tag}`).then(response => {
        res.status(200).json({data: response.data})
    }).catch(err => {
        res.status(500).json({err})
    })
}))

// GET api/user/:region/:username/:tag
// GET USER RANKED INFO (current rank, mrr changed from last game, etc.)
router.get("/rank/:region/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URL + `v2/mmr/${req.params.region}/${req.params.username}/${req.params.tag}`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

// GET api/user/:region/:username/:tag
// GET USER RANKED HISTORY (+/- from last 10 matches)
router.get("/rank-history/:region/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URL + `v1/mmr-history/${req.params.region}/${req.params.username}/${req.params.tag}`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

// GET api/user/:region/:username/:tag
// GET USER RANKED HISTORY (tons of info on last 5 matches from user, only doing COMP)
router.get("/match-history/:region/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URL + `v3/matches/${req.params.region}/${req.params.username}/${req.params.tag}?filter=competitive`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

module.exports = router