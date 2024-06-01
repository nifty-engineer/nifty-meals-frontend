class AddMealRequest {
  title: string;
  description: string;
  count: number;
  category: string;
  img?: string;

  constructor(
    title: string,
    description: string,
    count: number,
    category: string
  ) {
    this.title = title;
    this.description = description;
    this.count = count;
    this.category = category;
  }
}

export default AddMealRequest;
