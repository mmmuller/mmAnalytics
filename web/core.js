app.controller('logs_ctrl',function($scope,$http,$interval){
  load_pictures();
  $interval(function(){
    load_pictures();
  },30000);
  function load_pictures(){
  $http.get('http://localhost:3000/logs').success(function(data){    
    $scope.logs=data;
  });
  };
});
