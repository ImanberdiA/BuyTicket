let reqPromGetAllContent = require('request-promise');
let reqPromGetSpecificContent = require('request-promise');
let reqPromCreateNewContent = require('request-promise');
let reqPromUpdateContent = require('request-promise');
let reqPromDeleteContent = require('request-promise');

let reqPromGetAllUser = require('request-promise');
let reqPromGetSpecificUser = require('request-promise');
let reqPromCreateNewUser = require('request-promise');
let reqPromUpdateUser = require('request-promise');
let reqPromDeleteUser = require('request-promise');

let reqPromGetAllPlaylist = require('request-promise');
let reqPromGetSpecificPlaylist = require('request-promise');
let reqPromCreateNewPlaylist = require('request-promise');
let reqPromUpdatePlaylist = require('request-promise');
let reqPromDeletePlaylist = require('request-promise');

let reqPromAuth = require('request-promise');

const mysql = require('mysql');
let connection = undefined;

class agregateService {
    static init() {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'user_side'
        });
        return agregateService;
    }

    /* CONTENTS SERVICE. BEGIN */

    /* Get All Contents from content service. Begin*/
    static async getAllContents(req, res, countOfItems){
        try {
            const contentResponses = await agregateService.getAllContentRequestMethod(countOfItems);
            return contentResponses;
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: agregateService/getAllContents'}));
            console.log("Error: agregateService/getAllContents");
        }
    }
    static getAllContentRequestMethod(countOfItems) {
        return new Promise((resolve, reject) => {
            reqPromGetAllContent({
                method: 'GET',
                uri: 'http://localhost:1001/con/contents',
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/getAllContentRequestMethod");
            });
        });
    }
    /* Get All Contents from content service. End*/

    /* Get Specific Content from content service. Begin*/
    static async getSpecificContent(req, res, contentId){
        try {
            const contentResponse = await agregateService.getSpecificContentRequestMethod(contentId);
            return contentResponse;
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: agregateService/getSpecificContent'}));
            console.log("Error: agregateService/getSpecificContent");
        }
    }
    static getSpecificContentRequestMethod(contentId) {
        return new Promise((resolve, reject) => {
            reqPromGetSpecificContent({
                method: 'GET',
                uri: 'http://localhost:1001/con/contents/' + contentId,
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/getSpecificContentRequestMethod");
            });
        });
    }
    /* Get Specific Content from content service. End*/

    /* Create New Content in content service. Begin*/
    static async createNewContent(req, res, dataNewContent, token){
        try {
            const contentResponses = await agregateService.createNewContentRequestMethod(dataNewContent, token);
            return contentResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getSpecificContent");
            res.send(JSON.stringify({message: 'Error: agregateService/getSpecificContent'}));
        }
    }
    static createNewContentRequestMethod(dataNewContent, token) {
        return new Promise((resolve, reject) => {
            reqPromCreateNewContent({
                method: 'POST',
                uri: 'http://localhost:1001/con/contents',
                body: dataNewContent,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/createNewContentRequestMethod");
            });
        });
    }
    /* Create New Content in content service. End*/

    /* Update Specific Content in content service. Begin*/
    static async updateContent(req, res, dataUpdateContent, contentId, token){
        try {
            const contentResponses = await agregateService.updateContentRequestMethod(dataUpdateContent, contentId, token);
            return contentResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getSpecificContent");
            res.send(JSON.stringify({message: 'Error: agregateService/getSpecificContent'}));
        }
    }
    static updateContentRequestMethod(dataUpdateContent, contentId, token) {
        return new Promise((resolve, reject) => {
            reqPromUpdateContent({
                method: 'PUT',
                uri: 'http://localhost:1001/con/contents/' + contentId,
                body: dataUpdateContent,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/updateContentRequestMethod");
            });
        });
    }
    /* Update Specific Content in content service. End*/

    /* Delete Specific Content in content service. Begin*/
    static async deleteContent(req, res, contentId, token){
        try {
            const contentResponses = await agregateService.deleteContentRequestMethod(contentId, token);
            return contentResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/deleteContent");
            res.send(JSON.stringify({message: 'Error: agregateService/deleteContent'}));
        }
    }
    static deleteContentRequestMethod(contentId, token) {
        return new Promise((resolve, reject) => {
            reqPromDeleteContent({
                method: 'DELETE',
                uri: 'http://localhost:1001/con/contents/' + contentId,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/deleteContentRequestMethod");
            });
        });
    }
    /* Delete Specific Content in content service. End*/

    /* CONTENTS SERVICE. END */


    /* USERS SERVICE. BEGIN */

    /* Get All Users from user service. Begin*/
    static async getAllUsers(req, res, countOfItems){
        try {
            const userResponses = await agregateService.getAllUserRequestMethod(countOfItems);
            return userResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getAllUsers");
            return JSON.stringify({message: 'Error: agregateService/getAllUsers'});
        }
    }
    static getAllUserRequestMethod(countOfItems) {
        return new Promise((resolve, reject) => {
            reqPromGetAllUser({
                method: 'GET',
                uri: 'http://localhost:1000/users',
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/getAllUserRequestMethod");
            });
        });
    }
    /* Get All Users from user service. End*/

    /* Get Specific User from user service. Begin*/
    static async getSpecificUser(req, res, userId){
        try {
            const userResponses = await agregateService.getSpecificUserRequestMethod(userId);
            return userResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getSpecificUser");
            return JSON.stringify({message: 'Error: agregateService/getSpecificUser'});
        }
    }
    static getSpecificUserRequestMethod(userId) {
        return new Promise((resolve, reject) => {
            reqPromGetSpecificUser({
                method: 'GET',
                uri: 'http://localhost:1000/users/' + userId,
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/getSpecificUserRequestMethod");
            });
        });
    }
    /* Get Specific User from user service. End*/

    /* Create New User in user service. Begin*/
    static async createNewUser(req, res, dataNewUser, token){
        try {
            const userResponses = await agregateService.createNewUserRequestMethod(dataNewUser, token);
            return userResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/createNewUser");
            return JSON.stringify({message: "Error: agregateService/createNewUser"});
        }
    }
    static createNewUserRequestMethod(dataNewUser, token) {
        return new Promise((resolve, reject) => {
            reqPromCreateNewUser({
                method: 'POST',
                uri: 'http://localhost:1000/users',
                body: dataNewUser,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/createNewUserRequestMethod");
            });
        });
    }
    /* Create New User in user service. End*/

    /* Update Specific User in user service. Begin*/
    static async updateUser(req, res, dataUpdateUser, userId, token){
        try {
            const userResponses = await agregateService.updateUserRequestMethod(dataUpdateUser, userId, token);
            return userResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/updateUser");
            return JSON.stringify({message: 'Error: agregateService/updateUser'});
        }
    }
    static updateUserRequestMethod(dataUpdateUser, userId, token) {
        return new Promise((resolve, reject) => {
            reqPromUpdateUser({
                method: 'PUT',
                uri: 'http://localhost:1000/users/' + userId,
                body: dataUpdateUser,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/updateUserRequestMethod");
            });
        });
    }
    /* Update Specific User in user service. End*/

    /* Delete Specific User in user service. Begin*/
    static async deleteUser(req, res, userId, token){
        try {
            const userResponses = await agregateService.deleteUserRequestMethod(userId, token);
            return userResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/deleteUser");
            return JSON.stringify({message: 'Error: agregateService/deleteUser'});
        }
    }
    static deleteUserRequestMethod(userId, token) {
        return new Promise((resolve, reject) => {
            reqPromDeleteUser({
                method: 'DELETE',
                uri: 'http://localhost:1000/users/' + userId,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/deleteUserRequestMethod");
            });
        });
    }
    /* Delete Specific User in user service. End*/

    /* USERS SERVICE. END */


    /* PLAYLISTS SERVICE. BEGIN */

    /* Get All Playlists from playlist service. Begin*/
    static async getAllPlaylist(req, res, countOfItems){
        try {
            const playlistResponses = await agregateService.getAllPlaylistRequestMethod(countOfItems);
            return playlistResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getAllPlaylist");
            return JSON.stringify({message: 'Error: agregateService/getAllPlaylist'});
        }
    }
    static getAllPlaylistRequestMethod(countOfItems) {
        return new Promise((resolve, reject) => {
            reqPromGetAllPlaylist({
                method: 'GET',
                uri: 'http://localhost:1002/playlists/?counts=' + countOfItems,
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/getAllPlaylistRequestMethod");
            });
        });
    }
    /* Get All Playlists from playlist service. End*/

    /* Get Specific Playlist from playlist service. Begin*/
    static async getSpecificPlaylist(req, res, playlistId){
        try {
            const playlistResponses = await agregateService.getSpecificPlaylistRequestMethod(playlistId);
            return playlistResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getSpecificPlaylist");
            return JSON.stringify({message: 'Error: agregateService/getSpecificPlaylist'});
        }
    }
    static getSpecificPlaylistRequestMethod(playlistId) {
        return new Promise((resolve, reject) => {
            reqPromGetSpecificPlaylist({
                method: 'GET',
                uri: 'http://localhost:1002/playlists/' + playlistId,
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/getSpecificPlaylistRequestMethod");
            });
        });
    }
    /* Get Specific Playlist from playlist service. End*/

    /* Create New Playlist in playlist service. Begin*/
    static async createNewPlaylist(req, res, dataNewPlaylist, token){
        try {
            const playlistResponses = await agregateService.createNewPlaylistRequestMethod(dataNewPlaylist, token);
            return playlistResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/getSpecificPlaylist");
            return JSON.stringify({message: 'Error: agregateService/getSpecificPlaylist'});
        }
    }
    static createNewPlaylistRequestMethod(dataNewPlaylist, token) {
        return new Promise((resolve, reject) => {
            reqPromCreateNewPlaylist({
                method: 'POST',
                uri: 'http://localhost:1002/playlists',
                body: dataNewPlaylist,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/createNewPlaylistRequestMethod");
            });
        });
    }
    /* Create New Playlist in playlist service. End*/

    /* Update Specific Playlist in playlist service. Begin*/
    static async updatePlaylist(req, res, dataUpdatePlaylist, playlistId, token){
        try {
            const playlistResponses = await agregateService.updatePlaylistRequestMethod(dataUpdatePlaylist, playlistId, token);
            return playlistResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/updatePlaylist");
            return JSON.stringify({message: 'Error: agregateService/updatePlaylist'});
        }
    }
    static updatePlaylistRequestMethod(dataUpdatePlaylist, playlistId, token) {
        return new Promise((resolve, reject) => {
            reqPromUpdatePlaylist({
                method: 'PUT',
                uri: 'http://localhost:1002/playlists/' + playlistId,
                body: dataUpdatePlaylist,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/updatePlaylistRequestMethod");
            });
        });
    }
    /* Update Specific Playlist in playlist service. End*/

    /* Delete Specific Playlist in playlist service. Begin*/
    static async deletePlaylist(req, res, playlistId, token){
        try {
            const playlistResponses = await agregateService.deletePlaylistRequestMethod(playlistId, token);
            return playlistResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/deletePlaylist");
            return JSON.stringify({message: 'Error: agregateService/deletePlaylist'});
        }
    }
    static deletePlaylistRequestMethod(playlistId, token) {
        return new Promise((resolve, reject) => {
            reqPromDeletePlaylist({
                method: 'DELETE',
                uri: 'http://localhost:1002/playlists/' + playlistId,
                json: true,
                headers: {
                    /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                    Authorization: token
                }
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/deletePlaylistRequestMethod");
            });
        });
    }
    /* Delete Specific User in user service. End*/

    /* PLAYLISTS SERVICE. END */


    /* AUTHORIZATION SERVICE. BEGIN */

    // REDIRECT Method
    static async authMethod(req, res, authData){
        try {
            const authDataResponses = await agregateService.authMethodHandler(authData);
            return authDataResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/authMethod");
            return JSON.stringify({message: 'Error: agregateService/authMethod'});
        }
    }
    static authMethodHandler(authData) {
        return new Promise((resolve, reject) => {
            reqPromAuth({
                method: 'POST',
                uri: 'http://localhost:1337/auth',
                body: authData,
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/authMethodHandler");
            });
        });
    }

    // LOGIN Method
    static async loginGetCode(req, res, dataLoginGetCode){
        try {
            const loginGetDataResponses = await agregateService.loginGetMethodHandler(dataLoginGetCode);
            return loginGetDataResponses;
        } catch (error) {
            res.status(523);
            console.log("Error: agregateService/loginGetCode");
            return JSON.stringify({message: 'Error: agregateService/loginGetCode'});
        }
    }
    static loginGetMethodHandler(dataLoginGetCode) {
        return new Promise((resolve, reject) => {
            reqPromAuth({
                method: 'POST',
                uri: 'http://localhost:1337/login',
                body: dataLoginGetCode,
                json: true
            }).then(function (response) {
                resolve(response);
            }).catch(function (err) {
                resolve("Error: agregateService/loginGetMethodHandler");
            });
        });
    }

    /* AUTHORIZATION SERVICE. BEGIN */



}

module.exports = agregateService.init();