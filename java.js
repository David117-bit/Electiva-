document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Crear una nueva tarea
  function createTask(text) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const span = document.createElement('span');
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.classList.add('delete-btn');

    // Toggle de completado
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
      reorderTasks();
    });

    // Eliminar tarea
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    reorderTasks();
  }

  // Reordenar tareas: pendientes arriba, completadas abajo
  function reorderTasks() {
    const tasks = Array.from(taskList.children);
    const pending = tasks.filter(li => !li.classList.contains('completed'));
    const completed = tasks.filter(li => li.classList.contains('completed'));

    taskList.innerHTML = '';
    pending.concat(completed).forEach(task => taskList.appendChild(task));
  }

  // Evento botón agregar
  addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
      createTask(text);
      taskInput.value = '';
    }
  });

  // Agregar tarea con Enter
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });
});
