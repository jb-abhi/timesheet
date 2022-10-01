import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/localstorage.service';
import { Task } from 'src/app/models/task';
import { TaskService } from '../service/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss'],
})
export class UserdashboardComponent implements OnInit {
  @ViewChild('timerbtn', { static: false }) el!: ElementRef;

  timer: boolean = false;
  button: string = 'START TIMER';

  time: number = 0;
  display: any;
  interval: any;
  starttime: any;

  tasks: object[] = [];

  taskFormGroup: FormGroup;
  isSubmitted = true;

  message: string = '';
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private localStorage: LocalstorageService,
    private messageService: MessageService
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
    if (this.taskForm?.['name'].value.trim() === '') {
      this.message = 'Please enter Project Name';
      this.el.nativeElement.style.backgroundColor = 'red';
      this.error = true;
      return;
    }
    this.error = false;
    this.el.nativeElement.style.backgroundColor = '';
    this.timer = !this.timer;
    this.timer ? (this.button = 'STOP TIMER') : (this.button = 'START TIMER');
    if (this.timer) {
      this.startTimer();
      this.starttime = new Date().toString();
    } else {
      this.pauseTimer();
      this.isSubmitted = true;

      const userId = this.localStorage.getUserId();

      const taskData = {
        name: this.taskForm?.['name'].value,
        desc: this.taskForm?.['desc'].value,
        date: new Date().toString(),
        timer: this.display,
        start: this.starttime,
        user: userId,
      };

      this.taskService.createTask(taskData).subscribe(
        (task) => {
          this.taskService.task.next(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'New task created successfully!',
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot create task!',
          });
          if (error.status !== 400) {
            this.message = 'Error in the server, Pls try again later.';
          }
        }
      );

      this.taskForm?.['name'].setValue('');
      this.taskForm?.['desc'].setValue('');
      this.display = null;
      this.time = 0;
    }
  }

  startTimer() {
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
    let sec_num = value;
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);

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
