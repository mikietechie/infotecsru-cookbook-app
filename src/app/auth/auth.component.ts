import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StateService } from '../state.service';
import { TCredentials } from '../structs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(public ss: StateService, private snackBar: MatSnackBar) {}

  /**
   * onSubmit
   */
  public onSubmit() {
    const values = this.form.value;
    // this.ss.setUser({ id: values.email!, email: values.email! });
    if (values.signUp) {
      this.signUp(values);
    } else {
      this.signIn(values);
    }
  }

  /**
   * signUp
   */
  public signUp(credentials: TCredentials) {
    createUserWithEmailAndPassword(
      this.ss.auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed up
        this.ss.setUser(userCredential.user);
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  /**
   * signIn
   */
  public signIn(credentials: TCredentials) {
    signInWithEmailAndPassword(
      this.ss.auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed in
        this.ss.setUser(userCredential.user);
      })
      .catch((error) => {
        this.showError(error);
      });
  }

  private showError(error: any) {
    console.error(error);
    this.snackBar.open(
      error?.message ? `${error.message}` : `An error occured`,
      'Okay',
      { duration: 5000 }
    );
  }
}
