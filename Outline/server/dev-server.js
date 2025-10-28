import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is not set');
  console.log('💡 Please check your .env file and ensure MONGO_URI is configured');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET environment variable is not set');
  console.log('💡 Please check your .env file and ensure JWT_SECRET is configured');
  console.log('💡 You can generate a secure secret using:');
  console.log('   node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"');
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection failed:');
    console.error('   Error:', err.message);
    console.log('💡 Please ensure:');
    console.log('   1. MongoDB is installed and running');
    console.log('   2. The MONGO_URI in .env file is correct');
    console.log('   3. MongoDB service is started (run "mongod" in terminal)');
    console.log('   4. Firewall is not blocking port 27017');
    console.log('⚠️  Server will start but database operations will fail');
  });
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🏠 API welcome: http://localhost:${PORT}/`);
});
