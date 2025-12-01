import { db } from "../db";
import { eq, desc, and, ilike } from "drizzle-orm";
import { orders, orderItems } from "@shared/schema";
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
    const [newOrder] = await db.insert(orders).values(order).returning();

    for (const item of items) {
      await db.insert(orderItems).values({ ...item, orderId: newOrder.id });
    }

    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }
}
