import { storage } from "../storage";
import { logger } from "./logger";

export async function generateComprehensiveSeedData() {
  try {
    logger.log({ level: "info", message: "Starting comprehensive seed data generation..." });

    // 1. Create Admin User
    const admin = await storage.upsertUser({
      firstName: "مدیر",
      lastName: "سیستم",
      email: "admin@example.com",
      role: "admin"
    });
    logger.log({ level: "info", message: "✓ Admin user created" });

    // 2. Create Test Users
    const users = await Promise.all([
      storage.upsertUser({
        firstName: "علی",
        lastName: "محمدی",
        email: "ali@example.com",
        role: "user"
      }),
      storage.upsertUser({
        firstName: "فاطمه",
        lastName: "احمدی",
        email: "fateme@example.com",
        role: "user"
      }),
      storage.upsertUser({
        firstName: "محمد",
        lastName: "رضایی",
        email: "mohammad@example.com",
        role: "user"
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${users.length} test users created` });

    // 3. Create Categories
    const categories = await Promise.all([
      storage.createCategory({
        name: "الکترونیک",
        nameEn: "Electronics",
        slug: "electronics",
        description: "محصولات الکترونیکی و فناوری",
        isActive: true,
        sortOrder: 1,
      }),
      storage.createCategory({
        name: "لباس و مد",
        nameEn: "Fashion",
        slug: "fashion",
        description: "لباس، کفش و اکسسوری",
        isActive: true,
        sortOrder: 2,
      }),
      storage.createCategory({
        name: "کتاب",
        nameEn: "Books",
        slug: "books",
        description: "کتاب‌های فارسی و انگلیسی",
        isActive: true,
        sortOrder: 3,
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${categories.length} categories created` });

    // 4. Create Brands
    const brands = await Promise.all([
      storage.createBrand({
        name: "سامسونگ",
        slug: "samsung",
        description: "برند معروف الکترونیکی",
        isActive: true,
      }),
      storage.createBrand({
        name: "اپل",
        slug: "apple",
        description: "کمپانی تکنولوژی",
        isActive: true,
      }),
      storage.createBrand({
        name: "ال‌جی",
        slug: "lg",
        description: "برند لوازم الکتریکی",
        isActive: true,
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${brands.length} brands created` });

    // 5. Create Products
    const products = await Promise.all([
      storage.createProduct({
        name: "گوشی سامسونگ Galaxy A54",
        nameEn: "Samsung Galaxy A54",
        slug: "samsung-galaxy-a54",
        description: "گوشی هوشمند با صفحه‌نمایش 6.4 اینچ AMOLED",
        price: "9500000",
        comparePrice: "11000000",
        stock: 50,
        categoryId: categories[0].id,
        image: "/images/products/phone.jpg",
        isActive: true,
        isFeatured: true,
      }),
      storage.createProduct({
        name: "لپ‌تاپ اپل MacBook Pro",
        nameEn: "Apple MacBook Pro",
        slug: "apple-macbook-pro",
        description: "لپ‌تاپ قدرتمند برای حرفه‌ای‌ها",
        price: "35000000",
        comparePrice: "40000000",
        stock: 15,
        categoryId: categories[0].id,
        image: "/images/products/laptop.jpg",
        isActive: true,
        isFeatured: true,
      }),
      storage.createProduct({
        name: "تی‌شرت مردانه",
        nameEn: "Men's T-Shirt",
        slug: "mens-tshirt",
        description: "تی‌شرت 100% پنبه‌ای",
        price: "250000",
        stock: 100,
        categoryId: categories[1].id,
        image: "/images/products/tshirt.jpg",
        isActive: true,
        isFeatured: false,
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${products.length} products created` });

    // 6. Create Articles
    const articles = await Promise.all([
      storage.createArticle({
        title: "راهنمای خرید گوشی هوشمند",
        titleEn: "Smartphone Buying Guide",
        slug: "smartphone-guide",
        content: "نکات مهم برای انتخاب گوشی مناسب برای نیازهای خود",
        excerpt: "یاد بگیرید چطور بهترین گوشی را انتخاب کنید",
        author: "علی محمدی",
        image: "/images/articles/guide.jpg",
        isPublished: true,
      }),
      storage.createArticle({
        title: "آخرین تکنولوژی‌های فناوری",
        titleEn: "Latest Tech Innovations",
        slug: "latest-tech",
        content: "بررسی جدیدترین فناوری‌های دنیا",
        excerpt: "تکنولوژی‌های آینده اکنون در دسترس است",
        author: "محمد رضایی",
        image: "/images/articles/tech.jpg",
        isPublished: true,
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${articles.length} articles created` });

    // 7. Create Coupons
    const coupons = await Promise.all([
      storage.createCoupon({
        code: "WELCOME10",
        description: "تخفیف خوش‌آمدگویی 10%",
        discountType: "percentage",
        discountValue: "10",
        maxUses: 1000,
        currentUses: 0,
        isActive: true,
        minOrderValue: "100000",
      }),
      storage.createCoupon({
        code: "SALE20",
        description: "فروش ویژه 20%",
        discountType: "percentage",
        discountValue: "20",
        maxUses: 500,
        currentUses: 0,
        isActive: true,
        minOrderValue: "500000",
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${coupons.length} coupons created` });

    // 8. Create Shipping Methods
    const shippingMethods = await Promise.all([
      storage.createShippingMethod({
        name: "ارسال معمولی",
        description: "تحویل در 3-5 روز کاری",
        cost: "50000",
        estimatedDays: 5,
        isActive: true,
      }),
      storage.createShippingMethod({
        name: "ارسال فوری",
        description: "تحویل همان روز در تهران",
        cost: "100000",
        estimatedDays: 1,
        isActive: true,
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${shippingMethods.length} shipping methods created` });

    // 9. Create News
    const news = await Promise.all([
      storage.createNews({
        title: "راه‌اندازی فروشگاه جدید",
        titleEn: "New Store Launch",
        slug: "new-store-launch",
        content: "ما با افتخار فروشگاه جدید خود را راه‌اندازی می‌کنیم",
        excerpt: "فروشگاه جدید ما آماده برای خدمت به شما",
        image: "/images/news/launch.jpg",
        isPublished: true,
      }),
    ]);
    logger.log({ level: "info", message: `✓ ${news.length} news created` });

    logger.log({ level: "info", message: "✅ Comprehensive seed data generation completed!" });

    return {
      users: users.length,
      categories: categories.length,
      brands: brands.length,
      products: products.length,
      articles: articles.length,
      coupons: coupons.length,
      shippingMethods: shippingMethods.length,
      news: news.length,
    };
  } catch (error) {
    logger.log({
      level: "error",
      message: "Seed data generation failed",
      error: (error as any).message,
    });
    throw error;
  }
}
