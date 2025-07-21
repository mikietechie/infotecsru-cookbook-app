import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipe } from '../structs';
import { StateService } from '../state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-delete',
  templateUrl: './recipe-delete.component.html',
  styleUrls: ['./recipe-delete.component.scss'],
})
export class RecipeDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<RecipeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: IRecipe },
    public ss: StateService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * confirmDelete
   */
  public confirmDelete() {
    try {
      this.ss.deleteRecipe(this.data.recipe);
      this.snackBar.open('Recipe deleted successfully', 'Okay', {
        duration: 5000,
      });
    } catch (error) {
      console.error(error);
      this.snackBar.open('Failed to delete, an error occured', 'Okay', {
        duration: 5000,
      });
    }
    this.dialogRef.close();
  }
}
