class RecipeModel {
  servings?: number;
  prepTime?: number;
  cookingTime?: number;
  directions?: string;

  constructor(
    servings: number,
    prepTime: number,
    cookingTime: number,
    directions: string
  ) {
    this.servings = servings;
    this.prepTime = prepTime;
    this.cookingTime = cookingTime;
    this.directions = directions;
  }
}

export default RecipeModel;
