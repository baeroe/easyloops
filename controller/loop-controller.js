//import dependencies
const User = require('./../models/User');
const { body, validationResult } = require('express-validator')
const uuid = require('uuid')


const saveLoop = async (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) return res.status(500).send(err)

        if (user === null) return res.status(404).send()

        var updatedLoop = req.body

        for (let i = 0; i<user.loops.length; i++) {
            if (user.loops[i].loopid == updatedLoop.loopid) {
                user.loops[i] = updatedLoop
                user.save()
                return res.status(200).send({username: user.username, email: user.email, loops: user.loops})
            }
        }

        user.loops.push(req.body)
        user.save()
        return res.status(200).send({username: user.username, email: user.email, loops: user.loops})

    })
}

const deleteLoop = async (req, res) => {
    User.findById(req.user.id, (err, user) => {
        if (err) return res.status(500).send(err)

        if (user === null) return res.status(404).send()

        let loopid = req.body.loopid

        for (let i = 0; i<user.loops.length; i++) {

            if (user.loops[i].loopid == loopid) {
                user.loops.splice(i, 1)
                user.save()
                return res.status(200).send({username: user.username, email: user.email, loops: user.loops})
            }
        }

        return res.status(404).send('loop not found')

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
    saveLoop: saveLoop,
    deleteLoop: deleteLoop,
    validate: validate
}