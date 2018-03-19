"use strict";
var libs = process.cwd() + '/libs/';
const agregateService = require(libs + 'service/agregateService');
const url = require('url');
let playlistResponses, contentResponses, userResponses;

class agregateController {

    static async index(req, res) {
        res.render('index', {

        });
    }


    /* CONTENTS SERVICE. BEGIN */

    // Get All Contents from content service
    static async getAllContents(req, res) {
        // const token = res.req.headers.authorization;
        const countOfItems = url.parse(req.url, true).query.counts;
        const tmp = (typeof(countOfItems)).localeCompare("undefined");
        try {
            if(tmp == 0){
                contentResponses = await agregateService.getAllContents(req, res, 1000);
            }else {
                contentResponses = await agregateService.getAllContents(req, res, countOfItems);
            }
            // console.log(contentResponses);
            res.render('contents', {
                contentObject: contentResponses
            });

            // res.send(contentResponses);
        } catch (error) {
            //console.log("Error: agregateController/getAllContents");
        }
    }

    // Get Specific Content from content service
    static async getSpecificContent(req, res) {
        const contentId = req.params.id;
        try {
            const contentResponses = await agregateService.getSpecificContent(req, res, contentId);
            res.render('contents', {
                contentObject: contentResponses
            });
            // res.send(contentResponses);
        } catch (error) {
            console.log("Error: agregateController/getSpecificContent");
        }
    }

    // Create New Content in content service
    static async createNewContent(req, res) {
        const token = res.req.headers.authorization;
        const dataNewContent = req.body;
        try {
            const contentResponses = await agregateService.createNewContent(req, res, dataNewContent, token);

            console.log(contentResponses);

            res.render('contents', {
                mess: contentResponses.message
            });

            // res.send(contentResponses);
        } catch (error) {
            console.log("Error: agregateController/createNewContent");
        }
    }

    // Update a specific content in content service
    static async updateContent(req, res) {
        const token = res.req.headers.authorization;
        const contentId = req.params.id;
        const dataUpdateContent = req.body;
        try {
            const contentResponses = await agregateService.updateContent(req, res, dataUpdateContent, contentId, token);
            res.send(contentResponses);
        } catch (error) {
            console.log("Error: agregateController/updateContent");
        }
    }

    // Delete a specific content in content service
    static async deleteContent(req, res) {
        const token = res.req.headers.authorization;
        const contentId = req.params.id;
        try {
            const contentResponses = await agregateService.deleteContent(req, res, contentId, token);
            res.send(contentResponses);
        } catch (error) {
            console.log("Error: agregateController / deleteContent");
            res.sendStatus(403);
            res.send(JSON.stringify({message: 'Error: agregateController / deleteContent'}));
        }
    }

    /* CONTENTS SERVICE. END */


    /* USERS SERVICE. BEGIN */

    // Get All Users from user service
    static async getAllUsers(req, res) {
        const countOfItems = url.parse(req.url, true).query.counts;
        const tmp = (typeof(countOfItems)).localeCompare("undefined");
        try {
            if (tmp == 0){
                userResponses = await agregateService.getAllUsers(req, res, 1000);
            }else{
                userResponses = await agregateService.getAllUsers(req, res, countOfItems);
            }
            //console.log(userResponses);
            res.render('users', {
                userObject: userResponses
            });

            // res.send(userResponses);
        } catch (error) {
            console.log("Error: agregateController/getAllUsers");
        }
    }

    // Get Specific User from user service
    static async getSpecificUser(req, res) {
        const userId = req.params.id;
        try {
            const userResponses = await agregateService.getSpecificUser(req, res, userId);
            res.render('users', {
                userObject: userResponses
            });
            // res.send(userResponses);
        } catch (error) {
            console.log("Error: agregateController/getSpecificUser");
        }
    }

    // Create New User in user service
    static async createNewUser(req, res) {
        const token = res.req.headers.authorization;
        const dataNewUser = req.body;
        try {
            const userResponses = await agregateService.createNewUser(req, res, dataNewUser, token);
            // res.send(userResponses);
            // console.log(userResponses);

            res.render('users', {
                mess: userResponses.message
            });
        } catch (error) {
            console.log("Error: agregateController/createNewUser");
        }
    }

    // Update a specific user in user service
    static async updateUser(req, res) {
        const token = res.req.headers.authorization;
        const userId = req.params.id;
        const dataUpdateUser = req.body;
        try {
            const userResponses = await agregateService.updateUser(req, res, dataUpdateUser, userId, token);
            // res.send(userResponses);

            console.log("userId for update - " + userId);
            console.log(dataUpdateUser);

        } catch (error) {
            console.log("Error: agregateController/updateUser");
        }
    }

    // Delete a specific user in user service
    static async deleteUser(req, res) {
        const token = res.req.headers.authorization;
        const userId = req.params.id;
        // const userId = req.body.id;
        try {
            const userResponses = await agregateService.deleteUser(req, res, userId, token);
            res.send(userResponses);
            // console.log("userId for deleete - " + userId);
            // console.log(userResponses);
        } catch (error) {
            console.log("Error: agregateController/deleteUser");
            res.sendStatus(403);
            res.send(JSON.stringify({message: 'Error: agregateController/deleteUser'}));
        }
    }

    /* USERS SERVICE. END */


    /* PLAYLISTS SERVICE. BEGIN */

