(function(){
    signoutBtn = document.getElementById("signout");

    signoutBtn.addEventListener('click',e => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location = '../index.html';
          }).catch(function(error) {
            // An error happened.
          });
        });

}());
