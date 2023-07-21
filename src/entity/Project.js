import { v4 as uuidv4 } from 'uuid';
class Project {
    constructor(
        name,
    ) {
        this.id = uuidv4();
        this.name = name
    }
}

export default Project;
