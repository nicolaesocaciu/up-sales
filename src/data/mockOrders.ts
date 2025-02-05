import { Order } from "@/types/order";
import { baseOrders } from "./baseOrders";
import { generateAdditionalOrders } from "./generateAdditionalOrders";

const additionalOrders = generateAdditionalOrders(30);

export const mockOrders: Order[] = [...baseOrders, ...additionalOrders];