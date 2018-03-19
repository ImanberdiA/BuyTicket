"use strict";
var libs = process.cwd() + '/libs/';
const playlistService = require(libs + 'service/playlistService');
const url = require('url');
let cntOfItems, dataNewPlaylist;

class playlistController {

    // Get all playlists from playlists (or size playlists)
    static async getAllPlaylists(req, res) {
        const countOfItems = url.parse(req.url, true).query.counts;
        const tmp = (typeof(countOfItems)).localeCompare("undefined");
        if(tmp == 0){
            cntOfItems = 10000;
        }else {
            cntOfItems = parseInt(countOfItems);
        }
        const size = parseInt(req.query.size, 10) || cntOfItems;
        try {
            const playlistResponses = await playlistService.getAllPlaylists(size);
            res.send(playlistResponses);
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: playlistController/getAllPlaylists'}));
            console.log("Error: playlistController/getAllPlaylists");
        }
    }

    // Get a specific playlist from playlists-table
    static async getSpecificPlaylist(req, res) {
        const playlistId = req.params.id;
        try {
            const playlistResponses = await playlistService.getSpecificPlaylist(playlistId);
            res.send(playlistResponses);
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error in playlistController/getSpecificPlaylist'}));
            console.log("Error: playlistController/getSpecificPlaylist");
        }
    }

    // Create new playlist in playlists-table
    static async createNewPlaylist (req, res) {
        const usrId = parseInt(req.body.User_id).toString().localeCompare("NaN");
        if(usrId != 0){
            dataNewPlaylist = req.body;
            try {
                const playlistResponses = await playlistService.createNewPlaylist(dataNewPlaylist);
                res.send(playlistResponses);
            } catch (error) {
                console.log("Error: playlistController/createNewPlaylist");
                res.sendStatus(400);
                res.send(JSON.stringify({message: 'Error: playlistController/createNewPlaylist'}));
            }
        }else{
            res.send("Введите корректные данные");
        }
    }

    // Update specific playlist in playlists-table
    static async updatePlaylist(req, res) {
        const playlistId = req.params.id;
        const usrId = parseInt(req.body.User_id).toString().localeCompare("NaN");
        if(usrId != 0){
            const dataUpdatePlaylist = req.body;
            try {
                const playlistResponses = await playlistService.updatePlaylist(dataUpdatePlaylist, playlistId);
                res.send(playlistResponses);
            } catch (error) {
                console.log("Error: playlistController/updatePlaylist");
                res.sendStatus(403);
                res.send(JSON.stringify({message: 'Error: playlistController/updatePlaylist'}));
            }
        }else{
            res.send("Введите корректные данные");
        }
    }

    // Delete a specific playlist in playlists-table
    static async deletePlaylist(req, res) {
        const playlistId = req.params.id;
        try {
            const playlistResponses = await playlistService.deletePlaylist(playlistId);
            res.send(playlistResponses);
        } catch (error) {
            console.log("Error: playlistController/deletePlaylist");
            res.sendStatus(406);
            res.send(JSON.stringify({message: 'Error: playlistController/deletePlaylist'}));
        }
    }
}

module.exports = playlistController;