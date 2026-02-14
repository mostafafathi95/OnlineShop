import { Addresses, Cart, Orders } from "../../storage-base";
import type {
  Address, InsertAddress, CartItem, InsertCartItem, Product, Order, InsertOrder,
  OrderItem, InsertOrderItem
} from "@shared/schema";

export class OrderStorageAdapter {
  private addresses: Addresses;
  private cart: Cart;
  private orders: Orders;

  constructor() {
    this.addresses = new Addresses();
    this.cart = new Cart();
    this.orders = new Orders();
  }

  // Addresses
  async getUserAddresses(userId: string): Promise<Address[]> {
    return this.addresses.getUserAddresses(userId);
  }

  async getAddressById(id: number): Promise<Address | undefined> {
    return this.addresses.getAddressById(id);
  }

  async createAddress(address: InsertAddress): Promise<Address> {
    return this.addresses.createAddress(address);
  }

  async updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined> {
    return this.addresses.updateAddress(id, data);
  }

  async deleteAddress(id: number): Promise<void> {
    return this.addresses.deleteAddress(id);
  }

  async setDefaultAddress(userId: string, addressId: number): Promise<void> {
    return this.addresses.setDefaultAddress(userId, addressId);
  }

  // Cart
  async getUserCart(userId: string): Promise<(CartItem & { product: Product })[]> {
    return this.cart.getUserCart(userId);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    return this.cart.addToCart(item);
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    return this.cart.updateCartItem(id, quantity);
  }

  async removeFromCart(id: number): Promise<void> {
    return this.cart.removeFromCart(id);
  }

  async clearCart(userId: string): Promise<void> {
    return this.cart.clearCart(userId);
  }

  // Orders
  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orders.getUserOrders(userId);
  }

  async getAllOrders(options?: { status?: string; search?: string; limit?: number }): Promise<Order[]> {
    return this.orders.getAllOrders(options);
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.getOrderById(id);
  }

  async getOrderWithItems(id: number): Promise<(Order & { items: OrderItem[] }) | undefined> {
    return this.orders.getOrderWithItems(id);
  }

  async createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    return this.orders.createOrder(order, items);
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    return this.orders.updateOrderStatus(id, status);
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order | undefined> {
    return this.orders.updateOrder(id, data);
  }
}
