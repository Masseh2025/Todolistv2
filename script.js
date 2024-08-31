"use strict";

// selecting elements
const list = document.querySelector("[data-list]");
const taskInput = document.querySelector("#task-input");
// saving data for local storage
let dataList = [];
let dataString;

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (taskInput.value === "") return;
    createTask(taskInput.value);
    taskInput.value = "";
  }
});

function createUniqueId() {
  const id = new Date().getTime();
  return id;
}

function init() {
  console.log("hiu");
}

function createTask(value) {
  //   creating the actual task

  const task = document.createElement("li");
  const taskContent = (task.innerText = value);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  task.prepend(checkbox);
  const deleteButton = document.createElement("div");
  deleteButton.classList.add("todo-list__delete-button");
  deleteButton.addEventListener("click", deleteTask);
  task.append(deleteButton);
  task.classList.add("todo-list__task");
  const id = (task.dataset.taskid = createUniqueId());
  //   convert to object
  const taskData = {
    id,
    taskContent,
  };

  saveTask(taskData);

  //   appending it to list
  list.append(task);
}

function saveTask(data) {
  if (data) {
    dataList.push(data);
  }
  dataString = JSON.stringify(dataList);
  localStorage.setItem("taskData", dataString);
}

function deleteTask() {
  const deleteId = Number(this.parentElement.dataset.taskid);
  console.log(deleteId);
  const newData = dataList.filter((obj) => obj.id !== deleteId);
  console.log(newData);
  dataList = newData;
  this.parentElement.remove();
  saveTask();
}

function uploadData() {
  const parsedData = JSON.parse(localStorage.taskData);
  dataList = parsedData;
  for (let { id, taskContent } of parsedData) {
    const task = document.createElement("li");
    task.innerText = taskContent;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    task.prepend(checkbox);
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("todo-list__delete-button");
    deleteButton.addEventListener("click", deleteTask);
    task.append(deleteButton);
    task.classList.add("todo-list__task");
    task.dataset.taskid = id;
    list.append(task);
  }
}

uploadData();
