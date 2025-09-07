import React, { useState } from 'react';

interface ModInfo {
  name: string;
  version?: string;
  required: boolean;
}

const ModpackCreator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    description: '',
    minecraftVersion: '',
    forgeVersion: '',
    author: ''
  });
  
  const [mods, setMods] = useState<ModInfo[]>([]);
  const [newMod, setNewMod] = useState({ name: '', version: '', required: true });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addMod = () => {
    if (newMod.name.trim()) {
      setMods(prev => [...prev, { ...newMod }]);
      setNewMod({ name: '', version: '', required: true });
    }
  };

  const removeMod = (index: number) => {
    setMods(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.version || !formData.minecraftVersion) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const modpackData = {
        ...formData,
        mods,
        forgeVersion: formData.forgeVersion || undefined
      };

      let response;
      
      if (window.electronAPI) {
        response = await window.electronAPI.createModpack(modpackData);
      } else {
        const res = await fetch('http://localhost:3001/api/modpacks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(modpackData),
        });
        response = await res.json();
      }

      if (response.error) {
        throw new Error(response.error);
      }

      alert('Modpack created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        version: '',
        description: '',
        minecraftVersion: '',
        forgeVersion: '',
        author: ''
      });
      setMods([]);
    } catch (error) {
      alert('Failed to create modpack: ' + error.message);
      console.error('Creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Modpack</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-frozia-400">Basic Information</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Modpack Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="My Awesome Modpack"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Version <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="1.0.0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Minecraft Version <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="minecraftVersion"
                value={formData.minecraftVersion}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="1.19.2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Forge Version
              </label>
              <input
                type="text"
                name="forgeVersion"
                value={formData.forgeVersion}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="43.2.0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="input w-full"
                placeholder="Your name"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="input w-full h-24 resize-none"
              placeholder="Describe your modpack..."
            />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-frozia-400">Mods</h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <input
                type="text"
                value={newMod.name}
                onChange={(e) => setNewMod(prev => ({ ...prev, name: e.target.value }))}
                className="input w-full"
                placeholder="Mod name"
              />
            </div>
            <div>
              <input
                type="text"
                value={newMod.version}
                onChange={(e) => setNewMod(prev => ({ ...prev, version: e.target.value }))}
                className="input w-full"
                placeholder="Version (optional)"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newMod.required}
                  onChange={(e) => setNewMod(prev => ({ ...prev, required: e.target.checked }))}
                  className="mr-2"
                />
                Required
              </label>
              <button
                type="button"
                onClick={addMod}
                className="btn-primary"
              >
                Add Mod
              </button>
            </div>
          </div>
          
          {mods.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Added Mods:</h4>
              {mods.map((mod, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                  <div>
                    <span className="font-medium">{mod.name}</span>
                    {mod.version && <span className="text-gray-400 ml-2">v{mod.version}</span>}
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${
                      mod.required ? 'bg-red-500 text-white' : 'bg-gray-500 text-gray-300'
                    }`}>
                      {mod.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMod(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: '',
                version: '',
                description: '',
                minecraftVersion: '',
                forgeVersion: '',
                author: ''
              });
              setMods([]);
            }}
            className="btn-secondary"
          >
            Clear Form
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Modpack'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModpackCreator;