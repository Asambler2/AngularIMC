import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularIMC';

  contactForm = new FormGroup({
    nombre: new FormControl(),
    peso: new FormControl(),
    altura: new FormControl()
  })
  onSubmit() {
    console.log(this.contactForm.value);
  }
}
