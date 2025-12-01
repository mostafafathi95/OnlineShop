import type { Express } from "express";
import { storage } from "../storage";
import { requireAdmin } from "./middleware";

export async function registerSeedRoutes(app: Express): Promise<void> {
  app.post("/api/seed/comprehensive", requireAdmin, async (req, res) => {
    try {
      // Create admin user
      const admin = await storage.upsertUser({
        firstName: "مدیر",
        lastName: "سیستم",
        email: "admin@example.com",
        role: "admin"
      });

      // Create test users
      const testUser = await storage.upsertUser({
        firstName: "علی",
        lastName: "محمدی",
        email: "test@example.com",
        role: "user"
      });

      // Create categories
      const categoryElectronics = await storage.createCategory({
        name: "الکترونیک",
        nameEn: "Electronics",
        slug: "electronics",
        description: "محصولات الکترونیکی",
        isActive: true,
        sortOrder: 1
      });

      const categoryFashion = await storage.createCategory({
        name: "لباس و مد",
        nameEn: "Fashion",
        slug: "fashion",
        description: "لباس و اکسسوری‌های مدی",
        isActive: true,
        sortOrder: 2
      });

      // Create brands
      const brandSamsung = await storage.createBrand({
        name: "سامسونگ",
        slug: "samsung",
        description: "برند معروف الکترونیکی",
        isActive: true
      });

      // Create products
      const phone = await storage.createProduct({
        name: "گوشی سامسونگ Galaxy A53",
        nameEn: "Samsung Galaxy A53",
        slug: "samsung-galaxy-a53",
        description: "گوشی هوشمند با صفحه‌نمایش AMOLED",
        price: "8500000",
        stock: 50,
        categoryId: categoryElectronics.id,
        image: "/images/phone.jpg",
        isActive: true,
        isFeatured: true
      });

      const laptop = await storage.createProduct({
        name: "لپ‌تاپ Dell XPS 13",
        nameEn: "Dell XPS 13",
        slug: "dell-xps-13",
        description: "لپ‌تاپ قدرتمند و سبک",
        price: "25000000",
        stock: 20,
        categoryId: categoryElectronics.id,
        image: "/images/laptop.jpg",
        isActive: true,
        isFeatured: true
      });

      // Create articles
      await storage.createArticle({
        title: "راهنمای خرید گوشی هوشمند",
        titleEn: "Smartphone Buying Guide",
        slug: "smartphone-guide",
        content: "نکات مهم در انتخاب گوشی مناسب...",
        excerpt: "یاد بگیرید چطور بهترین گوشی را انتخاب کنید",
        author: "علی محمدی",
        image: "/images/article.jpg",
        isPublished: true,
        createdAt: new Date()
      });

      // Create coupons
      await storage.createCoupon({
        code: "WELCOME10",
        description: "تخفیف خوش‌آمدگویی",
        discountType: "percentage",
        discountValue: "10",
        maxUses: 1000,
        currentUses: 0,
        isActive: true,
        minOrderValue: "100000"
      });

      // Create shipping methods
      await storage.createShippingMethod({
        name: "ارسال معمولی",
        description: "تحویل در 3-5 روز کاری",
        cost: "50000",
        estimatedDays: 5,
        isActive: true
      });

      await storage.createShippingMethod({
        name: "ارسال فوری",
        description: "تحویل همان روز در تهران",
        cost: "100000",
        estimatedDays: 1,
        isActive: true
      });

      // Create news
      await storage.createNews({
        title: "راه‌اندازی فروشگاه جدید",
        titleEn: "New Store Launch",
        slug: "new-store-launch",
        content: "ما افتخار می‌کنیم که فروشگاه جدید را راه‌اندازی کردیم",
        excerpt: "فروشگاه جدید ما آماده برای خدمت به شما است",
        image: "/images/news.jpg",
        isPublished: true,
        createdAt: new Date()
      });

      // Create settings
      await storage.createSetting?.({
        key: "store_name",
        value: "فروشگاه آنلاین",
        type: "string"
      });

      res.json({
        success: true,
        message: "Seed data created successfully",
        data: {
          admin,
          testUser,
          categories: [categoryElectronics, categoryFashion],
          brands: [brandSamsung],
          products: [phone, laptop]
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Seed data creation failed",
        details: (error as any).message
      });
    }
  });
}
