// For my collaborated 
      // Added by Zaid Naikwadi on 3/03/2019 
      /* 
                                */

                               $(document).ready(function(){
  
                                $(document).on("click", ".moreInfoBtn" , function() {
                            
                                  var pkey = $(this).attr('id');
                                  console.log("key is "+pkey);
                                  window.location = "timeline.html?"+pkey;
                                });
                              });
                          
                               function main()
                               {
                                                                var ref = firebase.database().ref('users/'+userId+"/collaboratedProjects");
                                                        
                                                                ref.on('value',function(snapshot){
                                                                    console.log("data : "+snapshot.val());
                                                                    var temp = snapshot.val();
                                                                   if(snapshot.val()){
                                                                    var keys = Object.keys(temp);
                                                                    console.log(keys);
                                                                  
                                                                    for(var i=0;i<keys.length;i++)
                                                                    {
                                                                      var k = keys[i];
                                                                      var pkey = temp[k].projectKey;
                                                                      //var description = temp[k].description;
                                                                      //var tags ="";
                                                                      //console.log("title : " +title);
                                                                      //console.log("Description : " +description);

                                                                      firebase.database().ref('Projects');
                                                                      firebase.database().ref().child("Projects").once("value", function (snapshot2) {
                                                                        snapshot2.forEach(function(childSnapshot) {  
                                                                         // console.log("chavi: "+childSnapshot.key);
                                                                          childSnapshot.forEach(function(childChildSnapshot){
                                                                            if(childChildSnapshot.key == pkey){
                                                                            var temp = childChildSnapshot.val();
                                                                            var keys = Object.keys(temp);
                                                                            console.log("TITLE in collab: "+childChildSnapshot.val().title);
                                                                            var projectName = childChildSnapshot.val().title;
                                                                            var description = childChildSnapshot.val().description;
                                                                            var tags = childChildSnapshot.val().tags;
                                                                            var keykey = Object.keys(tags);
                                                                            console.log("desc"+description);
                                                                            console.log('tagss: '+tags);
                                                                                var alltags = "";
                                                                            for(var t=0;t<keykey.length;t++){
                                                                                var tag = keykey[t];
                                                                                console.log('taggggg: '+tag);
                                                                                var tagVal = tags[tag].tag;
                                                                                console.log("ttaggss: "+tagVal);
                                                                                alltags = alltags+tagVal+',';
                                                                            }
                                                                
                                                                            //append projects
                                                                            $(".rowmyprojects").append("<div class='col-lg-15 col-xs-12'>"+
                                       "<!-- small box -->"+
                                       "<div class='small-box bg-aqua'>"+
                                         "<div class='inner'>"+
                                           "<h3>"+projectName+"</h3>"+
                                           "<p><b>Description : </b>"+description+"</p>"+
                                           "<p><b>Tags : </b>"+alltags+"</p>"+
                                         "</div>"+
                                         "<div class='icon'>"+
                                           "<i class='ion ion-bag'></i>"+
                                         "</div>"+
                                         "<a href='#' id = "+pkey+" class='small-box-footer moreInfoBtn'>More info <i class='fa fa-arrow-circle-right'></i></a>"+
                                       "</div>"+
                                     "</div>");
                                                                            }
                                                                          });
                                                                        });
                                                                      });

                                                            }//for loop close
                                                        }
                                                    });
                               
                                                               
                                                              
                               }