class RandomRecipeHelper {
  constructor(data) {
    this.name = data.recipe.label;
    this.img = data.recipe.image;
    this.ingredients = data.recipe.ingredientLines;
  }
}

export default RandomRecipeHelper;
