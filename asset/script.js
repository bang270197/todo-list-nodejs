// fetch("/get/task")
//     .then((response) => response.json())
//     .then((data) => console.log(data));

const render = () => {
    var addButton = document.getElementsByClassName("addBtn");
    addButton[0].addEventListener("click", addTodo);
    addButton[1].addEventListener("click", addDoing);
    addButton[2].addEventListener("click", addDone);
};
render();

function addTodo() {
    var todo = {
        name: "",
        status: "todo",
    };
    postData("/create/task", todo).then((data) => {
        console.log(data);
    });
    listTodo();
}

function addDone() {
    var todo = {
        name: "",
        status: "done",
    };
    postData("/create/task", todo).then((data) => {
        console.log(data);
    });
    listDone();
}

function addDoing() {
    var todo = {
        name: "",
        status: "doing",
    };
    postData("/create/task", todo).then((data) => {
        console.log(data);
    });
    listDoing();
}

//done
const listDone = () => {
    var typeColumn = {
        todo: "todo",
        doing: "doing",
        done: "done",
    };
    getData("/get/done", {}).then((data) => {
        console.log(data);
        console.log();
        let countTodo = data.newData.length;
        document.getElementById("doneColumn").children[0].innerHTML = `
        ${typeColumn.done}<span class="kanban__count">${countTodo}</span>`;

        var todo = data.newData.map((item, idx) => {
            return `
            <div key = "${idx}" class="wrap-item">
            <textarea 
             draggable="true" 
             key = "${item.id}"
             type= "${typeColumn.done}"
             class="kanban__item 
             ${typeColumn.done}-border-color 
             "
             ondragstart="onDrag(event)"
             >
            ${item.name}
            </textarea>
            <button class="saveBtn" onClick="saveDone(this)"><i class="fas fa-check"></i></button>
            <button class="removeBtn" onCLick="removeDone(this)"><i class="fas fa-times"></i></button>
   </div>
            `;
        });
        document.getElementById("doneColumn").children[1].innerHTML = todo.join(
            ""
        );
    });
};
listDone();
//doing
const listDoing = () => {
    var typeColumn = {
        todo: "todo",
        doing: "doing",
        done: "done",
    };
    getData("/get/doing", {}).then((data) => {
        console.log(data);
        console.log();
        let countTodo = data.newData.length;
        document.getElementById("doingColumn").children[0].innerHTML = `
        ${typeColumn.doing}<span class="kanban__count">${countTodo}</span>`;

        var todo = data.newData.map((item, idx) => {
            return `
            <div key = "${idx}" class="wrap-item">
            <textarea 
             draggable="true" 
             key = "${item.id}"
             type= "${typeColumn.doing}"
             class="kanban__item 
             ${typeColumn.doing}-border-color 
             "
             ondragstart="onDrag(event)"
             >
            ${item.name}
            </textarea>
            <button class="saveBtn" onClick="saveDoing(this)"><i class="fas fa-check"></i></button>
            <button class="removeBtn" onCLick="removeDoing(this)"><i class="fas fa-times"></i></button>
   </div>
            `;
        });
        document.getElementById(
            "doingColumn"
        ).children[1].innerHTML = todo.join("");
    });
};

listDoing();

//doing
function saveDoing(e) {
    var valueTask = e.previousElementSibling;
    var newContent = valueTask.value;
    var id = valueTask.getAttribute("key");
    updateData(`/get/task/${id}`, {
        name: newContent.trim(),
        status: "doing",
    }).then((data) => {
        console.log(data);
    });
    listDoing();
}

function saveDone(e) {
    var valueTask = e.previousElementSibling;
    var newContent = valueTask.value;
    var id = valueTask.getAttribute("key");
    updateData(`/get/task/${id}`, {
        name: newContent.trim(),
        status: "done",
    }).then((data) => {
        console.log(data);
    });
    listDone();
}

