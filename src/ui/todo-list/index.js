import TodoItem from "../todo-item";
import StorageService from "../../services/storage-service";
import Todo from "../../entity/Todo";
import { format } from 'date-fns';

const storageService = new StorageService();
const { addTodo, updateTodo, getTodosForProject, getTodo, getProjects } = storageService;

const TodoList = (todos) => {
    const {selectedProjectId} = document.querySelector('#projectInfo').dataset;
    setProjectOptionsToTodoItemForm();
    setSelectedProjectToTodoForm(selectedProjectId);

    if (todos.length !== 0) {
        const todosContainer = document.querySelector('#todosContainer');
        const todoNods = todos.map(todo => TodoItem(todo, onEdit));
        todosContainer.replaceChildren(...todoNods);
    } else {
        todosContainer.textContent = 'No tasks here 🙂';
    }
}

const setSelectedProjectToTodoForm = (selectedProjectId) => {
    if(!selectedProjectId) return;
    const select = document.querySelector('#projectId');
    const options = Array.from(select.options);
    const optionToSelect = options.find(p => p.value === selectedProjectId);
    optionToSelect.selected = true;
}

const projectForm = document.querySelector('#projectForm');
const todoForm = document.querySelector('#todoForm');
const popup = document.querySelector('#popup');
const btnCansel = document.querySelector('#btnCansel');
const btnAdd = document.querySelector('#btnAdd');
const content = document.querySelector('#content');
const popupTodoItemView = document.querySelector('#popupTodoItemView');

const onCansel = (e) => {
    e.preventDefault();
    const {selectedProjectId} = document.querySelector('#projectInfo').dataset;
    popup.style.display = 'none';
    projectForm.style.display = 'none';
    todoForm.style.display = 'none';
    projectForm.reset();
    todoForm.reset();

    setSelectedProjectToTodoForm(selectedProjectId);
}

const getFormData = (form) => {
    const submitter = document.querySelector('#btnAdd');
    const formData = new FormData(form, submitter);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    return data;
}

const onAdd = (e) => {
    e.preventDefault();
    const form = document.querySelector('#todoForm');
    if(!form.reportValidity()) return;
    
    const { id, title, description, dueDate, priority, projectId } = getFormData(form);
    const {selectedProjectId} = document.querySelector('#projectInfo').dataset;

    if (id === '') {
        addTodo(new Todo(title, description, dueDate, priority, projectId));
        // addTodo(new Todo(...data)); for some reason it leads to an error
    } else {
        updateTodo(id, { title, description, dueDate, priority, projectId });
    }

    onCansel(e);
    TodoList(getTodosForProject(selectedProjectId));
}

const onEdit = (todoId) => {
    sowTodoForm();
    const form = document.querySelector('#todoForm');
    const todo = getTodo(todoId);
    form.querySelector('#btnAdd').textContent = 'Save';
    todo.dueDate = format(new Date(todo.dueDate), 'yyyy-MM-dd');

    for (let property in todo) {
        form.elements[property].value = todo[property];
    }
}

const sowTodoForm = () => {
    popup.style.display = 'flex';
    todoForm.style.display = 'block';
    todoForm.querySelector('#btnAdd').textContent = 'Add task';
}

const createButtonWithIcon = (icon) => {
    const button = document.createElement('button');
    button.classList.add('btn-add-task');
    button.innerHTML = icon;
    button.addEventListener('click', sowTodoForm);
    return button;
}

const plusIconTodo = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" id="plusIconTodo">
    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
</svg> Add task`;

const createProjectOptions = () => {
    const options = [];
    const emptyOption = document.createElement('option');
    options.push(emptyOption);

    getProjects().forEach(({ id, name }) => {
        let option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        options.push(option);
    });

    return options;
}

const setProjectOptionsToTodoItemForm = () => {
    todoForm.querySelector('#projectId').replaceChildren(...createProjectOptions());
}

const hideItemDetails = () => {
    popupTodoItemView.style.display = 'none';
}

content.append(createButtonWithIcon(plusIconTodo));
btnCansel.addEventListener('click', onCansel);
btnAdd.addEventListener('click', onAdd);
popupTodoItemView.addEventListener('click', hideItemDetails);

export default TodoList