class MealModel {
  id: number;
  title: string;
  description?: string;
  count?: number;
  category?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    description: string,
    count: number,
    category: string,
    img: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.count = count;
    this.category = category;
    this.img = img;
  }
}

export default MealModel;
