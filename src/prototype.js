Item = function(itemParams){
    this.name = itemParams.name;
    this.sellIn = itemParams.sellIn;
    this.quality = itemParams.quality;
}

Item.prototype.updateSellIn = function() {
  
    if(this.sellIn > 0 ) this.sellIn--;
};

Item.prototype.updateQuality = function() {
    // refactor to IIFE
    if(this.sellIn > 0 ){
        this.quality = this.quality - 1;
    } else {
        this.quality = this.quality - 2;
    }
};

Item.prototype.age = function() {
    this.updateSellIn();
    this.updateQuality();
}

Shop = function ( items ){
    this.items = items;
};

Shop.prototype.ageItems = function(){
    for (let item of this.items) item.age();
};

module.exports = {
    Item,
    Shop
}