'use strict'

// Define the fascii app module
var fascii = angular.module('fascii', ['ngMaterial', 'ngMessages', 'ngclipboard']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').dark()
    .primaryPalette('green', {'default':'900'})
    .accentPalette('purple', {'default':'500'});
});

// database stuffs
//const db = low('fascii.json')

// Email search controller
fascii.controller('SearchFascii', SearchFascii);

function SearchFascii($timeout, $q, $log, $http, $scope) {
    var array=[];
    var self = this;

    $http.get("fascii.json").then(function (result) {
      array = result.data;
      init();
    });

    function init(){
      self.simulateQuery = true;
      self.isDisabled = false;
      self.querySearch = querySearch;
      self.selectedItemChange = selectedItemChange;
    }

    function selectedItemChange(item) {
      $scope.selected_fascii = item;
    }

    function querySearch(query) {
      console.log(array);
      var results = query ? array.filter(createFilterFor(query)) : array;
      console.log(results);
      return results;
    }

    function createFilterFor(query) {
        //  var lowercaseQuery = angular.lowercase(query);
        var lowercaseQuery = query;
        return function filterFn(item) {
            return (item.mood.indexOf(lowercaseQuery) === 0);
        };
    }
};

// toast controller
fascii.controller('ToastCtrl', ToastCtrl)

function ToastCtrl($scope, $mdToast){
  $scope.boomToast = function() {
      $mdToast.show(
         $mdToast.simple()
            .textContent('You\'ve been ASCII\'d!')
            .hideDelay(3000)
      );
  }
}
