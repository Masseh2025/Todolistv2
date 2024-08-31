"use strict";

// selecting elements
const list = document.querySelector("[data-list]");
const taskInput = document.querySelector("#task-input");
// saving data for local storage
let dataList = [];
let dataString;

// adding event lister to the task input
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (taskInput.value === "") return;
    createTask(taskInput.value);
    taskInput.value = "";
  }
});

// this function makes a unique value for when the task turns into a object for json
function createUniqueId() {
  const id = new Date().getTime();
  return id;
}

// this function helps creates the elements "checkbox" and "delete button"
function init(create) {
  if (create === "checkbox") {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", check);
    return checkbox;
  }
  if (create === "delete button") {
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("todo-list__delete-button");
    deleteButton.addEventListener("click", deleteTask);
    return deleteButton;
  }
}

// When a checkbox is checked it will toggle the stroke class
function check() {
  console.log(this.parentElement.classList.toggle("todo-list__task--stroke"));
}

// this function creates the acutal task
function createTask(value) {
  const task = document.createElement("li");
  const taskContent = (task.innerText = value);
  task.prepend(init("checkbox"));
  task.append(init("delete button"));
  task.classList.add("todo-list__task");
  const id = (task.dataset.taskid = createUniqueId());
  //   convert to object for json
  const taskData = {
    id,
    taskContent,
  };

  //   saves the task
  saveTask(taskData);

  //   appending it to list
  list.append(task);
}

// saves the task
function saveTask(data) {
  if (data) {
    dataList.push(data);
  }
  dataString = JSON.stringify(dataList);
  localStorage.setItem("taskData", dataString);
}

// This function deletes the task from the dom and datalist
function deleteTask() {
  const deleteId = Number(this.parentElement.dataset.taskid);
  console.log(deleteId);
  const newData = dataList.filter((obj) => obj.id !== deleteId);
  console.log(newData);
  dataList = newData;
  this.parentElement.remove();
  saveTask();
}

// This function creates the elements from a previous session from local storage
function uploadData() {
  const parsedData = JSON.parse(localStorage.taskData);
  dataList = parsedData;
  for (let { id, taskContent } of parsedData) {
    const task = document.createElement("li");
    task.innerText = taskContent;
    task.prepend(init("checkbox"));
    task.append(init("delete button"));
    task.classList.add("todo-list__task");
    task.dataset.taskid = id;
    list.append(task);
  }
}

uploadData();
