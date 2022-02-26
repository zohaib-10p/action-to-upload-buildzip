const sleep = async(ms = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve,ms);
    });
}
export const recursiveDelay = async(num = 0, seconds = 1) => {
    if(num > 0){
        num = num -1 ;
        await sleep(seconds * 1000);
        console.log(`${seconds} Elapsed...`);
        recursiveDelay(num);
    }
}