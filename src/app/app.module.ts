import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthComponent } from './auth/auth.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeDeleteComponent } from './recipe-delete/recipe-delete.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CookbookComponent,
    RecipeFormComponent,
    IngredientsComponent,
    RecipeComponent,
    RecipeDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgFor,
    AsyncPipe,
    MatSnackBarModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'tgcicd',
        appId: '1:8756139626:web:086b507dd3945d8d54dc13',
        storageBucket: 'tgcicd.firebasestorage.app',
        apiKey: 'AIzaSyB924KaF3mAL8vd3GsNf9gI36pdq9wsi2I',
        authDomain: 'tgcicd.firebaseapp.com',
        messagingSenderId: '8756139626',
        measurementId: 'G-79599KPV02',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
