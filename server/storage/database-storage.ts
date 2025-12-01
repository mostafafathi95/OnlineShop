import type { IStorage } from "../storage-interface";
import {
  AuthStorageAdapter, ProductStorageAdapter, ReviewStorageAdapter,
  CommerceStorageAdapter, OrderStorageAdapter, ContentStorageAdapter,
  CatalogStorageAdapter, WalletStorageAdapter, AdminStorageAdapter,
  QAStorageAdapter, ComparisonStorageAdapter, AnalyticsStorageAdapter
} from "./adapters";
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

export class DatabaseStorage implements IStorage {
  private auth: AuthStorageAdapter;
  private products: ProductStorageAdapter;
  private reviews: ReviewStorageAdapter;
  private commerce: CommerceStorageAdapter;
  private orders: OrderStorageAdapter;
  private content: ContentStorageAdapter;
  private catalog: CatalogStorageAdapter;
  private wallet: WalletStorageAdapter;
  private admin: AdminStorageAdapter;
  private qa: QAStorageAdapter;
  private comparisons: ComparisonStorageAdapter;
  private analytics: AnalyticsStorageAdapter;

  constructor() {
    this.auth = new AuthStorageAdapter();
    this.products = new ProductStorageAdapter();
    this.reviews = new ReviewStorageAdapter();
    this.commerce = new CommerceStorageAdapter();
    this.orders = new OrderStorageAdapter();
    this.content = new ContentStorageAdapter();
    this.catalog = new CatalogStorageAdapter();
    this.wallet = new WalletStorageAdapter();
    this.admin = new AdminStorageAdapter();
    this.qa = new QAStorageAdapter();
    this.comparisons = new ComparisonStorageAdapter();
    this.analytics = new AnalyticsStorageAdapter();
  }

