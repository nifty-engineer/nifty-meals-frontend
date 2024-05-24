class ReviewModel {
  id: number;
  userEmail: string;
  date: string;
  rating: number;
  mealId: number;
  reviewDescription?: string;

  constructor(
    id: number,
    userEmail: string,
    date: string,
    rating: number,
    mealId: number,
    reviewDescription: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.date = date;
    this.rating = rating;
    this.mealId = mealId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
