const { Others } = require("../db");

async function getPrice() {
    const price = await Others.findAll();
    return price.map(p => p.price);
}

async function createPrice(price) {
    await Others.create({ id: 1, price });
}

async function updatePrice(newPrice) {
    const price = await Others.findByPk(1);
    await price.update({ price: newPrice });
}

async function getStats() {
    const stats = await Others.findByPk(1);
    return stats.statistics;
}

async function createStats(params) {
    const stats = await Others.findByPk(1);
    await stats.update({ statistics: [{ users: 0, pets: 0 }] });
}

module.exports = {
    getPrice,
    createPrice,
    updatePrice,
    getStats,
    createStats
}
