const axios = require('axios')
const router = require('express').Router()
require('dotenv').config()
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper

// GET api/user/:username/:tag
// GET USER INFO (puuid, region, account level, cards, etc.)
router.get("/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URLV2 + `/valorant/v1/account/${req.params.username}/${req.params.tag}`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

// GET api/user/:region/:username/:tag
// GET USER RANKED INFO (current rank, mrr changed from last game, etc.)
router.get("/rank/:region/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URLV2 + `/valorant/v1/mmr/${req.params.region}/${req.params.username}/${req.params.tag}`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

// GET api/user/:region/:username/:tag
// GET USER RANKED HISTORY (+/- from last 10 matches)
router.get("/rank-history/:region/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URLV2 + `/valorant/v1/mmr-history/${req.params.region}/${req.params.username}/${req.params.tag}`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

// GET api/user/:region/:username/:tag
// GET USER RANKED HISTORY (tons of info on last 5 matches from user, only doing COMP)
router.get("/match-history/:region/:username/:tag", asyncWrapper(async (req, res) => {
    axios.get(process.env.BASE_URLV1 + `/valorant/v3/matches/${req.params.region}/${req.params.username}/${req.params.tag}?filter=competitive`).then(response => {
        res.status(200).json({data: response.data})
    })
}))

module.exports = router