const form = document.getElementById("form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showAlert({ type, message }) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p>No hay tareas aún</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="cursor:pointer; text-decoration: ${task.completed ? "line-through" : "none"}">
        ${task.text}
      </span>
      <button data-id="${index}" class="delete-btn">❌</button>
    `;

    li.querySelector("span").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      Swal.fire({
        title: '¿Eliminar tarea?',
        text: "No podrás recuperarla",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();

          showAlert({
            type: "success",
            message: "Tarea eliminada"
          });
        }
      });
    });

    taskList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) {
    showAlert({
      type: "error",
      message: "La tarea está vacía"
    });
    return;
  }

  const newTask = {
    text: value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";

  showAlert({
    type: "success",
    message: "Tarea agregada"
  });
});

renderTasks();