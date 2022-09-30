import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../../../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>('');
  data: Observable<string> = this.dataSource.asObservable();

  apiURLtasks = environment.apiURL + 'tasks';
  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiURLtasks}/new`, task);
  }

  getTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURLtasks + `/all/${userId}`);
  }

  getTask(taskId: string): Observable<Task> {
    return this.http.get<Task>(this.apiURLtasks + `/${taskId}`);
  }

  deleteTask(taskId: string): Observable<Object> {
    return this.http.delete<Object>(this.apiURLtasks + `/${taskId}`);
  }

  updateTask(taskId: string, task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiURLtasks + `/${taskId}`, task);
  }

  task = new BehaviorSubject<Boolean>(false);
  // getDate = new BehaviorSubject<string>();

  sendData(data: string) {
    this.dataSource.next(data);
  }
}
