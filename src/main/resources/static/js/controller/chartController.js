app.controller('ChartController',[ '$scope', '$filter', 'ReportService', function($scope, $filter, ReportService){
	var self = this;
    var reports=[];
    var eb = [];
    var pb = [];
    var ib = [];
    var wb = [];
    var dt = [] ;
    var day ;
    var totalpb = 0;
    var totaleb = 0;
    var totalib = 0;
    var totalwb = 0;
    var tpb =[];
    var teb =[];
    var tib =[];
    var twb =[];
   
    
   $scope.size='0';
   $scope.currentpage = '10';
    
    fetchAllReport();
//	$scope.myData = [[1,4,5,5,10], [9,3,4,5,6],[11,8,5,5,10],[10,4,5,5,9]] ;
    function fetchAllReport(){
    	$scope.dateStart = '2016-01-10';
    	$scope.dateEnd = '2016-04-10';
    	var x = $scope.dateStart;
    	x = new Date(x);
    	//console.log(x.getMonth());
    	//console.log(x.getFullYear());
    	var y = $scope.dateEnd;
    	y = new Date(y);
    	//console.log(y.getMonth());
    	
    	ReportService.fetchAllReport($scope.dateStart, $scope.dateEnd,$scope.size,  $scope.currentpage)
            .then(
            function(d) {
            	reports = d.content;	
            	//$scope.totalElements = d.totalElements;
            	//console.log("d.totalElements" + d.totalElements);
            	//console.log('reports=' + reports);
            	var a = new Date(reports[0].date);
                dt.push(a.getTime());
            	//console.log('dt' + dt);
         if (x.getFullYear() == y.getFullYear())
        	{
            	for ( i = x.getMonth();i<=y.getMonth();i++){
            		
	           	for(var temp in reports){
	           		day = new Date(reports[temp].date);
	           		
	           		//console.log('day    ' + day.getMonth());
	   
	           		if (day.getMonth() ==  i)
	           			{
	           			switch(reports[temp].idType.code) {
	           		   case "PB":
	           		       pb.push(reports[temp].grandTotal);
	           		       break;
	           		   case "EB":
	           		       eb.push(reports[temp].grandTotal);
	           		       break;
	           		   case "IB":
	           		       ib.push(reports[temp].grandTotal);
	           		       break;
	           		   case "WB":
	           		       wb.push(reports[temp].grandTotal);
	           		       break;
	           		   default: console.log("Nothing");
	           		       break;
	           		}
	           			}
	           		
	           	}
            	}
        	}
         else {
        	 
	        	for ( i = x.getMonth();i<=(y.getMonth() + 12);i++){
            		
	           	for(var temp in reports){
	           		day = new Date(reports[temp].date);
	           		
	           		//console.log('day    ' + day.getMonth());
	   
	           		if (day.getMonth() ==  i)
	           			{
	           			switch(reports[temp].idType.code) {
	           		   case "PB":
	           		       pb.push(reports[temp].grandTotal);
	           		       break;
	           		   case "EB":
	           		       eb.push(reports[temp].grandTotal);
	           		       break;
	           		   case "IB":
	           		       ib.push(reports[temp].grandTotal);
	           		       break;
	           		   case "WB":
	           		       wb.push(reports[temp].grandTotal);
	           		       break;
	           		   default: console.log("Nothing");
	           		       break;
	           		}
	           			}
	           		
	           	}
            	}
         }
         for(i=0;i<pb.length;i++){
        	 totalpb += pb[i];
         }
         for(i=0;i<eb.length;i++){
        	 totaleb += eb[i];
         }
         for(i=0;i<ib.length;i++){
        	 totalib += ib[i];
         }
         for(i=0;i<wb.length;i++){
        	 totalwb += wb[i];
         }
         
	           	
//	           	console.log('final' + '' + pb);
//	           	console.log('final' + ''  + eb);
//	           	console.log('final' + ''  + wb);
//	           	console.log('final' + ''  + ib);
	           	
	        	tpb.push(totalpb);
	        	teb.push(totaleb);
	        	tib.push(totalib);
	        	twb.push(totalwb);

            	
            	//reports.push(item);
            },
            function(errResponse){
                console.error('Error while fetching Invoice');
            }
        );
    }
    
    
  //  $scope.myData = [pb,eb];
	$scope.myObj = {  
			
			               
			                   "type":"bar",
			                  
			                   "scale-x":{
			                       "min-value":dt,
			                       "step":2629743000,
			                       
		                      "transform":{
		                           "type":"date",
			                           "all":"%m.%Y"
		                       }
			                   },
			                   "series":[
									{  'values': pb,
									   backgroundColor : "#FAEE00"  ,
									   	
									},  
									{  'values':eb,
									   backgroundColor : "#A0FFEE"  
									   	
									} ,
									
									{  'values':wb,
									   backgroundColor : "green"  
									   	
									} ,
									
									{  'values':ib,
									   backgroundColor : "red"  
									   	
									} ,
									
									
			                   ]
			               
			           
			};  
	$scope.myObj1 = {
			   type: "pie",
			   title: {
			     textAlign: 'center',
			     text: "Pie Chart"
			   },
			   plot: {
			     slice: 50 //to make a donut
			   },
			   series: [{
			     values: tpb,
			     text: "Total Commits"

			   },
			   {
			     values: teb,
			     text: "Issues Solved"

			   }, {
			     values: tib,
			     text: "Issues Submitted"
			   }, {
			     values: twb,
			     text: "Number of Clones"

			   }]
			 };
}]);