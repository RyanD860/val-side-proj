import axios from "axios"
import configData from "../config.json"

const getUserInfo = (username, tag) => axios({
    method: 'get',
    url: `${configData.BASE_URL}/user/${username}/${tag}`
})

const getUserRank = (username, tag, region) => axios({
    method: 'get',
    url: `${configData.BASE_URL}/user/rank/${region}/${username}/${tag}`
})

const getUserRankHistory = (username, tag, region) => axios({
    method: 'get',
    url: `${configData.BASE_URL}/user/rank-history/${region}/${username}/${tag}`
})

const getUserMatchHistory = (username, tag, region) => axios({
    method: 'get',
    url: `${configData.BASE_URL}/user/match-history/${region}/${username}/${tag}`
})

export {
    getUserInfo,
    getUserRank,
    getUserRankHistory,
    getUserMatchHistory
}