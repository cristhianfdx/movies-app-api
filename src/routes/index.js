import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.send('<center>API Securely protected with JWT.</center>');
});

export default router;
