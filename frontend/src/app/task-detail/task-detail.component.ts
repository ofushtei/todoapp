import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [TaskService]
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private location: Location
  ) {  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getTask(id).subscribe(
      data => {
        this.task = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  save(task: Task): void {
    this.service.updateTask(task).subscribe();
    this.goBack();
  }

  delete(task: Task): void {
    this.service.deleteTask(task).subscribe();
    this.goBack();
  }

  ngOnInit() {
    this.getTask();
  }

}
