document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list'); 

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Enter a task');
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const removeItem = document.createElement('button');
            removeItem.textContent = 'Remove';
            removeItem.className = 'remove-btn';

            
            removeItem.addEventListener('click', () => {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(removeItem);
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    };

    
    addButton.addEventListener('click', addTask);

    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
