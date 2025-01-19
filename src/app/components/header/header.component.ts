import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['forms-home']);
  }

  viewSavedForm() {
    // this.router.navigate(['view-saved-form']);
    this.router.navigate(['forms-list']);
  }
}
