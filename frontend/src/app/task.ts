export class Task {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  status: string;

  constructor(id: number, title: string, description: string, deadline: Date, status: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
}