const listTodo = () => {
    var typeColumn = {
        todo: "todo",
        doing: "doing",
        done: "done",
    };
    getData("/get/task", {}).then((data) => {
        console.log(data);
        console.log();
        let countTodo = data.newData.length;
        document.getElementById("todoColumn").children[0].innerHTML = `
        ${typeColumn.todo}<span class="kanban__count">${countTodo}</span>`;

        var todo = data.newData.map((item, idx) => {
            return `
            <div key = "${idx}" class="wrap-item">
            <textarea 
             draggable="true" 
             key = "${item.id}"
             type= "${typeColumn.todo}"
             class="kanban__item 
             ${typeColumn.todo}-border-color 
             "
             ondragstart="onDrag(event)"
             >
            ${item.name}
            </textarea>
            <button class="saveBtn" onClick="saveTask(this)"><i class="fas fa-check"></i></button>
            <button class="removeBtn" onCLick="removeTask(this)"><i class="fas fa-times"></i></button>
   </div>
            `;
        });
        document.getElementById("todoColumn").children[1].innerHTML = todo.join(
            ""
        );
    });
};
listTodo();

function removeTask(e) {
    var task = e.previousElementSibling.previousElementSibling;
    var key = task.getAttribute("key");
    deleteData(`/get/task/${key}`, {}).then((data) => {
        alert(data.message);
        console.log(data);
    });
    listTodo();
}

function removeDoing(e) {
    var task = e.previousElementSibling.previousElementSibling;
    var key = task.getAttribute("key");
    deleteData(`/get/task/${key}`, {}).then((data) => {
        alert(data.message);
        console.log(data);
    });
    listDoing();
}

function removeDone(e) {
    var task = e.previousElementSibling.previousElementSibling;
    var key = task.getAttribute("key");
    deleteData(`/get/task/${key}`, {}).then((data) => {
        alert(data.message);
        console.log(data);
    });
    listDone();
}

function saveTask(e) {
    var valueTask = e.previousElementSibling;
    var newContent = valueTask.value;
    var id = valueTask.getAttribute("key");
    updateData(`/get/task/${id}`, {
        name: newContent.trim(),
        status: "todo",
    }).then((data) => {
        console.log(data);
    });
    listTodo();
}

function kanbanConfig() {
    var kanbanColumn = Array.from(
        document.getElementsByClassName("kanban__col")
    );
    for (var i = 0; i < kanbanColumn.length; i++) {
        kanbanColumn[i].addEventListener("dragover", onDragOver);
        kanbanColumn[i].addEventListener("drop", onDrop);
    }
}

kanbanConfig();

function onDragOver(event) {
    event.preventDefault();
    var currentColumn = event.currentTarget;
}

//khi keo task ra và thả sẽ gọi function này
function onDrop(event) {
    var index = event.dataTransfer.getData("index");
    var type = event.dataTransfer.getData("type");
    //lấy ra thông tin ô mà nó nhả ra
    var nextType = event.currentTarget.getAttribute("name");
    console.log(index, type);
    console.log(nextType);
    if (nextType === "todo") {
        updateData(`/get/task/${index}`, {
            action: "move",
            status: "todo",
        }).then((data) => {
            console.log(data);
        });
        listDoing();
        listDone();
        listTodo();
    }
    if (nextType === "doing") {
        updateData(`/get/task/${index}`, {
            action: "move",
            status: "doing",
        }).then((data) => {
            console.log(data);
        });
        listDoing();
        listDone();
        listTodo();
    }
    if (nextType === "done") {
        updateData(`/get/task/${index}`, {
            action: "move",
            status: "done",
        }).then((data) => {
            console.log(data);
        });
        listDoing();
        listDone();
        listTodo();
    }
}
//keo task lên
function onDrag(event) {
    var currentTarget = event.currentTarget;
    var index = currentTarget.getAttribute("key");
    var type = currentTarget.getAttribute("type");
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("index", index);
}

async function deleteData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function updateData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
