import type { IStorage } from "../storage-interface";
import {
  Users, Categories, Products, ProductImages, Reviews, Wishlist, Coupons,
  Addresses, Cart, Orders, Articles, News as NewsOps, Pages, Brands,
  ProductAttributes, ShippingMethods, CreditPoints, Wallets, Requests,
  Settings, Questions, Answers, Sliders, Banners, LandingPageSections,
  Comparisons, Analytics, Stats
} from "../storage-base/index";
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
  private users: Users;
  private categories: Categories;
  private products: Products;
  private productImages: ProductImages;
  private reviews: Reviews;
  private wishlist: Wishlist;
  private coupons: Coupons;
  private addresses: Addresses;
  private cart: Cart;
  private orders: Orders;
  private articles: Articles;
  private news: NewsOps;
  private pages: Pages;
  private brands: Brands;
  private productAttributes: ProductAttributes;
  private shippingMethods: ShippingMethods;
  private creditPoints: CreditPoints;
  private wallets: Wallets;
  private requests: Requests;
  private settings: Settings;
  private questions: Questions;
  private answers: Answers;
  private sliders: Sliders;
  private banners: Banners;
  private landingPageSections: LandingPageSections;
  private comparisons: Comparisons;
  private analytics: Analytics;
  private stats: Stats;

  constructor() {
    this.users = new Users();
    this.categories = new Categories();
    this.products = new Products();
    this.productImages = new ProductImages();
    this.reviews = new Reviews();
    this.wishlist = new Wishlist();
    this.coupons = new Coupons();
    this.addresses = new Addresses();
    this.cart = new Cart();
    this.orders = new Orders();
    this.articles = new Articles();
    this.news = new NewsOps();
    this.pages = new Pages();
    this.brands = new Brands();
    this.productAttributes = new ProductAttributes();
    this.shippingMethods = new ShippingMethods();
    this.creditPoints = new CreditPoints();
    this.wallets = new Wallets();
    this.requests = new Requests();
    this.settings = new Settings();
    this.questions = new Questions();
    this.answers = new Answers();
    this.sliders = new Sliders();
    this.banners = new Banners();
    this.landingPageSections = new LandingPageSections();
    this.comparisons = new Comparisons();
    this.analytics = new Analytics();
    this.stats = new Stats();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.getUser(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.getUserByEmail(email);
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    return this.users.upsertUser(user);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    return this.users.updateUser(id, data);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users.getAllUsers();
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return this.categories.getAllCategories();
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.getCategoryById(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.getCategoryBySlug(slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    return this.categories.createCategory(category);
  }

  async updateCategory(id: number, data: Partial<InsertCategory>): Promise<Category | undefined> {
    return this.categories.updateCategory(id, data);
  }

  async deleteCategory(id: number): Promise<void> {
    return this.categories.deleteCategory(id);
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
    return this.productImages.getProductImages(productId);
  }

  async addProductImage(image: InsertProductImage): Promise<ProductImage> {
    return this.productImages.addProductImage(image);
  }

  async deleteProductImage(id: number): Promise<void> {
    return this.productImages.deleteProductImage(id);
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

  // Wishlist
  async getUserWishlist(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    return this.wishlist.getUserWishlist(userId);
  }

  async addToWishlist(userId: string, productId: number): Promise<WishlistItem> {
    return this.wishlist.addToWishlist(userId, productId);
  }

  async removeFromWishlist(userId: string, productId: number): Promise<void> {
    return this.wishlist.removeFromWishlist(userId, productId);
  }

  async isInWishlist(userId: string, productId: number): Promise<boolean> {
    return this.wishlist.isInWishlist(userId, productId);
  }

  // Coupons
  async getAllCoupons(options?: { active?: boolean }): Promise<Coupon[]> {
    return this.coupons.getAllCoupons(options);
  }

  async getCouponByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.getCouponByCode(code);
  }

  async createCoupon(coupon: InsertCoupon): Promise<Coupon> {
    return this.coupons.createCoupon(coupon);
  }

  async updateCoupon(id: number, data: Partial<InsertCoupon>): Promise<Coupon | undefined> {
    return this.coupons.updateCoupon(id, data);
  }

  async deleteCoupon(id: number): Promise<void> {
    return this.coupons.deleteCoupon(id);
  }

  async incrementCouponUses(code: string): Promise<void> {
    return this.coupons.incrementCouponUses(code);
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

  // Articles
  async getAllArticles(options?: { published?: boolean; limit?: number }): Promise<Article[]> {
    return this.articles.getAllArticles(options);
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.getArticleById(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return this.articles.getArticleBySlug(slug);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    return this.articles.createArticle(article);
  }

  async updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined> {
    return this.articles.updateArticle(id, data);
  }

  async deleteArticle(id: number): Promise<void> {
    return this.articles.deleteArticle(id);
  }

  // News
  async getAllNews(options?: { published?: boolean; limit?: number }): Promise<News[]> {
    return this.news.getAllNews(options);
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.news.getNewsById(id);
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return this.news.getNewsBySlug(slug);
  }

  async createNews(news: InsertNews): Promise<News> {
    return this.news.createNews(news);
  }

  async updateNews(id: number, data: Partial<InsertNews>): Promise<News | undefined> {
    return this.news.updateNews(id, data);
  }

  async deleteNews(id: number): Promise<void> {
    return this.news.deleteNews(id);
  }

  // Pages
  async getAllPages(options?: { published?: boolean }): Promise<Page[]> {
    return this.pages.getAllPages(options);
  }

  async getPageById(id: number): Promise<Page | undefined> {
    return this.pages.getPageById(id);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    return this.pages.getPageBySlug(slug);
  }

  async createPage(page: InsertPage): Promise<Page> {
    return this.pages.createPage(page);
  }

  async updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined> {
    return this.pages.updatePage(id, data);
  }

  async deletePage(id: number): Promise<void> {
    return this.pages.deletePage(id);
  }

  // Brands
  async getAllBrands(options?: { active?: boolean }): Promise<Brand[]> {
    return this.brands.getAllBrands(options);
  }

  async getBrandById(id: number): Promise<Brand | undefined> {
    return this.brands.getBrandById(id);
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return this.brands.getBrandBySlug(slug);
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    return this.brands.createBrand(brand);
  }

  async updateBrand(id: number, data: Partial<InsertBrand>): Promise<Brand | undefined> {
    return this.brands.updateBrand(id, data);
  }

  async deleteBrand(id: number): Promise<void> {
    return this.brands.deleteBrand(id);
  }

  // Product Attributes
  async getProductAttributes(productId: number): Promise<ProductAttribute[]> {
    return this.productAttributes.getProductAttributes(productId);
  }

  async createProductAttribute(attr: InsertProductAttribute): Promise<ProductAttribute> {
    return this.productAttributes.createProductAttribute(attr);
  }

  async updateProductAttribute(id: number, data: Partial<InsertProductAttribute>): Promise<ProductAttribute | undefined> {
    return this.productAttributes.updateProductAttribute(id, data);
  }

  async deleteProductAttribute(id: number): Promise<void> {
    return this.productAttributes.deleteProductAttribute(id);
  }

  // Shipping Methods
  async getAllShippingMethods(options?: { active?: boolean }): Promise<ShippingMethod[]> {
    return this.shippingMethods.getAllShippingMethods(options);
  }

  async getShippingMethodById(id: number): Promise<ShippingMethod | undefined> {
    return this.shippingMethods.getShippingMethodById(id);
  }

  async createShippingMethod(method: InsertShippingMethod): Promise<ShippingMethod> {
    return this.shippingMethods.createShippingMethod(method);
  }

  async updateShippingMethod(id: number, data: Partial<InsertShippingMethod>): Promise<ShippingMethod | undefined> {
    return this.shippingMethods.updateShippingMethod(id, data);
  }

  async deleteShippingMethod(id: number): Promise<void> {
    return this.shippingMethods.deleteShippingMethod(id);
  }

  // Credit Points
  async getUserCreditPoints(userId: string): Promise<CreditPoint[]> {
    return this.creditPoints.getUserCreditPoints(userId);
  }

  async getTotalCreditPoints(userId: string): Promise<number> {
    return this.creditPoints.getTotalCreditPoints(userId);
  }

  async addCreditPoints(creditPoint: InsertCreditPoint): Promise<CreditPoint> {
    return this.creditPoints.addCreditPoints(creditPoint);
  }

  async removeCreditPoints(id: number): Promise<void> {
    return this.creditPoints.removeCreditPoints(id);
  }

  // User Wallets
  async getUserWallet(userId: string): Promise<UserWallet | undefined> {
    return this.wallets.getUserWallet(userId);
  }

  async createUserWallet(wallet: InsertUserWallet): Promise<UserWallet> {
    return this.wallets.createUserWallet(wallet);
  }

  async updateWalletBalance(userId: string, balance: string): Promise<UserWallet | undefined> {
    return this.wallets.updateWalletBalance(userId, balance);
  }

  // User Requests
  async getUserRequests(userId: string): Promise<UserRequest[]> {
    return this.requests.getUserRequests(userId);
  }

  async getAllUserRequests(options?: { status?: string }): Promise<UserRequest[]> {
    return this.requests.getAllUserRequests(options);
  }

  async getUserRequestById(id: number): Promise<UserRequest | undefined> {
    return this.requests.getUserRequestById(id);
  }

  async createUserRequest(request: InsertUserRequest): Promise<UserRequest> {
    return this.requests.createUserRequest(request);
  }

  async updateUserRequest(id: number, data: Partial<InsertUserRequest>): Promise<UserRequest | undefined> {
    return this.requests.updateUserRequest(id, data);
  }

  async deleteUserRequest(id: number): Promise<void> {
    return this.requests.deleteUserRequest(id);
  }

  // Settings
  async getAllSettings(): Promise<Setting[]> {
    return this.settings.getAllSettings();
  }

  async getSettingByKey(key: string): Promise<Setting | undefined> {
    return this.settings.getSettingByKey(key);
  }

  async createSetting(setting: InsertSetting): Promise<Setting> {
    return this.settings.createSetting(setting);
  }

  async updateSetting(key: string, value: string): Promise<Setting | undefined> {
    return this.settings.updateSetting(key, value);
  }

  // Questions
  async getProductQuestions(productId: number): Promise<Question[]> {
    return this.questions.getProductQuestions(productId);
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.getQuestionById(id);
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    return this.questions.createQuestion(question);
  }

  async updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | undefined> {
    return this.questions.updateQuestion(id, data);
  }

  async deleteQuestion(id: number): Promise<void> {
    return this.questions.deleteQuestion(id);
  }

  // Answers
  async getQuestionAnswers(questionId: number): Promise<Answer[]> {
    return this.answers.getQuestionAnswers(questionId);
  }

  async getAnswerById(id: number): Promise<Answer | undefined> {
    return this.answers.getAnswerById(id);
  }

  async createAnswer(answer: InsertAnswer): Promise<Answer> {
    return this.answers.createAnswer(answer);
  }

  async updateAnswer(id: number, data: Partial<InsertAnswer>): Promise<Answer | undefined> {
    return this.answers.updateAnswer(id, data);
  }

  async deleteAnswer(id: number): Promise<void> {
    return this.answers.deleteAnswer(id);
  }

  // Sliders
  async getAllSliders(): Promise<Slider[]> {
    return this.sliders.getAllSliders();
  }

  async getSliderById(id: number): Promise<Slider | undefined> {
    return this.sliders.getSliderById(id);
  }

  async getSliderBySlug(slug: string): Promise<Slider | undefined> {
    return this.sliders.getSliderBySlug(slug);
  }

  async getActiveSliders(): Promise<Slider[]> {
    return this.sliders.getActiveSliders();
  }

  async createSlider(slider: InsertSlider): Promise<Slider> {
    return this.sliders.createSlider(slider);
  }

  async updateSlider(id: number, data: Partial<InsertSlider>): Promise<Slider | undefined> {
    return this.sliders.updateSlider(id, data);
  }

  async deleteSlider(id: number): Promise<void> {
    return this.sliders.deleteSlider(id);
  }

  // Banners
  async getAllBanners(): Promise<Banner[]> {
    return this.banners.getAllBanners();
  }

  async getAllBannersAdmin(): Promise<Banner[]> {
    return this.banners.getAllBannersAdmin();
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    return this.banners.getBannerById(id);
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    return this.banners.createBanner(banner);
  }

  async updateBanner(id: number, data: Partial<InsertBanner>): Promise<Banner | undefined> {
    return this.banners.updateBanner(id, data);
  }

  async deleteBanner(id: number): Promise<void> {
    return this.banners.deleteBanner(id);
  }

  async updateBannerSortOrder(id: number, sortOrder: number): Promise<Banner | undefined> {
    return this.banners.updateBannerSortOrder(id, sortOrder);
  }

  // Landing Page Sections
  async getLandingPageSections(): Promise<LandingPageSection[]> {
    return this.landingPageSections.getLandingPageSections();
  }

  async getLandingPageSectionById(id: number): Promise<LandingPageSection | undefined> {
    return this.landingPageSections.getLandingPageSectionById(id);
  }

  async createLandingPageSection(section: InsertLandingPageSection): Promise<LandingPageSection> {
    return this.landingPageSections.createLandingPageSection(section);
  }

  async updateLandingPageSection(id: number, data: Partial<InsertLandingPageSection>): Promise<LandingPageSection | undefined> {
    return this.landingPageSections.updateLandingPageSection(id, data);
  }

  async deleteLandingPageSection(id: number): Promise<void> {
    return this.landingPageSections.deleteLandingPageSection(id);
  }

  // Stats
  async getStats(): Promise<{ totalProducts: number; totalOrders: number; totalUsers: number; totalRevenue: number }> {
    return this.stats.getStats();
  }

  // Additional Review methods
  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.getReviewById(id);
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviews.getAllReviews();
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
