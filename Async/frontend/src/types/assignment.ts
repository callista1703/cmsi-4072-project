export type Assignment = {
    id: string;
    title: string;
    course: string;
    dueDate: Date;
    priority: "low" | "medium" | "high";
    description: string;
}; 