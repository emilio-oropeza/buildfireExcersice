
function loadTasks(taskList){
    let container = document.getElementById('taskContainer');
    let lateContainer = document.getElementById('lateTask');
    let currentContainer = document.getElementById('currentTask');
    let completeContainer = document.getElementById('completeTask');
    
    container.innerHTML='';
    lateContainer.innerHTML='';
    currentContainer.innerHTML='';
    completeContainer.innerHTML='';

    taskList.forEach((task,i)=>{
        let divTask = document.createElement('div');
        divTask.className="taskCard";
        divTask.innerHTML = `
            ${task.img?"<img src='" + task.img + "' />":""}
            <h4> <input type="checkbox" ${task.completed?"checked":""} title="check completed" onClick="onCheck(this)">  ${task.title + ' ' + i}</h4>
            <span>created on ${task.createdOn} by ${task.createdBy}</span>
            <p>${task.description}</p>
            <span>Due on ${task.dueDate}</span>            
        `;

        if(task.completed) {
            divTask.classList.add("taskCompleted");
            completeContainer.appendChild(divTask);
        }else if(task.dueDate < Date.now() ){
            divTask.classList.add("taskLate");
            lateContainer.appendChild(divTask);
        }else{
            currentContainer.appendChild(divTask);
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