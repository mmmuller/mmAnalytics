app.controller('logs_ctrl',function($scope,$http,$interval, ngTableParams){

	load_data();
	$interval(function(){
		load_pictures();
	},30000);
	function load_data(){
		$http.get('http://localhost:3000/logs').success(function(data){    
			$scope.logs=data;
		});
	};
});
