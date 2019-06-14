
const qualityFloor = 0;
const qualityCeiling = 50;

const specialItemBackstage = 'Backstage passes to a TAFKAL80ETC concert';
const specialItemSulfuras = 'Sulfuras, Hand of Ragnaros';
const specialItemBrie = 'Aged Brie';

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

    for (var i = 0; i < this.items.length; i++) {


      // Handle quality - before expirationDate is reached
      if (this.items[i].name != specialItemBrie && this.items[i].name != specialItemBackstage) {

        if (this.items[i].quality > qualityFloor) {
          if (this.items[i].name != specialItemSulfuras) {

            // Base case: quality decrease by time
            this.items[i].quality--;
          }
        }

      } else { // name == specialItemBrie || 'Backstage'

        if (this.items[i].quality < qualityCeiling) {

          // quality increases with time
          this.items[i].quality++;

          if (this.items[i].name == specialItemBackstage) {

            // Cumulative increase within range
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < qualityCeiling) {
                this.items[i].quality++;
              }
            }

            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < qualityCeiling) {
                this.items[i].quality++;
              }
            }

          }
        }

      }

      // Handle sellIn date 
      if (this.items[i].name != specialItemSulfuras) {
        this.items[i].sellIn--;
      }

      // Handle quality - when expirationDate is reached
      if (this.items[i].sellIn < 0) {

        if (this.items[i].name != specialItemBrie) {

          if (this.items[i].name != specialItemBackstage) {

            if (this.items[i].quality > qualityFloor) {

              if (this.items[i].name != specialItemSulfuras) {
                // name not 'Backstage', 'Sulfuras', AgedBrie' => base case
                this.items[i].quality--;
              }

            }

          } else { // name == 'Backstage pass'
            this.items[i].quality = 0;
          }

        } else { // name == specialItemBrie

          if (this.items[i].quality < qualityCeiling) {
            this.items[i].quality++;
          }

        }
      }

    }

    return this.items;

  } // enf of updateQuality

} // enf of Shop

module.exports = {
  Item,
  Shop
}