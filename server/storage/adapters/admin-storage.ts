import { Settings, Sliders, Banners, LandingPageSections } from "../../storage-base";
import type {
  Setting, InsertSetting, Slider, InsertSlider, Banner, InsertBanner,
  LandingPageSection, InsertLandingPageSection
} from "@shared/schema";

export class AdminStorageAdapter {
  private settings: Settings;
  private sliders: Sliders;
  private banners: Banners;
  private landingPageSections: LandingPageSections;

  constructor() {
    this.settings = new Settings();
    this.sliders = new Sliders();
    this.banners = new Banners();
    this.landingPageSections = new LandingPageSections();
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
}
