'use strict';

const colors = require('colors');

class BaiduTTs {
    constructor(apiKey, secretKey) {
        if (apiKey == null || secretKey == null) {
            console.log(`\n${colors.yellow("ERROR").bgBlack} : ${colors.white("apiKey").bgBlack} and ${colors.white("secretKey").bgBlack} ${colors.red("can not be null")}\n`);
            return;
        }

        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }
}


module.exports = BaiduTTs;
