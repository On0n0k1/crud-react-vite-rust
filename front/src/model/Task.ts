import Due from './Due';

export class Task {
    name: string;
    priority: number;
    due: Date;
    description: string;
    id: number;
    index: number;
    updated: boolean;

    constructor(
        name: string, 
        priority: number,
        due: Date,
        description: string,
        id: number,
        index: number,
    ) {
        this.name = name;
        this.priority = priority;
        this.due = due;
        this.description = description;
        this.id = id;
        this.updated = false;
        this.index = index;
    }

    getDue(): Due {
        return new Due(this.due)
    }
}

export default Task;