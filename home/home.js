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
  var currenLocation=document.URL;
  var datetoken= currenLocation.split('?-')[1];
  datetoken=datetoken.split('#')[0];
  console.log("URL="+currenLocation);
  console.log("Token="+datetoken);

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
             my_projects();
             //displayAllProjects();  //home page displaying all projects
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
      var submitBtn = document.getElementById("submit");
      

      

      submitBtn.addEventListener("click", e =>{
          var tags = document.getElementsByClassName("tag");
          writeAddProjectData(title.value,description.value,tags);
      });

      function writeAddProjectData(title,description,tags){
        
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
              console.log("title : " +title);
              console.log("Description : " +description);

              $(".rowmyprojects").append("<div class='col-lg-15 col-xs-12'>"+
              "<!-- small box -->"+
              "<div class='small-box bg-aqua'>"+
                "<div class='inner'>"+
                  "<h3>"+title+"</h3>"+
                  "<p>description : "+description+"</p>"+
                  "<p>Tags : </p><p id='tags'><p id='tags'> </p>"+
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




      /*  Zaid Naikwadi 
      * 25/2/2019
      * For display all projects to user
      */

      function displayAllProjects(){
        var userId = firebase.auth().currentUser.uid;

       /* firebase.database.ref('Projects/').on('value',function(snapshot1){
            var temp1 = snapshot1.val();
            var keys1 = Object.keys(temp1);

            for(var j=0;j<keys1.length;j++){
              var p = keys1[j];
              var id = temp1[p].
            }
        });*/
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
              console.log("title : " +title);
              console.log("Description : " +description);

              $(".rowmyprojects").append("<div class='col-lg-15 col-xs-12'>"+
              "<!-- small box -->"+
              "<div class='small-box bg-aqua'>"+
                "<div class='inner'>"+
                  "<h3>"+title+"</h3>"+
                  "<p>description : "+description+"</p>"+
                  "<p>Tags : </p><p id='tags'><p id='tags'> </p>"+
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
  };



}());
