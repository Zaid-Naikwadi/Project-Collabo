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


    


    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
           user = firebaseUser; //user is signed in 
           var userId = firebase.auth().currentUser.uid;
           console.log("userid: "+userId);
           console.log("email: "+firebaseUser.email);
        }
        else{
            console.log("not logged in");
        }
    });

}());