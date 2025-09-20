document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  // Function to add or update task
  function addOrUpdateTask() {
    const text = taskInput.value.trim();
    const editIndex = addBtn.dataset.editIndex;

    if (text === '') return;

    if (editIndex !== undefined) {
      // Update existing task
      tasks[editIndex].text = text;
      delete addBtn.dataset.editIndex;
      addBtn.textContent = 'Add';
    } else {
      // Add new task
      tasks.push({ text, done: false });
    }

    taskInput.value = '';
    saveAndRender();
  }

  // Add or update task on button click
  addBtn.addEventListener('click', addOrUpdateTask);

  // Add or update task on Enter key press
  taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addOrUpdateTask();
  });

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-gray-800/50 rounded px-3 py-2';

      // Task text
      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = task.done ? 'line-through text-gray-400 cursor-pointer' : 'cursor-pointer';

      // Toggle done on click
      span.addEventListener('click', () => {
        tasks[index].done = !tasks[index].done;
        saveAndRender();
      });

      // Buttons container
      const btnContainer = document.createElement('div');
      btnContainer.className = 'flex gap-2';

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = '✎';
      editBtn.className = 'text-yellow-400 hover:text-yellow-600';
      editBtn.addEventListener('click', () => {
        taskInput.value = task.text;
        addBtn.dataset.editIndex = index;
        addBtn.textContent = 'Update';
        taskInput.focus();
      });

      // Delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = '✕';
      delBtn.className = 'text-red-500 hover:text-red-700';
      delBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveAndRender();
      });

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(delBtn);

      li.appendChild(span);
      li.appendChild(btnContainer);
      taskList.appendChild(li);
    });
  }

  // Save tasks to localStorage and re-render
  function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});
