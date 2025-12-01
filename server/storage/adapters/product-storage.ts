import { Categories, Products, ProductImages } from "../storage-base/index";
import type {
  Category, InsertCategory, Product, InsertProduct,
  ProductImage, InsertProductImage
} from "@shared/schema";

export class ProductStorageAdapter {
  private categories: Categories;
  private products: Products;
  private productImages: ProductImages;

  constructor() {
    this.categories = new Categories();
    this.products = new Products();
    this.productImages = new ProductImages();
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
}
