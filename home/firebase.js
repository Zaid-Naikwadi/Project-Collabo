
    var config = {
      apiKey: "AIzaSyBBZrXTL-mFOHw9EzrQarO-Nrkl082C8Lk",
      authDomain: "project-collabo.firebaseapp.com",
      databaseURL: "https://project-collabo.firebaseio.com",
      projectId: "project-collabo",
      storageBucket: "project-collabo.appspot.com",
      messagingSenderId: "757376790492"
    };
    var FbApp = firebase.initializeApp(config);
    FbApp = FbApp.database();
    var userId = null;
    var user = null;
    var fullname = null;
    var projectNamee = ""; //projectName for displaying for notification
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            userId = firebase.auth().currentUser.uid;
            user = firebaseUser;
            console.log("this userid: "+userId);
            fullname = document.getElementsByClassName("fullname");
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

            
            checkNotifications(); //checking requests for projects
            
            console.log("hey ppnammee: "+projectNamee);
        }
        else{
            console.log("Not logged in ");
        }

    });

    /*function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function demo() {
      console.log('Taking a break...');
      await sleep(800000);
      console.log('Two seconds later');
    }*/
    
    document.getElementById('visualization').addEventListener('click',e=>{
      window.location = 'DashBoard_Visual.html';
    });

    

    signoutBtn = document.getElementById("signout");
    signoutBtn.addEventListener('click',e => {
        addLogoutTime();  //Add logout time and then signout
    });


    function addLogoutTime()
    {
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
              var database=firebase.database();
              var ref=database.ref('users/'+userId+'/dates');
              var data=
              {
                logouttime:time,
                logoutdate:today
              };
              ref.update(data).then(function(){
                    firebase.auth().signOut().then(function() {
                      //   // Sign-out successful.
                      window.location = '../index.html';});;
             });
      }



      /*Zaid Naikwadi
      * Add Project button click listener
      */

      addProjectBtn.addEventListener('click',e=>{
          window.location = 'addproject.html';
      });


      /*Zaid Naikwadi
      * For checking new requests for projects and setting notifications
      */

      function checkNotifications(){
        var numberOfNotifications = 0;
        
        firebase.database().ref('/users/' + userId+'/requests').on('value',function(snapshot) {
          if(snapshot.exists()){
          var temp = snapshot.val();
          var keys = Object.keys(temp);

          for(var i=0;i<keys.length;i++){
            projKey = keys[i];
            console.log("projKey: "+projKey);

            firebase.database().ref('/users/'+userId+'/requests/'+projKey).on('value',function(snapshot2){
              var temp2 = snapshot2.val();
              var keys2  = Object.keys(temp2);

              for(var j=0;j<keys2.length;j++){
                numberOfNotifications += 1;
                requestKey = keys2[j];
                var userIdOfRequestedUser;
                firebase.database().ref('/users/'+userId+'/requests/'+projKey+"/"+requestKey).on('value',function(snapshot3){
                  userIdOfRequestedUser = snapshot3.val().userid;
                  console.log("userIdOfRequestedUser: "+userIdOfRequestedUser);
                    
                });
                getProjectName(projKey,userIdOfRequestedUser);
                
                console.log("numberOfNotifications: "+numberOfNotifications);
                console.log("project Namee: "+projectNamee);
              }
            });
          }
        }else{
          console.log("no notifications");
          main();
        }

      });
   
     
    }

    $(document).ready(function(){
  
      $(document).on("click", ".singleNotification" , function() {
  
        var projKey = $(this).attr('id');
        var userIdOfRequestedUser = $(this).attr('value');
        console.log("useridofrequested after: "+userIdOfRequestedUser);
        console.log("key is "+projKey);
        window.location = "notificationDetails.html?"+projKey+"?"+userIdOfRequestedUser;

       // $(".test").modal('show');
       // $()
        //window.location = "project.html?"+pkey;
      });

      
    });


   function getProjectName(projKey,userIdOfRequestedUser){
      var usersIds;
      
      /*firebase.database().ref("/Projects").on('value',function(snapshot){
        var temp = snapshot.val();
        var keys  = Object.keys(temp);
        console.log("oh snapshot: "+snapshot.val());
        for(var i=0;i<keys.length;i++){
          usersIds = keys[i];
          console.log("usersids+ "+usersIds);
          firebase.database().ref("/Projects/"+usersIds+"/"+projKey).once('value').then(function(snapshot2){
            try{
              console.log("in try: proKey: "+projKey);
            projectName = snapshot2.val().title;
            console.log("The prj name is: "+projectName);
            }
            catch(err){
              console.log("Still not found: "+err);
            }
          });

        }
      });*/
      firebase.database().ref().child("Projects").once("value", function (snapshot) {
        snapshot.forEach(function(childSnapshot) {  
         // console.log("chavi: "+childSnapshot.key);
          childSnapshot.forEach(function(childChildSnapshot){
            if(childChildSnapshot.key == projKey){
            var temp = childChildSnapshot.val();
            var keys = Object.keys(temp);
            console.log("TITLE: "+childChildSnapshot.val().title);
            var projectName = childChildSnapshot.val().title;
            console.log("pname: "+projectName);
            projectNamee = projectName;
            console.log("pnamee: "+projectNamee);

            //append in notifications
            $("#requestNotifications").append("<li>"+
            "<a href='#' id="+projKey+" value="+userIdOfRequestedUser+" class='singleNotification'>"+
              "<i class='fa fa-users text-aqua'></i>You have new requests for project: <br>"+projectNamee+""+
            "</a>"+
          "</li>");
            main();
            }
          });
        });
      });
      
      

    }


    /*For my collaborated projects 
    * Zaid Naikwadi
    * 3/03/19
    */

