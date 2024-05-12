import React from "react";
import { Link } from "react-router-dom";
import MealModel from "../../../models/MealModel";

export const ReturnMeal: React.FC<{ meal: MealModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.meal.img ? (
          <img src={props.meal.img} width="151" height="233" alt="meal" />
        ) : (
          <img
            src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
            width="151"
            height="233"
            alt="meal"
          />
        )}
        <h6 className="mt-2">{props.meal.title}</h6>
        <p>{props.meal.category}</p>
        <Link
          className="btn main-color text-white"
          to={`/checkout/${props.meal.id}`}
        >
          Select
        </Link>
      </div>
    </div>
  );
};
