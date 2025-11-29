import { db } from "./db";
import { eq, desc, asc, ilike, and, sql, lte } from "drizzle-orm";
import {
  users,
  categories,
  products,
  productImages,
  addresses,
  cartItems,
  orders,
  orderItems,
  reviews,
  wishlist,
  coupons,
  articles,
  news,
  pages,
  brands,
  productAttributes,
  shippingMethods,
  creditPoints,
  userWallets,
  userRequests,
  settings,
  questions,
  answers,
  sliders,
  banners,
  searchAnalytics,
  type User,
  type UpsertUser,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type ProductImage,
  type InsertProductImage,
  type Address,
  type InsertAddress,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type Review,
  type InsertReview,
  type Coupon,
  type InsertCoupon,
  type WishlistItem,
  type Article,
  type InsertArticle,
  type News,
  type InsertNews,
  type Page,
  type InsertPage,
  type Brand,
  type InsertBrand,
  type ProductAttribute,
  type InsertProductAttribute,
  type ShippingMethod,
  type InsertShippingMethod,
  type CreditPoint,
  type InsertCreditPoint,
  type UserWallet,
  type InsertUserWallet,
  type UserRequest,
  type InsertUserRequest,
  type Setting,
  type InsertSetting,
  type Question,
  type InsertQuestion,
  type Answer,
  type InsertAnswer,
  type Slider,
  type InsertSlider,
  type Banner,
  type InsertBanner,
  type SearchAnalytics,
  type InsertSearchAnalytics,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, data: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<void>;

  // Products
  getAllProducts(options?: { 
    search?: string; 
    category?: string; 
    featured?: boolean;
    lowStock?: boolean;
    limit?: number;
    sort?: string;
  }): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;

  // Product Images
  getProductImages(productId: number): Promise<ProductImage[]>;
  addProductImage(image: InsertProductImage): Promise<ProductImage>;
  deleteProductImage(id: number): Promise<void>;

  // Reviews
  getProductReviews(productId: number): Promise<Review[]>;
  getUserReviews(userId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number): Promise<void>;
  updateReviewHelpfulness(id: number, helpful: number, unhelpful: number): Promise<void>;

  // Wishlist
  getUserWishlist(userId: string): Promise<(WishlistItem & { product: Product })[]>;
  addToWishlist(userId: string, productId: number): Promise<WishlistItem>;
  removeFromWishlist(userId: string, productId: number): Promise<void>;
  isInWishlist(userId: string, productId: number): Promise<boolean>;

  // Coupons
  getAllCoupons(options?: { active?: boolean }): Promise<Coupon[]>;
  getCouponByCode(code: string): Promise<Coupon | undefined>;
  createCoupon(coupon: InsertCoupon): Promise<Coupon>;
  updateCoupon(id: number, data: Partial<InsertCoupon>): Promise<Coupon | undefined>;
  deleteCoupon(id: number): Promise<void>;
  incrementCouponUses(code: string): Promise<void>;

  // Addresses
  getUserAddresses(userId: string): Promise<Address[]>;
  getAddressById(id: number): Promise<Address | undefined>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined>;
  deleteAddress(id: number): Promise<void>;
  setDefaultAddress(userId: string, addressId: number): Promise<void>;

  // Cart
  getUserCart(userId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(userId: string): Promise<void>;

  // Orders
  getUserOrders(userId: string): Promise<Order[]>;
  getAllOrders(options?: { status?: string; search?: string; limit?: number }): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrderWithItems(id: number): Promise<(Order & { items: OrderItem[] }) | undefined>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Product Comparisons
  getComparison(sessionId: string): Promise<any[]>;
  addToComparison(sessionId: string, product1Id: number, product2Id: number): Promise<any>;
  removeFromComparison(sessionId: string, product1Id: number, product2Id: number): Promise<void>;

  // Articles
  getAllArticles(options?: { published?: boolean; limit?: number }): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<void>;

  // News
  getAllNews(options?: { published?: boolean; limit?: number }): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, data: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<void>;

  // Pages
  getAllPages(options?: { published?: boolean }): Promise<Page[]>;
  getPageById(id: number): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<void>;

  // Brands
  getAllBrands(options?: { active?: boolean }): Promise<Brand[]>;
  getBrandById(id: number): Promise<Brand | undefined>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  updateBrand(id: number, data: Partial<InsertBrand>): Promise<Brand | undefined>;
  deleteBrand(id: number): Promise<void>;

  // Product Attributes
  getProductAttributes(productId: number): Promise<ProductAttribute[]>;
  createProductAttribute(attr: InsertProductAttribute): Promise<ProductAttribute>;
  updateProductAttribute(id: number, data: Partial<InsertProductAttribute>): Promise<ProductAttribute | undefined>;
  deleteProductAttribute(id: number): Promise<void>;

  // Shipping Methods
  getAllShippingMethods(options?: { active?: boolean }): Promise<ShippingMethod[]>;
  getShippingMethodById(id: number): Promise<ShippingMethod | undefined>;
  createShippingMethod(method: InsertShippingMethod): Promise<ShippingMethod>;
  updateShippingMethod(id: number, data: Partial<InsertShippingMethod>): Promise<ShippingMethod | undefined>;
  deleteShippingMethod(id: number): Promise<void>;

  // Credit Points
  getUserCreditPoints(userId: string): Promise<CreditPoint[]>;
  getTotalCreditPoints(userId: string): Promise<number>;
  addCreditPoints(creditPoint: InsertCreditPoint): Promise<CreditPoint>;
  removeCreditPoints(id: number): Promise<void>;

  // User Wallets
  getUserWallet(userId: string): Promise<UserWallet | undefined>;
  createUserWallet(wallet: InsertUserWallet): Promise<UserWallet>;
  updateWalletBalance(userId: string, balance: string): Promise<UserWallet | undefined>;

  // User Requests
  getUserRequests(userId: string): Promise<UserRequest[]>;
  getAllUserRequests(options?: { status?: string }): Promise<UserRequest[]>;
  getUserRequestById(id: number): Promise<UserRequest | undefined>;
  createUserRequest(request: InsertUserRequest): Promise<UserRequest>;
  updateUserRequest(id: number, data: Partial<InsertUserRequest>): Promise<UserRequest | undefined>;
  deleteUserRequest(id: number): Promise<void>;

  // Settings
  getAllSettings(): Promise<Setting[]>;
  getSettingByKey(key: string): Promise<Setting | undefined>;
  createSetting(setting: InsertSetting): Promise<Setting>;
  updateSetting(key: string, value: string): Promise<Setting | undefined>;

  // Questions
  getProductQuestions(productId: number): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | undefined>;
  deleteQuestion(id: number): Promise<void>;

  // Answers
  getQuestionAnswers(questionId: number): Promise<Answer[]>;
  getAnswerById(id: number): Promise<Answer | undefined>;
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  updateAnswer(id: number, data: Partial<InsertAnswer>): Promise<Answer | undefined>;
  deleteAnswer(id: number): Promise<void>;

  // Stats
  getStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return db.select().from(categories).orderBy(asc(categories.sortOrder));
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async updateCategory(id: number, data: Partial<InsertCategory>): Promise<Category | undefined> {
    const [category] = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }

  // Products
  async getAllProducts(options?: {
    search?: string;
    category?: string;
    featured?: boolean;
    lowStock?: boolean;
    limit?: number;
    sort?: string;
  }): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];

    if (options?.search) {
      conditions.push(ilike(products.name, `%${options.search}%`));
    }

    if (options?.featured) {
      conditions.push(eq(products.isFeatured, true));
    }

    if (options?.lowStock) {
      conditions.push(lte(products.stock, 10));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    let orderBy;
    switch (options?.sort) {
      case "price-asc":
        orderBy = asc(products.price);
        break;
      case "price-desc":
        orderBy = desc(products.price);
        break;
      case "popular":
      case "newest":
      default:
        orderBy = desc(products.createdAt);
    }

    query = query.orderBy(orderBy) as any;

    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }

    return query;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Product Images
  async getProductImages(productId: number): Promise<ProductImage[]> {
    return db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .orderBy(asc(productImages.sortOrder));
  }

  async addProductImage(image: InsertProductImage): Promise<ProductImage> {
    const [newImage] = await db.insert(productImages).values(image).returning();
    return newImage;
  }

  async deleteProductImage(id: number): Promise<void> {
    await db.delete(productImages).where(eq(productImages.id, id));
  }

  // Reviews
  async getProductReviews(productId: number): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)))
      .orderBy(desc(reviews.createdAt));
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  async updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();
    return review;
  }

  async deleteReview(id: number): Promise<void> {
    await db.delete(reviews).where(eq(reviews.id, id));
  }

  async updateReviewHelpfulness(id: number, helpful: number, unhelpful: number): Promise<void> {
    await db
      .update(reviews)
      .set({ helpful, unhelpful })
      .where(eq(reviews.id, id));
  }

  // Wishlist
  async getUserWishlist(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    const items = await db
      .select({
        wishlistItem: wishlist,
        product: products,
      })
      .from(wishlist)
      .innerJoin(products, eq(wishlist.productId, products.id))
      .where(eq(wishlist.userId, userId));

    return items.map((item) => ({
      ...item.wishlistItem,
      product: item.product,
    }));
  }

  async addToWishlist(userId: string, productId: number): Promise<WishlistItem> {
    const [item] = await db
      .insert(wishlist)
      .values({ userId, productId })
      .returning();
    return item;
  }

  async removeFromWishlist(userId: string, productId: number): Promise<void> {
    await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)));
  }

  async isInWishlist(userId: string, productId: number): Promise<boolean> {
    const [item] = await db
      .select()
      .from(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)))
      .limit(1);
    return !!item;
  }

  // Coupons
  async getAllCoupons(options?: { active?: boolean }): Promise<Coupon[]> {
    let query = db.select().from(coupons);
    if (options?.active) {
      query = query.where(eq(coupons.isActive, true)) as any;
    }
    return query.orderBy(desc(coupons.createdAt)) as any;
  }

  async getCouponByCode(code: string): Promise<Coupon | undefined> {
    const [coupon] = await db
      .select()
      .from(coupons)
      .where(and(eq(coupons.code, code), eq(coupons.isActive, true)));
    
    if (!coupon) return undefined;

    // Check if coupon is expired or max uses reached
    const now = new Date();
    if (coupon.startDate && coupon.startDate > now) return undefined;
    if (coupon.endDate && coupon.endDate < now) return undefined;
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) return undefined;

    return coupon;
  }

  async createCoupon(coupon: InsertCoupon): Promise<Coupon> {
    const [newCoupon] = await db.insert(coupons).values(coupon).returning();
    return newCoupon;
  }

  async updateCoupon(id: number, data: Partial<InsertCoupon>): Promise<Coupon | undefined> {
    const [coupon] = await db
      .update(coupons)
      .set(data)
      .where(eq(coupons.id, id))
      .returning();
    return coupon;
  }

  async deleteCoupon(id: number): Promise<void> {
    await db.delete(coupons).where(eq(coupons.id, id));
  }

  async incrementCouponUses(code: string): Promise<void> {
    await db
      .update(coupons)
      .set({ currentUses: sql`${coupons.currentUses} + 1` })
      .where(eq(coupons.code, code));
  }

  // Addresses
  async getUserAddresses(userId: string): Promise<Address[]> {
    return db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, userId))
      .orderBy(desc(addresses.isDefault));
  }

  async getAddressById(id: number): Promise<Address | undefined> {
    const [address] = await db.select().from(addresses).where(eq(addresses.id, id));
    return address;
  }

  async createAddress(address: InsertAddress): Promise<Address> {
    const [newAddress] = await db.insert(addresses).values(address).returning();
    return newAddress;
  }

  async updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined> {
    const [address] = await db
      .update(addresses)
      .set(data)
      .where(eq(addresses.id, id))
      .returning();
    return address;
  }

  async deleteAddress(id: number): Promise<void> {
    await db.delete(addresses).where(eq(addresses.id, id));
  }

  async setDefaultAddress(userId: string, addressId: number): Promise<void> {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
    await db
      .update(addresses)
      .set({ isDefault: true })
      .where(eq(addresses.id, addressId));
  }

  // Cart
  async getUserCart(userId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select({
        cartItem: cartItems,
        product: products,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));

    return items.map((item) => ({
      ...item.cartItem,
      product: item.product,
    }));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existing = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, item.userId), eq(cartItems.productId, item.productId)));

    if (existing.length > 0) {
      const [updated] = await db
        .update(cartItems)
        .set({ quantity: existing[0].quantity + (item.quantity || 1), updatedAt: new Date() })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return updated;
    }

    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const [item] = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, id))
      .returning();
    return item;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(userId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
  }

  // Orders
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

  // Get all reviews (for admin)
  async getAllReviews(): Promise<Review[]> {
    return db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  // Stats
  async getStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
  }> {
    const [productCount] = await db.select({ count: sql<number>`count(*)` }).from(products);
    const [orderCount] = await db.select({ count: sql<number>`count(*)` }).from(orders);
    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [revenue] = await db
      .select({ total: sql<number>`coalesce(sum(${orders.total}::numeric), 0)` })
      .from(orders)
      .where(eq(orders.status, "delivered"));

    return {
      totalProducts: Number(productCount.count) || 0,
      totalOrders: Number(orderCount.count) || 0,
      totalUsers: Number(userCount.count) || 0,
      totalRevenue: Number(revenue.total) || 0,
    };
  }

  // Product Comparisons
  async getComparison(sessionId: string): Promise<any[]> {
    return db.select().from(wishlist).where(eq(wishlist.userId, sessionId)).limit(4);
  }

  async addToComparison(sessionId: string, product1Id: number, product2Id: number): Promise<any> {
    const [result] = await db.insert(wishlist).values({
      userId: sessionId,
      productId: product1Id,
    }).returning();
    return result;
  }

  async removeFromComparison(sessionId: string, product1Id: number, product2Id: number): Promise<void> {
    await db.delete(wishlist).where(and(eq(wishlist.userId, sessionId), eq(wishlist.productId, product1Id)));
  }

  // Articles
  async getAllArticles(options?: { published?: boolean; limit?: number }): Promise<Article[]> {
    let query = db.select().from(articles);
    if (options?.published) {
      query = query.where(eq(articles.isPublished, true)) as any;
    }
    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }
    return (query.orderBy(desc(articles.createdAt)) as any);
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  async updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined> {
    const [updated] = await db.update(articles).set({ ...data, updatedAt: new Date() }).where(eq(articles.id, id)).returning();
    return updated;
  }

  async deleteArticle(id: number): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  // News
  async getAllNews(options?: { published?: boolean; limit?: number }): Promise<News[]> {
    let query = db.select().from(news);
    if (options?.published) {
      query = query.where(eq(news.isPublished, true)) as any;
    }
    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }
    return (query.orderBy(desc(news.createdAt)) as any);
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem;
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.slug, slug));
    return newsItem;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [newNews] = await db.insert(news).values(newsItem).returning();
    return newNews;
  }

  async updateNews(id: number, data: Partial<InsertNews>): Promise<News | undefined> {
    const [updated] = await db.update(news).set({ ...data, updatedAt: new Date() }).where(eq(news.id, id)).returning();
    return updated;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  // Pages
  async getAllPages(options?: { published?: boolean }): Promise<Page[]> {
    let query = db.select().from(pages);
    if (options?.published) {
      query = query.where(eq(pages.isPublished, true)) as any;
    }
    return (query.orderBy(asc(pages.title)) as any);
  }

  async getPageById(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined> {
    const [updated] = await db.update(pages).set({ ...data, updatedAt: new Date() }).where(eq(pages.id, id)).returning();
    return updated;
  }

  async deletePage(id: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Brands
  async getAllBrands(options?: { active?: boolean }): Promise<Brand[]> {
    let query = db.select().from(brands);
    if (options?.active) {
      query = query.where(eq(brands.isActive, true)) as any;
    }
    return (query.orderBy(asc(brands.name)) as any);
  }

  async getBrandById(id: number): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id));
    return brand;
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    const [newBrand] = await db.insert(brands).values(brand).returning();
    return newBrand;
  }

  async updateBrand(id: number, data: Partial<InsertBrand>): Promise<Brand | undefined> {
    const [updated] = await db.update(brands).set(data).where(eq(brands.id, id)).returning();
    return updated;
  }

  async deleteBrand(id: number): Promise<void> {
    await db.delete(brands).where(eq(brands.id, id));
  }

  // Product Attributes
  async getProductAttributes(productId: number): Promise<ProductAttribute[]> {
    return db.select().from(productAttributes).where(eq(productAttributes.productId, productId)).orderBy(asc(productAttributes.sortOrder));
  }

  async createProductAttribute(attr: InsertProductAttribute): Promise<ProductAttribute> {
    const [newAttr] = await db.insert(productAttributes).values(attr).returning();
    return newAttr;
  }

  async updateProductAttribute(id: number, data: Partial<InsertProductAttribute>): Promise<ProductAttribute | undefined> {
    const [updated] = await db.update(productAttributes).set(data).where(eq(productAttributes.id, id)).returning();
    return updated;
  }

  async deleteProductAttribute(id: number): Promise<void> {
    await db.delete(productAttributes).where(eq(productAttributes.id, id));
  }

  // Shipping Methods
  async getAllShippingMethods(options?: { active?: boolean }): Promise<ShippingMethod[]> {
    let query = db.select().from(shippingMethods);
    if (options?.active) {
      query = query.where(eq(shippingMethods.isActive, true)) as any;
    }
    return (query as any);
  }

  async getShippingMethodById(id: number): Promise<ShippingMethod | undefined> {
    const [method] = await db.select().from(shippingMethods).where(eq(shippingMethods.id, id));
    return method;
  }

  async createShippingMethod(method: InsertShippingMethod): Promise<ShippingMethod> {
    const [newMethod] = await db.insert(shippingMethods).values(method).returning();
    return newMethod;
  }

  async updateShippingMethod(id: number, data: Partial<InsertShippingMethod>): Promise<ShippingMethod | undefined> {
    const [updated] = await db.update(shippingMethods).set(data).where(eq(shippingMethods.id, id)).returning();
    return updated;
  }

  async deleteShippingMethod(id: number): Promise<void> {
    await db.delete(shippingMethods).where(eq(shippingMethods.id, id));
  }

  // Credit Points
  async getUserCreditPoints(userId: string): Promise<CreditPoint[]> {
    return db.select().from(creditPoints).where(eq(creditPoints.userId, userId)).orderBy(desc(creditPoints.createdAt));
  }

  async getTotalCreditPoints(userId: string): Promise<number> {
    const [result] = await db.select({ total: sql<number>`coalesce(sum(${creditPoints.points}::numeric), 0)` }).from(creditPoints).where(eq(creditPoints.userId, userId));
    return Number(result?.total) || 0;
  }

  async addCreditPoints(creditPoint: InsertCreditPoint): Promise<CreditPoint> {
    const [newPoint] = await db.insert(creditPoints).values(creditPoint).returning();
    return newPoint;
  }

  async removeCreditPoints(id: number): Promise<void> {
    await db.delete(creditPoints).where(eq(creditPoints.id, id));
  }

  // User Wallets
  async getUserWallet(userId: string): Promise<UserWallet | undefined> {
    const [wallet] = await db.select().from(userWallets).where(eq(userWallets.userId, userId));
    return wallet;
  }

  async createUserWallet(wallet: InsertUserWallet): Promise<UserWallet> {
    const [newWallet] = await db.insert(userWallets).values(wallet).returning();
    return newWallet;
  }

  async updateWalletBalance(userId: string, balance: string): Promise<UserWallet | undefined> {
    const [updated] = await db.update(userWallets).set({ balance, updatedAt: new Date() }).where(eq(userWallets.userId, userId)).returning();
    return updated;
  }

  // User Requests
  async getUserRequests(userId: string): Promise<UserRequest[]> {
    return db.select().from(userRequests).where(eq(userRequests.userId, userId)).orderBy(desc(userRequests.createdAt));
  }

  async getAllUserRequests(options?: { status?: string }): Promise<UserRequest[]> {
    let query = db.select().from(userRequests);
    if (options?.status) {
      query = query.where(eq(userRequests.status, options.status as any)) as any;
    }
    return (query.orderBy(desc(userRequests.createdAt)) as any);
  }

  async getUserRequestById(id: number): Promise<UserRequest | undefined> {
    const [request] = await db.select().from(userRequests).where(eq(userRequests.id, id));
    return request;
  }

  async createUserRequest(request: InsertUserRequest): Promise<UserRequest> {
    const [newRequest] = await db.insert(userRequests).values(request).returning();
    return newRequest;
  }

  async updateUserRequest(id: number, data: Partial<InsertUserRequest>): Promise<UserRequest | undefined> {
    const [updated] = await db.update(userRequests).set({ ...data, updatedAt: new Date() }).where(eq(userRequests.id, id)).returning();
    return updated;
  }

  async deleteUserRequest(id: number): Promise<void> {
    await db.delete(userRequests).where(eq(userRequests.id, id));
  }

  // Settings
  async getAllSettings(): Promise<Setting[]> {
    return db.select().from(settings);
  }

  async getSettingByKey(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async createSetting(setting: InsertSetting): Promise<Setting> {
    const [newSetting] = await db.insert(settings).values(setting).returning();
    return newSetting;
  }

  async updateSetting(key: string, value: string): Promise<Setting | undefined> {
    const [updated] = await db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key)).returning();
    return updated;
  }

  // Questions
  async getProductQuestions(productId: number): Promise<Question[]> {
    return db.select().from(questions).where(eq(questions.productId, productId)).orderBy(desc(questions.createdAt));
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }

  async updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | undefined> {
    const [updated] = await db.update(questions).set(data).where(eq(questions.id, id)).returning();
    return updated;
  }

  async deleteQuestion(id: number): Promise<void> {
    await db.delete(questions).where(eq(questions.id, id));
  }

  // Answers
  async getQuestionAnswers(questionId: number): Promise<Answer[]> {
    return db.select().from(answers).where(eq(answers.questionId, questionId)).orderBy(asc(answers.createdAt));
  }

  async getAnswerById(id: number): Promise<Answer | undefined> {
    const [answer] = await db.select().from(answers).where(eq(answers.id, id));
    return answer;
  }

  async createAnswer(answer: InsertAnswer): Promise<Answer> {
    const [newAnswer] = await db.insert(answers).values(answer).returning();
    return newAnswer;
  }

  async updateAnswer(id: number, data: Partial<InsertAnswer>): Promise<Answer | undefined> {
    const [updated] = await db.update(answers).set(data).where(eq(answers.id, id)).returning();
    return updated;
  }

  async deleteAnswer(id: number): Promise<void> {
    await db.delete(answers).where(eq(answers.id, id));
  }

  // Sliders
  async getAllSliders(): Promise<Slider[]> {
    return db.select().from(sliders).orderBy(asc(sliders.sortOrder));
  }

  async getSliderById(id: number): Promise<Slider | undefined> {
    const [slider] = await db.select().from(sliders).where(eq(sliders.id, id));
    return slider;
  }

  async getSliderBySlug(slug: string): Promise<Slider | undefined> {
    const [slider] = await db.select().from(sliders).where(eq(sliders.slug, slug));
    return slider;
  }

  async getActiveSliders(): Promise<Slider[]> {
    const now = new Date();
    return db.select().from(sliders).where(
      and(
        eq(sliders.isActive, true),
        sql`${sliders.startDate} <= ${now}`,
        sql`${sliders.endDate} >= ${now}`
      )
    ).orderBy(asc(sliders.sortOrder));
  }

  async createSlider(slider: InsertSlider): Promise<Slider> {
    const [newSlider] = await db.insert(sliders).values(slider).returning();
    return newSlider;
  }

  async updateSlider(id: number, data: Partial<InsertSlider>): Promise<Slider | undefined> {
    const [updated] = await db.update(sliders).set({ ...data, updatedAt: new Date() }).where(eq(sliders.id, id)).returning();
    return updated;
  }

  async deleteSlider(id: number): Promise<void> {
    await db.delete(sliders).where(eq(sliders.id, id));
  }

  // Banners
  async getAllBanners(): Promise<Banner[]> {
    return db.select().from(banners).where(eq(banners.isActive, true)).orderBy(asc(banners.sortOrder));
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    const [banner] = await db.select().from(banners).where(eq(banners.id, id));
    return banner;
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const [newBanner] = await db.insert(banners).values(banner).returning();
    return newBanner;
  }

  async updateBanner(id: number, data: Partial<InsertBanner>): Promise<Banner | undefined> {
    const [updated] = await db.update(banners).set({ ...data, updatedAt: new Date() }).where(eq(banners.id, id)).returning();
    return updated;
  }

  async deleteBanner(id: number): Promise<void> {
    await db.delete(banners).where(eq(banners.id, id));
  }

  async getAllBannersAdmin(): Promise<Banner[]> {
    return db.select().from(banners).orderBy(desc(banners.createdAt));
  }

  // Search Analytics
  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    return db.select().from(products).where(
      and(
        eq(products.isActive, true),
        sql`LOWER(${products.name}) LIKE ${searchTerm} OR LOWER(${products.description}) LIKE ${searchTerm}`
      )
    );
  }

  async getProductFilters(categoryId?: number): Promise<{ brands: any[], priceRange: any[] }> {
    const where = categoryId ? eq(products.categoryId, categoryId) : undefined;
    const prods = await db.select().from(products).where(where || eq(products.isActive, true));
    
    const brands = [...new Set(prods.map(p => p.name?.split(' ')[0]).filter(Boolean))];
    const prices = prods.map(p => parseInt(p.price as any) || 0).sort((a, b) => a - b);
    
    return {
      brands: brands.slice(0, 10),
      priceRange: prices.length > 0 ? [prices[0], prices[prices.length - 1]] : [0, 0]
    };
  }

  async trackSearch(analytics: InsertSearchAnalytics): Promise<SearchAnalytics> {
    const [newAnalytic] = await db.insert(searchAnalytics).values(analytics).returning();
    return newAnalytic;
  }

  async getPopularSearches(limit: number = 10): Promise<{ query: string, count: number }[]> {
    const results = await db.select({
      query: searchAnalytics.query,
      count: sql<number>`COUNT(*)`
    }).from(searchAnalytics).groupBy(searchAnalytics.query).orderBy(sql`COUNT(*) DESC`).limit(limit);
    return results;
  }

  async getZeroResultSearches(limit: number = 5): Promise<SearchAnalytics[]> {
    return db.select().from(searchAnalytics).where(eq(searchAnalytics.isZeroResult, true)).limit(limit);
  }
}

export const storage = new DatabaseStorage();
