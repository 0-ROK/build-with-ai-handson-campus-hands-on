import { ContentService } from "./services/ContentService";
import { FileSystemContentSource } from "./sources/FileSystemContentSource";

const source = new FileSystemContentSource();
export const contentService = new ContentService(source);
