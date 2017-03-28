const admin = require('firebase-admin');
const db = admin.database();

/** Game Logging */
const util = require('../util');
const log = util.log;
const getCurrUnixTime = util.getCurrUnixTime;

const router = module.exports = require('express').Router();

/**
 * Move routes
 * ...api/game/:gameId/player/:playerId/move/...
 *
 * preloaded on req:
 * req.game = specific game instance
 * req.gameRef = ref to specific game in firebase
 * req.player = the player hitting this route
 * req.playerRef = ref to player in firebase
 */

router.post('/', (req, res, next) => {
  req.playerRef.child('position').set({
    coordinates: req.body.newPosition,
    possibleMoves: req.body.possibleMoves
  })
  .then(() => {
    res.sendStatus(204);
    //game log
    log(gameId, {
      type: 'PLAYER_MOVE',
      user: playerId,
      location: req.body.newPosition,
      timestamp: getCurrUnixTime()
    })
  })
  .catch(next);
});
