//import dependencies
const User = require('./../models/User');
const { body, validationResult } = require('express-validator')
const uuid = require('uuid')


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
    validate: validate
}