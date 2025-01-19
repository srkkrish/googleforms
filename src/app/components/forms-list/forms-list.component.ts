import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements OnInit {
  savedForms: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    const data = localStorage.getItem('FORM_DATA');
    if (data) {
      this.savedForms = JSON.parse(data);
      console.log(this.savedForms);
    }
  }

  editForm(obj: any) {
    this.router.navigate(['view-saved-form'], { queryParams: { 'formName': obj.key } });
  }

  deleteForm(obj: any) {
    if (localStorage.getItem('FORM_DATA')) {
      let formData = JSON.parse(localStorage.getItem('FORM_DATA'));
      delete formData[obj.key];
      localStorage.setItem('FORM_DATA', JSON.stringify(formData));
      this.savedForms = formData;
    }
  }
}
