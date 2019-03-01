
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
            main();
        }
        else{
            console.log("Not logged in ");
        }

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
        
      }
