import { v4 as uuidv4 } from 'uuid';
import {format} from 'date-fns';
class Todo {
    constructor(
        title,
        description,
        dueDate,
        priority,
        projectId,
    ) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.dueDate = format(new Date(dueDate), 'yyyy-MM-dd');
        this.priority = priority;
        this.projectId = projectId;
    }
}

export default Todo;
