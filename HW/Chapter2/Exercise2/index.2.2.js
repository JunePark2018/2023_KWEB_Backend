const fs = require('fs');
const path = require('path');
const util = require('util');

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);

const Search = async location => {
    const stats = await stat(location);
    // Check if it's a folder
    if (stats.isDirectory()) {
        const contents = await readdir(location);
        for (const elem of contents) {
            Search(path.join(location, "/", elem));
        }
    }
    // Check if it's a js file
    else if (path.extname(location) === ".js")
        console.log(location);
};

(async () => {
    try {
        await Search("./test");
    } catch (err) {
        console.error(err);
    }
}) ();