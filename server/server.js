require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const cors = require('cors');
const { Bag, Order } = require('./database'); // Import models

const app = express();
const PORT = 1337;

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
// Allow multiple origins dynamically
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); // Parse JSON request bodies

// 👜 Get all bags
app.get('/api/bags', async (req, res) => {
    try {
        const bags = await Bag.findAll();
        res.json(bags);
    } catch (error) {
        console.error('Error fetching bags:', error);
        res.status(500).json({ error: 'Failed to retrieve bags' });
    }
});

// ➕ Add a new bag
app.post('/api/bags', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        if (!name || !quantity) {
            return res.status(400).json({ error: 'Name and quantity are required' });
        }

        const bag = await Bag.create({ name, quantity });
        res.status(201).json(bag);
    } catch (error) {
        console.error('Error adding bag:', error);
        res.status(500).json({ error: 'Failed to add bag' });
    }
});

// ❌ Remove a bag
app.delete('/api/bags/:id', async (req, res) => {
    try {
        await Bag.destroy({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting bag:', error);
        res.status(500).json({ error: 'Failed to remove bag' });
    }
});

// 📜 Get all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

// 📝 Request a bag (Adds to  Orders)
app.post('/api/request-bag', async (req, res) => {
    try {
        const { bagName, quantity, requester } = req.body;
        if (!bagName || !quantity || !requester) {
            return res.status(400).json({ error: 'Bag name, quantity, and requester are required' });
        }

        // Save the order in DB
        const order = await Order.create({ bagName, quantity, requester, status: 'pending' });

        res.status(201).json({ success: true, message: 'Bag request received', order });
    } catch (error) {
        console.error('Error requesting bag:', error);
        res.status(500).json({ error: 'Failed to request bag' });
    }
});

// ✅ Approve an order
app.put('/api/approve-order/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the order
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if the order is already approved
        if (order.status === 'approved') {
            return res.status(400).json({ error: 'Order is already approved' });
        }

        // Find the bag inventory (assuming there's only one inventory record)
        const bagInventory = await Bag.findOne({ where: { name: order.bagName } });
        if (!bagInventory) {
            return res.status(500).json({ error: 'Bag inventory not found' });
        }

        // Check if there are enough bags in inventory
        if (bagInventory < order.quantity) {
            return res.status(400).json({ error: 'Insufficient bags in inventory' });
        }


        // Deduct the bags from inventory
        bagInventory.quantity -= order.quantity;
        await bagInventory.save();

        // Approve the order
        order.status = 'delivered';
        await order.save();

        // Respond with success
        res.json({ success: true, message: 'Order approved', order });
    } catch (error) {
        console.error('Error approving order:', error);
        res.status(500).json({ error: 'Failed to approve order' });
    }
});

// ❌ cancel an order
app.put('/api/cancel-order/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = 'cancelled';
        await order.save();

        res.json({ success: true, message: 'Order cancelled', order });
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ error: 'Failed to cancel order' });
    }
});

// 🚀 Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});