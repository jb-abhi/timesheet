import { Component, OnInit } from '@angular/core';
import { mergeAll, tap } from 'rxjs';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss'],
})
export class AdminhomeComponent implements OnInit {
  data: any;
  chartOptions: any;

  constructor(private graphService: GraphService) {}

  getGraphData() {
    this.graphService.getAllTasks().subscribe((data) => {});
  }

  ngOnInit() {
    this.getGraphData();

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //employee1,employee2,employee3,employee4
      //total task time
      //total number of task
      datasets: [
        {
          type: 'line',
          label: 'Average',
          borderColor: '#42A5F5',
          borderWidth: 2,
          fill: false,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: 'bar',
          label: 'Total Tasks',
          backgroundColor: '#66BB6A',
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: 'white',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Total Time taken',
          backgroundColor: '#FFA726',
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };
  }
}
