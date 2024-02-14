import { Component } from '@angular/core';

@Component({
  selector: 'app-employer-main',
  templateUrl: './employer-main.component.html',
  styleUrls: ['./employer-main.component.scss']
})
export class EmployerMainComponent {

  isMobile = false;

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }
}
