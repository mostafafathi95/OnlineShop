import { Brands, ProductAttributes, ShippingMethods } from "../../storage-base";
import type {
  Brand, InsertBrand, ProductAttribute, InsertProductAttribute,
  ShippingMethod, InsertShippingMethod
} from "@shared/schema";

export class CatalogStorageAdapter {
  private brands: Brands;
  private productAttributes: ProductAttributes;
  private shippingMethods: ShippingMethods;

  constructor() {
    this.brands = new Brands();
    this.productAttributes = new ProductAttributes();
    this.shippingMethods = new ShippingMethods();
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
}
