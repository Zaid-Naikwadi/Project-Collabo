//Added by Kamlesh silag on 26/02/2019 for fetching project records from database
            /* | | | | | | | | | | | | | | | 
              | | | | | | | | | | | | | | | */


function main()
   {
     //Getting ProjectKey from url
     try {
      // Block of code to try
            var currenLocation=document.URL;
            var projectToken= currenLocation.split('?-')[1];
            projectKey=projectToken.split('#')[0];
            console.log("URL="+currenLocation);
            console.log("Token="+projectToken);
        }
     catch(err) {
       //Block of code to handle errors
       console.log("cannot split this URL");
     }

      projectToken = '-'+projectToken;

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

    //Collaboration button by kamlesh silag
        //////////////////////////////////////

        var collaboButton = document.getElementById("collab");

        collaboButton.addEventListener('click',e=>
        {
            alert('clicked collb'+"id: "+uid+"userid:: "+userId);
            var projectKey_ = document.getElementById('hiddenProjectKey').innerHTML;
            var refcollab = firebase.database().ref("users/"+uid+"/requests/"+projectKey_+"/");
            refcollab.push({
              userid : userId
            });

        });

}