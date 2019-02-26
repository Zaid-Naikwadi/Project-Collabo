(function(){
  var config = {
    apiKey: "AIzaSyBBZrXTL-mFOHw9EzrQarO-Nrkl082C8Lk",
    authDomain: "project-collabo.firebaseapp.com",
    databaseURL: "https://project-collabo.firebaseio.com",
    projectId: "project-collabo",
    storageBucket: "project-collabo.appspot.com",
    messagingSenderId: "757376790492"
  };
  firebase.initializeApp(config);

  var user = null;
  var userId;

  try {
   // Block of code to try
    var currenLocation=document.URL;
  var datetoken= currenLocation.split('?-')[1];
  datetoken=datetoken.split('#')[0];
  console.log("URL="+currenLocation);
  console.log("Token="+datetoken);
  }
  catch(err) {
    //Block of code to handle errors
    console.log("cannot split this URL");
  }
  

    //By kamlesh on 26/02/2019
    $(document).ready(function(){
  
      $(document).on("click", ".moreinfoBtn" , function() {
  
        var pkey = $(this).attr('value');
        console.log("key is "+pkey);
        window.location = "project.html?"+pkey;
      });
    });


    signoutBtn = document.getElementById("signout");

    signoutBtn.addEventListener('click',e => {
      addLogoutTime(userId,datetoken);  //Add logout time and then signout
        });

    addProjectBtn.addEventListener('click', e =>{
        window.location = "addproject.html";
    });

    var fullname = document.getElementsByClassName("fullname");
      /*  var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
          var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
          // ..
          console.log("username: "+username);
          console.log("userID: "+userId);
          console.log("data:"+snapshot.val());
        });*/

       /* function writeUserData(userId, name, email) {
          firebase.database().ref('users/' + userId).set({
            username: name,
            email: email
          });
        }*/

        firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
             // alert("writing");
             // writeUserData(firebaseUser.uid,firebaseUser.username,firebaseUser.email);
             //addNewProject();
             my_projects();
             all_projects();

             //project.html
             set_Project_Details();

             userId = firebase.auth().currentUser.uid;
             user = firebaseUser;

             //PASS ABOVE USERID TO A FUNCTION AND INSERT OR WRITE WHILE CODING
             //DON'T WRITE EVERYTHING HERE

             firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
              var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
              // ..
              console.log("username: "+username);
              console.log("userID: "+userId);
              console.log("data:"+snapshot.val());
              var i;
              for (i = 0; i < fullname.length; i++) { 
                fullname[i].innerHTML = username;
              }
              
            });

          }
          else{
              console.log("not logged in");
          }
      });







      /* For Adding new project
      /* Zaid Naikwadi 24/02/19
      /* 
                                */

      
      var title = document.getElementById("projectTitle");
      var description = document.getElementById("projectDescription");
      var submitBtn = document.getElementById("submitBtn");
      
      console.log("asdfasdfasdfasdf");
      

      submitBtn.addEventListener("click", e =>{
          console.log("in submit");
          var tags = document.getElementsByClassName("tag");
          writeAddProjectData(title.value,description.value,tags);
      });


      function writeAddProjectData(title,description,tags)
      {
        
          if(user){
            var userId = firebase.auth().currentUser.uid;
            console.log("Hey your user id: "+userId);

            projectKey = firebase.database().ref('Projects/'+userId+"/").push({
              title: title,
              description: description,
              userId : userId
            }).key;

            /*for(var i=0;i<tags.length;i++){
              console.log("Your tags: "+tags[i].innerHTML);
              firebase.database().ref('Projects/').child(projectKey).child('tags/').push({
                tag : tags[i].innerHTML
              });
              console.log("Key: "+projectKey);
            }*/

            var Alltags = {};

            for(var i=0;i<tags.length;i++){
              console.log("Your tags: "+tags[i].innerHTML);
              Alltags["tags"+i] = {"tag": tags[i].innerHTML};
            }

            firebase.database().ref('Projects/'+userId+"/"+projectKey+"/tags/").set(Alltags).then(function(){
              alert("Project successfully added");
              window.location = "home.html";
            });

          }
          else{
            console.log("How can you add project when you are not logged in");
          }
      }




      // For my projects displaying 
      // Added by kamlesh silag on 25/02/2019 
      /* 
                                */

      function my_projects()
      {

        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref('Projects/'+userId+"/");

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
        });


      }



    /*Akshay Akole
    * 25/02/2019
    * For Login time details
    */
   /* 
                                */

    function addLogoutTime(userId,datetoken)
    {
    //console.log("Logout=="+userId);
   // console.log("Date token"+datetoken);
    var t1=firebase.database().ref('users/'+userId+'/dates/-'+datetoken).once('value').then(function(snapshot) {
      var logindate = (snapshot.val() && snapshot.val().logindate) || 'Anonymous';
      // ..
      var logintime=snapshot.val().logintime;
      alert(logindate);
      var now=new Date();
      var dd = now.getDate();
          var mm = now.getMonth() + 1; //January is 0!
          var yyyy = now.getFullYear();

          if (dd < 10) {
            dd = '0' + dd;
          }

          if (mm < 10) {
            mm = '0' + mm;
          }

        var  today = dd + '/' + mm + '/' + yyyy;
      var time=now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
      //console.log("username: "+username);
      console.log("userID: "+userId);
      console.log("data:"+snapshot.val().logintime);
      var database=firebase.database();
        var ref=database.ref('users/'+userId+'/dates/-'+datetoken);
        var data=
        {
          logindate:logindate,
          logintime:logintime,
          logouttime:time,
          logoutdate:today
        };
        ref.update(data);
      // firebase.auth().signOut().then(function() {
      //   addLogoutTime(userId,datetoken);
      //   // Sign-out successful.
      //  // window.location = '../index.html';
      // }).catch(function(error) {
        // An error happened.
      }).then(function(){
        firebase.auth().signOut().then(function() {
          //   addLogoutTime(userId,datetoken);
          //   // Sign-out successful.
          window.location = '../index.html';});
      });
}


      //For all projects by kamlesh silag on 25/02/2019 afternoon

      /* 
                                */
      
      function all_projects()
      {
                
        var ref3 = firebase.database().ref('Projects/');
        ref3.on('value',function(snapshot3){

          var temp3 = snapshot3.val();
          var keys3 = Object.keys(temp3);

          for(var k = 0 ; k<keys3.length;k++)
          {
                  userId = keys3[k];
                  var ref = firebase.database().ref('Projects/'+userId+"/");

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

                      $(".rowallprojects").append("<div class='col-lg-15 col-xs-12'>"+
                      "<!-- small box -->"+
                      "<div class='small-box bg-aqua'>"+
                        "<div class='inner'>"+
                          "<h3>"+title+" "+k+"</h3>"+
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
          });
        }
      });
    
    }



    //Added by Kamlesh silag on 26/02/2019 for fetching project records from database
            /* | | | | | | | | | | | | | | | 
              | | | | | | | | | | | | | | | */

   function set_Project_Details()
   {
     //Getting ProjectKey from url
     try {
      // Block of code to try
            var currenLocation=document.URL;
            var datetoken= currenLocation.split('?-')[1];
            datetoken=datetoken.split('#')[0];
            console.log("URL="+currenLocation);
            console.log("Token="+datetoken);
        }
     catch(err) {
       //Block of code to handle errors
       console.log("cannot split this URL");
     }

      datetoken = '-'+datetoken;

      var txtproject_title = document.getElementById('projectTitle');
      var txtproject_description = document.getElementById('projectDescription');
      var txtproject_tags = document.getElementById('projecttags');

      var ptitle;
      var pdescription;
      var projectKey;
      var tags="";

      var ref = firebase.database().ref('Projects/');
      ref.on('value',function(snapshot3){

      var temp = snapshot3.val();
      var keys = Object.keys(temp);

      for(var i=0;i<keys.length;i++)
      {
                userId = keys[i];
                var ref2 = firebase.database().ref('Projects/'+userId+"/");

                ref2.on('value',function(snapshot){
                    
                  console.log("data : "+snapshot.val());

                  var temp2 = snapshot.val();
                  var keys2 = Object.keys(temp2);

                for(var j=0;j<keys2.length;j++)
                {
                    projectKey = keys2[j];
                    console.log("projectkey : "+projectKey);
                    if(projectKey==datetoken)
                      {
                        ptitle = temp2[projectKey].title;
                        pdescription = temp2[projectKey].description;
                        tags="";
                        


                        var projectKey = keys2[j];
                        var ref3 =firebase.database().ref('Projects/'+userId+'/'+projectKey+"/tags/");
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


                        
                        break;
                      }
                      
                }


      });

    }

   txtproject_title.innerHTML=ptitle;
   txtproject_description.innerHTML=pdescription;
   txtproject_tags.innerHTML=tags+"";
   
  });

  }
   
      


}());
