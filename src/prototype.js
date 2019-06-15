Item = function (itemParams) {
    this.name = itemParams.name;
    this.sellIn = itemParams.sellIn;
    this.quality = itemParams.quality;
}

Item.prototype.updateSellIn = function () {
    this.sellIn--;
};

Item.prototype.updateQuality = function () {

    // refactor to IIFE
    if (this.quality > 0) {
        if (this.sellIn > 0) {
            this.quality = this.quality - 1;
        } else {
            this.quality = this.quality - 2;
        }
    }
};

Item.prototype.age = function () {
    this.updateQuality();
    this.updateSellIn();
};

makeAgedBrie = function (agedBrieParams) {

    let agedBrie = new Item({ name: 'Aged Brie', sellIn: agedBrieParams.sellIn, quality: agedBrieParams.quality });

    agedBrie.updateQuality = function () { this.quality++; };

    return(agedBrie);

}



Shop = function (items) {
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