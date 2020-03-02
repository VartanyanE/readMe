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
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link rel = "stylesheet" href="./style.css">
        
    </head>
    
    <body>
    
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="heading">${answers.projectname}</h1>
                <p class="lead">My projects name is ${answers.projectname}.</p>
                <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
                <ul class="list-group">
                    <li class="list-group-item">My GitHub username is undefined</li>
                    <li class="list-group-item">LinkedIn: undefined</li>
                </ul>
            </div>
        </div>
    </body>
    
    </html>`);

    return markdown;
    // `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //   <head>
    //     <meta charset="UTF-8">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    //     <title>Document</title>
    //   </head>
    //   <body>
    //     <div class="jumbotron jumbotron-fluid">
    //     <div class="container">
    //       <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    //       <p class="lead">I am from ${answers.location}.</p>
    //       <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    //       <ul class="list-group">
    //         <li class="list-group-item">My GitHub username is ${answers.github}</li>
    //         <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    //       </ul>
    //     </div>
    //   </div>
    //   </body>
    //   </html>`;
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
