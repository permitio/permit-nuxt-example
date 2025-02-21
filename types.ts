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
  city: string;
  meals: MealInOrder[];
  totalPrice: number;
  orderTime: string;
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
  city: string;
  isGrant: boolean;
}