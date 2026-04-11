export enum taskStatus {
    undone = "UNDONE",
    doing = "DOING",
    done = "DONE",
}

export enum ThemeMode {
    light = "light",
    dark = "dark",
}

interface shared {
    id: string;
    title: string;
    description: string;
}

export interface IProject extends shared {
    boards: IBoard[];
}

export interface IBoard extends shared {
    tasks: ITask[];
}

export interface ITask extends shared {
    status: taskStatus;
}
