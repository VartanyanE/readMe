const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// const axios = require("axios");
const TurndownService = require('turndown');
const writeFileAsync = util.promisify(fs.writeFile);






function promptUser() {
    return inquirer.prompt([{
        message: "What is your github username?",
        name: "name",
    }, {


        message: "What is your project's name?",
        name: "projectname",
    },
    {
        message: "Please write a short description of your project",
        name: "description",
    },
    {
        message: "What kind of license should your project have?",
        name: "license",
    },
    {
        message: "What command should be run to install dependencies?",
        name: "dependencies",
    },
    {
        message: "What command should be run to run tests?",
        name: "tests",
    },
    {
        message: "What does the user need to know about running the repo?",
        name: "repotips",
    },
    {
        message: "What does the user need to know about contributing to the repo?",
        name: "repocontribute",

    }
    ]);
}




function generateHTML(answers) {
    let turndownService = new TurndownService();
    let markdown = turndownService.turndown(`<!DOCTYPE html>
    <html lang="en"><head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style type="text/css" rel="stylesheet">
        * { color: red; }
        </style>
        </head>
    <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1>${answers.projectname}</h1>
                <h3 class="lead">Description</h3>
                <p>${answers.description}</p>
                <h3>Table Of Contents</h3>
                <ul class="list-group">
                    <li class="list-group-item">Installation</li>
                    <li class="list-group-item">Usage</li>
                    <li class="list-group-item">License</li>
                    <li class="list-group-item">Contributing</li>
                    <li class="list-group-item">Tests</li>
                    <li class="list-group-item">Questions</li>
                </ul>
                <h3>Installation</h3>
                <p>To install necessary dependencies, run the folliwing command</p>
                <p>${answers.dependencies}</p>
                <h3>Usage</h3>
                <p>${answers.repocontribute}</p>
                <h3>To run tests run the following command</h3>
                <p>${answers.tests}
                <h3>Questions</h3>
                <p>If you have any questions, please contact Emanuil Vartanyan<p>

            </div>
        </div>
    </body>
    
    </html>`);

    return markdown;

}

async function init() {

    try {
        const answers = await promptUser();

        const readMe = generateHTML(answers);

        await writeFileAsync("README.md", readMe);

        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}

init();

    // .then(function ({ username }) {
    //     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    //     axios.get(queryUrl).then(function (res) {
    //         const repoNames = res.data.map(function (repo) {
    //             return repo.name;
    //         });

    //         const repoNamesStr = repoNames.join("\n");

    //         fs.writeFile("README.md", repoNamesStr, function (err) {
    //             if (err) {
    //                 throw err;
    //             }

    //             console.log(`Saved ${repoNames.length} repos`);
    //         });
    //     });
    // });
