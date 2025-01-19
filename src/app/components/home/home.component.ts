import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  inputTypes: Select[] = [
    { value: 'text', viewValue: 'Inputs' },
    { value: 'radio', viewValue: 'Radio buttons' },
    { value: 'checkbox', viewValue: 'Checkboxes' },
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      formName: ['Untitled form'],
      formDesc: [''],
      questions: this.fb.array([this.createQuestion()]),
      createdDate: [new Date().toLocaleString()]
    });
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      type: ['text'],
      ques: [''],
      input: [''],
      options: this.fb.array([this.createOption()])
    });
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      option: ['']
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number): void {
    const options = this.getOptions(questionIndex);
    options.push(this.createOption());
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getOptions(questionIndex);
    options.removeAt(optionIndex);
  }

  onSubmit(): void {
    let obj = {};
    if (localStorage.getItem('FORM_DATA')) {
      let oldData = JSON.parse(localStorage.getItem('FORM_DATA'));
      obj[this.form.value.formName] = this.form.value;
      obj = { ...oldData, ...obj }; // To merge the old and present object values
    } else {
      obj[this.form.value.formName] = this.form.value;
    }
    localStorage.setItem('FORM_DATA', JSON.stringify(obj));
    this.form.reset(); // To clear the form values
  }
}
