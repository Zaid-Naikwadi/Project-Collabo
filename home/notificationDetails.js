
//Added by Kamlesh silag on 26/02/2019 for fetching project records from database
            /* | | | | | | | | | | | | | | | 
              | | | | | | | | | | | | | | | */


              function main()
              {
                //Getting ProjectKey from url
                try {
                 // Block of code to try
                       var currenLocation=document.URL;
                       var projectToken= currenLocation.split('?')[1];
                       var userIdOfRequested = currenLocation.split('?')[2];
                       userIdOfRequested = userIdOfRequested.split("#")[0];
                       projectKey=projectToken.split('#')[0];
                       console.log("userid of requested: "+userIdOfRequested);
                       console.log("URL="+currenLocation);
                       console.log("Token="+projectToken);
                   }
                catch(err) {
                  //Block of code to handle errors
                  console.log("cannot split this URL");
                }
           
                 //projectToken = '-'+projectToken;
           
                 var txtproject_title = document.getElementById('projectTitle');
                 var txtproject_description = document.getElementById('projectDescription');
                 var txtproject_tags = document.getElementById('projecttags');
                 var txthiddenProjectKey = document.getElementById('hiddenProjectKey');
           
                 var ptitle = "";
                 var pdescription = "";
                 var tags="";
                 var uid= "";
           
                 var ref = firebase.database().ref('Projects/');
                 ref.on('value',function(snapshot3){
           
                 var temp = snapshot3.val();
                 var keys = Object.keys(temp);
           
                 for(var i=0;i<keys.length;i++)
                 {
                           id = keys[i];
                           var ref2 = firebase.database().ref('Projects/'+id+"/");
           
                           ref2.on('value',function(snapshot){
                               
                             console.log("data : "+snapshot.val());
           
                             var temp2 = snapshot.val();
                             var keys2 = Object.keys(temp2);
           
                           for(var j=0;j<keys2.length;j++)
                           {
                               projectKey = keys2[j];
                               console.log("projectkey : "+projectKey);
                               if(projectKey==projectToken)
                                 {
                                   console.log("projectkeyyy : "+projectKey);
                                   ptitle = temp2[projectKey].title;
                                   pdescription = temp2[projectKey].description;
                                   tags="";
                                   
           
           
                                   var projectKey = keys2[j];
                                   var ref3 =firebase.database().ref('Projects/'+id+'/'+projectKey+"/tags/");
                                   ref3.on('value',function(snapshot2){
           
                                 
                                   var temp3 = snapshot2.val();
                                   var keys3 = Object.keys(temp3);
           
                                   for(var k=0;k < keys3.length;k++)
                                   {
                                     var k2 = keys3[k];
                                     if(k==0)
                                       //For first time no comma
                                       tags =tags+temp3[k2].tag+"";
                                     else  
                                       tags =tags+" , "+temp3[k2].tag;
                                   }
           
                                 });
                                 uid = id;
                                   break;
                                 }
                                 
                           }
           
           
                 });
           
               }
           
             txthiddenProjectKey.innerHTML=projectToken;
              txtproject_title.innerHTML=ptitle;
              txtproject_description.innerHTML=pdescription;
              txtproject_tags.innerHTML=tags+"";
              
             });


             firebase.database().ref("users/"+userIdOfRequested).once('value').then(function(snapshot1){
                document.getElementById('requestedUserName').innerHTML = snapshot1.val().username;
                document.getElementById('requestedUserPoints').innerHTML = snapshot1.val().rating;
                var skillstxt = document.getElementById('requestedUserSkills');
                firebase.database().ref("users/"+userIdOfRequested+"/skills").once('value').then(function(snapshot2){
                    var temp4 = snapshot2.val();
                    var keys4 = Object.keys(temp4);

                    for(var j=0;j<keys4.length;j++){
                      skill = keys4[j];  
                      skillstxt.innerHTML = skillstxt.innerHTML + temp4[skill].tag + ",";
                    }
                      
                });
             })
           
               //Collaboration button by kamlesh silag
                   //////////////////////////////////////
           
               /*    var collaboButton = document.getElementById("collab");
           
                   collaboButton.addEventListener('click',e=>
                   {
                       alert('clicked collb'+"id: "+uid+"userid:: "+userId);
                       var projectKey_ = document.getElementById('hiddenProjectKey').innerHTML;
                       var refcollab = firebase.database().ref("users/"+uid+"/requests/"+projectKey_+"/");
                       refcollab.push({
                         userid : userId
                       }).then(function(){
                         alert("Request send successfully!");
                         window.location = "home.html";
                       });
           
                   });*/
           

                   /*For Accepting collaboration request*/
                   document.getElementById('accept').addEventListener('click',e=>{

                        firebase.database().ref('users/'+userIdOfRequested+'/collaboratedProjects').push({
                          projectKey: projectToken
                        });

                        firebase.database().ref('users/'+userId+'/collaboratedProjects').push({
                          projectKey: projectToken
                        });

                        firebase.database().ref('collaborate/'+projectToken).push({
                            username: document.getElementById('requestedUserName').innerHTML,
                            userid: userIdOfRequested
                        });

                        firebase.database().ref('collaborate/'+projectToken).push({
                            username: document.getElementsByClassName('fullname')[0].innerHTML,
                            userid: userId
                        }).then(function(){
                            alert('Request Accepted successfully!');
                            window.location = 'home.html';
                        });
                   });

           }