import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularIMC';
  composicion: string = '';
  imc: number = 0;

  contactForm = new FormGroup({
    nombre: new FormControl(),
    peso: new FormControl(),
    altura: new FormControl(),
    metrica: new FormControl()
  })
  onSubmit() {
    this.calcula();
    console.log(this.contactForm.value);
  }
  mostrarComposicion(ordenacion: IComposicion): string {
    return ordenacion.mostrarComposicion(this.imc);
  }
  calcula() {
    switch (this.contactForm.get('metrica')?.value) {
      case 'metrico': let calculoMetrico: calculoCriterioMetrico = new calculoCriterioMetrico();
        this.imc = calculoMetrico.calculoImc(this.contactForm.get('peso')?.value, this.contactForm.get('altura')?.value);
        break;
      case 'ingles': let calculoIngles: calculoCriterioIngles = new calculoCriterioIngles();
        this.imc = calculoIngles.calculoImc(this.contactForm.get('peso')?.value, this.contactForm.get('altura')?.value);
        break;
      default: break;
    }
    if (this.imc != 0) {
      this.composicion = this.mostrarComposicion(new ComposicionGeneral);
      (<HTMLInputElement>document.getElementById('resultado')).innerHTML = ` Hola ${this.contactForm.get('nombre')?.value}, su sistema de medida es
              ${this.contactForm.get('metrica')?.value}, tiene de peso: ${this.contactForm.get('peso')?.value} y de altura
               ${this.contactForm.get('altura')?.value}, un IMC de  ${this.imc} y por tanto usted tiene
              un IMC  ${this.composicion}`;
    }
  }
}

interface IComposicion {
  mostrarComposicion(imc: number): string;
}

class ComposicionGeneral implements IComposicion {
  mostrarComposicion(imc: number): string {
    if (imc < 18.5) {
      return 'Peso inferior al normal';
    }
    if (imc >= 18.5 && imc <= 24.9) {
      return 'Normal';
    }
    if (imc >= 25 && imc <= 29.9) {
      return 'Peso superior al normal';
    }
    if (imc >= 20) {
      return 'Obesidad';
    }
    return '';
  }
}

interface ICalculoMetrica {
  calculoImc(peso: number, altura: number): number;
}

class calculoCriterioMetrico implements ICalculoMetrica {
  calculoImc(peso: number, altura: number): number {
    return Math.ceil(((peso / (altura) ^ 2)) * 100) / 100;
  }
}

class calculoCriterioIngles implements ICalculoMetrica {
  calculoImc(peso: number, altura: number): number {
    return Math.ceil(((peso / (altura) ^ 2))  * 703 * 100)/ 100;
  }
}
