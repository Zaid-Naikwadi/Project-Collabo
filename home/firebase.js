
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
            main();
        }
        else{
            console.log("Not logged in ");
        }

    });


    

    signoutBtn = document.getElementById("signout");
    signoutBtn.addEventListener('click',e => {
        addLogoutTime(datetoken);  //Add logout time and then signout
          });
          var currenLocation=document.URL;
            // Block of code to try
            try{
            if(currenLocation.includes("home.html")){
          var datetoken= currenLocation.split('?-')[1];
           datetoken=datetoken.split('#')[0];
           console.log("URL="+currenLocation);
           console.log("Token="+datetoken);
          }else{
            console.log("this is not home");
          }
        }catch(err) {
            //Block of code to handle errors
            console.log("this url cannot be split"+err);
          }



    function addLogoutTime(datetoken)
    {
          firebase.database().ref('users/'+userId+'/dates/-'+datetoken).once('value').then(function(snapshot) {
            var logindate = (snapshot.val() && snapshot.val().logindate) || 'Anonymous';
            // ..
            console.log("datetoken: "+datetoken);
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

            console.log("userID from add logout time: "+userId);
            console.log("data from add logout time:"+snapshot.val().logintime);
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
            
            }).then(function(){
              firebase.auth().signOut().then(function() {
                //   // Sign-out successful.
                window.location = '../index.html';});
            });
      }



      /*Zaid Naikwadi
      * Add Project button click listener
      */

      addProjectBtn.addEventListener('click',e=>{
          window.location = 'addproject.html';
      });
