
const qualityFloor = 0;
const qualityCeiling = 50;

const specialItemBackstage = 'Backstage passes to a TAFKAL80ETC concert';
const specialItemSulfuras = 'Sulfuras, Hand of Ragnaros';
const specialItemBrie = 'Aged Brie';

const backstageFirstIncreaseRange = 10;
const backstageSecondIncreaseRange = 5;

class Item {

  constructor(name, sellIn, quality){
    
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;

  }

}
  
class Shop {

  constructor(items=[]){
    this.items = items;
  }

  // Handle quality && sellIn

  updateQuality() {

    for (let item of this.items){

      // Handle quality - before expirationDate is reached
      if (item.name != specialItemBrie && item.name != specialItemBackstage) {

        if (item.quality > qualityFloor) {
          if (item.name != specialItemSulfuras) {

            // Base case: quality decrease by time
            item.quality--;
          }
        }

      } else { // name == specialItemBrie || 'Backstage'

        if (item.quality < qualityCeiling) {

          // quality increases with time
          item.quality++;

          if (item.name == specialItemBackstage) {

            // Cumulative increase within range
            if (item.sellIn <= backstageFirstIncreaseRange) {
              if (item.quality < qualityCeiling) {
                item.quality++;
              }
            }

            if (item.sellIn <= backstageSecondIncreaseRange ) {
              if (item.quality < qualityCeiling) {
                item.quality++;
              }
            }

          }
        }

      }

      // Handle sellIn date 
      if (item.name != specialItemSulfuras) {
        item.sellIn--;
      }

      // Handle quality - when expirationDate is reached
      if (item.sellIn < 0) {

        if (item.name != specialItemBrie) {

          if (item.name != specialItemBackstage) {

            if (item.quality > qualityFloor) {

              if (item.name != specialItemSulfuras) {
                // name not 'Backstage', 'Sulfuras', AgedBrie' => base case
                item.quality--;
              }

            }

          } else { // name == 'Backstage pass'
            item.quality = 0;
          }

        } else { // name == specialItemBrie

          if (item.quality < qualityCeiling) {
            item.quality++;
          }

        }
      }

    }

  } // enf of updateQuality

} // enf of Shop

module.exports = {
  Item,
  Shop
}