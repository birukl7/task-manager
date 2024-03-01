const detailUpdate = document.querySelector('#detail-update');
const detailForm = document.getElementsByName('formValue');
const APIurl = 'http://127.0.0.1:8000/api/tasks'


console.log(detailForm)




const taskName = document.getElementById('task-name')
const taskDescription = document.getElementById('task-description')
const taskPriority = document.getElementById('task-priority')
const taskDueDate = document.getElementById('due-date')
const createdAt = document.getElementById('created-at')
const updatedAt = document.getElementById('updated-at')
const main = document.querySelector('#main-container')

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        
        const apiUrl = `${APIurl}/${id}`;
        
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            taskName.innerHTML = data.task.name;
            taskDescription.innerHTML = data.task.description;
            taskPriority.innerHTML = data.task.priority;
            taskDueDate.innerHTML = data.task.due_date;
            createdAt.innerHTML = data.task.created_at;
            updatedAt.innerHTML = data.task.updated_at;

            // console.log(data.tasks.message)
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    }
});

setTimeout(()=>{
    detailUpdate.addEventListener('click',(e)=>{
        for(let form of detailForm){
            form.classList.toggle('hidden');
        }  
    })
   
},2000)


setTimeout(()=>{
    for(let form of detailForm){
    
    }
},2000)

