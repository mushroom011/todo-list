import TodoList from "../todo-list";
import StorageService from "../../services/storage-service";
import Project from '../../entity/Project';

const storageService = new StorageService();
const { getTodosForProject, addProject, getProjects, deleteProject, getAllTodos } = storageService;

const Projects = (projects) => {
    const allTodos = document.querySelector('#allTodos');
    const navbarTitle = document.querySelector('.navbar-title');

    allTodos.addEventListener('click', onAllTodosClick);
    navbarTitle.insertAdjacentHTML('beforeend', plusIcon);
    navbarTitle.querySelector('#plusIconProject').addEventListener('click', sowProjectForm);

    updateProjectList(projects);
}

const updateProjectList = (projects) => {
    const menu = document.querySelector('#menu');
    const projectNods = projects.map(project => createProgectItem(project, (e) => onProjectClick(e, project)));
    menu.replaceChildren(...projectNods);
}

const setSelectedProjectInfo = (title, id) => {
    const projectInfo = document.querySelector('#projectInfo');
    projectInfo.textContent = title;
    projectInfo.dataset.selectedProjectId = id;
}

const onAllTodosClick = () => {
    setSelectedProjectInfo('All Todos', '');
    TodoList(getAllTodos());
}

const onProjectClick = (e, { id, name }) => {
    if(!e.target.classList.contains('project-title')) return;
    setSelectedProjectInfo(name, id);
    TodoList(getTodosForProject(id));
}

const createProgectItem = ({ id, name }, onItemClick) => {
    const li = document.createElement('li');
    const closBtn = createButtonWithIcon(xMarkIcon);
    closBtn.addEventListener('click', onDelete(id));
    li.addEventListener('click', onItemClick);
    li.textContent = name;
    li.classList.add('project-title');
    li.appendChild(closBtn);
    
    return li;
}

const projectForm = document.querySelector('#projectForm');
const todoForm = document.querySelector('#todoForm');
const popup = document.querySelector('#popup');
const btnCanselProject = document.querySelector('#btnCanselProject');
const btnAddProject = document.querySelector('#btnAddProject');

const onCansel = (e) => {
    e.preventDefault();
    popup.style.display = 'none';
    projectForm.style.display = 'none';
    todoForm.style.display = 'none';
}

const onAdd = (e, addProject) => {
    e.preventDefault();
    const form = document.querySelector('#projectForm');
    if(!form.reportValidity()) return;

    const submitter = document.querySelector('#btnAddProject');
    const formData = new FormData(form, submitter);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const newProject = new Project(data.name);
    const {id, name} = newProject;

    addProject(newProject);
    updateProjectList(getProjects());
    setSelectedProjectInfo(name, id);
    TodoList(getTodosForProject(id));
    form.reset();
    onCansel(e);
}

const onDelete = (id) => () => {
    deleteProject(id);
    updateProjectList(getProjects());
    setSelectedProjectInfo('All Todos', '');
    TodoList(getAllTodos());
}

const sowProjectForm = () => {
    popup.style.display = 'flex';
    projectForm.style.display = 'block';
}

const createButtonWithIcon = (icon) => {
    const button = document.createElement('button');
    button.classList.add('btn-with-icon', 'close-btn');
    button.innerHTML = icon;
    return button;
}

btnCanselProject.addEventListener('click', onCansel);
btnAddProject.addEventListener('click', (e) => onAdd(e, addProject));

const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" id="plusIconProject">
    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
</svg>`;

const xMarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
</svg>`;

export default Projects
