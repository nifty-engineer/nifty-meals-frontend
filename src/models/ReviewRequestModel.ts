class ReviewRequestModel {
  rating: number;
  mealId: number;
  reviewDescription?: string;

  constructor(rating: number, mealId: number, reviewDescription: string) {
    this.rating = rating;
    this.mealId = mealId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewRequestModel;
