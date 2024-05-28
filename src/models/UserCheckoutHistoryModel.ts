class UserCheckoutHistoryModel {
  id: number;
  userEmail: string;
  checkoutDate: string;
  title: string;
  description: string;
  img: string;

  constructor(
    id: number,
    userEmail: string,
    checkoutDate: string,
    title: string,
    description: string,
    img: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.checkoutDate = checkoutDate;
    this.title = title;
    this.description = description;
    this.img = img;
  }
}

export default UserCheckoutHistoryModel;
