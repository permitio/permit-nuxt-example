import { retrieveOrders } from '../../utils/database';

export default defineEventHandler((_) => retrieveOrders());
