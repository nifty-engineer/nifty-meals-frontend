import { useEffect, useState } from "react";
import MealModel from "../../models/MealModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const MealCheckoutPage = () => {
  const [meal, setMeal] = useState<MealModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Is Meal Checked Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingMealCheckedOut, setIsLoadingMealCheckedOut] = useState(true);

  const mealId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchMeal = async () => {
      const baseUrl: string = `http://localhost:8080/api/meals/${mealId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedMeal: MealModel = {
        id: responseJson.id,
        title: responseJson.title,
        description: responseJson.description,
        quantity: responseJson.copies,
        quantityAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setMeal(loadedMeal);
      setIsLoading(false);
    };
    fetchMeal().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut]);

  if (isLoading) {
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
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {meal?.img ? (
              <img src={meal?.img} width="226" height="349" alt="Meal" />
            ) : (
              <img
                src={require("./../../Images/MealsImages/potato-dinner.jpg")}
                width="226"
                height="349"
                alt="Meal"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{meal?.title}</h2>
              <p className="lead">{meal?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
