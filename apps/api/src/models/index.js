'use strict';

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import Sequelize from 'sequelize';
import process from 'process';

// 1. Setup ESM compatibility (The "Translator")
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// 2. Load the Config with the "Universal Adapter" fix
const configFile = require(path.join(__dirname, '../config/config.js'));
// This handles the "Box inside a Box" (ESM default export) problem
const actualSettings = configFile.default || configFile;
const config = actualSettings[env];

// Debug logs to help you see what's happening
console.log(`🚀 Database Boot: [Env: ${env}] [Config: ${config ? 'Found ✅' : 'Missing ❌'}]`);

const db = {};

// 3. Initialize Sequelize
let sequelize;
if (config && config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config) {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
} else {
  console.error("CRITICAL ERROR: Database configuration not found for environment:", env);
}

// 4. Scan and Load Models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const modelFactory = require(path.join(__dirname, file));
    // Handle both ESM and CommonJS model files
    const modelProvider = modelFactory.default || modelFactory;
    const model = modelProvider(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// 5. Setup Associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 6. Double Export (For CLI and for your API code)
export default db;
