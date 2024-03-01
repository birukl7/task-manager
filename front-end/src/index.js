
const table = document.querySelector('#table')
const APIurl = 'http://127.0.0.1:8000/api/tasks'

setTimeout(()=>{
  const indexUpdate = document.querySelector('#index-update')
const indexButton = document.querySelectorAll('#index-update-btn')
  indexButton.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        indexUpdate.classList.toggle('hidden');
    })
})
},3000)


let innerHtmlText = '';
async function fetchData() {
    try {
      const response = await fetch(APIurl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data.tasks);
      data.tasks.forEach((task)=>{
        innerHtmlText += `
        <tr>
          <td class="align-top text-center border border-slate-900">2</td>
          <td class="text-left pl-4 align-top border border-slate-900">${task.name}</td>
          <td class="align-top  pl-4 border border-slate-900">${task.description}</td>
          <td class="align-top text-center border border-slate-900">2022-23-45</td>
          <td class="text-red-600 align-top text-center border border-slate-900" id="priority"> ${task.priority} </td>
          <td class=" text-center border border-slate-900">
              <div data-url="${APIurl}/${task.id}" id="delete-link-btn">
                  <button class="bg-green-400 px-6 rounded-xl text-slate-100 mt-2 pb-1">Complete</button> 
              </div> 
              <a href="#">
                  <button class="bg-blue-400 px-6 rounded-full text-slate-100 mt-2 pb-1" id="index-update-btn">Update</button>
              </a>
              <a href="./src/detail.html?id=${task.id}"}">
                  <button class="bg-slate-900 px-6 rounded-full text-slate-100 mt-2 pb-1">Detail</button>
              </a>
          </td>
        </tr>
        `
      })
      table.innerHTML += innerHtmlText;
      
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  fetchData();

  setTimeout(()=>{
    const deleteBtn = document.querySelectorAll('#delete-link-btn')
    const message = document.querySelector('#message')
  
    console.log(deleteBtn)
    deleteBtn.forEach((btn)=>{
      btn.addEventListener('click', async function(event){
       // event.preventDefault(); // Prevent default action
        const confirmation = confirm('Are you sure you want to delete this task?');
        if (confirmation) {
          try {
            const target = event.currentTarget;
            const value = target.getAttribute('data-url')
            console.log(value)
            const response = await fetch(value, {
              method: 'DELETE'
            });
            
            if (!response.ok) {
              throw new Error('Failed to delete task');
            }
            
            // Task deleted successfully
            const data = await response.json();
            console.log(data)
            //();
            location.reload();
            message.innerHTML = `${data.message}`;
          } catch (error) {
            console.error('Error deleting task:', error);
          }
        }
      })
    })
    
    
  }, 2000)


  form.addEventListener('submit', function(event) {
    // event.preventDefault(); // Prevent the default form submission
     const formData = new FormData(this);
 
     // Send the form data to the server using fetch
     fetch(`http://127.0.0.1:8000/api/tasks/${idNo}`, {
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

