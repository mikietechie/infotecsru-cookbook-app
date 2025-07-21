import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipe } from '../structs';
import { StateService } from '../state.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent {
  /**Could have used for builder */
  public form = this.fb.group({
    name: [''],
    instructions: [''],
    image: [''],
    ingredients: this.fb.array([]),
  });

  constructor(
    public dialogRef: MatDialogRef<RecipeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipe?: IRecipe },
    private fb: FormBuilder,
    public ss: StateService,
    private snackBar: MatSnackBar
  ) {
    if (data.recipe) {
      console.log(data.recipe);
      data.recipe.ingredients.forEach(() => this.addIngredient(new Event('')));
      this.form.patchValue(data.recipe as any);
    }
  }

  /**
   * onSubmit
   */
  public async onSubmit() {
    const data = { ...this.form.value } as never as IRecipe;
    console.log(data);
    try {
      if (this.data.recipe) {
        await this.ss.updateRecipe({ ...this.data.recipe, ...data });
      } else {
        await this.ss.addRecipe({ ...data });
      }
      this.snackBar.open('Recipe saved successfully', 'Okay', {
        duration: 5000,
      });
      this.dialogRef.close();
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed save recipe, an error occured', 'Okay', {
        duration: 5000,
      });
    }
  }
  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }
  addIngredient(e: Event) {
    this.ingredients.push(this.getIngredientForm());
    return e.preventDefault();
  }
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  /**
   * getIngredientForm
   */
  public getIngredientForm() {
    return this.fb.group({
      ingredient: [''],
      quantity: [''],
      measurementUnit: [''],
    });
  }
}
