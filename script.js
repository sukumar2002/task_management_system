let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const tableBody = document.getElementById('taskTable');
    tableBody.innerHTML = '';
    tasks.forEach((task, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${task.id}</td>
                <td class="${task.completed ? 'complete' : ''}">${task.name}</td>
                <td>${task.completed ? 'Completed' : task.status}</td>
                <td>
                    <button class="update-btn" onclick="updateTask(${task.id})">Update</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    <button class="toggle-btn" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                </td>
            </tr>`;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const status = document.getElementById('taskStatus').value.trim();
    if (!name || !status) {
        alert('Please enter both task name and status.');
        return;
    }
    const newTask = { id: Date.now(), name, status, completed: false };
    tasks.push(newTask);
    renderTasks();
    document.getElementById('taskName').value = '';
    document.getElementById('taskStatus').value = '';
}

function updateTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newStatus = prompt('Enter new status:', task.status);
        if (newStatus) {
            task.status = newStatus;
            renderTasks();
        }
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

renderTasks();
