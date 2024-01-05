import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'template-driven-form';

  firstName:string = ''
  lastName:string = ''
  emailAddress:string = ''
  dob:string = ''

  @ViewChild('registrationForm') form!: NgForm

  genders = [
    {id:'check-male', value: 'male', display:'Male'},
    {id:'check-female', value: 'female', display:'Female'},
    {id:'check-other', value: 'other', display:'Prefer Not say'},
  ]

  onFormSubmitted() {
console.log(this.form)
  }

  generateUsername() {
    let username = ''
    if(this.firstName.length >= 3) {
      username += this.firstName.slice(0,3);
    }
    else {
      username += this.firstName
    }
    if(this.lastName.length >= 3) {
      username += this.lastName.slice(0,3);
    }
    else {
      username += this.lastName
    }

    let dateTime = new Date(this.dob)
    username += dateTime.getFullYear()

    username = username.toLowerCase()
    // console.log(username)

    // this.form.value['username'] = username
    // this.form.controls['username'].value = username;
    // console.log(this.form.value['username'])


    // setValue() while using setValue the object must need entire fields in the form

    // this.form.setValue({
    //   firstname:this.form.value.firstname,
    //   lastname:this.form.value.lastname,
    //   email:this.form.value.email,
    //   phone:this.form.value.phone,
    //   dob:this.form.value.dob,
    //   gender:'male',
    //   username:username,
    //   address: {
    //     street1:this.form.value.address.street1,
    //     street2:this.form.value.address.street2,
    //     country:this.form.value.address.country,
    //     city:this.form.value.address.city,
    //     region:this.form.value.address.region,
    //     postal:this.form.value.address.postal
    //   }
    // })

    // patchValue() while using patchValue() the object only need the field to be updated

    this.form.form.patchValue({
      username:username
    })
  }
}
