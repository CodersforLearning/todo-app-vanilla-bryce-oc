let taskList = [];

//const selectAllCheckbox = document.querySelector('#js-select-all');

const taskTable = document.querySelector('#js-todo-table');
const addButton = document.querySelector('#js-add-button');
const addTextbox = document.querySelector('#js-add-textbox');

addButton.addEventListener('click', addTask);

taskTable.addEventListener('click', event => {
    console.log(event);

    if (event.target.parentElement.classList.contains('js-tick')) {
        const taskKey = event.target.parentElement.parentElement.parentElement.dataset.key;

        taskIndex = locateTask(taskKey);
        if (taskIndex != -1) {
            taskList[taskIndex].checked = !taskList[taskIndex].checked;
        }
    }
    else if (event.target.parentElement.classList.contains('js-delete')) {
        const taskRow = event.target.parentElement.parentElement.parentElement;
        const taskKey = taskRow.dataset.key;
        taskRow.remove();

        taskIndex = locateTask(taskKey);
        if (taskIndex != -1) {
            taskList.splice(taskIndex, 1);

            if (taskList.length == 0) {
                const tableHeader = document.querySelector('#table-header');
                tableHeader.innerHTML = `<th>No tasks yet. Add a task!</th>`;
            }
        }
    }
});

function locateTask(taskId) {
    for (i = 0; i < taskList.length; i++) {
        if (taskList[i].id == taskId) return i;
    }

    return -1;
}

function renderNewTask(task) {
    const taskRow = document.createElement("tr");

    const isChecked = task.checked ? ' done' : '';
    taskRow.setAttribute('class', `task-row${isChecked}`);

    taskRow.setAttribute("data-key", task.id);
    taskRow.innerHTML = `
    <td>
        <label class="tick js-tick">
            <input type="checkbox">
        </label>
    </td>
    <td>${task.taskName}</td>
    <td>
        <label class="delete js-delete">
            <button>delete</button>
        </label>
    </td>
    `;

    taskTable.append(taskRow);
}

function addTask() {
    let taskName = addTextbox.value.trim();
    if (taskName != "") {
        const task = {
            taskName,
            checked: false,
            id: Date.now(),
        };

        taskList.push(task);
        renderNewTask(task);

        if (taskList.length == 1) {
            const tableHeader = document.querySelector('#table-header');
            tableHeader.innerHTML = `
            <th>complete?</th>
            <th>task</th>
            `;
        }
    }
    addTextbox.value = "";
}