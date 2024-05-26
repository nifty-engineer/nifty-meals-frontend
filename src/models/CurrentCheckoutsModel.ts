import MealModel from "./MealModel";

class CurrentCheckoutsModel {
  meal: MealModel;
  daysSinceCheckout: number;

  constructor(meal: MealModel, daysSinceCheckout: number) {
    this.meal = meal;
    this.daysSinceCheckout = daysSinceCheckout;
  }
}

export default CurrentCheckoutsModel;
