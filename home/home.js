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

    signoutBtn = document.getElementById("signout");

    signoutBtn.addEventListener('click',e => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location = '../index.html';
          }).catch(function(error) {
            // An error happened.
          });
        });

        /*function writeUserData(userId, name, email) {
          firebase.database().ref('users/' + userId).set({
            username: name,
            email: email
          });
        }

        firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
              alert("writing");
              writeUserData(firebaseUser.uid,"asdfasdf",firebaseUser.email);
          }
          else{
              console.log("not logged in");
          }
      });*/

}());
