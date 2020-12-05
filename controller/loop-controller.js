//import dependencies
const mongoose = require('mongoose');
const User = require('./../models/User');
const { body, validationResult } = require('express-validator')

//////////
// send push request with no content in body
//////////
const createLoop = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) res.status(500).send(err)
        if (user === null) return res.stats(404).send()
        
        user.loops.push({
            loopname: 'unnamed',
            bpm: 80
        })
        user.save()
        res.json({username: user.username, email: user.email, loops: user.loops})
    })
}

//////////
// send delete request with id of the loop that should be deleted
//////////
const deleteLoop = (req, res) => {

    const validation = validationResult(req);

    if (!validation.errors.length <= 0) {
        return res.status(422).send(validation.errors)
    }

    User.findById(req.user.id, (err, user) => {
        if (err) return res.status(500).send(err)
        if (user === null) return res.stats(404).send()

        var newLoops = user.loops.filter( (loop) => loop._id != req.body.id)
        user.loops = newLoops
        user.save()
        res.json({username: user.username, email: user.email, loops: user.loops})
    })
}

///////////
// send put request with loop object that should be uopdated
//////////
const updateLoop = (req, res) => {

    const validation = validationResult(req);

    if (!validation.errors.length <= 0) {
        return res.status(422).send(validation.errors)
    }

    User.findById(req.user.id, (err, user) => {
        if (err) res.status(500).send(err)
        if (user === null) return res.stats(404).send()

        var newLoops = user.loops.map( (loop) => {
            if (loop._id == req.body.loop._id) {
                return req.body.loop
            }
        })
        user.loops = newLoops
        user.save()
        res.json({username: user.username, email: user.email, loops: user.loops})
    })
}

// method for validation
// TODO: custom checks for loop object
const validate = (method) => {
    switch (method) {
        case 'updateLoop': {
            return [ 
                body('loop', 'loop does not exist').exists()
            ]   
        }
        case 'deleteLoop': {
            return [
                body('id', 'id does not exist').exists()
            ]
        }
    }
}

module.exports = {
    createLoop: createLoop,
    deleteLoop: deleteLoop,
    updateLoop: updateLoop,
    validate: validate
}