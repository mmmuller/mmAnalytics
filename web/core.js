app.controller('logs_ctrl',function($scope,$http,$interval,ngTableParams){

	var count = 10;
	var saveCount = 0;

	$scope.helper = {
	};

	$scope.chart = {
		"type": "PieChart",
		"data": [
		[
		"Component",
		"cost"
		],
		[
		"Software",
		100000
		],
		[
		"Hardware",
		100000
		],
		[
		"Services",
		100000
		]
		],
		"options": {
			"displayExactValues": true,
			"width": 600,
			"height": 300,
			"is3D": true,
			"chartArea": {
				"left": 10,
				"top": 10,
				"bottom": 0,
				"height": "100%"
			}
		},
		"formatters": {
			"number": [
			{
				"columnNum": 1,
				"pattern": "$ #,##0.00"
			}
			]
		},
		"displayed": true
	}

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

	$http.get('http://localhost:3000/logs').success(function(data){    
		$scope.logs=data;
		initTableData();
	});

	$http.get('http://localhost:3000/logs.user.graph').success(function(data){ 
		var tab = [];   
		tab.push(["Component","cost"]);
		$scope.logsUserGraph=data;
		angular.forEach(data.rows, function(value) {
			tab.push([String(value[Object.keys(value)[0]]), value[Object.keys(value)[1]]])
		});
		$scope.chart.data = tab;
	});



});
