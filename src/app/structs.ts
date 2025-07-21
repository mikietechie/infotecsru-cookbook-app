export interface IUser {
  id?: string;
  email: string;
}

export interface IIngredient {
  id?: string;
  name: string;
}

export interface IMeasurementUnit {
  id?: string;
  name: string;
}

export interface IRecipeIngredient {
  ingredient: string;
  quantity: number;
  measurementUnit: string;
}

export interface IRecipe {
  id?: string;
  name: string;
  instructions: string;
  image: string;
  createdOn?: string;
  userId: string;
  ingredients: IRecipeIngredient[];
}
