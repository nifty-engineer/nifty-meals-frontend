import { Link } from "react-router-dom";
import MealModel from "../../../models/MealModel";

export const SearchMeal: React.FC<{ meal: MealModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.meal.img ? (
              <img src={props.meal.img} width="123" height="196" alt="Meal" />
            ) : (
              <img
                src={require("../../../Images/MealsImages/potato-dinner.jpg")}
                width="123"
                height="196"
                alt="Meal"
              />
            )}
          </div>
          <div
            className="d-lg-none d-flex justify-content-center 
                        align-items-center"
          >
            {props.meal.img ? (
              <img src={props.meal.img} width="123" height="196" alt="Meal" />
            ) : (
              <img
                src={require("../../../Images/MealsImages/potato-dinner.jpg")}
                width="123"
                height="196"
                alt="Meal"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h4>{props.meal.title}</h4>
            <p className="card-text">{props.meal.description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link
            className="btn btn-md main-color text-white"
            to={`/checkout/${props.meal.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
