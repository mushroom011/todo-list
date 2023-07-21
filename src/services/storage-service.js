class StorageService {
    #INITIAL_STORAGE = {
        projects: [
            { id: '1', name: 'Personal' },
            { id: '2', name: 'Home' },
            { id: '3', name: 'Work' }
        ],
        todos: []
    }

    #updateLocalStorage = (data) => {
        const storage = this.getStorage();
        localStorage.setItem('todosStorage', JSON.stringify({ ...storage, ...data }));
    }

    createStore = () => {
        localStorage.setItem('todosStorage', JSON.stringify(this.#INITIAL_STORAGE));
    }

    getStorage = () => {
        const storage = localStorage.getItem('todosStorage');
        if (storage !== null) return JSON.parse(storage);

        this.createStore();
        return this.getStorage();
    };

    getProjects = () => this.getStorage().projects;

    getProject = (projectId) => {
        const projects = this.getProjects();
        return projects.find(project => project.id === projectId);
    }

    addProject = (project) => {
        const projects = this.getProjects();
        projects.push(project);
        this.#updateLocalStorage({ projects });
    }

    updateProject = (projectId, data) => {
        const projectsFromStorage = this.getProjects();
        const projectIndex = projectsFromStorage.findIndex(p => p.id === projectId);
        const updatedProject = { ...projectsFromStorage[projectIndex], ...data };
        const updatedProjects = [
            ...projectsFromStorage.slice(0, projectIndex),
            updatedProject,
            ...projectsFromStorage.slice(projectIndex + 1),
        ];

        this.#updateLocalStorage({ projects: updatedProjects });
    }

    deleteProject = (projectId) => {
        const projects = this.getProjects();
        const todos = this.getAllTodos();
        const projectIndex = projects.findIndex(p => p.id === projectId);
        const updatedTodos = todos.filter(todo => todo.projectId !== projectId);
        projects.splice(projectIndex, 1);

        this.#updateLocalStorage({ projects, todos: updatedTodos });
    }

    getAllTodos = () => this.getStorage().todos;

    getTodosForProject = (projectId) => {
        if(!projectId) return this.getAllTodos();
        return this.getStorage().todos.filter(t => t.projectId === projectId);
    }

    addTodo = (todo) => {
        const todos = this.getAllTodos();
        todos.push(todo);

        this.#updateLocalStorage({ todos });
    }

    getTodo = (todoId) => {
        const todos = this.getAllTodos();
        return todos.find(t => t.id === todoId);
    }

    updateTodo = (todoId, data) => {
        const todosFromStorage = this.getAllTodos();
        const todoIndex = todosFromStorage.findIndex(t => t.id === todoId);
        const updatedTodo = { ...todosFromStorage[todoIndex], ...data };
        const updatedTodos = [
            ...todosFromStorage.slice(0, todoIndex),
            updatedTodo,
            ...todosFromStorage.slice(todoIndex + 1),
        ];

        this.#updateLocalStorage({ todos: updatedTodos });
    }

    deleteTodo = (todoId) => {
        const todos = this.getAllTodos();
        const todoIndex = todos.findIndex(t => t.id === todoId);
        todos.splice(todoIndex, 1);

        this.#updateLocalStorage({ todos })
    }
}

export default StorageService
