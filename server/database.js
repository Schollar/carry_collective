// database.js
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false, // Disable logging to avoid console clutter
});

// Define the Bag model
const Bag = sequelize.define('Bag', {
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    slots: { type: DataTypes.INTEGER, allowNull: true }
}, {
    timestamps: true,
    tableName: 'bags'
});

// Define the Order model
const Order = sequelize.define('Order', {
    bagName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    requester: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: true,
    tableName: 'orders'
});

// Sync database
(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('✅ Database synced successfully.');
    } catch (error) {
        console.error('❌ Database sync failed:', error);
    }
})();

module.exports = { sequelize, Bag, Order };
