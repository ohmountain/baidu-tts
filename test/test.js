const assert = require('assert');

const BaiduTTS = require('../index.js');

var key    = "4IoG0CDktwjl7IgxZu50bbe5";
var secret = "4b6ba04100a92ef6d84e49295feb2143";

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

    if (tts.verifyToken() === false) {
        tts.requestToken();
    }

    describe("Valid akiKey and secretKey", function() {
        it(`tts.apiKey should equals ${key}`, function() {
            assert.equal(key, tts.apiKey);
        });

        it(`tts.apiSecret should equals ${secret}`, function() {
            assert.equal(secret, tts.secretKey);
        });
    });

    describe("requestToken()", function() {

        it("token.expires_in must be equals 2592000", async function() {
            let token = await tts.requestToken();
            assert.equal(token.expires_in, 2592000);
        });

        it("verifyToken()", function() {
            assert.equal(true, tts.verifyToken());
        });
    });

    describe("requestVoice", function() {

        it("test for requestVoice", async function() {
            let voice = await tts.requestVoice("hello world");
            assert.equal(voice, tts);
        });
    });
});
