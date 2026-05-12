import express from 'express';
import admin from '../firebaseAdmin.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: 'Registration failed',
      error: error.message,
    });
  }
});

export default router;
