(function(mod) {

	var clone = function(obj) {
		if(obj == null || typeof(obj) != 'object')
			return obj;    
		var temp = new obj.constructor(); 
		for(var key in obj)
			temp[key] = clone(obj[key]);    
		return temp;
	}

	mod.factory('graphTool', function() {
		return {
			getPieChart : function() {
				return clone({
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
						"width": 800,
						"height": 400,
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
				});
			}
		}
	});
	

})(angular.module('graphTool', ['ngRoute']));