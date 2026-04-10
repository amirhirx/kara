export enum taskStatus {
    undone = "UNDONE",
    doing = "DOING",
    done = "DONE",
}

export enum ThemeMode {
    light = "light",
    dark = "dark",
}

export interface ITask {
    id: string;
    title: string;
    status: taskStatus;
}
