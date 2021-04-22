const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const { v4: uuidv4 } = require("uuid");
// const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, "../asset")));
const data = [];

app.get("/get/task", (req, res) => {
    const newData = data.filter((item) => item.status === "todo");
    res.json({
        newData,
    });
});

//done
app.get("/get/done", (req, res) => {
    const newData = data.filter((item) => item.status === "done");
    res.json({
        newData,
    });
});
//doing
app.get("/get/doing", (req, res) => {
    const newData = data.filter((item) => item.status === "doing");
    res.json({
        newData,
    });
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../asset/index.html"));
});

app.put("/get/task/:id", (req, res) => {
    // let result = data.find((item) => {
    //     return item.id == req.params.id;
    // });
    console.log(req.params.id);
    let index = data.findIndex((item) => {
        return item.id == req.params.id;
    });
    if (req.body.action && req.body.action === "move") {
        data[index] = { ...data[index], status: req.body.status };
    } else {
        data[index] = { ...data[index], ...req.body };
    }

    res.json({
        message: "Update du lieu thanh cong",
        data,
    });
});

app.delete("/get/task/:id", (req, res) => {
    // let result = data.find((item) => {
    //     return item.id == req.params.id;
    // });
    let index = data.findIndex((item) => {
        return item.id == req.params.id;
    });
    data.splice(index, 1);
    // result = {...result}
    res.json({
        message: "xoa thanh cong",
        data,
    });
});

app.post("/create/task", (req, res) => {
    req.body.id = uuidv4();
    data.push(req.body);
    res.json({
        message: "Tao moi thanh cong",
        data: req.body,
    });
});
app.listen(port, () => {
    console.log("Connect server success with port: " + port);
});
