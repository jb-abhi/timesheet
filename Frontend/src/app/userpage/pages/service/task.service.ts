import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../../../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiURLtasks = environment.apiURL + 'tasks';
  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiURLtasks}/new`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURLtasks);
  }

  deleteTask(taskId: string): Observable<Object> {
    return this.http.delete<Object>(this.apiURLtasks + `/${taskId}`);
  }

  task = new BehaviorSubject<Boolean>(false);
}
