const archive = require('archiver');
const fs = require('fs');
const getSize = async(filename) => {
    return new Promise((resolve, reject) => {
        fs.stat(filename, (err, stats) => {
            if(err){
                resolve(false);//exception being handled in the caller
            } else {
                resolve(stats.size);
            }
        });
    });
};
export const zipThisFolder = async (zippedFilePath, toBeZippedFolderPath) => {
    return new Promise((resolve, reject) => {
        const zipFile = fs.createWriteStream(zippedFilePath);
        const arch = archive('zip', {
            zlib: {
                level: 9
            }
        });
        arch.directory(toBeZippedFolderPath)
            .on('error', (e) => {
                reject(e);
            }).pipe(zipFile);

        zipFile.on('close', async() => {
            const fileSize = await getSize(zippedFilePath);
            console.log(`Zip file size is ${fileSize}`);
            if(!fileSize){
                reject("Zip file looks empty");
            }
            resolve(true);
        });

        arch.finalize();

    });
}