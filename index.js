const gitCore = require('@actions/core');
const gitHub = require('@actions/github');
const exec = require('@actions/exec');
const zipper = require('./utils/zipper');
const timer = require('./utils/timer');
const uploader = require('./utils/fileUploader');
const constants = require('./constants');

const run = async () => {
    try {
        const buildDir = gitCore.getInput(constants.BUILD_DIRECTORY_INPUT);
        const buildCmd = gitCore.getInput(constants.BUILD_COMMAND_INPUT);
        const restEndpoint = gitCore.getInput(constants.REST_ENDPOINT_INPUT);
        const restUsername = gitCore.getInput(constants.REST_USERNAME_INPUT);
        const restPassword = gitCore.getInput(constants.REST_PASSWORD_INPUT);
        const restFileName = gitCore.getInput(constants.REST_FILENAME_INPUT);
        console.log(`Build directory is ${buildDir}...`);
        console.log(`Build command is ${buildCmd}...`);
        console.log(`REST endpoint is ${restEndpoint}...`);
        console.log(`REST username is ${restUsername}...`);
        await exec.exec(buildCmd);
        await zipper.zipThisFolder(`${buildDir}.zip`, buildDir);
        console.log(`Build zip file ${buildDir}.zip has been created`);
        const uploadResponse = await uploader.uploadFile(`${buildDir}.zip`, restEndpoint, restFileName);
        if (uploadResponse.url) {
            console.log(`Uploaded file available at:`);
            console.log(uploadResponse.url);
        } else {
            console.log(`Unable to retrieve uploaded file URL`);
        }
        await exec.exec("ls -l --block-size=K");
        timer.recursiveDelay(constants.TIMER_ITERATIONS, constants.TIMER_SECONDS_IN_ITERATION);
    } catch (e) {
        gitCore.setFailed(e);
    }

};

run();