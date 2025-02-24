export interface AddMealProps {
  name: string;
  price: number;
  vendor: string;
}

export interface Meal extends AddMealProps {
  id: string;
}

export interface MealInOrder extends Meal {
  quantity: number;
}

export interface AddOrderProps {
  meals: MealInOrder[];
  customer: string;
  vendor: string;
}

export interface Order {
  id: number;
  meals: MealInOrder[];
  deliveryFee: number;
  totalPrice: number;
  orderTime: string;
  grandTotal: number;
  vendor: string;
  customer: string;
  fulfilledTime?: string;
  riderAssignedTime?: string;
  admin?: string;
  deliveredTime?: string;
  rider?: string;
}

export interface UpdateUserRole {
  role: string;
  user: string;
  isGrant: boolean;
}