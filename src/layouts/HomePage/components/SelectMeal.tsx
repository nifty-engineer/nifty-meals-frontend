import React from "react";
import { Link } from "react-router-dom";
import MealModel from "../../../models/MealModel";

export const SelectMeal: React.FC<{ meal: MealModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card text-center">
        {props.meal.img ? (
          <img
            className="card-img-top"
            src={props.meal.img}
            width="151"
            height="233"
            alt="meal"
          />
        ) : (
          <img
            src={require("./../../../Images/MealsImages/potato-dinner.jpg")}
            width="151"
            height="233"
            alt="meal"
          />
        )}
        <div className="card-body">
          <div className="card-title-equal-height">
            <h6 className="card-title mt-2">{props.meal.title}</h6>
          </div>
          <p className="card-text">{props.meal.category}</p>
        </div>
        <div className="blockquote">
          <Link
            className="btn main-color text-white"
            to={`/checkout/${props.meal.id}`}
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
};
