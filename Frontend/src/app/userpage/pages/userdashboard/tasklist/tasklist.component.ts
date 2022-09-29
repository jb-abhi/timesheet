import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Task } from 'src/app/models/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent implements OnInit {
  tasks: Task[] = [];
  count: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();

    this.taskService.task.subscribe((val) => {
      if (val) {
        this.getTasks();
      }
    });
  }

  // getTasks() {
  //   this.taskService.task.subscribe((task) => {
  //     this.count++;
  //     console.log(this.count);
  //     if (this.count !== 1) {
  //       this.tasks.push(task);
  //       console.log(this.tasks);
  //     }
  //   });
  // }

  getTasks() {
    this.taskService.getTasks().subscribe((task) => {
      this.tasks = task;
    });
  }

  onDelete(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      console.log('deleted');
      this.getTasks();
    });
  }
}
