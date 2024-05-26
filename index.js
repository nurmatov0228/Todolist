const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const messageCreate = document.getElementById("message-create");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closed = document.getElementById("closed");
let editItemId;

// varieble for edited text
const Edited = document.createElement("div");
Edited.innerHTML = `<sub><i>   Edited</i></sub>`;
Edited.classList.add("edit");

// Todos
let Todos = JSON.parse(localStorage.getItem("list"))
  ? localStorage.setItem("list", JSON.stringify(Todos))
  : [];
// setItem
function setItem() {
  localStorage.setItem("list", JSON.stringify(Todos));
}

// showmessage
function showMessage(where, message) {
  document.getElementById(where).textContent = message;
  setTimeout(() => {
    document.getElementById(where).textContent = "";
  }, 2500);
}

// getTime
function getTime() {
  const now = new Date();

  const today = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month = now.getMonth() + 1 < 10 ? "0" + now.getMonth() : now.getMonth();
  const year =
    now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();

  const seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  const minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();

  const result = `${hours}:${minutes}:${seconds}, ${today}.${month}.${year} `;

  return result;
}

// getTodos
function getTodos() {
  listGroupTodo.innerHTML = "";
  Todos.forEach((item, index) => {
    listGroupTodo.innerHTML += `
  <li ondblclick = {complatedTodo(${index})} class="list-group-item d-flex justify-content-between  ${
      item.completed ? "rang" : ""
    }">
    <h6 class = '${item.completed ? "complated" : ""}' >${item.text}</h6>
    <div class="d-flex align-content-center gap-4">
      <span>
        <i class="fa-regular fa-calendar-days"></i>
        ${item.date}
      </span>
      <i onclick = {complatedTodo(${index})} class="fa-solid fa-check"></i>
      <i onclick = {editTodo(${index})} class="fa-solid fa-pen-to-square"></i>
      <i onclick = {deleteTodo(${index})} class="fa-solid fa-trash"></i>
    </div>
  </li>`;
  });
}

// AddEventListener
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formCreate["input-create"].value.trim();

  if (inputValue.length) {
    Todos.push({
      text: inputValue,
      date: getTime(),
      completed: false,
    });
  } else {
    showMessage("message-create", "Write some text...");
  }

  setItem();
  getTodos();
  formCreate.reset();
});

// deletedTodo
function deleteTodo(id) {
  const deleteTodos = Todos.filter((item, index) => {
    return id !== index;
  });

  Todos = deleteTodos;
  setItem();
  getTodos();
}

// formEdit's addeventlistener
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formEdit["input-edit"].value.trim();
  if (inputValue.length) {
    Todos.splice(editItemId, 1, {
      text: inputValue + "  " + Edited.innerHTML,
      date: getTime(),
      completed: false,
    });

    closedIcon();
  } else {
    showMessage("message-edit", "Write some text...");
  }
  setItem();
  getTodos();
  formEdit.reset();
});

// EditTodos
function editTodo(id) {
  editItemId = id;
  open();
}

// closedicon
function closedIcon() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

// open icon
function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// completeTodo
function complatedTodo(id) {
  let complatedTodos = Todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: !item.completed };
    } else {
      return { ...item };
    }
  });
  Todos = complatedTodos;
  setItem();
  getTodos();
}
