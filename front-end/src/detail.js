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
        // Construct API URL using the id
        const apiUrl = `${APIurl}/${id}`;
        // Fetch data from the API using the id
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // const detailContent = document.getElementById('detailContent');
            // // Example: Assuming data.title is the property from the API response
            // detailContent.innerHTML = '<h2>' + data.title + '</h2>';
            // You can continue adding more content as per your API response
        //    console.log(data.task.due_date)
            taskName.innerHTML = data.task.name;
            taskDescription.innerHTML = data.task.description;
            taskPriority.innerHTML = data.task.priority;
            taskDueDate.innerHTML = data.task.due_date;
            createdAt.innerHTML = data.task.created_at;
            updatedAt.innerHTML = data.task.updated_at;
            main.innerHTML += `
            <form action="http://127.0.0.1:8000/api/tasks/${id}" method="post" class="p-5 " id="detail-form postForm" name="formValue">
                <fieldset class="border flex flex-col border-slate-800 p-4 gap-y-2">
                    <label class="font-bold" for="name">
                        Task name
                    </label> 
                    <input class="border border-black bg-white" type="text" name="name" id="name">
                    
                    <label for="description" class="font-bold">
                        Description
                    </label> 
                    <textarea class="border border-black h-16 bg-white" name="description" id="description"></textarea>

                    <label for="date" class="font-bold">
                        Due Date
                    </label> 
                    <input type="date" class="border w-36 border-black bg-white" name="due_date" id="date">
                    <label for="priority" class="font-bold">
                        Priority
                    </label> 
                    <select name="priority" id="priority" class="border w-24 border-black bg-white">
                        <option value="high">High</option>
                        <option value="middle">middle</option>
                        <option value="low">low</option>
                    </select>
                   <input type="submit" class="bg-blue-800 text-white p-2 px-7 rounded-full cursor-pointer mb-3 mt-4" value="Update">
                </fieldset>
            </form>
            `
            // console.log(data.tasks.message)
        })
        .catch(error => {
            console.error('Error:', error);
            // detailContent.innerHTML = 'Error occurred while fetching data.';
        });
    }
});

setTimeout(()=>{
    detailUpdate.addEventListener('click',(e)=>{
        for(let form of detailForm){
            form.classList.toggle('hidden');
        }  
    })
    console.log('sealiw')
},2000)


setTimeout(()=>{
    for(let form of detailForm){
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const formData = new FormData(this);
        
            // Send the form data to the server using fetch
            fetch(this.action, {
                method: 'PUT',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Update successful:', data);
                // Optionally, you can redirect the user or show a success message
            })
            .catch(error => {
                console.error('Error:', error);
                // Optionally, you can display an error message to the user
            });
        });     
    }
},2000)

