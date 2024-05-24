import { Link } from "react-router-dom";
import MealModel from "../../models/MealModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
  meal: MealModel | undefined;
  mobile: boolean;
  currentCheckoutsCount: number;
  isAuthenticated: any;
  isCheckedOut: boolean;
  checkoutMeal: any;
  isReviewLeft: boolean;
  submitReview: any;
}> = (props) => {
  function buttonRender() {
    if (props.isAuthenticated) {
      if (!props.isCheckedOut && props.currentCheckoutsCount < 10) {
        return (
          <button
            onClick={() => props.checkoutMeal()}
            className="btn btn-success btn-lg"
          >
            Checkout
          </button>
        );
      } else if (props.isCheckedOut) {
        return (
          <p>
            <b>Meal checked out. Enjoy!</b>
          </p>
        );
      } else if (!props.isCheckedOut) {
        return (
          <p className="text-danger">
            No more than ten meals can be selected for the upcoming week.
          </p>
        );
      }
    }
    return (
      <Link to={"/login"} className="btn btn-success btn-lg">
        Login
      </Link>
    );
  }

  function mealAvailability() {
    if (props?.meal?.count && props.meal.count > 5) {
      return (
        <div>
          <h4 className="text-success">Available</h4>
        </div>
      );
    } else if (props?.meal?.count && props.meal.count > 0) {
      return (
        <div>
          <h4 className="text-warning">Limited</h4>
          <div className="row">
            <p className="col-6 lead">
              <b>{props.meal?.count}</b>
              <span> remaining</span>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4 className="text-danger">Not Available</h4>
          <div className="row">
            <p className="col-6 lead">
              <b>Please check back later</b>
            </p>
          </div>
        </div>
      );
    }
  }

  function reviewRender() {
    if (props.isAuthenticated && !props.isReviewLeft) {
      return (
        <p>
          <LeaveAReview submitReview={props.submitReview} />
        </p>
      );
    } else if (props.isAuthenticated && props.isReviewLeft) {
      return (
        <p>
          <b>Thank you for your review!</b>
        </p>
      );
    }
    return (
      <div>
        <p>Login to be able to leave a review.</p>
      </div>
    );
  }

  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{props.currentCheckoutsCount} </b>
            <span>
              meal{props.currentCheckoutsCount <= 1 ? "" : "s"} checked out
            </span>
            <p>
              You can checkout {10 - props.currentCheckoutsCount} more meals for
              the upcoming week
            </p>
          </p>
          <hr />
          {mealAvailability()}
        </div>
        {buttonRender()}
        <hr />
        {reviewRender()}
      </div>
    </div>
  );
};
