var app = angular.module("myApp", ["ngRoute", "firebase"]);

app.config(function($routeProvider){
    $routeProvider.when('/add', {
        templateUrl: 'views/add.html'
    })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'searchController',
        paramExample: searchVal
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
        datas.$add({
            name: $scope.name,
            blood: $scope.blood
        });
        $scope.name = '';
        $scope.blood = '';
    }
});

app.controller("searchController", function($scope, $route, $firebaseObject, $firebaseArray){
    var ref = new Firebase("https://getblood.firebaseio.com/");

    $scope.getData = $firebaseObject(ref);

    var paramValue = $route.current.$$route.paramExample;
      console.log(paramValue); 
    // angular.forEach($scope.getData, function(value, key){
    //     console.log("f")
    // });


});