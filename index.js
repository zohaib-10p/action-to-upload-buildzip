const gitCore = require('@actions/core');
const gitHub = require('@actions/github');
const exec = require('@actions/exec');

const run = async() => {
    await exec.exec("node test.js");

};

run();