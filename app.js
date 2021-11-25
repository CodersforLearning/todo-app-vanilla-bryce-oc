const addButton = document.querySelector('#js-add-todo');
const removeButton = document.querySelector('#js-remove-todo');

addButton.addEventListener('click', addTask);
removeButton.addEventListener('click', removeTask);

function addTask() {
    alert("Add task button clicked!");
}

function removeTask() {
    alert("Remove task button clicked!");
}