import { Injectable } from '@angular/core';
import {
  IIngredient,
  IMeasurementUnit,
  IRecipe,
  IRecipeIngredient,
  IUser,
} from './structs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public user: IUser | undefined = { id: '00', email: 'jon@mail.com' };
  public recipes: IRecipe[] = [];
  public ingredients: IIngredient[] = [];
  public measurementUnits: IMeasurementUnit[] = [
    { id: 'default', name: 'Sufficient' },
    { id: 'tea spoon', name: 'tea spoon' },
    { id: 'table spoon', name: 'table spoon' },
    { id: 'cup', name: 'cup' },
    { id: 'grams', name: 'grams' },
    { id: 'ounces', name: 'ounces' },
  ];

  constructor() {}

  /**
   * setUser
   */
  public setUser(user?: IUser) {
    this.user = user;
  }

  /**
   * addIngredient
   */
  public async addIngredient(ingredient: IIngredient) {
    if (
      this.ingredients
        .map((ingredient) => ingredient.name)
        .includes(ingredient.name)
    ) {
      return;
    }
    this.ingredients.push(ingredient);
  }

  /**
   * updateIngredients
   */
  public async updateIngredients(recipe: IRecipe) {
    recipe.ingredients.forEach((i) =>
      this.addIngredient({ id: this.getId('ING-'), name: i.ingredient })
    );
  }

  /**
   * addRecipe
   */
  public async addRecipe(recipe: IRecipe) {
    this.checkUser();
    recipe.id = this.getId('REC-');
    recipe.userId = this.user!.id!;
    recipe.createdOn = new Date().toISOString();
    this.recipes.push(recipe);
    this.updateIngredients(recipe);
  }

  /**
   * updateRecipe
   */
  public async updateRecipe(recipe: IRecipe) {
    this.checkOwnership(recipe);
    for (let index = 0; index < this.recipes.length; index++) {
      const element = this.recipes[index];
      if (element.id === recipe.id) {
        element.name = recipe.name;
        element.image = recipe.image;
        element.ingredients = recipe.ingredients;
        element.instructions = recipe.instructions;
        this.recipes[index] = element;
        break;
      }
    }
    this.updateIngredients(recipe);
  }

  /**
   * deleteRecipe
   */
  public async deleteRecipe(recipe: IRecipe) {
    this.checkOwnership(recipe);
    this.recipes = this.recipes.filter((recipe) => recipe.id !== recipe.id);
  }

  /**
   * findRecipe
   */
  public async findRecipe(id: string): Promise<IRecipe | undefined> {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  /**
   * checkUser
   */
  public checkUser() {
    if (!this.user) {
      throw new Error('authorized');
    }
  }

  /**
   * checkOwnership
   */
  public checkOwnership(recipe: IRecipe) {
    if (recipe.userId !== this.user?.id) {
      throw new Error('authorized');
    }
  }

  /**
   * getId
   */
  public getId(prefix: string): string {
    const now = new Date();
    return `${prefix}-${now.getTime()}-${Math.random()}`;
  }

  /**
   * initializeData
   */
  public initializeData() {
    fetch('https://dummyjson.com/recipes').then((res) => {
      if (res.ok) {
        res.json().then(
          (data: {
            recipes: {
              id: number;
              name: string;
              ingredients: string[];
              instructions: string[];
              userId: number;
              image: string;
            }[];
          }) => {
            const userIds = data.recipes.map((recipe) => String(recipe.userId));
            const ingredients = [
              ...new Set(data.recipes.flatMap((recipe) => recipe.ingredients)),
            ];
            // userIds.forEach((userId) => console.log(`Create user ${userId}`));
            ingredients.forEach((ingredient, index) =>
              this.ingredients.push({ id: String(index + 1), name: ingredient })
            );
            data.recipes.forEach((recipe, index) => {
              const recipeIngredients: IRecipeIngredient[] = [];
              recipe.ingredients.forEach((ingredient) => {
                recipeIngredients.push({
                  ingredient: ingredient,
                  measurementUnit: this.measurementUnits[0].name,
                  quantity: 1,
                });
              });
              this.recipes.push({
                userId:
                  index % 5 === 0 ? this.user!.id! : String(recipe.userId),
                image: recipe.image,
                instructions: recipe.instructions.join(' '),
                name: recipe.name,
                createdOn: new Date().toLocaleString(),
                id: String(recipe.id),
                ingredients: recipeIngredients,
              });
            });
          }
        );
      }
    });
  }
}
