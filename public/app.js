angular
  .module('startrek', [])

  .service('mainService', function($http) {
    this.getPeople = function() {
      return $http.get('/api/people').then(
        function(response){
        return response.data.results;
      },
        function(error){
        console.log(error);
      })
    }

    this.postPerson = function(first, last, rank) {
      var sendObj = {
        firstName: first,
        lastName: last,
        rank: rank
      }
      console.log(2, sendObj)
      return $http.post('/api/people', sendObj)
      .then(function(response){
        return response;
        console.log(response)
      })
    },

    this.deletePerson = function(person) {
      console.log(66, person)
      return $http.delete(`/api/deletePerson/${person.id}`)
        .then(function(response) {
          return response;
        });
    }
  })



  .controller('mainController', function($scope, mainService) {
    mainService.getPeople()
      .then(function(response) {
        console.log(111, response)
        $scope.people = response;
      });

    $scope.postPerson = function(first, last, rank) {
      console.log(first, last, rank);
      mainService.postPerson(first, last, rank)
      .then(function(response) {
        console.log(222, response);
        mainService.getPeople()
          .then(function(response) {
            console.log(111, response)
            $scope.people = response;
          });;
      });
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.rank = '';
    }

    $scope.deletePerson = function(person) {
      console.log(44, person)
      mainService.deletePerson(person)
        .then(function(response) {
          console.log(response)
          mainService.getPeople()
            .then(function(response) {
              console.log(111, response)
              $scope.people = response;
            });
        });
    }
  })
