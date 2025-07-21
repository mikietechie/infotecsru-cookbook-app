import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StateService } from '../state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    signUp: new FormControl(false),
  });

  constructor(public ss: StateService) {}

  /**
   * onSubmit
   */
  public onSubmit() {
    const values = this.form.value;
    this.ss.setUser({ id: values.email!, email: values.email! });
  }
}
