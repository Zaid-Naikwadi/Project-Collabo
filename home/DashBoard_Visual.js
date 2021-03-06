function main()
{
    var countComp=0;
    var countMech=0;
    var countCivil=0;

    var ref3 = firebase.database().ref('Projects/');
    ref3.on('value',function(snapshot3){

          var temp3 = snapshot3.val();
          var keys3 = Object.keys(temp3);

          for(var k = 0 ; k<keys3.length;k++)
          {
                  id = keys3[k];
                  var ref = firebase.database().ref('Projects/'+id+"/");

                  ref.on('value',function(snapshot){
                    
                    console.log("data : "+snapshot.val());

                    var temp = snapshot.val();
                    var keys = Object.keys(temp);
                    console.log(keys);


                    for(var i=0;i<keys.length;i++)
                      {
                        var k = keys[i];
                        var title = temp[k].title;
                        var description = temp[k].description;
                        var branch = temp[k].branch;
                        var tags ="";
                        console.log("title : " +title);
                        console.log("Description : " +description);

                    //For tags fetching from database by kamlesh silag on 25/02/2019
                        var projectKey = keys[i];
                        console.log("key abhi : "+projectKey);
                        var ref2 =firebase.database().ref('Projects/'+id+'/'+projectKey+"/tags/");
                        ref2.on('value',function(snapshot2){
                        console.log("data2 : "+snapshot2.val());
                      
                        var temp2 = snapshot2.val();
                        var keys2 = Object.keys(temp2);
                        console.log(keys2);

                        for(var j= 0;j<keys2.length;j++)
                        {
                          var k2 = keys2[j];
                          if(j==0)
                            //For first time no comma
                            tags =tags+temp2[k2].tag+"";
                          else  
                            tags =tags+" , "+temp2[k2].tag;
                        }

                      });

                      if(branch=="computer"|| branch=="comp")
                    {
                        countComp+=1;
                        $(".comp").append("<div class='col-lg-15 col-xs-12'>"+
                      "<i><h2>"+branch+"</h2></i>"+
                      "<!-- small box -->"+
                      "<div class='small-box bg-aqua'>"+
                        "<div class='inner'>"+
                          "<h3>"+title+"</h3>"+
                          "<p><b>Description : </b>"+description+"</p>"+
                          "<p><b>Tags : </b>"+tags+"</p>"+
                        "</div>"+
                        "<div class='icon'>"+
                          "<i class='ion ion-bag'></i>"+
                        "</div>"+
                        //"<input type='hidden' name='moreinfohidden' id='moreinfohidden"+i+ "' value="+k+"></input>"+

                        "<a href='#' id='moreinfohidden"+i+ "' value="+k + " class='small-box-footer moreinfoBtn'>More info<i class='fa fa-arrow-circle-right'></i></a>"+
                      "</div>"+
                    "</div>")
                    }

                    else if(branch=="mechanical" || branch=="mech")
                    {
                        countMech+=1;
                    $(".mech").append("<div class='col-lg-15 col-xs-12'>"+
                    "<i><h2>"+branch+"</h2></i>"+
                    "<!-- small box -->"+
                    "<div class='small-box bg-green'>"+
                      "<div class='inner'>"+
                        "<h3>"+title+"</h3>"+
                        "<p><b>Description : </b>"+description+"</p>"+
                        "<p><b>Tags : </b>"+tags+"</p>"+
                      "</div>"+
                      "<div class='icon'>"+
                        "<i class='ion ion-bag'></i>"+
                      "</div>"+
                      //"<input type='hidden' name='moreinfohidden' id='moreinfohidden"+i+ "' value="+k+"></input>"+

                      "<a href='#' id='moreinfohidden"+i+ "' value="+k + " class='small-box-footer moreinfoBtn'>More info<i class='fa fa-arrow-circle-right'></i></a>"+
                    "</div>"+
                  "</div>")
                    }

                  else if(branch=="civil"|| branch=="CIVIL")
                  {
                      countCivil+=1;
                  $(".civil").append("<div class='col-lg-15 col-xs-12'>"+
                      "<i><h2>"+branch+"</h2></i>"+
                      "<!-- small box -->"+
                      "<div class='small-box bg-red'>"+
                        "<div class='inner'>"+
                          "<h3>"+title+"</h3>"+
                          "<p><b>Description : </b>"+description+"</p>"+
                          "<p><b>Tags : </b>"+tags+"</p>"+
                        "</div>"+
                        "<div class='icon'>"+
                          "<i class='ion ion-bag'></i>"+
                        "</div>"+
                        //"<input type='hidden' name='moreinfohidden' id='moreinfohidden"+i+ "' value="+k+"></input>"+

                        "<a href='#' id='moreinfohidden"+i+ "' value="+k + " class='small-box-footer moreinfoBtn'>More info<i class='fa fa-arrow-circle-right'></i></a>"+
                      "</div>"+
                    "</div>")
                  }
                      
            }
          });
        }

        google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Computer', countComp],
  ['Mechanical', countMech],
  ['Civil', countCivil]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Overall Projects overview', 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

        console.log("comp : "+countComp);
        console.log("mech : "+countMech);
        console.log("civil : "+countCivil );
  
      });

    }



     