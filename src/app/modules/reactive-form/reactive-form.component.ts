import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {

  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required, CustomValidators.checkUserName ]),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India', Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required),
      }),
      skills: new FormArray([
        new FormControl(null, Validators.required),
      ]),
      experience: new FormArray([
      ])
    })
  }

  onFormSubmitted() {
    console.log(this.reactiveForm)
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null))
  }

  deleteSkill(index:number) {
    (<FormArray>this.reactiveForm.get("skills")).removeAt(index)
  }

  addExperiance() {
    const frmGroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });
    (<FormArray>this.reactiveForm.get('experience')).push(frmGroup);
  }

  deleteExperiance(index:number) {
    (<FormArray>this.reactiveForm.get('experience')).removeAt(index);
  }

  createUsername(){
    let username = '';
    const fName: string= this.reactiveForm.get('firstname').value;
    const lName: string= this.reactiveForm.get('lastname').value;
    const dob: string= this.reactiveForm.get('dob').value;

    if(fName.length >= 3){
      username += fName.slice(0, 3);
    }
    else {
      username += fName;
    }

    if(lName.length >= 3){
      username += lName.slice(0, 3);
    }
    else {
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();

    console.log(username);

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname: this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   address: {
    //     street: this.reactiveForm.get('address.street').value,
    //     country: this.reactiveForm.get('address.country').value,
    //     city: this.reactiveForm.get('address.city').value,
    //     region: this.reactiveForm.get('address.region').value,
    //     postal: this.reactiveForm.get('address.postal').value
    //   },
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value
    // })

    //this.reactiveForm.get('username').setValue(username);

    this.reactiveForm.patchValue({
      username: username,
      address: {
        city: 'New Delhi'
      }
    })
}
}
