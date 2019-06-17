const Item = function (itemParams) {
    this.name = itemParams.name;
    this.sellIn = itemParams.sellIn;
    this.quality = itemParams.quality;
}

Item.prototype.updateSellIn = function () {
    this.sellIn--;
};

Item.prototype.updateQuality = function () {

    if (this.quality <= 0) {
        return;
    }

    if (this.quality > 0) {
        this.quality =  this.quality - (this.sellIn > 0 ? 1 : 2);
    }

};

Item.prototype.age = function () {
    this.updateQuality();
    this.updateSellIn();
};

const makeAgedBrie = function (agedBrieParams) {

    let agedBrie = new Item({ name: 'Aged Brie', sellIn: agedBrieParams.sellIn, quality: agedBrieParams.quality });
    const qualityCeiling = 50;

    agedBrie.updateQuality = function () {
        if (this.quality < qualityCeiling) this.quality++;
    };

    return (agedBrie);

}

const Shop = function (items) {
    this.items = items;
};

Shop.prototype.ageItems = function () {
    for (let item of this.items) item.age();
};

module.exports = {
    Item,
    Shop,
    makeAgedBrie
}