var {Shop, Item} = require('./gildedRose');

describe("Gilded Rose", function() {

  test.skip("should foo", function() {

    // Arrange
    // Add an item named 'foo' (nothing special)   
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);

    // Act
    // One day after..
    const items = gildedRose.updateQuality();

    // Assert 
    // SellIn and Quality
    expect(items[0].name).toEqual("fixme");

  });

});
