
$(document).ready(function(){

    $("button#get_data").click(function(){
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
                    dataSet.push(items);
                    console.log(items);
            }); // end .each
                console.log(dataSet);
        }); // end .getJSON
     }); // end button
}); // document ready



/*function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}*/

// Bar Chart Example
