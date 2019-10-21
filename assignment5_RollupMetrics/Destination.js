function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
      
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
      
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace("active", "");
        }
      
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
      }
     
      $(document).ready(function() {
        $("button#show_air").on('click',function(){
                 $("div#airtable").show();
                 //$("h3").css("color","blue");
                 //$("h3").html("You clicked me.");
        });
        $("button#hide_air").on('click',function(){    //'click'是作用于"button#hide_air"的function
                 $("div#airtable").hide();
        });
      });
      

// Get the element with id="defaultOpen" and click on it (show the table when loading the page)
document.getElementById("defaultOpen").click();





