import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * This handler handles getting items to user's orders.
 * send GET Request at /api/user/order
 * */
 export const getOrdersHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const userOrders = schema.users.findBy({ _id: userId }).orders;
    return new Response(200, {}, { orders: userOrders });
  };



  
export const addOrderHandler = function (schema, request) {
    const userId = requiresAuth.call(this, request);
    try {
      if (!userId) {
        return new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
      }
      const userOrder = schema.users.findBy({ _id: userId }).orders;
      const { order } = JSON.parse(request.requestBody);
      userOrder.push({
        ...order,
        _id: uuid(),
        createdAt: formatDate(),
        updatedAt: formatDate(),
      });
      this.db.users.update({ _id: userId }, { orders: userOrder, cart:[] });
      return new Response(201, {}, { orders: userOrder });
    } catch (error) {
      return new Response(
        500,
        {},
        {
          error,
        }
      );
    }
  };
  