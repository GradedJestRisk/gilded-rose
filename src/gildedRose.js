
const qualityFloor = 0;
const qualityCeiling = 50;

const specialItemBackstage = 'Backstage passes to a TAFKAL80ETC concert';
const specialItemSulfuras = 'Sulfuras, Hand of Ragnaros';
const specialItemBrie = 'Aged Brie';

const backstageFirstIncreaseRange = 10;
const backstageSecondIncreaseRange = 5;

function itemHasExpired(item) {
  return item.sellIn < 0;
}

class Item {
  
  constructor(name, sellIn, quality) {
    
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    
  }
  
}

function decreaseQuality(item) {
  if (item.name != specialItemSulfuras) {
    if (item.quality > qualityFloor) {
      // Base case: quality decrease by time
      item.quality--;
    }
  }
}

function increaseQuality(item) {
  if (item.quality < qualityCeiling) {
    item.quality++;
  }
}

function increaseBackstageQuality(item) {
  
  if (isItemBackstage(item)) {
    
    if (item.sellIn <= backstageFirstIncreaseRange) {
      increaseQuality(item);
    }
    
    if (item.sellIn <= backstageSecondIncreaseRange) {
      increaseQuality(item);
    }
  }
}

function isItemBackstage(item) {
  return item.name == specialItemBackstage;
}

function itemQualityDecreaseWithTime(item) {
  return item.name != specialItemBrie && item.name != specialItemBackstage && item.name != specialItemSulfuras;
}

function decreaseItemSellIn(item) {
  if (item.name != specialItemSulfuras) {
    item.sellIn--;
  }
}

class Shop {

  constructor(items = []) {
    this.items = items;
  }

  // Handle quality && sellIn

  updateQuality() {

    for (let item of this.items) {

      // Handle quality - before expirationDate is reached
      if (itemQualityDecreaseWithTime(item)) {

        decreaseQuality(item);

      } else { // name == specialItemBrie || 'Backstage'

        if (item.quality < qualityCeiling) {

          // quality increases with time
          item.quality++;

          // Cumulative increase within range
          increaseBackstageQuality(item);

        }

      }

      // Handle sellIn date 
      decreaseItemSellIn(item);

      // Handle quality - when expirationDate is reached
      if (itemHasExpired(item)) {

        if (item.name != specialItemBrie) {

          if (item.name != specialItemBackstage) {

            decreaseQuality(item);

          } else { // name == 'Backstage pass'
            item.quality = 0;
          }

        } else { // name == specialItemBrie

          increaseQuality(item);

        }
      }

    }

  } // enf of updateQuality

} // enf of Shop

module.exports = {
  Item,
  Shop
}
