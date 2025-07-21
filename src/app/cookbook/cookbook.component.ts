import { Component } from '@angular/core';
import { StateService } from '../state.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { IRecipe } from '../structs';
import { RecipeComponent } from '../recipe/recipe.component';
import { RecipeDeleteComponent } from '../recipe-delete/recipe-delete.component';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss'],
})
export class CookbookComponent {
  constructor(public ss: StateService, public dialog: MatDialog) {}

  /**
   * openRecipeFormDialog
   */
  public openRecipeFormDialog(recipe?: IRecipe) {
    this.dialog.open(RecipeFormComponent, {
      data: { recipe },
    });
  }

  /**
   * openRecipeDeleteDialog
   */
  public openRecipeDeleteDialog(recipe: IRecipe) {
    this.dialog.open(RecipeDeleteComponent, {
      data: { recipe },
    });
  }

  /**
   * openRecipeFormDialog
   */
  public openRecipeDialog(recipe: IRecipe) {
    this.dialog.open(RecipeComponent, {
      data: { recipe },
    });
  }
}
