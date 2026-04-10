let todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'make dinner',
    dueDate: '2026-3-22',
    completed: false
}, {
    name: 'do some coding practice',
    dueDate: '2026-2-9',
    completed: true
}];


renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
        const { name, dueDate, completed } = todoObject;

        let checkboxAttribute = '';
        if (completed) {
            checkboxAttribute = 'checked';
        }

        const html = `
        <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" ${checkboxAttribute}>
            <div class="todo-text">${name}</div>
            <div class="todo-date">${dueDate}</div>
            <button class="delete-todo-button js-delete-todo-button"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        todoListHTML += html;
    });

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;

    // DELETE BUTTONS
    document.querySelectorAll('.js-delete-todo-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                todoList.splice(index, 1);
                saveToStorage();
                renderTodoList();
            });
        });

    // CHECKBOXES
    document.querySelectorAll('.todo-checkbox')
        .forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                todoList[index].completed = checkbox.checked;
                saveToStorage();
            });
        });
}

document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
        addTodo();
    })

function addTodo() {
    let inputElement = document.querySelector('.js-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    if (name === '') {
        alert('Please fill the required fields.')
    } else {
        todoList.push({
            // name: name,
            // dueDate: dueDate
            name,
            dueDate,
            completed: false
        });
        inputElement.value = '';
        renderTodoList();
        saveToStorage();
    }

}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function handleAddKeydown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}