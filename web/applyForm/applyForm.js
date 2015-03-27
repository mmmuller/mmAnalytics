(function(mod) {

	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/applyForm', {
			templateUrl: 'applyForm/applyForm.html',
			controller: 'applyFormCtrl'
		});
	}]);

	mod.controller('applyFormCtrl', function($scope,$http,$interval,ngTableParams, ngProgress) {
		ngProgress.start();
		$scope.nowVisible = 'TABLE'; //table,userLogs, typeLogs

		var count = 10;
		var saveCount = 0;

		$scope.helper = {
		};


		$scope.exportCsv = function($event, fileName) {
			$scope.helper.csv.generate($event, "report.csv");
			location.href=$scope.helper.csv.link();
		};

		var initTableData = function(){
			$scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: count          // count per page

            }, {
                total: $scope.logs.rows.length, // length of data
                getData: function($defer, params) {
                	$defer.resolve($scope.logs.rows.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
		}

		$scope.disablePagination = function() {
			saveCount = count;
			count = 9999999;
			initTableData();
		}

		$scope.enablePagination = function() {
			count = saveCount;
			initTableData();
		}

		$scope.paginationIsEnabled = function() {
			return count != 9999999;
		}

		var clone = function(obj) {
			if(obj == null || typeof(obj) != 'object')
				return obj;    
			var temp = new obj.constructor(); 
			for(var key in obj)
				temp[key] = clone(obj[key]);    
			return temp;
		}

		$http.get('/applyForm').success(function(data){   
			$scope.logs=data;
			initTableData();
			ngProgress.complete();
		});


	});

})(angular.module('applyForm', ['ngRoute']));