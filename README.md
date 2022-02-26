## A Github Action to Build, Compress and Upload the Build

This Github action is a Javascript Github Action. Build directory and build commands can be defined in the Workflow file.

Build is created within runner and then compressed into the .zip file. This .zip file is later uploaded to a REST Endpoint.

REST Endpoint can also be defined as the input of the action from the Workflow file

## How to call this action from a Workflow

Chances are that you are using a different version of NodeJS to build you project, in this case you can use marketplace action actions/setup-node@v2 as the first step of your Workflow.

Similarly, You will need to checkout your repository into the Github action runner. To do so use actions/checkout@v2 action

## Sample Workflow File
```
name: Build Uploader

on:
  push:
    branches:
      - master

jobs:
  build-uploader:
    runs-on: ubuntu-latest
    name: Upload the build
    steps:
      - name: Set node version
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Checkout Repo
        uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Compress and Upload Build
        uses: zohaib-10p/action-to-upload-buildzip@master
        with:
          build-directory: 'dist'
          build-command: 'npm run build'
          github-token: ${{ secrets.GITHUB_TOKEN }}
          rest-endpoint: 'http://165.227.88.44:8080/upload-file'
          rest-file-field: 'buildZip'
```

## Available Action Inputs


|  Input          |       Description                                                                            |
|-----------------|----------------------------------------------------------------------------------------------|
|build-directory  |  The name of the directory you would like to create the build in                             |
|build-command    |  The build command for example: npm run build                                                |
|github-token     |   Not used in the action for now                                                             |
|rest-endpoint    |   The complete endpoint where a POST request should be sent to upload compressed build file  |
|                 |   This endpoint is responsible to receive and save file                                      |
|rest-file-field  |   The name of the field rest api endpoint is expecting for the upload file                   |