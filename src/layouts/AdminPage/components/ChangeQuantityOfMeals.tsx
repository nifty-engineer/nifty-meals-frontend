import React, { useEffect, useState } from "react";
import MealModel from "../../../models/MealModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { ChangeQuantityOfMeal } from "./ChangeQuantityOfMeal";

export const ChangeQuantityOfMeals = () => {
  const [meals, setMeals] = useState<MealModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(5);
  const [totalAmountOfMeals, setTotalAmountOfMeals] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [mealDelete, setMealDelete] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const baseUrl: string = `http://localhost:8080/api/meals?page=${
        currentPage - 1
      }&size=${mealsPerPage}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.meals;

      setTotalAmountOfMeals(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedMeals: MealModel[] = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          title: responseData[key].title,
          description: responseData[key].description,
          count: responseData[key].count,
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
  }, [currentPage, mealDelete]);

  const indexOfLastMeal: number = currentPage * mealsPerPage;
  const indexOfFirstMeal: number = indexOfLastMeal - mealsPerPage;
  let lastItem =
    mealsPerPage * currentPage <= totalAmountOfMeals
      ? mealsPerPage * currentPage
      : totalAmountOfMeals;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteMeal = () => setMealDelete(!mealDelete);

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
    <div className="container mt-5">
      {totalAmountOfMeals > 0 ? (
        <>
          <div className="mt-3">
            <h3>Number of results: ({totalAmountOfMeals})</h3>
          </div>
          <p>
            {indexOfFirstMeal + 1} to {lastItem} of {totalAmountOfMeals} items:
          </p>
          {meals.map((meal) => (
            <ChangeQuantityOfMeal
              meal={meal}
              key={meal.id}
              deleteMeal={deleteMeal}
            />
          ))}
        </>
      ) : (
        <h5>Add a meal before changing quantity</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
