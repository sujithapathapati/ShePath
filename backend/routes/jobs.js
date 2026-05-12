import express from 'express';
import admin from '../firebaseAdmin.js';


const router = express.Router();
const db = admin.firestore();

// GET all jobs
router.get('/jobs', async (req, res) => {
  try {
    const snapshot = await db.collection('jobs').get();
    const jobs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.post('/jobs', async (req, res) => {
  try {
    const {
      title, description, type, location, salary, requirements,
      company, employerId, posted_date, application_deadline,
      tags, status
    } = req.body;

    if (!employerId) {
      return res.status(400).json({ error: 'employerId is required' });
    }

    const newJob = {
      title,
      description,
      type,
      location,
      salary,
      requirements,
      company,
      employerId,
      posted_date,
      application_deadline,
      tags,
      status
    };

    const docRef = await db.collection('jobs').add(newJob);
    res.status(201).json({ id: docRef.id, ...newJob });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});
export default router;
