import React, { useState, useEffect } from 'react';

interface Modpack {
  id: string;
  name: string;
  version: string;
  description: string;
  minecraftVersion: string;
  forgeVersion?: string;
  author: string;
  createdAt: string;
  downloads: number;
  mods: Array<{
    name: string;
    version?: string;
    required: boolean;
  }>;
}

const ModpackBrowser: React.FC = () => {
  const [modpacks, setModpacks] = useState<Modpack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModpacks();
  }, []);

  const fetchModpacks = async () => {
    try {
      setLoading(true);
      let response;
      
      // Check if we're in Electron
      if (window.electronAPI) {
        response = await window.electronAPI.getModpacks();
        setModpacks(response || []);
      } else {
        // Fallback to direct API call for web version
        const res = await fetch('http://localhost:3001/api/modpacks');
        const data = await res.json();
        setModpacks(data);
      }
    } catch (err) {
      setError('Failed to load modpacks');
      console.error('Error fetching modpacks:', err);
    } finally {
      setLoading(false);
    }
  };

  const installModpack = async (modpackId: string) => {
    try {
      if (window.electronAPI) {
        // Use Electron API for installation
        const result = await window.electronAPI.installModpack(modpackId, './modpacks');
        if (result.success) {
          alert('Modpack installation started!');
          fetchModpacks(); // Refresh to update download count
        } else {
          alert('Installation failed: ' + result.error);
        }
      } else {
        // Web version - just increment download count
        await fetch(`http://localhost:3001/api/modpacks/${modpackId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'download' })
        });
        alert('Download started! (Web version has limited functionality)');
        fetchModpacks();
      }
    } catch (err) {
      alert('Failed to install modpack');
      console.error('Installation error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-frozia-500 text-lg">Loading modpacks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-red-400 text-center">
          <p className="text-lg font-medium">Error loading modpacks</p>
          <p className="text-sm mt-2">{error}</p>
          <button onClick={fetchModpacks} className="btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Available Modpacks</h2>
        <button onClick={fetchModpacks} className="btn-secondary">
          Refresh
        </button>
      </div>

      {modpacks.length === 0 ? (
        <div className="card text-center">
          <p className="text-gray-400 text-lg">No modpacks available</p>
          <p className="text-sm text-gray-500 mt-2">Create your first modpack to get started!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modpacks.map((modpack) => (
            <div key={modpack.id} className="card hover:bg-gray-750 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-frozia-400">{modpack.name}</h3>
                  <p className="text-sm text-gray-400">v{modpack.version}</p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                  MC {modpack.minecraftVersion}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {modpack.description || 'No description available'}
              </p>

              <div className="space-y-2 text-xs text-gray-400 mb-4">
                <div className="flex justify-between">
                  <span>Author:</span>
                  <span>{modpack.author}</span>
                </div>
                {modpack.forgeVersion && (
                  <div className="flex justify-between">
                    <span>Forge:</span>
                    <span>{modpack.forgeVersion}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Mods:</span>
                  <span>{modpack.mods?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Downloads:</span>
                  <span>{modpack.downloads}</span>
                </div>
              </div>

              <button 
                onClick={() => installModpack(modpack.id)}
                className="w-full btn-primary"
              >
                Install Modpack
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModpackBrowser;