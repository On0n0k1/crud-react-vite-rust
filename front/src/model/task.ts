import moment from 'moment';

export class Due{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;

    constructor(due: Date){
        const elapsed = moment.duration(due.getTime() - Date.now())

        this.years = elapsed.years();
        this.months = elapsed.months();
        this.days = elapsed.days();
        this.hours = elapsed.hours();
        this.minutes = elapsed.minutes();
        this.seconds = elapsed.seconds();
    }
}


export class Task {
    name: string;
    priority: number;
    due: Date;
    description: string;
    id: number;
    updated: boolean;

    constructor(
        name: string, 
        priority: number,
        due: Date,
        description: string,
        id: number,
    ) {
        this.name = name;
        this.priority = priority;
        this.due = due;
        this.description = description;
        this.id = id;
        this.updated = false;
    }

    getDue(): Due {
        return new Due(this.due)
    }
}

