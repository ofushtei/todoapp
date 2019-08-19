import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseurl = 'http://127.0.0.1:8000';

  httpOptions = {
    headers: new HttpHeaders({ 
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseurl + '/tasks/').pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.baseurl}/tasks/${id}`;
    return this.http.get<Task>(url).pipe(catchError(this.handleError<Task>('getTask id=${id}')));
  }

  updateTask(task): Observable<any>{
    const url = `${this.baseurl}/tasks/${task.id}/`;
    return this.http.put(url, task, this.httpOptions).pipe(catchError(this.handleError<Task>('updateTask')));;
  }

  addTask(task: Task): Observable<any> {
    const data = {title: task.title, description: task.description, deadline: task.deadline, status: task.status}
    const url = `${this.baseurl}/tasks/`;
    return this.http.post(url, data, this.httpOptions).pipe(catchError(this.handleError<Task>('addTask')));
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.baseurl}/tasks/${id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(catchError(this.handleError<Task>('deleteTask')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
