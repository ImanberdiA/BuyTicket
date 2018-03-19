"use strict";
var libs = process.cwd() + '/libs/';
const userService = require(libs + 'service/userService');
const url = require('url');
let cntOfItems, dataNewUser;

class userController {
    // Get all users from users (or size users)
    static async getAllUsers(req, res) {
        const countOfItems = url.parse(req.url, true).query.counts;
        const tmp = (typeof(countOfItems)).localeCompare("undefined");
        if(tmp == 0){
            cntOfItems = 10000;
        }else {
            cntOfItems = parseInt(countOfItems);
        }
        const size = parseInt(req.query.size, 10) || cntOfItems;
        try {
            const userResponses = await userService.getUsers(size);
            res.send(userResponses);
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: userController/getUsers'}));
            console.log("Error: userController/getUsers");
        }
    }

    // Get a specific user from users-table
    static async getSpecificUser(req, res) {
        const userId = req.params.id;
        try {
            const userResponses = await userService.getSpecificUser(userId);
            res.send(userResponses);
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: userController/getSpecificUser'}));
            console.log("Error: userController/getSpecificUser");
        }
    }

    // Create new user in users-table
    static async createNewUser (req, res){
        const tmptypeUserId = parseInt(req.body.Password).toString().localeCompare("NaN");
        if((tmptypeUserId === 0)){
            dataNewUser = req.body;
            try {
                const userResponses = await userService.createNewUser(dataNewUser);
                res.send(userResponses);
            } catch (error) {
                console.log("Error: userController/createNewUser");
                res.sendStatus(400);
            }
        }else{
            res.send("Введите корректные данные");
        }
    }

    // Update specific user in users-table
    static async updateUser(req, res) {
        const userId = req.params.id;
        const fname = parseInt(req.body.Genre).toString().localeCompare("NaN");
        const lname = parseInt(req.body.Country).toString().localeCompare("NaN");
        if((fname === 0) && (lname === 0)) {
            const dataUpdateUser = req.body;
            try {
                const userResponses = await userService.updateUser(dataUpdateUser, userId);
                res.send(userResponses);
            } catch (error) {
                console.log("Error: userController/updateUser");
            }
        }else{
            res.send("Введите корректные данные");
        }
    }

    // Delete a specific user in users-table
    static async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const userResponses = await userService.deleteUser(userId);
            res.send(userResponses);
        } catch (error) {
            console.log("Error: userController/deleteUser");
            res.status(523);
            res.send(JSON.stringify({message: 'Error in deleteUser'}));
        }
    }
}

module.exports = userController;