const axios = require('axios');
const formData = require('form-data');
const fs = require('fs');

export const uploadFile = async(filePath, restEndpoint, fileNameToPost) => {
return new Promise((resolve, reject) => {
    const form = new formData();
    form.append(fileNameToPost, fs.createReadStream(filePath));
    axios.post(restEndpoint,form,{ 'headers': form.getHeaders() }).then((rsp)=>{ 
        resolve(rsp.data);
    }).catch((err)=>{
        reject(err);
    });
});
};