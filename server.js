const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors());

app.use(express.json());

app.post('/articles', (req, res) => {
    const path = './database/articles.json';
    const idPath = './database/articlesIDs.json';
    let object = req.body;
    if (!fs.existsSync(path)) {
        object.id = 1;
        fs.writeFileSync(path, JSON.stringify([object]), () => {
            console.log('New file created');
        });
        fs.writeFileSync(idPath, JSON.stringify(1), () => {
            console.log('File for ID registration created');
        });
    } else {
        let lastID = JSON.parse(fs.readFileSync(idPath));
        object.id = ++lastID;

        fs.writeFileSync(idPath, JSON.stringify(lastID), () => {
            console.log('Last id updated');
        });

        let searchData = JSON.parse(fs.readFileSync(path));
        searchData.push(object);

        fs.writeFileSync(path, JSON.stringify(searchData), () => {
            console.log('Articles JSON updated');
        });
    }
    res.send(req.body);
    res.end();
});

app.post('/search', (req, res) => {
    const path = './database/search.json';
    const idPath = './database/searchIDs.json';
    let object = req.body;
    if (!fs.existsSync(path)) {
        object.id = 1;
        fs.writeFileSync(path, JSON.stringify([object]), () => {
            console.log('New file created');
        });
        fs.writeFileSync(idPath, JSON.stringify(1), () => {
            console.log('File for ID registration created');
        });
    } else {
        let lastID = JSON.parse(fs.readFileSync(idPath));
        object.id = ++lastID;

        fs.writeFileSync(idPath, JSON.stringify(lastID), () => {
            console.log('Last id updated');
        });

        let searchData = JSON.parse(fs.readFileSync(path));
        searchData.push(object);

        fs.writeFileSync(path, JSON.stringify(searchData), () => {
            console.log('search JSON updated');
        });

    }

    res.send(req.body);
    res.end();
});

app.listen(9000);