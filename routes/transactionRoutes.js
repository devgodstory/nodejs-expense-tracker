const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Create a new transaction
router.post('/', async (req, res) => {
  const { amount, category, user, transactionType, description } = req.body;
  try {
    const newTransaction = new Transaction({ amount, category, user, transactionType, description });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  try {
    // ใช้ populate เพื่อดึง category และ user พร้อมกับข้อมูลที่เกี่ยวข้อง
    const transactions = await Transaction.find()
      .populate('category', 'name')  // populate 'category' และเลือก 'name' เท่านั้น
      .populate('user', 'username') // หรือเลือก 'username' ถ้าคุณต้องการ
      .sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
