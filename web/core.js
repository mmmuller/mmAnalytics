app.controller('logs_ctrl',function($scope,$http,$interval, ngTableParams){

	 $scope.helper = {
      csv: null //will be replaced by the export directive
    };

	$scope.exportCsv = function($event, fileName) {
      $scope.helper.csv.generate($event, "report.csv");
      location.href=$scope.helper.csv.link();
    };

	var initTableData = function(){
		$scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10          // count per page

            }, {
                total: $scope.logs.rows.length, // length of data
                getData: function($defer, params) {
                	$defer.resolve($scope.logs.rows.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
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
