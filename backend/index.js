import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobs.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ This is critical
app.use('/api/auth', authRoutes);  // for /api/auth/register
app.use('/api', jobRoutes);   // optional for jobs

app.listen(8000, () => {
  console.log('✅ Server running on http://localhost:8000');
});
// ✅ adjust path if different

