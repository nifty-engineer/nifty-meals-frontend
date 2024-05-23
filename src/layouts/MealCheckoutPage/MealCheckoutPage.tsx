import { useEffect, useState } from "react";
import MealModel from "../../models/MealModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useAuth } from "../../Auth/AuthContext";
import { CheckoutBox } from "./CheckoutBox";

export const MealCheckoutPage = () => {
  const { authState, isAuthenticated } = useAuth();

  console.log("MealCheckOutPage: " + isAuthenticated);

  const [meal, setMeal] = useState<MealModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Checkouts Count State
  const [currentCheckoutsCount, setCurrentCheckoutsCount] = useState(0);
  const [isLoadingCurrentCheckoutsCount, setIsLoadingCurrentCheckoutsCount] =
    useState(true);

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
        count: responseJson.count,
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

  useEffect(() => {
    const fetchUserCurrentCheckoutsCount = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/meals/member/currentcheckouts/count`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        };
        const currentCheckoutsCountResponse = await fetch(url, requestOptions);
        if (!currentCheckoutsCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentCheckoutsCountResponseJson =
          await currentCheckoutsCountResponse.json();
        setCurrentCheckoutsCount(currentCheckoutsCountResponseJson);
      }
      setIsLoadingCurrentCheckoutsCount(false);
    };
    fetchUserCurrentCheckoutsCount().catch((error: any) => {
      setIsLoadingCurrentCheckoutsCount(false);
      setHttpError(error.message);
    });
  }, [authState, isCheckedOut]);

  useEffect(() => {
    const fetchUserCheckedOutMeal = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/meals/member/ischeckedout/byuser?mealId=${mealId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        };
        const mealCheckedOut = await fetch(url, requestOptions);

        if (!mealCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const mealCheckedOutResponseJson = await mealCheckedOut.json();
        setIsCheckedOut(mealCheckedOutResponseJson);
      }
      setIsLoadingMealCheckedOut(false);
    };
    fetchUserCheckedOutMeal().catch((error: any) => {
      setIsLoadingMealCheckedOut(false);
      setHttpError(error.message);
    });
  }, [authState]);

  if (isLoading || isLoadingCurrentCheckoutsCount || isLoadingMealCheckedOut) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutMeal() {
    const url = `http://localhost:8080/api/meals/member/checkout?mealId=${meal?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.token}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsCheckedOut(true);
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
          <CheckoutBox
            meal={meal}
            mobile={false}
            currentCheckoutsCount={currentCheckoutsCount}
            isAuthenticated={isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutMeal={checkoutMeal}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center alighn-items-center">
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
        <div className="mt-4">
          <div className="ml-2">
            <h2>{meal?.title}</h2>
            <p className="lead">{meal?.description}</p>
          </div>
        </div>
        <CheckoutBox
          meal={meal}
          mobile={true}
          currentCheckoutsCount={currentCheckoutsCount}
          isAuthenticated={isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkoutMeal={checkoutMeal}
        />
        <hr />
      </div>
    </div>
  );
};
