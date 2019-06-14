const qualityCeiling = 50;

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
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {

        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {

            // Base case: quality decrease by time
            this.items[i].quality = this.items[i].quality - 1;
          }
        }

      } else { // name == 'Aged Brie' || 'Backstage'

        if (this.items[i].quality < qualityCeiling) {

          // quality increases with time
          this.items[i].quality = this.items[i].quality + 1;

          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {

            // Cumulative increase within range
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < qualityCeiling) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < qualityCeiling) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

          }
        }

      }

      // Handle sellIn date 
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // Handle quality - when expirationDate is reached
      if (this.items[i].sellIn < 0) {

        if (this.items[i].name != 'Aged Brie') {

          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {

            if (this.items[i].quality > 0) {

              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                // name not 'Backstage', 'Sulfuras', AgedBrie' => base case
                this.items[i].quality = this.items[i].quality - 1;
              }

            }

          } else { // name == 'Backstage pass'
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }

        } else { // name == 'Aged Brie'

          if (this.items[i].quality < qualityCeiling) {
            this.items[i].quality = this.items[i].quality + 1;
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