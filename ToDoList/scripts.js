const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBnt = document.querySelector('#clear');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

allEventListeners();

function allEventListeners(){
    document.addEventListener('DOMContentLoaded', loadTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBnt.addEventListener('click', removeAll);
    filter.addEventListener('keyup',filterTask);
}

taskList.style.backgroundcolor='red'
function addTask(e){
    if(taskInput.value === ''){
        alert('Please add a task before submiting');
    }else {
        const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('div');
    link.className = 'delete-item';
    link.appendChild(document.createTextNode("x"));
    li.appendChild(link);
    taskList.appendChild(li);

    storeTask(taskInput.value);
    taskInput.value='';

    }
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains("collection-item")){
        e.target.parentElement.remove();

        removeLocalStorage(e.target.parentElement);
    }
}
function removeAll(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const currentTask = task.firstChild.textContent;
        if(currentTask.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

function storeTask(input){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(input);
    localStorage.setItem('tasks',JSON.stringify(tasks))
};

function loadTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(item){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(item));
        const link = document.createElement('div');
        link.className = 'delete-item';
        link.appendChild(document.createTextNode("x"));
        li.appendChild(link);
        taskList.appendChild(li);
    });
};

function removeLocalStorage(itemToRemove){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(item, i){
        if(itemToRemove.textContent === item+'x'){
            tasks.splice(i, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
