//Define UI elements
let form = document.querySelector("#task_form");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector("#new_task");

//Define event listeners
form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTasks);
//Definr functions
//Add tasks
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task!');
    }else{
        //Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value+' '));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value='';
    }
    e.preventDefault();
}
//Remove tasks
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you sure?")){
            let item = e.target.parentElement;
            item.remove();
            //console.log(item);
            removeFromLS(item);
        }
    }
}
//Clear tasks
function clearTask(e){
    taskList.innerHTML="";
    localStorage.clear();
}
//Filter tasks
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task=>{
        let i=task.firstChild.textContent;
        if(i.toLocaleLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }else{
            task.style.display='none';
        }
    });
}
//Store in Local Storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Get tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task=>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task+' '));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}
//Remove tasks from local storage
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task,i)=>{
        if(li.textContent.trim()===task){
            tasks.splice(i,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}