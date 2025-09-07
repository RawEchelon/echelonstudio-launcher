const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, '../data');
const MODPACKS_FILE = path.join(DATA_DIR, 'modpacks.json');

async function ensureDataDirectory() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    // Initialize modpacks file if it doesn't exist
    try {
      await fs.access(MODPACKS_FILE);
    } catch {
      await fs.writeFile(MODPACKS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Helper functions for modpack data
async function getModpacks() {
  try {
    const data = await fs.readFile(MODPACKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveModpacks(modpacks) {
  await fs.writeFile(MODPACKS_FILE, JSON.stringify(modpacks, null, 2));
}

// API Routes

// Get all modpacks
app.get('/api/modpacks', async (req, res) => {
  try {
    const modpacks = await getModpacks();
    res.json(modpacks);
  } catch (error) {
    console.error('Error fetching modpacks:', error);
    res.status(500).json({ error: 'Failed to fetch modpacks' });
  }
});

// Get specific modpack
app.get('/api/modpacks/:id', async (req, res) => {
  try {
    const modpacks = await getModpacks();
    const modpack = modpacks.find(mp => mp.id === req.params.id);
    
    if (!modpack) {
      return res.status(404).json({ error: 'Modpack not found' });
    }
    
    res.json(modpack);
  } catch (error) {
    console.error('Error fetching modpack:', error);
    res.status(500).json({ error: 'Failed to fetch modpack' });
  }
});

// Create/Post new modpack
app.post('/api/modpacks', async (req, res) => {
  try {
    const { name, version, description, minecraftVersion, forgeVersion, mods, author } = req.body;
    
    // Validate required fields
    if (!name || !version || !minecraftVersion) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, version, minecraftVersion' 
      });
    }
    
    const modpacks = await getModpacks();
    
    // Generate unique ID
    const id = `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    
    const newModpack = {
      id,
      name,
      version,
      description: description || '',
      minecraftVersion,
      forgeVersion: forgeVersion || null,
      mods: mods || [],
      author: author || 'Unknown',
      createdAt: new Date().toISOString(),
      downloads: 0
    };
    
    modpacks.push(newModpack);
    await saveModpacks(modpacks);
    
    res.status(201).json(newModpack);
  } catch (error) {
    console.error('Error creating modpack:', error);
    res.status(500).json({ error: 'Failed to create modpack' });
  }
});

// Update modpack (increment downloads, etc.)
app.patch('/api/modpacks/:id', async (req, res) => {
  try {
    const modpacks = await getModpacks();
    const modpackIndex = modpacks.findIndex(mp => mp.id === req.params.id);
    
    if (modpackIndex === -1) {
      return res.status(404).json({ error: 'Modpack not found' });
    }
    
    // Update specific fields
    if (req.body.action === 'download') {
      modpacks[modpackIndex].downloads += 1;
    }
    
    await saveModpacks(modpacks);
    res.json(modpacks[modpackIndex]);
  } catch (error) {
    console.error('Error updating modpack:', error);
    res.status(500).json({ error: 'Failed to update modpack' });
  }
});

// Delete modpack
app.delete('/api/modpacks/:id', async (req, res) => {
  try {
    const modpacks = await getModpacks();
    const filteredModpacks = modpacks.filter(mp => mp.id !== req.params.id);
    
    if (filteredModpacks.length === modpacks.length) {
      return res.status(404).json({ error: 'Modpack not found' });
    }
    
    await saveModpacks(filteredModpacks);
    res.json({ message: 'Modpack deleted successfully' });
  } catch (error) {
    console.error('Error deleting modpack:', error);
    res.status(500).json({ error: 'Failed to delete modpack' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize and start server
async function startServer() {
  await ensureDataDirectory();
  
  app.listen(PORT, () => {
    console.log(`🚀 EchelonStudio Server running on port ${PORT}`);
    console.log(`📦 Modpack API available at http://localhost:${PORT}/api/modpacks`);
  });
}

startServer().catch(console.error);

module.exports = app;