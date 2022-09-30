import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {}
  apiURLtasks = environment.apiURL + 'tasks';
  apiURLusers = environment.apiURL + 'users';

  getAllTasks(): Observable<[]> {
    return this.http.get<[]>(this.apiURLtasks);
  }
}
