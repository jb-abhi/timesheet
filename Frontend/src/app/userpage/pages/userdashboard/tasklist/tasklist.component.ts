import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LocalstorageService } from 'src/app/localstorage.service';
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

  constructor(
    private taskService: TaskService,
    private localStorage: LocalstorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getTasks();

    this.taskService.task.subscribe((val) => {
      if (val) {
        this.getTasks();
      }
    });
  }

  getTasks() {
    const userId = this.localStorage.getUserId();
    this.taskService.getTasks(userId).subscribe((task) => {
      this.tasks = task;
    });
  }

  onDelete(taskId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the task?',
      header: 'Delete Task',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.deleteTask(taskId).subscribe(
          (res) => {
            this.getTasks();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The selected task has been deleted',
            });
          },
          (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Cannot delete task!',
            });
          }
        );
      },
      reject: () => {},
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
    if (this.task.name?.trim() === '') return;
    let taskId = this.task.id!;
    this.taskService.updateTask(taskId, this.task).subscribe(
      (data) => {
        this.editMode = false;
        this.taskService.task.next(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The selected task has been updated successfully',
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot create task!',
        });
      }
    );
  }
}
