"use strict";
var libs = process.cwd() + '/libs/';
const contentService = require(libs + 'service/contentService');
const url = require('url');
let cntOfItems, dataNewContent;

class contentController {
    // Get all contents from contents (or size contents)
    static async getAllContents(req, res) {
        const countOfItems = url.parse(req.url, true).query.counts;
        const tmp = (typeof(countOfItems)).localeCompare("undefined");
        if(tmp == 0){
            cntOfItems = 10000;
        }else {
            cntOfItems = parseInt(countOfItems);
        }
        const size = parseInt(req.query.size, 10) || cntOfItems;
        try {
            const contentResponses = await contentService.getContents(size);
            res.send(contentResponses);
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: contentController/getAllContents'}));
            console.log("Error: contentController/getContents");
        }
    }

    // Get a specific content from contents-table
    static async getSpecificContent(req, res) {
        const contentId = req.params.id;
        try {
            const contentResponses = await contentService.getSpecificContent(contentId);
            res.send(contentResponses);
        } catch (error) {
            res.status(523);
            res.send(JSON.stringify({message: 'Error: contentController/getSpecificContent'}));
            console.log("Error: contentController/getSpecificContent");
        }
    }

    // Create new content in contents-table
    static async createNewContent (req, res) {
        const gnr = parseInt(req.body.Genre).toString().localeCompare("NaN");
        const cntry = parseInt(req.body.Country).toString().localeCompare("NaN");
        if((gnr === 0) && (cntry === 0)){
            dataNewContent = req.body;
            try {
                const contentResponses = await contentService.createNewContent(dataNewContent);
                res.send(contentResponses);
            } catch (error) {
                console.log("Error: contentController/createNewContent");
                res.sendStatus(400);
                res.send(JSON.stringify({message: 'Error: contentController/createNewContent'}));
            }
        }else{
            res.send("Введите корректные данные");
        }
    }

    // Update specific content in contents-table
    static async updateContent(req, res) {
        const contentId = req.params.id;
        const gnr = parseInt(req.body.Genre).toString().localeCompare("NaN");
        const cntry = parseInt(req.body.Country).toString().localeCompare("NaN");
        if((gnr === 0) && (cntry === 0)){
            const dataUpdateContent = req.body;
            try {
                const contentResponses = await contentService.updateContent(dataUpdateContent, contentId);
                res.send(contentResponses);
            } catch (error) {
                console.log("Error: contentController/updateContent");
            }
        } else {
            res.send("Введите корректные данные");
        }
    }

    // Delete a specific content in contents-table
    static async deleteContent(req, res) {
        const contentId = req.params.id;
        try {
            const contentResponses = await contentService.deleteContent(contentId);
            res.send(contentResponses);
        } catch (error) {
            console.log("Error: contentController/deleteContent");
            res.sendStatus(403);
            res.send(JSON.stringify({message: 'Error: contentController/deleteContent'}));
        }
    }
}

module.exports = contentController;