import { useEffect, useState } from "react";
import MealModel from "../../../models/MealModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnMeal } from "./ReturnMeal";

export const Carousel = () => {
  const [meals, setMeals] = useState<MealModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const baseUrl: string = "http://localhost:8080/api/meals";

      const url: string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.meals;

      const loadedMeals: MealModel[] = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          title: responseData[key].title,
          description: responseData[key].description,
          quantity: responseData[key].quantity,
          quantityAvailable: responseData[key].quantityAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

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

  const breakfastMeals = meals.filter((meal) => meal.category === "breakfast");
  const lunchMeals = meals.filter((meal) => meal.category === "lunch");
  const dinnerMeals = meals.filter((meal) => meal.category === "dinner");
  const mealsByCategory = [];

  for (let i = 0; i < 3; i++) {
    mealsByCategory.push(breakfastMeals[i], lunchMeals[i], dinnerMeals[i]);
  }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I can't get enough of this" meal.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
                d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-start">
              {mealsByCategory.slice(0, 3).map((meal) => (
                <ReturnMeal meal={meal} key={meal.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-start">
              {mealsByCategory.slice(3, 6).map((meal) => (
                <ReturnMeal meal={meal} key={meal.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-start">
              {mealsByCategory.slice(6, 9).map((meal) => (
                <ReturnMeal meal={meal} key={meal.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnMeal meal={meals[7]} key={meals[7].id} />
        </div>
      </div>
    </div>
  );
};
