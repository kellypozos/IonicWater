import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

interface Componente {
  icon: string;
  name: string;
  redirectTo: string;

}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  componentes: Componente[] = [
    {
      icon: 'people-circle',
      name: 'Usuarios',
      redirectTo: '/usuarios'
    },
    {
      icon: 'time-outline',
      name: 'Historial',
      redirectTo: '/historial'
    },
    {
      icon: 'alert-circle-outline',
      name: 'Alert',
      redirectTo: '/alert'
    }

  ];

  @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;

  constructor() { }
  private doughnutChart: Chart;

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ['Vacío', 'Agua'],
        datasets: [{
          label: '# of Votes',
          data: [50, 50],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
        }]
      }
    });

  }


}
