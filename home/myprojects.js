// For my projects displaying 
      // Added by kamlesh silag on 25/02/2019 
      /* 
                                */
function main()
{
                                 var ref = firebase.database().ref('Projects/'+userId+"/");
                         
                                 ref.on('value',function(snapshot){
                                     console.log("data : "+snapshot.val());
                                     var temp = snapshot.val();
                                    if(snapshot.val()){
                                     var keys = Object.keys(temp);
                                     console.log(keys);
                                   
                                     for(var i=0;i<keys.length;i++)
                                     {
                                       var k = keys[i];
                                       var title = temp[k].title;
                                       var description = temp[k].description;
                                       var tags ="";
                                       console.log("title : " +title);
                                       console.log("Description : " +description);
                         
                                       //For tags fetching from database by kamlesh silag on 25/02/2019
                                       var projectKey = keys[i];
                                       console.log("key abhi : "+projectKey);
                                       var ref2 =firebase.database().ref('Projects/'+userId+'/'+projectKey+"/tags/");
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
                         
                                       $(".rowmyprojects").append("<div class='col-lg-15 col-xs-12'>"+
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
                                         "<a href='#' class='small-box-footer'>More info <i class='fa fa-arrow-circle-right'></i></a>"+
                                       "</div>"+
                                     "</div>")
                                     }
                                    }
                                    else{
                                      console.log("No my projects");
                                    }

                                 });

                                
                               
}