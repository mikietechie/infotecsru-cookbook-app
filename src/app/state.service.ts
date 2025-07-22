import { Injectable } from '@angular/core';
import { IIngredient, IRecipe, IRecipeIngredient, IUser } from './structs';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { measurementUnits } from './data';
import { of } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public user?: User; // = { uid: '00', email: 'm@m.com' } as any;
  // public user$?: Observable<IUser | undefined>;
  // public recipes: IRecipe[] = [];
  // public ingredients: IIngredient[] = [];
  public measurementUnits = measurementUnits;
  public measurementUnits$ = of(measurementUnits);
  // public firestore = inject(Firestore);
  public userCollectionRef = collection(this.firestore, 'users');
  public users$ = collectionData<IUser>(this.userCollectionRef as any);
  public recipeCollectionRef = collection(this.firestore, 'recipes');
  public recipes$ = collectionData<IRecipe>(this.recipeCollectionRef as any);
  public ingredientCollectionRef = collection(this.firestore, 'ingredients');
  public ingredients$ = collectionData<IRecipe>(
    this.ingredientCollectionRef as any
  );

  constructor(private firestore: Firestore, public auth: Auth) {}

  /**
   * setUser
   */
  public setUser(user?: User) {
    this.user = user;
  }

  /**
   * addIngredient
   */
  public async addIngredient(ingredient: IIngredient) {
    await setDoc(doc(this.ingredientCollectionRef, ingredient.id), ingredient);
  }

  /**
   * updateIngredients
   */
  public async updateIngredients(recipe: IRecipe) {
    recipe.ingredients.forEach((i) =>
      this.addIngredient({ id: i.ingredient, name: i.ingredient })
    );
  }

  /**
   * addRecipe
   */
  public async addRecipe(recipe: IRecipe) {
    this.checkUser();
    recipe.id = this.getId('REC-');
    recipe.userId = this.user!.uid!;
    recipe.createdOn = new Date().toISOString();
    // this.recipes.push(recipe);
    await setDoc(doc(this.recipeCollectionRef, recipe.id), recipe);
    this.updateIngredients(recipe);
  }

  /**
   * updateRecipe
   */
  public async updateRecipe(recipe: IRecipe) {
    this.checkOwnership(recipe);
    await setDoc(doc(this.recipeCollectionRef, recipe.id), recipe);
    this.updateIngredients(recipe);
  }

  /**
   * deleteRecipe
   */
  public async deleteRecipe(recipe: IRecipe) {
    this.checkOwnership(recipe);
    await deleteDoc(doc(this.recipeCollectionRef, recipe.id));
  }

  /**
   * findRecipe
   */
  public async findRecipe(id: string): Promise<IRecipe | undefined> {
    return undefined;
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
    if (recipe.userId !== this.user?.uid) {
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
            // const userIds = data.recipes.map((recipe) => String(recipe.userId));
            // const ingredients = [
            //   ...new Set(data.recipes.flatMap((recipe) => recipe.ingredients)),
            // ];
            // userIds.forEach((userId) => console.log(`Create user ${userId}`));
            // ingredients.forEach((ingredient, index) =>
            //   this.ingredients.push({ id: String(index + 1), name: ingredient })
            // );
            data.recipes.forEach((recipe, index) => {
              const recipeIngredients: IRecipeIngredient[] = [];
              recipe.ingredients.forEach((ingredient) => {
                recipeIngredients.push({
                  ingredient: ingredient,
                  measurementUnit: this.measurementUnits[0].name,
                  quantity: 1,
                });
              });
              this.addRecipe({
                userId: 'system',
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
