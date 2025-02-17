import { retrieveMeals } from '../utils/database';

export default defineEventHandler((_) => retrieveMeals());
