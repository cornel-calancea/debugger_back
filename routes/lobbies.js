var express = require('express');
var router = express.Router();

const addPrivateLobby = require('../controllers/lobby').addPrivateLobby;
const addLobby = require('../controllers/lobby').addLobby;
const findLobby = require('../controllers/lobby').findLobby;
const updateLobby = require('../controllers/lobby').updateLobby;
const getAllLobbies = require('../controllers/lobby').getAllLobbies;
const deleteUser = require('../controllers/lobby').deleteUser;

router.get('/one_lobby/:lobby_id', async (req, res, next) => {
    try {
        var lobby = await findLobby(req.params.lobby_id);

        if (lobby === false) {
            res.sendStatus(500);
            return;
        }
        if (lobby === null) {
            res.sendStatus(400);
            return;
        }
        res.status(200).json(lobby);
    } catch (error) {
        res.sendStatus(500);

    }
});

router.get('/', async (req, res, next) => {
    try {
        var lobby = await getAllLobbies();

        if (lobby === false) {
            res.sendStatus(500);
            return;
        }
        if (lobby === null) {
            res.sendStatus(400);
            return;
        }
        res.status(200).json(lobby);
    } catch (error) {
        res.sendStatus(500);

    }
});

router.post('/create', async (req, res, next) => {
    console.log(req.body);
    try {
        var lobby = await addLobby(req.body.nickname);

        if (lobby === false) {
            res.sendStatus(500);
            return;
        }
        res.status(200).json(lobby);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.post('/create_private', async (req, res, next) => {
    console.log(req.body);
    try {
        var lobby = await addPrivateLobby(req.body.nickname);

        if (lobby === false) {
            res.sendStatus(500);
            return;
        }
        res.status(200).json(lobby);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put('/update', async (req, res, next) => {
    try {
        console.log(req.body);

        var lobby = await updateLobby(req.body.nickname, req.body.lobby_id);

        if (lobby === false) {
            res.sendStatus(500);
            return;
        }

        res.status(200).json(lobby);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put('/delete_user', async (req, res, next) => {
    try {
        console.log(req.body);

        var lobby = await deleteUser(req.body.nickname, req.body.lobby_id);

        if (lobby === false) {
            res.sendStatus(500);
            return;
        }

        res.status(200).json(lobby);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;