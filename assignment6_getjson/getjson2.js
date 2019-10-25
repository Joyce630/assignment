$(document).ready(function(){

    $("button#get_data").click(function(){
        var items = [];
        var i = 0;
        var airtable_read_endpoint = "https://api.airtable.com/v0/appYCuDi3IOZkGKWm/Destination%20Details?api_key=keysAky6ucMNj4qo4";
        var dataSet = [];
        $.getJSON(airtable_read_endpoint, function(result){
            $.each(result.records, function(key,value){
                items = [];
                items.push(value.fields.Destination);   //no space when naming the fields. 
                items.push(value.fields.City);
                items.push(value.fields.BriefDescription);
                items.push(value.fields.OpeningHours);
                items.push(value.fields.Ticket);
                items.push(value.fields.SceneinJOJO);
                items.push(value.fields.DestinationLink);
                    dataSet.push(items);
                    console.log(items);
            }); // end .each
                console.log(dataSet);

             $('#jsontable').DataTable({
                 data: dataSet,
                 retrieve: true,    //retrieve: this parameter will cause DataTables to simply return the object that has already been set up - it will not take account of any changes you might have made to the initialisation初始化 object passed to DataTables
                 columns: [
                    {title:"Destination", defaultContent:""},
                    {title:"City", defaultContent:""},
                    {title:"BriefDescription", defaultContent:""},
                    {title:"OpeningHours", defaultContent:""},
                    {title:"Ticket", defaultContent:""},
                    {title:"SceneinJOJO", defaultContent:""},
                    {title:"DestinationLink", defaultContent:""},
                 ]
             }); //end .dataTable
             
             
            
           


        }); // end .getJSON
     }); // end button




}); // document ready
