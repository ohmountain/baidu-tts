'use strict';

const os     = require('os');
const fs     = require('fs');
const md5    = require('md5');
const { URL }    = require('url');
const https  = require('https');
const colors = require('colors');

class BaiduTTs {
    constructor(apiKey, secretKey) {
        if (apiKey == null || secretKey == null) {
            console.log(`\n${colors.yellow("ERROR").bgBlack} : ${colors.white("apiKey").bgBlack} and ${colors.white("secretKey").bgBlack} ${colors.red("can not be null")}\n`);
            return;
        }

        this.apiKey = apiKey;
        this.secretKey = secretKey;

        this.url          = `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.secretKey}`;
        this.session_file = `${os.tmpdir()}/${md5(this.apiKey + this.secretKey)}`;
    }

    getSessionInfo() {
        try {
            return JSON.parse(fs.readFileSync(this.session_file, 'utf8'));
        } catch(e) {
            return {};
        }
    }

    /**
     * 检验认证信息是可用
     * 空窗期为5分钟
     */
    verifyToken() {
        var sessionInfo = this.getSessionInfo();

        if (sessionInfo.expired_at == null) {
            return false;
        }

        /* 5分钟空窗 */
        if (sessionInfo.expired_at - 300 * 1000 < (new Date).getTime()) {
            return false;
        }

        return true;
    }

    requestToken() {
         return new Promise((resolve, reject) => {
            https.get(new URL(this.url), res => {

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        if (parsedData.error) {
                            throw Error(parsedData.error_description);
                        }

                        parsedData.expired_at = (new Date).getTime() + parsedData.expires_in * 1000;

                        fs.writeFileSync(this.session_file, JSON.stringify(parsedData));
                        resolve(parsedData);
                    } catch (e) {
                        console.log(`\n${colors.yellow("ERROR").bgBlack} :  ${colors.red(e.message)}\n`);
                        reject();
                    }

                });

            }).on("error", e => {
                reject(e);
            });
        });
    }
}


module.exports = BaiduTTs;
