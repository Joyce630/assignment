
/*$(document).ready(function(){
  var items = [];
  var i = 0;
  var airtable_read_endpoint = "https://api.airtable.com/v0/apps76PVM2gVipuYx/Weather%20copy?api_key=keysAky6ucMNj4qo4 ";
  var dataSet = [];
  $.getJSON(airtable_read_endpoint, function(result){
      $.each(result.records, function(key,value){
          items = [];
          items.push(value.fields.Month);   //no space when naming the fields. 
          items.push(value.fields.averageTem);
          items.push(value.fields.Rainfall);
          /*items["Month"]=value.fields.Month; 
          items["averageTem"]=value.fields.averageTem; */
          //items["Rainfall"]=value.fields.Rainfall; 
             /* dataSet.push(items);
              console.log(items);
      }); // end .each
          console.log(dataSet);
  }); // end .getJSON

}); // document ready  */


/*var chart = c3.generate({
  bindto='#chart',
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ]

      //columns: dataSet,
      //type: 'bar'
      //type: {Rainfall: 'line'},
  },
  axis : {
    x:{label:'Month'}
  }
});*/

$(document).ready(function(){
    
  var items = [];
  var i = 0;
  var airtable_read_endpoint = "https://api.airtable.com/v0/apps76PVM2gVipuYx/Weather%20copy?api_key=keysAky6ucMNj4qo4 ";
  var dataSet = [];
  $.getJSON(airtable_read_endpoint, function(result){
      $.each(result.records, function(key,value){
          items = [];
          items.push(value.fields.Month);   //no space when naming the fields. 
          items.push(value.fields.averageTem);
          //items.push(value.fields.Rainfall);
          dataSet.push(items);
          console.log(items);    
      }); // end .each
          console.log(dataSet);


    var aaachart = c3.generate({
        data: {
            columns: dataSet,
            type : 'bar',
            //types:dataSet.Rainfall:'line',
            order: 'asc',
        },
        
    });


  }); // end .getJSON


  

});
