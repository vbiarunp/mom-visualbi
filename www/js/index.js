var app = angular.module("myApp", ["ngRoute", "firebase"]);

app.config(function($routeProvider){
    $routeProvider.when('/add', {
        templateUrl: 'views/add.html'
    })
    .when('/search/:name', {
        templateUrl: 'views/search.html',
        controller: 'searchController',
    })
    .when('/home', {
        templateUrl: 'views/home.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
});

app.controller("data", function($scope, $firebaseObject, $firebaseArray){
    var ref = new Firebase("https://getblood.firebaseio.com/");
    $scope.data = $firebaseObject(ref);
    var datas = $firebaseArray(ref);
    $scope.addData = function(){
      var flag = 0;
      var name = $scope.name;
      var bloodType = $scope.blood;
      var phoneNo = $scope.phonenumber;
      var place = $scope.place;
      angular.forEach($scope.data, function(value, key){
          if(phoneNo == value.phone){
            flag = 1;
          }
      });

      if(flag == 0){
        datas.$add({
            name: name,
            blood: bloodType,
            phone: phoneNo,
            place: place
        });
        $scope.name = '';
        $scope.blood = '';
        $scope.phonenumber = '';
        $scope.place = '';
      }else{
        alert("The phone number is already registered")
      }
    }
});

app.controller("searchController", function($scope, $routeParams, $firebaseObject, $firebaseArray){
  var searchVal = $routeParams.name;
  var ref = new Firebase("https://getblood.firebaseio.com/");
  var data = $firebaseArray(ref);
  $scope.filterData = [];
  data.$loaded()
    .then(function(){
      angular.forEach(data, function(value, key){
          if(searchVal == value.blood)
            $scope.filterData.push(value)
      });
    });

});
