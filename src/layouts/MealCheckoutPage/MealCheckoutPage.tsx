import { useEffect, useState } from "react";
import MealModel from "../../models/MealModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useAuth } from "../../Auth/AuthContext";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { StarsReview } from "../Utils/StarsReview";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import { RecipeModal } from "./RecipeModal";

export const MealCheckoutPage = () => {
  const { authState, isAuthenticated } = useAuth();

  const [meal, setMeal] = useState<MealModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  // Checkouts Count State
  const [currentCheckoutsCount, setCurrentCheckoutsCount] = useState(0);
  const [isLoadingCurrentCheckoutsCount, setIsLoadingCurrentCheckoutsCount] =
    useState(true);

  // Is Meal Checked Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingMealCheckedOut, setIsLoadingMealCheckedOut] = useState(true);

  const mealId = window.location.pathname.split("/")[2];

  // Recipe Modal
  const [openModal, setOpenModal] = useState(false);

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
    const fetchMealReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByMealId?mealId=${mealId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          mealId: responseData[key].mealId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchMealReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [isReviewLeft]);

  useEffect(() => {
    const fetchUserReviewMeal = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/reviews/member/meal?mealId=${mealId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong");
        }
        const userReviewResponseJson = await userReview.json();
        setIsReviewLeft(userReviewResponseJson);
      }
      setIsLoadingUserReview(false);
    };
    fetchUserReviewMeal().catch((error: any) => {
      setIsLoadingUserReview(false);
      setHttpError(error.message);
    });
  }, [authState]);

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

  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCurrentCheckoutsCount ||
    isLoadingMealCheckedOut ||
    isLoadingUserReview
  ) {
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

  async function submitReview(starInput: number, reviewDescription: string) {
    let mealId: number = 0;
    if (meal?.id) {
      mealId = meal.id;
    }

    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      mealId,
      reviewDescription
    );
    const url = `http://localhost:8080/api/reviews/member`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
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
              <div className="view-recipe">
                <button
                  type="button"
                  className="btn main-color text-white"
                  onClick={() => setOpenModal(true)}
                >
                  View Recipe
                </button>
              </div>
              {openModal && (
                <RecipeModal mealId={mealId} closeModal={setOpenModal} />
              )}
              <br />
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            meal={meal}
            mobile={false}
            currentCheckoutsCount={currentCheckoutsCount}
            isAuthenticated={isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutMeal={checkoutMeal}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} mealId={meal?.id} mobile={false} />
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
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          meal={meal}
          mobile={true}
          currentCheckoutsCount={currentCheckoutsCount}
          isAuthenticated={isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkoutMeal={checkoutMeal}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} mealId={meal?.id} mobile={true} />
      </div>
    </div>
  );
};
