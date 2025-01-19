import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-view-saved-form',
  templateUrl: './view-saved-form.component.html',
  styleUrls: ['./view-saved-form.component.scss']
})
export class ViewSavedFormComponent implements OnInit {
  form: FormGroup;
  formsArray: Array<any> = [];
  inputTypes: Select[] = [
    { value: 'text', viewValue: 'Inputs' },
    { value: 'radio', viewValue: 'Radio buttons' },
    { value: 'checkbox', viewValue: 'Checkboxes' },
  ];

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      formName: [],
      formDesc: [''],
      questions: this.fb.array([])
    });

    this.actRoute.queryParams.subscribe((param: any) => {
      this.loadFormData(param['formName']); // To load the form data saved from localStorage
    })
  }

  loadFormData(formName: string) {
    const data = JSON.parse(localStorage.getItem('FORM_DATA'));
    data[formName].questions.forEach(element => {
      if (element['type'] == 'text') {
        this.addQuestion('text');
      } else if (element['type'] == 'radio' || element['type'] == 'checkbox') {
        this.addQuestion(element['type']);
        if (element.options && element.options.length > 0) {
          element.options.forEach((element, index) => {
            this.addOption(index);
          });
        }
      }
    });
    this.form.patchValue(data[formName]);
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  createQuestion(inputType: string): FormGroup {
    return this.fb.group({
      type: [inputType],
      ques: [''],
      input: [''],
      options: this.fb.array([this.createOption()])
    });
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex)?.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      option: ['']
    });
  }

  addQuestion(inputType: string = 'text'): void {
    this.questions.push(this.createQuestion(inputType));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number): void {
    const options = this.getOptions(questionIndex);
    if (options) options.push(this.createOption());
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
  }

}
