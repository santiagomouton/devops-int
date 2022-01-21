const core = require('@actions/core');
const fs = require('fs');
var Detector = require('bad-words'),
detector = new Detector();

try{
    const path = core.getInput('path');
    var text = fs.readFileSync(path, 'utf8')
    if ( detector.isProfane(text) )
        throw `found profanity words`;

    console.log('Everything OK!')

}catch (error) {
    core.setFailed(error);
}