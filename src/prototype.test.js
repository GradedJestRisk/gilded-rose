var {Shop, Item} = require('./prototype');

describe("Gilded Rose (prototype)", function() {

  function ageShopItems(shop, days){

    if(days <= 0 ) fail();

    for (let index = 1; index <= days; index ++) {
     shop.ageItems();      
    }

  }

  describe('Standard items', () => {

    let standardItem, standardItemShortExpirationDate;
    let shopWithStandardItems;

    beforeEach(()=>{

    //   function makeItem(itemParams){
    //     return(new Item(itemParams.name, itemParams.sellIn, itemParams.quality));
    //   }

      items = [];

      // Items
      const standardItemParams = { name : "crackers" , quality : 20, sellIn: 10 };
      standardItem = new Item(standardItemParams) ;
      items.push(standardItem);

      const standardItemShortExpirationDateParams = { name : "bread" , quality : 5, sellIn: 1 };
      standardItemShortExpirationDate = new Item (standardItemShortExpirationDateParams) ;
      items.push(standardItemShortExpirationDate);

      // Shop
      shopWithStandardItems = new Shop(items);

    });

    describe('Before expiry date, each day', () => {

      test.only("Quality decrease by one", function() {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shopWithStandardItems, 1);
    
        // Assert //

        expect(standardItem.quality).toEqual(19);
    
      }); 
  
      test("ExpirationDate decrease by one", function() {
  
        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shopWithStandardItems, 1);        
    
        // Assert //
        expect(standardItem.sellIn).toEqual(10 - 1);
    
      }); 

    });

    describe('After expiry date, each day', () => {

      test("Quality decrease by two", function() {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shopWithStandardItems, 2);
    
        // Assert //
        expect(standardItemShortExpirationDate.quality).toEqual(5 - 1 - 2);
    
      }); 
  
      test("But quality is never negative", function() {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shopWithStandardItems, 3);
    
        // Assert //
        expect(standardItemShortExpirationDate.quality).not.toBeLessThan(0);
    
      }); 

      test("sellIN can be negative though", function() {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shopWithStandardItems, 10);
    
        // Assert //
        expect(standardItemShortExpirationDate.sellIn).toBeLessThan(0);
    
      }); 
      
    });
   


  });

  describe('Special items', () => {

    describe('Aged brie', () => {

      
      let agedBrie;
      let shop;

      beforeEach(()=>{

        function makeItem(itemParams){
          return(new Item(itemParams.name, itemParams.sellIn, itemParams.quality));
        }
  
        const agedBrieParams = { name : 'Aged Brie' , quality : 40, sellIn: 10 };
        agedBrie = makeItem(agedBrieParams) ;
  
        shop = new Shop([ agedBrie]);
  
      });

      test('increase its quality with time ', () => {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shop, 5);
    
        // Assert //
        expect(agedBrie.quality).toEqual(40 + 5 * 1);
        
      });

      test('but never gets over 50', () => {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shop, 15);
    
        // Assert //
        expect(agedBrie.quality).not.toBeGreaterThan(50);
        
      });
      
    });

    describe('Sulfuras', () => {

      let sulfuras;
      let shop;

      beforeEach(()=>{

        function makeItem(itemParams){
          return(new Item(itemParams.name, itemParams.sellIn, itemParams.quality));
        }
          
        const sulfurasParams = { name : 'Sulfuras, Hand of Ragnaros' , quality : 80, sellIn: 100 };
        sulfuras = makeItem(sulfurasParams) ;
  
        shop = new Shop([sulfuras]);
  
      });

      test('never decreases its quality ', () => {

        // Arrange //
        // Done in beforeEach
  
        // Act //
        ageShopItems(shop, 100);
    
        // Assert //
         expect(sulfuras.quality).toBe(80);
        
      });

      test('never has to be sold, sellIn never decreases ', () => {

        // Arrange //
        // Done in beforeEach
        const initialSellIn = sulfuras.sellIn;
  
        // Act //
        ageShopItems(shop, 150);
    
        // Assert //
        expect(sulfuras.sellIn).toBe(initialSellIn);
       
        
      });
      
    });

    describe('Backstage passes', () => {

      let backstagePass;
      let shop;

      beforeEach(()=>{

        function makeItem(itemParams){
          return(new Item(itemParams.name, itemParams.sellIn, itemParams.quality));
        }
          
        const backstagePassParams = { name : 'Backstage passes to a TAFKAL80ETC concert' , quality : 5, sellIn: 20 };
        backstagePass = makeItem(backstagePassParams) ;
  
        shop = new Shop([backstagePass]);
  
      });


      describe('increase its quality as concert approaches', () => {

        test('by one if more than 10 days', () => {

          // Arrange //
          // Done in beforeEach
    
          // Act //
          // One day after..
          ageShopItems(shop, 2);
      
          // Assert //
    
          // Quality
          expect(backstagePass.quality).toBe( 5 +  (2 * 1) );
          
        });

        test('by 2 between 10 and 5 days', () => {

          // Arrange //
          // Done in beforeEach
    
          // Act //
          // One day after..
          ageShopItems(shop, 20 - 10 + 1);
      
          // Assert //
    
          // Quality
          expect(backstagePass.quality).toBe( 5 + (10 * 1) + (1 * 2) );
          
        });

        test('by 3 between 5 and 0 days', () => {

          // Arrange //
          // Done in beforeEach
    
          // Act //
          // One day after..
          ageShopItems(shop, (20 - 5) + 2);
      
          // Assert //
    
          // Quality
          expect(backstagePass.quality).toBe( 5 + (10 * 1) + (5 * 2) + (2 * 3) );
          
        });
        
      });
    
      describe('drops to 0 after concert ', () => {

        test('the actual day', () => {

          // Arrange //
          // Done in beforeEach
    
          // Act //
          ageShopItems(shop, 20 - 0);
      
          // Assert //
          expect(backstagePass.quality).toBe( 5 + (10 * 1) + (5 * 2) + (5 * 3) );
          
        });

        test('actually drops to 0 the day after ', () => {

          // Arrange //
          // Done in beforeEach
    
          // Act //
          ageShopItems(shop, 20 - 0 + 1);
      
          // Assert //
          expect(backstagePass.quality).toBe(0);
          
        });

        test('and forever ', () => {

          // Arrange //
          // Done in beforeEach
    
          // Act //
          ageShopItems(shop, 20 - 0 + 50);
      
          // Assert //
          expect(backstagePass.quality).toBe(0);
          
        });
          
      });

    });

  });


});
