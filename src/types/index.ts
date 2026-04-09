export enum taskStatus {
    undone = "UNDONE",
    doing = "DOING",
    done = "DONE",
}

export interface ITask {
    id: string;
    title: string;
    status: taskStatus;
}
