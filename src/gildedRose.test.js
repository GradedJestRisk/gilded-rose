var {Shop, Item} = require('./gildedRose');

describe("Gilded Rose", function() {



  describe('Standard items', () => {

    test("Quality decrease after one day", function() {

      function newItem(itemParams){
        return(new Item(itemParams.name, itemParams.sellIn, itemParams.quality));
      }

      // Arrange
      const standardItemParams = { name : "crackers" , quality : 20, sellIn: 10 };
      let standardItem = newItem(standardItemParams) ;

      const standardItemShortExpirationDateParams = { name : "bread" , quality : 5, sellIn: 2 };
      let standardItemShortExpirationDate = new newItem(standardItemShortExpirationDateParams) ;

      let shopWithStandardItems = new Shop([ standardItem, standardItemShortExpirationDate ]);
  
      // Act
      // One day after..
      shopWithStandardItems.updateQuality();
  
      // Assert 

      // Quality
      expect(standardItem.quality).toEqual(19);

      // SellIn
      expect(standardItem.sellIn).toEqual(9);
  
    }); 

    test.skip("Quality decrease after one day", function() {

      // Arrange
      // Add an item named 'foo' (nothing special)   
      
  
      // Act
      // One day after..
      shopWithStandardItems.updateQuality();
  
      const standardItemAfterDayOne = shopWithStandardItems.items[0];
  
      // Assert 
      // SellIn and Quality
      expect(standardItemAfterDayOne.quality).toEqual(19);
  
    }); 


  });


});
