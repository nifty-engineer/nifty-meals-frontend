import { useAuth } from "../../Auth/AuthContext";
import { useEffect, useState } from "react";
import RecipeModel from "../../models/RecipeModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import IngredientModel from "../../models/IngredientModel";

export const RecipeModal: React.FC<{ mealId: string; closeModal: any }> = (
  props
) => {
  const { authState, isAuthenticated } = useAuth();
  const [httpError, setHttpError] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingIngredients, setLoadingIngredients] = useState(true);

  const [recipe, setRecipe] = useState<RecipeModel>();
  const [ingredients, setIngredients] = useState<IngredientModel[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/recipes/${props.mealId}`;
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const recipeResponse = await fetch(url, requestOptions);
        if (!recipeResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const recipeResponseJson = await recipeResponse.json();
        const recipeModel: RecipeModel = new RecipeModel(
          recipeResponseJson.servings,
          recipeResponseJson.prepTime,
          recipeResponseJson.cookingTime,
          recipeResponseJson.directions
        );
        console.log(recipeModel);
        setRecipe(recipeModel);
      }
      setLoadingRecipe(false);
    };
    fetchRecipe().catch((error: any) => {
      setLoadingRecipe(false);
      setHttpError(error.message);
    });
  }, [authState]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/recipes/${props.mealId}/ingredients`;
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const recipeResponse = await fetch(url, requestOptions);
        if (!recipeResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const recipeResponseJson = await recipeResponse.json();
        const { ingredients } = recipeResponseJson._embedded;
        console.log(ingredients);
        setIngredients(ingredients);
      }
      setLoadingIngredients(false);
    };
    fetchIngredients().catch((error: any) => {
      setLoadingIngredients(false);
      setHttpError(error.message);
    });
  }, [authState]);
  if (loadingRecipe || loadingIngredients) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <>
      <br />
      <div className="recipe text-center">
        <div className="recipe-details">
          <h2 className="heading">Recipe</h2>
          <hr />
          <div className="info">
            Prep Time:{" "}
            <span className="prep-time minutes">{recipe?.prepTime} </span>
            <span>minutes</span>
          </div>
          <div className="info">
            Cooking Time:{" "}
            <span className="cooking-time minutes">{recipe?.cookingTime} </span>
            <span>minutes</span>
          </div>
          <div className="info">
            Serving Size:{" "}
            <span className="servings people">{recipe?.servings} </span>
          </div>
        </div>
        <br />
        <div className="recipe-ingredients">
          <h5 className="heading">Ingredients</h5>
          <ul className="ingredient list">
            {ingredients?.map((ingredient) => (
              <li className="ingredient">
                <span className="quantity">{ingredient.quantity}</span>{" "}
                <span className="unit">{ingredient.unit}</span>{" "}
                <span className="description">{ingredient.description}</span>
                <div>
                  <br />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-directions">
          <h5 className="heading">Cooking Directions</h5>
          {recipe?.directions}
        </div>
        <br />
        <button
          type="button"
          className="btn main-color text-white"
          onClick={() => props.closeModal(false)}
        >
          Close
        </button>
      </div>
    </>
  );
};
