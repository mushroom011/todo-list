import Projects from './ui/project-list';
import StorageService from './services/storage-service';
import TodoList from "./ui/todo-list";
import './style.css';

const storageService = new StorageService();
const {getProjects, getAllTodos} = storageService;

Projects(getProjects());
TodoList(getAllTodos());