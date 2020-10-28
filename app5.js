(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingList)
;

function ShoppingList() {

  var doo = {
    templateUrl: 'shoppingList5.html',
    scope: {
      list_Directive: '=myList',
      title_Diretive: '@myTitle'
    }
  };
  return doo;
};


// Shopping List 1
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory();

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  var Org_Title = "Shopping List 1 ";

  list.Title1 = Org_Title + "("+ list.getItems.length +")";

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity );
      list.Title1 = Org_Title + "("+ list.getItems.length +")";
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
    list.Title1 = Org_Title + "("+ list.getItems.length +")";
  };

};




// Shopping List 2 limited to 3 items
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {

  var list = this;

  var ShoppingList = ShoppingListFactory(3);

  list.ItemName = "";
  list.ItemQuantity = "";

  list.getItems = ShoppingList.getItems();

  list.addItem = function () {
    try {
      ShoppingList.addItem(list.ItemName, list.ItemQuantity );
    } catch (e) {
      list.errorMessage = e.message;
    } finally {

    }
  };

  list.RemoveItem = function (indexItem) {
    ShoppingList.RemoveItem(indexItem);
    list.errorMessage = "";
  };

};





function ShoppingList_Service(maxItem) {

  var service = this;

  var Items = [];

  service.addItem = function (itemName, itemQuantity) {

    if( ( maxItem === undefined ) ||
        ( maxItem !== undefined && Items.length < maxItem )
    )
    {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };

      Items.push(item);
    }else {
      throw new Error("Max items ("+ maxItem +") was reached ");
    }
  };

    service.getItems = function () {
      return Items;
    };

    service.RemoveItem = function (indexItem) {
      Items.splice( indexItem , 1 );
    };

};



function ShoppingListFactory() {

  var factory = function (maxItem) {
    return new ShoppingList_Service(maxItem);
  };
  return factory;
};


})();