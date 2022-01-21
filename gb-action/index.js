const core = require('@actions/core');
const fs = require('fs');
import { ProfanityEngine } from "@coffeeandfun/google-profanity-words";
const words = new ProfanityEngine();   

// `path` input defined in action metadata file
const path = core.getInput('path');

async function read() {
    await fs.readFile( path, function(err, data) {
        return data;
    });
}

try {
    // parse in words
    const parts = (read()+'').split(' ');
    let array = [];
    for( const w of parts ){
        if ( words.search(w))
            array.push(w)
    }
    if( array.length )
        throw `found profanity words: ${ array }.`;

    console.log('Everything OK!')
} catch (error) {
    core.setFailed(error.message);
}