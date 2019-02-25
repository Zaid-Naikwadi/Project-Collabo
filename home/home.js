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

    signoutBtn = document.getElementById("signout");

    signoutBtn.addEventListener('click',e => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location = '../index.html';
          }).catch(function(error) {
            // An error happened.
          });
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
             var userId = firebase.auth().currentUser.uid;
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





}());
