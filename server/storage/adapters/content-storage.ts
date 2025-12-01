import { Articles, Pages, News as NewsOps } from "../storage-base/index";
import type {
  Article, InsertArticle, News, InsertNews, Page, InsertPage
} from "@shared/schema";

export class ContentStorageAdapter {
  private articles: Articles;
  private news: NewsOps;
  private pages: Pages;

  constructor() {
    this.articles = new Articles();
    this.news = new NewsOps();
    this.pages = new Pages();
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
}
