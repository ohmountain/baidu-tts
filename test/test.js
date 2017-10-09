const assert = require('assert');

const BaiduTTS = require('../index.js');

var key = "aaaa";
var secret = "bbbb";

describe("new BaiduTTS()", function() {

    const tts = new BaiduTTS();

    describe("Valid akiKey and secretKey", function() {
        it(`tts.apiKey should equals null`, function() {
            assert.equal(tts.apiKey, null);
        });

        it(`tts.apiSecret should equals null`, function() {
            assert.equal(tts.apiSecret, null);
        });
    });
});


describe(`new BaiduTTS(${key}, ${secret})`, function() {

    const tts = new BaiduTTS(key, secret);

    describe("Valid akiKey and secretKey", function() {
        it(`tts.apiKey should equals ${key}`, function() {
            assert.equal(key, tts.apiKey);
        });

        it(`tts.apiSecret should equals ${secret}`, function() {
            assert.equal(secret, tts.secretKey);
        });
    });
});
