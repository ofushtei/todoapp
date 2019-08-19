import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {

  task: Task;

  tasks: Task[] = [];
  tasksN: Task[] = [];
  tasksP: Task[] = [];
  tasksD: Task[] = [];


  constructor(private service: TaskService) { }

  getTasks() {
    this.service.getTasks().subscribe(
      data => {
        this.tasks = data;
        this.sortTasks();
      },
      error => {
        console.log(error);
      }
    )
  }

  sortTasks() {
    for(let i = 0; i <= this.tasks.length; i++) {
      this.task = new Task(this.tasks[i].id, this.tasks[i].title, this.tasks[i].description, this.tasks[i].deadline, this.tasks[i].status);
      if (this.task.status === 'P') {
        this.tasksP.push(this.task);
      } else if (this.task.status === 'D') {
        this.tasksD.push(this.task);
      } else {
        this.tasksN.push(this.task);
      }
    }
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      let draggedTask = event.container.data[event.currentIndex];
      if (newStatus === 'N') {  
        draggedTask.status = 'N';
        this.updateStatus(draggedTask);
      } else if (newStatus === 'P') {;
        draggedTask.status = 'P';
        this.updateStatus(draggedTask);
      } else if (newStatus === 'D') {
        draggedTask.status = 'D';
        this.updateStatus(draggedTask);
      } else {
        console.log('Error');
      }
    }
  }

  updateStatus(task: Task): void {
    this.service.updateTask(task).subscribe();
  }

  ngOnInit() {
    this.getTasks();
  }

}
