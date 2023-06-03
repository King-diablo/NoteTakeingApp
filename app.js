const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");


let notes = [];

app.get("/", function (req, res) {
    res.render('home', { userNotes: notes });
});

app.post("/", function (req, res) {
    const noteId = req.body.id;

    const newNote = notes.filter(note => {
        return note.id != noteId;
    })
    notes = newNote;

    res.redirect("/");
});

app.get("/composer", function (req, res) {
    res.render("composer");
});

app.post("/composer", function (req, res) {
    const noteTitle = req.body.title;
    const noteBody = req.body.content;

    if (noteTitle === "" || noteBody === "") {
    } else {
        var note = {
            id: createId(),
            title: req.body.title,
            content: req.body.content
        };
        Logger(note);
        notes.push(note);
        res.redirect("/");
    }
})


app.listen(3000, function () {
    Logger("listening on port 3000");
});

function createId() {
    let maxItem = notes.length;
    return maxItem++;
}

function Logger(value) {
    return console.log(value);
}