import { Component, OnInit } from '@angular/core';
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
export class CookbookComponent implements OnInit {
  constructor(public ss: StateService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // this.ss.initializeData()
  }

  /**
   * openRecipeFormDialog
   */
  public openRecipeFormDialog(recipe?: IRecipe) {
    this.dialog.open(RecipeFormComponent, {
      minWidth: '50%',
      data: { recipe },
    });
  }

  /**
   * openRecipeDeleteDialog
   */
  public openRecipeDeleteDialog(recipe: IRecipe) {
    console.log(recipe);
    this.dialog.open(RecipeDeleteComponent, {
      data: { recipe },
    });
  }

  /**
   * openRecipeFormDialog
   */
  public openRecipeDialog(recipe: IRecipe) {
    this.dialog.open(RecipeComponent, {
      maxWidth: '500px',
      data: { recipe },
    });
  }
}