    // Get All Playlists from playlist service
    static async getAllPlaylists(req, res) {
        const countOfItems = url.parse(req.url, true).query.counts;
        const tmp = (typeof(countOfItems)).localeCompare("undefined");
        try {
            if(tmp == 0){
                playlistResponses = await agregateService.getAllPlaylist(req, res, 1000);
            }else{
                playlistResponses = await agregateService.getAllPlaylist(req, res, countOfItems);
            }
            // console.log(playlistResponses);
            res.render('playlists', {
                playlistObject: playlistResponses
            });

            // res.send(playlistResponses);
        } catch (error) {
            console.log("Error: agregateController/getAllPlaylist");
        }
    }

    // Get Specific Playlist from playlist service
    static async getSpecificPlaylist(req, res) {
        const playlistId = req.params.id;
        try {
            const playlistResponses = await agregateService.getSpecificPlaylist(req, res, playlistId);

            res.render('playlists', {
                playlistObject: playlistResponses
            });
            // res.send(playlistResponses);
        } catch (error) {
            console.log("Error: agregateController/getSpecificPlaylist");
        }
    }

    // Create New Playlist in playlist service
    static async createNewPlaylist(req, res) {
        const token = res.req.headers.authorization;
        const dataNewPlaylist = req.body;
        try {
            const playlistResponses = await agregateService.createNewPlaylist(req, res, dataNewPlaylist, token);
            // res.send(playlistResponses);
            console.log(playlistResponses);

            res.render('playlists', {
                mess: playlistResponses.message
            });
        } catch (error) {
            console.log("Error: agregateController/createNewPlaylist");
        }
    }

    // Update a specific playlist in playlist service
    static async updatePlaylist(req, res) {
        const token = res.req.headers.authorization;
        const playlistId = req.params.id;
        const dataUpdatePlaylist = req.body;
        try {
            const playlistResponses = await agregateService.updatePlaylist(req, res, dataUpdatePlaylist, playlistId, token);
            res.send(playlistResponses);
        } catch (error) {
            console.log("Error: agregateController/updatePlaylist");
        }
    }

    // Delete a specific playlist in playlist service
    static async deletePlaylist(req, res) {
        const token = res.req.headers.authorization;
        const playlistId = req.params.id;
        try {
            const playlistResponses = await agregateService.deletePlaylist(req, res, playlistId, token);
            res.send(playlistResponses);
        } catch (error) {
            console.log("Error: agregateController/deletePlaylist");
            res.sendStatus(403);
            res.send(JSON.stringify({message: 'Error: agregateController/deletePlaylist'}));
        }
    }

    /* PLAYLISTS SERVICE. END */


    static async authMethod(req, res) {
        // console.log(req.query);
        const authData = req.query;
        try {
            const authDataResponses = await agregateService.authMethod(req, res, authData);
            const bool = authDataResponses[0].success;
            if (bool) {
                res.send(
                    '<!DOCTYPE html>\n' +
                    '<html lang="en">\n' +
                    '<head>\n' +
                    '    <title>Вход в систему</title>\n' +
                    '    <meta charset="utf-8">\n' +
                    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                    '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\n' +
                    '    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n' +
                    '    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\n' +
                    '    <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
                    '    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">\n' +
                    '</head>\n' +
                    '<body>\n' +
                    '<nav class="navbar navbar-inverse">\n' +
                    '    <div class="container-fluid">\n' +
                    '        <div class="navbar-header">\n' +
                    '            <a class="navbar-brand" href="http://localhost:1003">Music Player</a>\n' +
                    '        </div>\n' +
                    '        <ul class="nav navbar-nav">\n' +
                    '            <li class="active"><a href="#">Войти</a></li>\n' +
                    '            <li><a href="#">Регистрация</a></li>\n' +
                    '        </ul>\n' +
                    '    </div>\n' +
                    '</nav>' +
                    '<div class="container">\n' +
                    '    <form method="POST" action="/login" id=\'formaDel\' class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">\n' +
                    '        <!--<form method="POST" action="/users/new">-->\n' +
                    '        <div class="w3-panel w3-green w3-round-xlarge">\n' +
                    '            <h5>Войти в систему</h5>\n' +
                    '        </div>\n' +
                    '        <div class="form-row">\n' +
                    '            <div>\n' +
                    '                <label for="Login">Логин</label>\n' +
                    '                <input type="text" class="form-control" id="Login" placeholder="Email..." name="Login">\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <label for="Password">Пароль</label>\n' +
                    '                <input type="text" class="form-control" id="Password" placeholder="Пароль..." name="Password">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <input type="submit" class="w3-button w3-block w3-section w3-green w3-ripple w3-padding" value="ВОЙТИ"/>\n' +
                    '    </form>\n' +
                    '</div>\n' +
                    '\n' +
                    '</body>\n' +
                    '</html>'
                );
            } else {
                res.send(status(404));
            }
            // res.send(authDataResponses);
        } catch (error) {
            console.log("Error: agregateController/authMethod");
            res.sendStatus(403);
            res.send(JSON.stringify({message: 'Error: agregateController/authMethod'}));
        }
    }

    static async loginGetCode(req, res) {
        const dataLoginGetCode = req.body;
        try {
            const loginGetCodeResponses = await agregateService.loginGetCode(req, res, dataLoginGetCode);
            // res.send(loginGetCodeResponses);
            console.log(loginGetCodeResponses);
        } catch (error) {
            console.log("Error: agregateController/loginGetCode");
        }
    }
}

module.exports = agregateController;