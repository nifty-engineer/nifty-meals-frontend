import { useAuth } from "../../Auth/AuthContext";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AddNewMeal } from "./components/AddNewMeal";
import { AdminMessages } from "./components/AdminMessages";
import { ChangeQuantityOfMeals } from "./components/ChangeQuantityOfMeals";

export const AdminPage = () => {
  const { authState, role } = useAuth();

  const [changeQuantityOfMealsClick, setChangeQuantityOfMealsClick] =
    useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  function addMealClickFunction() {
    setChangeQuantityOfMealsClick(false);
    setMessagesClick(false);
  }

  function changeQuantityOfMealsClickFunction() {
    setChangeQuantityOfMealsClick(true);
    setMessagesClick(false);
  }

  function messagesClickFunction() {
    setChangeQuantityOfMealsClick(false);
    setMessagesClick(true);
  }

  if (role !== "ADMIN") {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Member Services</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={addMealClickFunction}
              className="nav-link active"
              id="nav-add-meal-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-meal"
              type="button"
              role="tab"
              aria-controls="nav-add-meal"
              aria-selected="false"
            >
              Add New Meal
            </button>
            <button
              onClick={changeQuantityOfMealsClickFunction}
              className="nav-link"
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              type="button"
              role="tab"
              aria-controls="nav-quantity"
              aria-selected="true"
            >
              Change Quantity
            </button>
            <button
              onClick={messagesClickFunction}
              className="nav-link"
              id="nav-messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messages"
              type="button"
              role="tab"
              aria-controls="nav-messages"
              aria-selected="false"
            >
              Messages
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-add-meal"
            role="tabpanel"
            aria-labelledby="nav-add-meal-tab"
          >
            <AddNewMeal />
          </div>
          <div
            className="tab-pane fade"
            id="nav-quantity"
            role="tabpanel"
            aria-labelledby="nav-quantity-tab"
          >
            {changeQuantityOfMealsClick ? <ChangeQuantityOfMeals /> : <></>}
          </div>
          <div
            className="tab-pane fade"
            id="nav-messages"
            role="tabpanel"
            aria-labelledby="nav-messages-tab"
          >
            {messagesClick ? <AdminMessages /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};
