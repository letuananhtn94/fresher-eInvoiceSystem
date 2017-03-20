'use strict';

app.factory('UserService', ['$http', '$q', function($http, $q){
	//Base URI
    var REST_SERVICE_URI = 'http://localhost:8080/EInvoice/user/';
    
    var factory = {
    	fetchAllUsers: fetchAllUsers,
        createUser: createUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getUsersByActive:getUsersByActive,
    };
    return factory;
    
    //Service call api get list user with pagable
    function fetchAllUsers(size, page) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "getAll?" + "size="+ size + "&page=" + page)
            .then(
            function (response) {
                deferred.resolve(response.data);                
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    //Service call api get list user with active and pagable
    function getUsersByActive(active, size, page) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "getByActive/" +active + "?size="+ size + "&page=" + page)
            .then(
            function (response) {
            	console.log("Service: " + response.data);
                deferred.resolve(response.data);                
            },
            function(errResponse){
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    //Service all api create user 
    function createUser(user) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "create", user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while creating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    //Service call api update user
    function updateUser(user, id) {
    	console.log(user);
        var deferred = $q.defer();
        if (user.active == true) {
        	user.active = '1';
        }
        if (user.active == false) {
        	user.active = '0';
        }
        $http.post(REST_SERVICE_URI + "update/" +id, user)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while updating User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    //Service call api remove user === NOT USING
    function deleteUser(id) {
        var deferred = $q.defer();
        $http.get(REST_SERVICE_URI + "delete/" +id)
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while deleting User');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
}]);
