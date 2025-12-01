import { DatabaseStorage } from "./storage/database-storage";
export { DatabaseStorage };
export { type IStorage } from "./storage-interface";

export const storage = new DatabaseStorage();
