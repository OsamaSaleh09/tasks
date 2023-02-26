var contTask = document.createElement("div"),
    inputTs = document.createElement("input"),
    btn = document.createElement("button"),
    btnTxt = document.createTextNode("Add"),
    contTaskTxt = document.createElement("div"),
    arrayOfTasks = [],
    cont = 2;
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getForLocal();

var timeNow = new Date().getHours(),
    typeTime = "";
if( timeNow >= 12){
    timeNow = timeNow - 12
    typeTime ="PM"
} else {
    typeTime ="AM"
}

var timeTxt = document.createTextNode(`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ____ ${timeNow}:${new Date().getMinutes()}${typeTime}`);;
contTask.setAttribute("class","cont-tsak");
inputTs.setAttribute("placeholder","Add Task");
inputTs.setAttribute("maxlength","50");
inputTs.setAttribute("type","text");
document.body.prepend(contTask);
contTask.append(inputTs);
btn.append(btnTxt);
contTask.append(btn);
contTask.append(contTaskTxt);

btn.addEventListener("click", function() {
    if (inputTs.value !== ""){
        addTaskToArray(inputTs.value,timeTxt.textContent);
        inputTs.value = ""
    }
});

function addTaskToArray(taskText,timeTxt){
    const task = {
        id : Date.now(),
        title: taskText,
        done : false,
        time : timeTxt
    };
    arrayOfTasks.push(task);
    addElement(arrayOfTasks);
    addToLocal(arrayOfTasks);
}

function addElement (arrayOfTasks){
    contTaskTxt.innerHTML="";
    arrayOfTasks.forEach(function (task) {
        if (cont ===2) {
            
            btnclear = document.createElement("button"),
            clearTxt = document.createTextNode("Delete All");
            btnclear.setAttribute("class","btn-clear");
            btnclear.append(clearTxt)
            contTask.prepend(btnclear);
            contTask.style.paddingBottom="50px";
            cont = 3
            btnclear.addEventListener("click", function() {
                clearTaskLocal();
                contTaskTxt.innerHTML="";
                contTask.style.paddingBottom="20px";
                btnclear.remove()
                cont=2
            })
    }
    var taskTxt = document.createElement("div"),
        txtVal = document.createTextNode(`${task.title}`),
        time = document.createElement("div"),
        timVal = document.createTextNode(`${task.time}`),
        btnDel = document.createElement("button"),
        delTxt = document.createTextNode("Delete"),
        btnDon = document.createElement("button"),
        donTxt = document.createTextNode("Done");
        taskTxt.setAttribute("class","task-text");
        taskTxt.setAttribute("data-id", task.id);
        btnDel.setAttribute("class","btn-del");
        time.setAttribute("class","time");
        btnDon.setAttribute("class","btn-done")
        contTaskTxt.prepend(taskTxt);
        taskTxt.prepend(txtVal);
        taskTxt.append(btnDel);
        taskTxt.append(time);
        taskTxt.append(btnDon);
        time.append(timVal);
        btnDel.append(delTxt);
        btnDon.append(donTxt);
        
        btnDel.addEventListener("click", function() {
            delTaskLocal(taskTxt.getAttribute("data-id"));
            taskTxt.remove();
            if (contTaskTxt.hasChildNodes() ) {
                false
            } else  {
                btnclear.style.display= "none";
                contTask.style.paddingBottom="20px";
            }
        })
        btnDon.addEventListener("click", function() {
            doneTaskLocal(taskTxt.getAttribute("data-id"));
            taskTxt.classList.toggle("op");
        })
        if (task.done === true) {
            taskTxt.classList.add("op") 
        }
    })
}
function addToLocal(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}
function getForLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        var tasks = JSON.parse(data);
        addElement(arrayOfTasks);
    }
}
function delTaskLocal(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addToLocal(arrayOfTasks);
}
function clearTaskLocal() {
    arrayOfTasks = []
    addToLocal(arrayOfTasks);
}
function doneTaskLocal(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].done == false ? (arrayOfTasks[i].done = true) : (arrayOfTasks[i].done = false)
        }
    }
    addToLocal(arrayOfTasks);
};