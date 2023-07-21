import format from "date-fns/format";
import StorageService from '../../services/storage-service';

const storageService = new StorageService();
const { getProject } = storageService;

const TodoItemView = (todo) => {
    const todoItemViewContainer = document.querySelector('#todoItemView');
    const todoElements = [];

    for (let prop in todo) {
        if(prop === 'id') continue;
        if (todo.hasOwnProperty(prop)) {
            let todoTitle = document.createElement('p');
            let todoDescription = document.createElement('p');
            let propValue = todo[prop];
            todoTitle.textContent = capitalizeFirstLetter(prop);

            if(prop === 'dueDate') propValue = format(new Date(propValue), 'PP');
            if(prop === 'priority') todoDescription.classList.add(`priority--${propValue}`);
            if(prop === 'projectId') {
                propValue = getProject(propValue).name;
                todoTitle.textContent = 'Project';
            }

            todoDescription.textContent = propValue;
            todoElements.push(todoTitle, todoDescription);
        }
    }

    todoItemViewContainer.replaceChildren(...todoElements);
}

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export default TodoItemView;