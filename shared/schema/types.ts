import { z } from "zod";
import { users, userRoleEnum, orderStatusEnum, questionStatusEnum, userRequestStatusEnum } from './auth';
import { categories, products, productImages } from './products';
import { addresses, cartItems, orders, orderItems } from './orders';
import { articles, news, pages } from './content';
import { reviews, wishlist, coupons } from './commerce';
import { brands, productAttributes, shippingMethods } from './catalog';
import { sliders, banners, landingPageSections } from './admin';
import { creditPoints, userWallets, userRequests } from './wallet';
import { searchAnalytics } from './analytics';
import { questions, answers } from './community';
import { settings } from './settings';
import {
  insertUserSchema, insertCategorySchema, insertProductSchema, insertProductImageSchema,
  insertReviewSchema, insertAddressSchema, insertCartItemSchema, insertCouponSchema,
  insertOrderSchema, insertOrderItemSchema, insertArticleSchema, insertNewsSchema,
  insertPageSchema, insertBrandSchema, insertProductAttributeSchema, insertShippingMethodSchema,
  insertCreditPointSchema, insertUserWalletSchema, insertUserRequestSchema, insertSettingSchema,
  insertQuestionSchema, insertAnswerSchema, insertSliderSchema, insertBannerSchema,
  insertLandingPageSectionSchema, insertSearchAnalyticsSchema
} from './schemas';

// Enums
export type OrderStatus = typeof orderStatusEnum.enumValues[number];
export type UserRole = typeof userRoleEnum.enumValues[number];
export type QuestionStatus = typeof questionStatusEnum.enumValues[number];
export type UserRequestStatus = typeof userRequestStatusEnum.enumValues[number];

// Base types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProductImage = z.infer<typeof insertProductImageSchema>;
export type ProductImage = typeof productImages.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertAddress = z.infer<typeof insertAddressSchema>;
export type Address = typeof addresses.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCoupon = z.infer<typeof insertCouponSchema>;
export type Coupon = typeof coupons.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type WishlistItem = typeof wishlist.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;
export type InsertProductAttribute = z.infer<typeof insertProductAttributeSchema>;
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type InsertShippingMethod = z.infer<typeof insertShippingMethodSchema>;
export type ShippingMethod = typeof shippingMethods.$inferSelect;
export type InsertCreditPoint = z.infer<typeof insertCreditPointSchema>;
export type CreditPoint = typeof creditPoints.$inferSelect;
export type InsertUserWallet = z.infer<typeof insertUserWalletSchema>;
export type UserWallet = typeof userWallets.$inferSelect;
export type InsertUserRequest = z.infer<typeof insertUserRequestSchema>;
export type UserRequest = typeof userRequests.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertAnswer = z.infer<typeof insertAnswerSchema>;
export type Answer = typeof answers.$inferSelect;
export type InsertSlider = z.infer<typeof insertSliderSchema>;
export type Slider = typeof sliders.$inferSelect;
export type InsertBanner = z.infer<typeof insertBannerSchema>;
export type Banner = typeof banners.$inferSelect;
export type InsertLandingPageSection = z.infer<typeof insertLandingPageSectionSchema>;
export type LandingPageSection = typeof landingPageSections.$inferSelect;
export type InsertSearchAnalytics = z.infer<typeof insertSearchAnalyticsSchema>;
export type SearchAnalytics = typeof searchAnalytics.$inferSelect;

// Extended types for frontend
export type ProductWithCategory = Product & {
  category: Category | null;
  images: ProductImage[];
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type OrderWithItems = Order & {
  items: (OrderItem & { product?: Product })[];
  user?: User;
};
