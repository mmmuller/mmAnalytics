app.controller('logs_ctrl',function($scope,$http,$interval,ngTableParams){

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



	load_data();
	$interval(function(){
		load_data();
	},30000);
	function load_data(){
		$http.get('http://localhost:3000/logs').success(function(data){    
			$scope.logs=data;
			initTableData();
		});
	};
});
