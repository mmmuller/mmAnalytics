(function(mod) {

	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/logs', {
			templateUrl: 'logs/logs.html',
			controller: 'logsCtrl'
		});
	}]);

	mod.controller('logsCtrl', function($scope,$http,$interval,ngTableParams, ngProgress, graphTool) {
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

		$http.get('/logs').success(function(data){    
			$scope.logs=data;
			initTableData();
			ngProgress.complete();
		});

		$http.get('/logs.user.graph').success(function(data){ 
			var tab = [];   
			tab.push(["Component","cost"]);
			$scope.logsUserGraph=data;
			angular.forEach(data.rows, function(value) {
				tab.push([String(value[Object.keys(value)[0]]), value[Object.keys(value)[1]]])
			});
			$scope.userGraph = graphTool.getPieChart();
			$scope.userGraph.data = tab;
		});

		$http.get('/logs.eventType.graph').success(function(data){ 
			var tab = [];   
			tab.push(["Component","cost"]);
			$scope.logsUserGraph=data;
			angular.forEach(data.rows, function(value) {
				tab.push([String(value[Object.keys(value)[0]]), value[Object.keys(value)[1]]])
			});
			$scope.eventTypeGraph = graphTool.getPieChart();
			$scope.eventTypeGraph.data = tab;

		});


	});

})(angular.module('logs', ['ngRoute']));