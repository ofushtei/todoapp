import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit {

  id: number;
  title: string;
  deadLine: any;
  description: string;
  status: string;
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private location: Location
  ) { }

  add(title: string, description: string, deadLine: any) {
    this.id = -1;
    this.title = title.trim();
    if (!this.title) { return; }
    this.description = description;
    this.deadLine = new Date(deadLine);
    this.status = 'N';
    this.task = new Task(this.id, this.title, this.description, this.deadLine, this.status);
    this.service.addTask(this.task).subscribe();
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

}
