const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(express.json());

const path = './file.json';
let items = [];

fs.readFile(path, (err, itemBuffer) => {
    if (err) {
        console.log(err);
        return;
    }
    item = JSON.parse(itemBuffer.toString());
});

app.get("/items", (req, res) => {
    res.send(items);
});

app.get("/items/:id", (req, res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    if (!item)
        return res.status(404).send("Not found");
    res.send(item);
});

app.post("/items", (req, res) => {
    const item = { id: items.length + 1, UserName: req.body.userName };
    items.push(item);
    res.send(item);

    fs.writeFile(path, JSON.stringify(item), (err) => {
        if (err) {
            console.log(err);
            return res.send(500).send('Not Found');
        }
    })
});

app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    item.name = req.body.name;
    res.send(item);

    fs.writeFile(path, JSON.stringify(item), (err) => {
        if (err) {
            console.log(err);
            return res.send(500).send('Not Found');
        }
    })
});

app.delete("/items/:id", (req, res) => {
    const item = items.find(item => item.id === parseInt(req.params.id));
    if (!item)
        return res.status(404).send("Not found");
    const index = items.indexOf(item);
    items.splice(index, 1);
    res.send("Deleted Successfully");

    fs.writeFile(path, JSON.stringify(item), (err) => {
        if (err) {
            console.log(err);
            return res.send(500).send('Not Found');
        }
    })
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}.`);
});
