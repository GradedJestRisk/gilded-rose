var {Shop, Item} = require('./gildedRose');
describe("Gilded Rose", function() {

  it.skip("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("fixme");
  });

});
