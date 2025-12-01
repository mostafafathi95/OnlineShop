import type {
  User, UpsertUser, Category, InsertCategory,
  Product, InsertProduct, ProductImage, InsertProductImage,
  Address, InsertAddress, CartItem, InsertCartItem,
  Order, InsertOrder, OrderItem, InsertOrderItem,
  Review, InsertReview, Coupon, InsertCoupon,
  WishlistItem, Article, InsertArticle,
  News, InsertNews, Page, InsertPage,
  Brand, InsertBrand, ProductAttribute, InsertProductAttribute,
  ShippingMethod, InsertShippingMethod, CreditPoint, InsertCreditPoint,
  UserWallet, InsertUserWallet, UserRequest, InsertUserRequest,
  Setting, InsertSetting, Question, InsertQuestion,
  Answer, InsertAnswer, Slider, InsertSlider,
  Banner, InsertBanner, LandingPageSection, InsertLandingPageSection,
  SearchAnalytics, InsertSearchAnalytics
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
