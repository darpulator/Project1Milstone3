document.addEventListener('DOMContentLoaded', () => {
    const tasks = [];

    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskForm.onsubmit = function(event) {
        event.preventDefault();

        const title = document.getElementById('task-title').value;
        const priority = document.getElementById('task-priority').value;
        const status = document.querySelector('input[name="status"]:checked').value;

        const newTask = {
            title,
            priority,
            status
        };

       
        tasks.push(newTask);

      
        appendTaskToDOM(newTask, tasks.length - 1);

       
        taskForm.reset();
    };


    function appendTaskToDOM(task, index) {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center task-${index}`;

    
        const taskContent = `
            ${task.title} 
            <span class="badge bg-${getPriorityClass(task.priority)}">${task.priority}</span>
            <small>${task.status}</small>
        `;

        li.innerHTML = taskContent;

     
        const buttons = document.createElement('div');

   
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Mark as Complete';
        completeBtn.className = 'btn btn-success btn-sm me-2';
        completeBtn.onclick = () => markAsComplete(index);

     
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.onclick = () => removeTask(index);

        buttons.appendChild(completeBtn);
        buttons.appendChild(removeBtn);
        li.appendChild(buttons);

        taskList.appendChild(li);
    }

    function markAsComplete(index) {
        const taskElement = document.querySelector(`.task-${index}`);
        taskElement.classList.add('completed');
    }

    
    function removeTask(index) {
        tasks.splice(index, 1);
        const taskElement = document.querySelector(`.task-${index}`);
        taskElement.remove();
    }


    function getPriorityClass(priority) {
        switch (priority) {
            case 'low': return 'secondary';
            case 'medium': return 'warning';
            case 'high': return 'danger';
        }
    }
});