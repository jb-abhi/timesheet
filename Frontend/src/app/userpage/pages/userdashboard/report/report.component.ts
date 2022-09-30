import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { LocalstorageService } from 'src/app/localstorage.service';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TaskService } from '../../service/task.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @ViewChild('report', { static: false }) el!: ElementRef;
  tasks: Task[];
  user: User = {
    name: '',
    email: '',
  };
  date: string;
  constructor(
    private localStorage: LocalstorageService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.localStorage.getUserId();

    this.authService.getUser(userId).subscribe((data) => {
      this.user = data;
    });

    this.taskService.getTasks(userId).subscribe((data) => {
      this.tasks = data;
    });
    this.taskService.data.subscribe((date) => {
      this.date = date;
    });
  }

  downloadpdf() {
    let pdf = new jsPDF('p', 'mm', [1500, 1500]);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        for (let i = 2; i < 5; i++) {
          var pageCount = pdf.getNumberOfPages();
          pdf.deletePage(i);
        }
        for (let i = 2; i < 5; i++) {
          var pageCount = pdf.getNumberOfPages();
          pdf.deletePage(i);
        }
        for (let i = 2; i < 5; i++) {
          var pageCount = pdf.getNumberOfPages();
          pdf.deletePage(i);
        }
        pdf.deletePage(2);
        pdf.save('Resume.pdf');
      },
    });
  }
}
