
function loadTasks(taskList){
    let container = document.getElementById('taskContainer');
    let lateContainer = document.getElementById('lateTask');
    let currentContainer = document.getElementById('currentTask');
    let completeContainer = document.getElementById('completeTask');
    
    container.innerHTML='';
    lateContainer.children[1].innerHTML='';
    currentContainer.children[1].innerHTML='';
    completeContainer.children[1].innerHTML='';

    taskList.forEach((task,i)=>{
        let divTask = document.createElement('div');
        divTask.className="taskCard";
        divTask.innerHTML = `
            ${task.img?"<img src='" + task.img + "' />":""}
            <div class="cardContent">
                <h4> <input type="checkbox" ${task.completed?"checked":""} title="check completed" onClick="onCheck(this)">  ${task.title + ' ' + i}</h4>
                <span>created on ${dateFormat(task.createdOn)} by ${task.createdBy}</span>
                <p>${task.description}</p>
                <span>Due on ${dateFormat(task.dueDate)}</span>
            </div>            
        `;

        if(task.completed) {
            divTask.classList.add("taskCompleted");
            completeContainer.children[1].appendChild(divTask);
        }else if(task.dueDate < Date.now() ){
            divTask.classList.add("taskLate");
            lateContainer.children[1].appendChild(divTask);
        }else{
            currentContainer.children[1].appendChild(divTask);
        } 
    });

    container.appendChild(lateContainer);
    container.appendChild(currentContainer);
    container.appendChild(completeContainer);
}


loadTasks(taskList);


function addTask(task){
    taskList.unshift(task);
    loadTasks(taskList);
}
function onCheck(element){
    if(element.checked){
        element.parentElement.parentElement.classList.add('taskCompleted')
    }else{
        element.parentElement.parentElement.classList.remove('taskCompleted')
    }
}

function dateFormat(date){
    if(undefined === date){
        date = new Date();    
    }

    return `${(date.getMonth()+1)}/${date.getDate()}/${date.getFullYear()} at 
                ${(date.getHours() < 10)?`0${date.getHours()}`:date.getHours()}:${(date.getMinutes() < 10)?`0${date.getMinutes()}`:date.getMinutes()}hrs`;
}