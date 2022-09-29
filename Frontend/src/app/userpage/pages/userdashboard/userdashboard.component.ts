import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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

  onClickTimer(event: any) {
    this.timer = !this.timer;
    this.timer ? (this.button = 'STOP TIMER') : (this.button = 'START TIMER');
    if (this.timer) {
      this.startTimer();
    } else {
      this.pauseTimer();
      console.log(this.display);

      if (this.taskFormGroup.invalid) return;
      this.isSubmitted = true;

      const taskData = {
        name: this.taskForm?.['name'].value,
        desc: this.taskForm?.['desc'].value,
        timer: this.display,
      };

      this.tasks.push(taskData);
      console.log(this.tasks);

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