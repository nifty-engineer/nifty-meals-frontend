class IngredientModel {
  id: number;
  quantity?: number;
  unit?: string;
  description?: string;

  constructor(id: number, quantity: number, unit: string, description: string) {
    this.id = id;
    this.quantity = quantity;
    this.unit = unit;
    this.description = description;
  }
}

export default IngredientModel;
