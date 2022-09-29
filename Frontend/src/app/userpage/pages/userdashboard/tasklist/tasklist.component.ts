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
  editMode: boolean = false;
  task: Task = {
    name: '',
    desc: '',
    date: '',
    start: '',
    timer: '',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();

    this.taskService.task.subscribe((val) => {
      if (val) {
        this.getTasks();
      }
    });
  }

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

  onEdit(taskId: string) {
    this.editMode = true;
    this.taskService.getTask(taskId).subscribe((task) => {
      this.task = task;
    });
  }

  onCancel() {
    this.editMode = false;
  }

  onSave() {
    let taskId = this.task.id!;
    this.taskService.updateTask(taskId, this.task).subscribe((data) => {
      this.editMode = false;
      this.taskService.task.next(true);
    });
  }
}
