document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    let tasks = [];
    let isEditing = false;
    let editIndex = null;
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task;     
        const actions = document.createElement('div');
            actions.className = 'actions';
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => {
                taskInput.value = task;
                isEditing = true;
                editIndex = index;
                addButton.textContent = 'Save';
            };
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => {
                if (confirm('Are you sure you want to delete this task?')) {
                    tasks.splice(index, 1);
                    renderTasks();
                    saveTasks();
                }
            };
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            taskItem.appendChild(actions);
            taskList.appendChild(taskItem);
        });
    }

    function addTask() {
        const taskValue = taskInput.value.trim();
        if (!taskValue) {
            alert('Task cannot be empty.');
            return;
        }
        if (isEditing) {
            tasks[editIndex] = taskValue;
            isEditing = false;
            editIndex = null;
            addButton.textContent = 'Add';
        } else {
            if (tasks.includes(taskValue)) {
                alert('Task already exists.');
                return;
            }
            tasks.push(taskValue);
        }
        taskInput.value = '';
        renderTasks();
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

  
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        }
    }
console.log(loadTasks)
  
    loadTasks();
    renderTasks();
});