declare global {
  interface Window {
    electronAPI?: {
      getModpacks: () => Promise<any[]>;
      createModpack: (modpackData: any) => Promise<any>;
      installModpack: (modpackId: string, installPath: string) => Promise<{success: boolean, error?: string, message?: string}>;
      selectMinecraftDirectory: () => Promise<string | null>;
      selectModpackFile: () => Promise<string | null>;
      closeWindow: () => Promise<void>;
      minimizeWindow: () => Promise<void>;
      maximizeWindow: () => Promise<void>;
    };
  }
}

export {};