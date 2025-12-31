import { db } from "../db";
import { eq, desc, and, ilike, gte, sql } from "drizzle-orm";
import { orders, orderItems, products } from "@shared/schema";
import type { Order, InsertOrder, OrderItem, InsertOrderItem } from "@shared/schema";

export class Orders {
  async getUserOrders(userId: string): Promise<Order[]> {
    return db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async getAllOrders(options?: { status?: string; search?: string; limit?: number }): Promise<Order[]> {
    let query = db.select().from(orders);
    const conditions = [];

    if (options?.status && options.status !== "all") {
      conditions.push(eq(orders.status, options.status as any));
    }

    if (options?.search) {
      conditions.push(ilike(orders.orderNumber, `%${options.search}%`));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    query = query.orderBy(desc(orders.createdAt)) as any;

    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }

    return query;
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderWithItems(id: number): Promise<(Order & { items: OrderItem[] }) | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return undefined;

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { ...order, items };
  }

  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    return db.transaction(async (tx) => {
      // 1. Create the main order record
      const [newOrder] = await tx.insert(orders).values(order).returning();

      // 2. Process each item in the order
      for (const item of items) {
        // 2a. Decrease the stock for the corresponding product
        const [updatedProduct] = await tx
          .update(products)
          .set({
            stock: sql`${products.stock} - ${item.quantity}`,
          })
          .where(and(
            eq(products.id, item.productId),
            gte(products.stock, item.quantity) // Ensure stock is sufficient
          ))
          .returning();

        // If the update returned nothing, it means the stock was insufficient.
        // The transaction will be rolled back.
        if (!updatedProduct) {
          throw new Error(`Insufficient stock for product ID: ${item.productId}`);
        }

        // 2b. Create the order item record
        await tx.insert(orderItems).values({ ...item, orderId: newOrder.id });
      }

      // 3. Return the newly created order
      return newOrder;
    });
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  // Generic update method for an order
  async updateOrder(id: number, data: Partial<Order>): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }
}
