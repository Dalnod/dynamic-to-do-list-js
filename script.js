document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when page loads
    const loadTasks = () => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            try {
                const tasks = JSON.parse(savedTasks);
                tasks.forEach(task => {
                    createTaskElement(task.text);
                });
            } catch (error) {
                console.error('Error loading tasks:', error);
                localStorage.removeItem('tasks');
            }
        }
    };

    // Save tasks to Local Storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(item => {
            tasks.push({
                text: item.firstChild.textContent.trim()
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Modified task creation function
    const createTaskElement = (taskText) => {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeItem = document.createElement('button');
        removeItem.textContent = 'Remove';
        removeItem.classList.add('remove-btn');

        removeItem.addEventListener('click', () => {
            taskList.removeChild(listItem);
            saveTasks(); // Update storage after removal
        });

        listItem.appendChild(removeItem);
        taskList.appendChild(listItem);
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Enter a task');
        } else {
            createTaskElement(taskText);
            taskInput.value = '';
            saveTasks(); // Save new task to storage
        }
    };

    // Event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page loads
    loadTasks();
});