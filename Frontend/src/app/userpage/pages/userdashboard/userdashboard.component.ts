import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Task } from 'src/app/models/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss'],
})
export class UserdashboardComponent implements OnInit {
  timer: boolean = false;
  button: string = 'START TIMER';

  time: number = 0;
  display: any;
  interval: any;

  tasks: object[] = [];

  taskFormGroup: FormGroup;
  isSubmitted = true;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._initTaskForm();
  }

  private _initTaskForm() {
    this.taskFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  get taskForm() {
    return this.taskFormGroup.controls;
  }

  onClickTimer() {
    if (this.taskForm?.['name'].value.trim() === '') return;

    this.timer = !this.timer;
    this.timer ? (this.button = 'STOP TIMER') : (this.button = 'START TIMER');
    if (this.timer) {
      this.startTimer();
    } else {
      this.pauseTimer();

      console.log(this.display);
      this.isSubmitted = true;

      const taskData = {
        name: this.taskForm?.['name'].value,
        desc: this.taskForm?.['desc'].value,
        date: new Date().toString(),
        timer: this.display,
      };

      this.taskService.createTask(taskData).subscribe(
        (task) => {
          console.log(task);
          this.taskService.task.next(task);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );

      this.taskForm?.['name'].setValue('');
      this.taskForm?.['desc'].setValue('');
      this.display = null;
      this.time = 0;
    }
  }

  startTimer() {
    console.log('=====>');
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display = this.transform(this.time);
    }, 1000);
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = 0;
    }
    if (minutes < 10) {
      minutes = 0;
    }
    // if (seconds < 10) {seconds = 0;}
    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