  // Auth
  async getUser(id: string): Promise<User | undefined> {
    return this.auth.getUser(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.auth.getUserByEmail(email);
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    return this.auth.upsertUser(user);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    return this.auth.updateUser(id, data);
  }

  async getAllUsers(): Promise<User[]> {
    return this.auth.getAllUsers();
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return this.products.getAllCategories();
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.products.getCategoryById(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.products.getCategoryBySlug(slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    return this.products.createCategory(category);
  }

  async updateCategory(id: number, data: Partial<InsertCategory>): Promise<Category | undefined> {
    return this.products.updateCategory(id, data);
  }

  async deleteCategory(id: number): Promise<void> {
    return this.products.deleteCategory(id);
  }

  // Products
  async getAllProducts(options?: { search?: string; category?: string; featured?: boolean; lowStock?: boolean; limit?: number; sort?: string }): Promise<Product[]> {
    return this.products.getAllProducts(options);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.getProductById(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return this.products.getProductBySlug(slug);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    return this.products.createProduct(product);
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    return this.products.updateProduct(id, data);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.products.deleteProduct(id);
  }

  // Product Images
  async getProductImages(productId: number): Promise<ProductImage[]> {
    return this.products.getProductImages(productId);
  }

  async addProductImage(image: InsertProductImage): Promise<ProductImage> {
    return this.products.addProductImage(image);
  }

  async deleteProductImage(id: number): Promise<void> {
    return this.products.deleteProductImage(id);
  }

  // Reviews
  async getProductReviews(productId: number): Promise<Review[]> {
    return this.reviews.getProductReviews(productId);
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    return this.reviews.getUserReviews(userId);
  }

  async createReview(review: InsertReview): Promise<Review> {
    return this.reviews.createReview(review);
  }

  async updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined> {
    return this.reviews.updateReview(id, data);
  }

  async deleteReview(id: number): Promise<void> {
    return this.reviews.deleteReview(id);
  }

  async updateReviewHelpfulness(id: number, helpful: number, unhelpful: number): Promise<void> {
    return this.reviews.updateReviewHelpfulness(id, helpful, unhelpful);
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.getReviewById(id);
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviews.getAllReviews();
  }

  // Wishlist
  async getUserWishlist(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    return this.commerce.getUserWishlist(userId);
  }

  async addToWishlist(userId: string, productId: number): Promise<WishlistItem> {
    return this.commerce.addToWishlist(userId, productId);
  }

  async removeFromWishlist(userId: string, productId: number): Promise<void> {
    return this.commerce.removeFromWishlist(userId, productId);
  }

  async isInWishlist(userId: string, productId: number): Promise<boolean> {
    return this.commerce.isInWishlist(userId, productId);
  }

  // Coupons
  async getAllCoupons(options?: { active?: boolean }): Promise<Coupon[]> {
    return this.commerce.getAllCoupons(options);
  }

  async getCouponByCode(code: string): Promise<Coupon | undefined> {
    return this.commerce.getCouponByCode(code);
  }

  async createCoupon(coupon: InsertCoupon): Promise<Coupon> {
    return this.commerce.createCoupon(coupon);
  }

  async updateCoupon(id: number, data: Partial<InsertCoupon>): Promise<Coupon | undefined> {
    return this.commerce.updateCoupon(id, data);
  }

  async deleteCoupon(id: number): Promise<void> {
    return this.commerce.deleteCoupon(id);
  }

  async incrementCouponUses(code: string): Promise<void> {
    return this.commerce.incrementCouponUses(code);
  }

  // Addresses
  async getUserAddresses(userId: string): Promise<Address[]> {
    return this.orders.getUserAddresses(userId);
  }

  async getAddressById(id: number): Promise<Address | undefined> {
    return this.orders.getAddressById(id);
  }

  async createAddress(address: InsertAddress): Promise<Address> {
    return this.orders.createAddress(address);
  }

  async updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined> {
    return this.orders.updateAddress(id, data);
  }

  async deleteAddress(id: number): Promise<void> {
    return this.orders.deleteAddress(id);
  }

  async setDefaultAddress(userId: string, addressId: number): Promise<void> {
    return this.orders.setDefaultAddress(userId, addressId);
  }

  // Cart
  async getUserCart(userId: string): Promise<(CartItem & { product: Product })[]> {
    return this.orders.getUserCart(userId);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    return this.orders.addToCart(item);
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    return this.orders.updateCartItem(id, quantity);
  }

  async removeFromCart(id: number): Promise<void> {
    return this.orders.removeFromCart(id);
  }

  async clearCart(userId: string): Promise<void> {
    return this.orders.clearCart(userId);
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

  // Articles
  async getAllArticles(options?: { published?: boolean; limit?: number }): Promise<Article[]> {
    return this.content.getAllArticles(options);
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.content.getArticleById(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return this.content.getArticleBySlug(slug);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    return this.content.createArticle(article);
  }

  async updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined> {
    return this.content.updateArticle(id, data);
  }

  async deleteArticle(id: number): Promise<void> {
    return this.content.deleteArticle(id);
  }

  // News
  async getAllNews(options?: { published?: boolean; limit?: number }): Promise<News[]> {
    return this.content.getAllNews(options);
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.content.getNewsById(id);
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return this.content.getNewsBySlug(slug);
  }

  async createNews(news: InsertNews): Promise<News> {
    return this.content.createNews(news);
  }

  async updateNews(id: number, data: Partial<InsertNews>): Promise<News | undefined> {
    return this.content.updateNews(id, data);
  }

  async deleteNews(id: number): Promise<void> {
    return this.content.deleteNews(id);
  }

  // Pages
  async getAllPages(options?: { published?: boolean }): Promise<Page[]> {
    return this.content.getAllPages(options);
  }

  async getPageById(id: number): Promise<Page | undefined> {
    return this.content.getPageById(id);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    return this.content.getPageBySlug(slug);
  }

  async createPage(page: InsertPage): Promise<Page> {
    return this.content.createPage(page);
  }

  async updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined> {
    return this.content.updatePage(id, data);
  }

  async deletePage(id: number): Promise<void> {
    return this.content.deletePage(id);
  }

  // Brands
  async getAllBrands(options?: { active?: boolean }): Promise<Brand[]> {
    return this.catalog.getAllBrands(options);
  }

  async getBrandById(id: number): Promise<Brand | undefined> {
    return this.catalog.getBrandById(id);
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return this.catalog.getBrandBySlug(slug);
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    return this.catalog.createBrand(brand);
  }

  async updateBrand(id: number, data: Partial<InsertBrand>): Promise<Brand | undefined> {
    return this.catalog.updateBrand(id, data);
  }

  async deleteBrand(id: number): Promise<void> {
    return this.catalog.deleteBrand(id);
  }

  // Product Attributes
  async getProductAttributes(productId: number): Promise<ProductAttribute[]> {
    return this.catalog.getProductAttributes(productId);
  }

  async createProductAttribute(attr: InsertProductAttribute): Promise<ProductAttribute> {
    return this.catalog.createProductAttribute(attr);
  }

  async updateProductAttribute(id: number, data: Partial<InsertProductAttribute>): Promise<ProductAttribute | undefined> {
    return this.catalog.updateProductAttribute(id, data);
  }

  async deleteProductAttribute(id: number): Promise<void> {
    return this.catalog.deleteProductAttribute(id);
  }

  // Shipping Methods
  async getAllShippingMethods(options?: { active?: boolean }): Promise<ShippingMethod[]> {
    return this.catalog.getAllShippingMethods(options);
  }

  async getShippingMethodById(id: number): Promise<ShippingMethod | undefined> {
    return this.catalog.getShippingMethodById(id);
  }

  async createShippingMethod(method: InsertShippingMethod): Promise<ShippingMethod> {
    return this.catalog.createShippingMethod(method);
  }

  async updateShippingMethod(id: number, data: Partial<InsertShippingMethod>): Promise<ShippingMethod | undefined> {
    return this.catalog.updateShippingMethod(id, data);
  }

  async deleteShippingMethod(id: number): Promise<void> {
    return this.catalog.deleteShippingMethod(id);
  }

  // Credit Points
  async getUserCreditPoints(userId: string): Promise<CreditPoint[]> {
    return this.wallet.getUserCreditPoints(userId);
  }

  async getTotalCreditPoints(userId: string): Promise<number> {
    return this.wallet.getTotalCreditPoints(userId);
  }

  async addCreditPoints(creditPoint: InsertCreditPoint): Promise<CreditPoint> {
    return this.wallet.addCreditPoints(creditPoint);
  }

  async removeCreditPoints(id: number): Promise<void> {
    return this.wallet.removeCreditPoints(id);
  }

  // User Wallets
  async getUserWallet(userId: string): Promise<UserWallet | undefined> {
    return this.wallet.getUserWallet(userId);
  }

  async createUserWallet(wallet: InsertUserWallet): Promise<UserWallet> {
    return this.wallet.createUserWallet(wallet);
  }

  async updateWalletBalance(userId: string, balance: string): Promise<UserWallet | undefined> {
    return this.wallet.updateWalletBalance(userId, balance);
  }

  // User Requests
  async getUserRequests(userId: string): Promise<UserRequest[]> {
    return this.wallet.getUserRequests(userId);
  }

  async getAllUserRequests(options?: { status?: string }): Promise<UserRequest[]> {
    return this.wallet.getAllUserRequests(options);
  }

  async getUserRequestById(id: number): Promise<UserRequest | undefined> {
    return this.wallet.getUserRequestById(id);
  }

  async createUserRequest(request: InsertUserRequest): Promise<UserRequest> {
    return this.wallet.createUserRequest(request);
  }

  async updateUserRequest(id: number, data: Partial<InsertUserRequest>): Promise<UserRequest | undefined> {
    return this.wallet.updateUserRequest(id, data);
  }

  async deleteUserRequest(id: number): Promise<void> {
    return this.wallet.deleteUserRequest(id);
  }

  // Settings
  async getAllSettings(): Promise<Setting[]> {
    return this.admin.getAllSettings();
  }

  async getSettingByKey(key: string): Promise<Setting | undefined> {
    return this.admin.getSettingByKey(key);
  }

  async createSetting(setting: InsertSetting): Promise<Setting> {
    return this.admin.createSetting(setting);
  }

  async updateSetting(key: string, value: string): Promise<Setting | undefined> {
    return this.admin.updateSetting(key, value);
  }

  // Questions
  async getProductQuestions(productId: number): Promise<Question[]> {
    return this.qa.getProductQuestions(productId);
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.qa.getQuestionById(id);
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    return this.qa.createQuestion(question);
  }

  async updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | undefined> {
    return this.qa.updateQuestion(id, data);
  }

  async deleteQuestion(id: number): Promise<void> {
    return this.qa.deleteQuestion(id);
  }

  // Answers
  async getQuestionAnswers(questionId: number): Promise<Answer[]> {
    return this.qa.getQuestionAnswers(questionId);
  }

  async getAnswerById(id: number): Promise<Answer | undefined> {
    return this.qa.getAnswerById(id);
  }

  async createAnswer(answer: InsertAnswer): Promise<Answer> {
    return this.qa.createAnswer(answer);
  }

  async updateAnswer(id: number, data: Partial<InsertAnswer>): Promise<Answer | undefined> {
    return this.qa.updateAnswer(id, data);
  }

  async deleteAnswer(id: number): Promise<void> {
    return this.qa.deleteAnswer(id);
  }

  // Sliders
  async getAllSliders(): Promise<Slider[]> {
    return this.admin.getAllSliders();
  }

  async getSliderById(id: number): Promise<Slider | undefined> {
    return this.admin.getSliderById(id);
  }

  async getSliderBySlug(slug: string): Promise<Slider | undefined> {
    return this.admin.getSliderBySlug(slug);
  }

  async getActiveSliders(): Promise<Slider[]> {
    return this.admin.getActiveSliders();
  }

  async createSlider(slider: InsertSlider): Promise<Slider> {
    return this.admin.createSlider(slider);
  }

  async updateSlider(id: number, data: Partial<InsertSlider>): Promise<Slider | undefined> {
    return this.admin.updateSlider(id, data);
  }

  async deleteSlider(id: number): Promise<void> {
    return this.admin.deleteSlider(id);
  }

  // Banners
  async getAllBanners(): Promise<Banner[]> {
    return this.admin.getAllBanners();
  }

  async getAllBannersAdmin(): Promise<Banner[]> {
    return this.admin.getAllBannersAdmin();
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    return this.admin.getBannerById(id);
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    return this.admin.createBanner(banner);
  }

  async updateBanner(id: number, data: Partial<InsertBanner>): Promise<Banner | undefined> {
    return this.admin.updateBanner(id, data);
  }

  async deleteBanner(id: number): Promise<void> {
    return this.admin.deleteBanner(id);
  }

  async updateBannerSortOrder(id: number, sortOrder: number): Promise<Banner | undefined> {
    return this.admin.updateBannerSortOrder(id, sortOrder);
  }

  // Landing Page Sections
  async getLandingPageSections(): Promise<LandingPageSection[]> {
    return this.admin.getLandingPageSections();
  }

  async getLandingPageSectionById(id: number): Promise<LandingPageSection | undefined> {
    return this.admin.getLandingPageSectionById(id);
  }

  async createLandingPageSection(section: InsertLandingPageSection): Promise<LandingPageSection> {
    return this.admin.createLandingPageSection(section);
  }

  async updateLandingPageSection(id: number, data: Partial<InsertLandingPageSection>): Promise<LandingPageSection | undefined> {
    return this.admin.updateLandingPageSection(id, data);
  }

  async deleteLandingPageSection(id: number): Promise<void> {
    return this.admin.deleteLandingPageSection(id);
  }

  // Stats
  async getStats(): Promise<{ totalProducts: number; totalOrders: number; totalUsers: number; totalRevenue: number }> {
    return this.analytics.getStats();
  }

  // Comparisons
  async getComparison(sessionId: string): Promise<any[]> {
    return this.comparisons.getComparison(sessionId);
  }

  async addToComparison(sessionId: string, product1Id: number, product2Id: number): Promise<any> {
    return this.comparisons.addToComparison(sessionId, product1Id, product2Id);
  }

  async removeFromComparison(sessionId: string, product1Id: number, product2Id: number): Promise<void> {
    return this.comparisons.removeFromComparison(sessionId, product1Id, product2Id);
  }
}
