import { useEffect, useState } from "react";
import MealModel from "../../../models/MealModel";
import { useAuth } from "../../../Auth/AuthContext";

export const ChangeQuantityOfMeal: React.FC<{
  meal: MealModel;
  deleteMeal: any;
}> = (props, key) => {
  const { authState } = useAuth();
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const fetchMealInState = () => {
      props.meal.count ? setRemaining(props.meal.count) : setRemaining(0);
    };
    fetchMealInState();
  }, []);

  async function increaseQuantity() {
    const url = `http://localhost:8080/api/admin/secure/increase/meal/quantity?mealId=${props.meal?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.token}`,
        "Content-Type": "application/json",
      },
    };

    const quantityUpdateResponse = await fetch(url, requestOptions);
    if (!quantityUpdateResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setRemaining(remaining + 1);
  }

  async function decreaseQuantity() {
    const url = `http://localhost:8080/api/admin/secure/decrease/meal/quantity?mealId=${props.meal?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.token}`,
        "Content-Type": "application/json",
      },
    };

    const quantityUpdateResponse = await fetch(url, requestOptions);
    if (!quantityUpdateResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setRemaining(remaining - 1);
  }

  async function deleteMeal() {
    const url = `http://localhost:8080/api/admin/secure/delete/meal?mealId=${props.meal?.id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authState?.token}`,
        "Content-Type": "application/json",
      },
    };

    const updateResponse = await fetch(url, requestOptions);
    if (!updateResponse.ok) {
      throw new Error("Something went wrong!");
    }
    props.deleteMeal();
  }

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.meal.img ? (
              <img src={props.meal.img} width="123" height="196" alt="Meal" />
            ) : (
              <img
                src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
                width="123"
                height="196"
                alt="Meal"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.meal.img ? (
              <img src={props.meal.img} width="123" height="196" alt="Meal" />
            ) : (
              <img
                src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
                width="123"
                height="196"
                alt="Meal"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.meal.title}</h5>
            <p className="card-text"> {props.meal.description} </p>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Meals Remaining: <b>{remaining}</b>
            </p>
          </div>
        </div>
        <div className="mt-3 col-md-1">
          <div className="d-flex justify-content-start">
            <button className="m-1 btn btn-md btn-danger" onClick={deleteMeal}>
              Delete
            </button>
          </div>
        </div>
        <button
          className="m1 btn btn-md main-color text-white"
          onClick={increaseQuantity}
        >
          Add Quantity
        </button>
        <button
          className="m1 btn btn-md btn-warning"
          onClick={decreaseQuantity}
        >
          Decrease Quantity
        </button>
      </div>
    </div>
  );
};
