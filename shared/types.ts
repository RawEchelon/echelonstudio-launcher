// Shared type definitions for the modpack system

/**
 * Modpack data structure
 */
export interface Modpack {
  id: string;
  name: string;
  version: string;
  description: string;
  minecraftVersion: string;
  forgeVersion?: string;
  mods: ModInfo[];
  author: string;
  createdAt: string;
  downloads: number;
}

/**
 * Mod information within a modpack
 */
export interface ModInfo {
  name: string;
  version?: string;
  source?: 'curseforge' | 'modrinth' | 'url' | 'local';
  id?: string; // CurseForge/Modrinth mod ID
  url?: string; // Direct download URL
  fileName?: string;
  required: boolean;
}

/**
 * Modpack creation/update request
 */
export interface CreateModpackRequest {
  name: string;
  version: string;
  description?: string;
  minecraftVersion: string;
  forgeVersion?: string;
  mods?: ModInfo[];
  author?: string;
}

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Launcher profile for modpack
 */
export interface LauncherProfile {
  id: string;
  name: string;
  modpackId: string;
  minecraftVersion: string;
  forgeVersion?: string;
  gameDir: string;
  javaPath?: string;
  jvmArgs?: string[];
  lastUsed?: string;
}