import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: 'Too many requests, please try later!', 
  standardHeaders: true,
  legacyHeaders: false,
});


