(function(){
    
    // Initialize Firebase
var config = {
    apiKey: "AIzaSyBBZrXTL-mFOHw9EzrQarO-Nrkl082C8Lk",
    authDomain: "project-collabo.firebaseapp.com",
    databaseURL: "https://project-collabo.firebaseio.com",
    projectId: "project-collabo",
    storageBucket: "project-collabo.appspot.com",
    messagingSenderId: "757376790492"
  };
  firebase.initializeApp(config);

  //Get elements
  var FirstName = document.getElementById('id_first_name');
  var LastName = document.getElementById('id_last_name');
  var txtEmail = document.getElementById('id_email');
  var txtPassword = document.getElementById('id_password');
  var btnSignup = document.getElementById('signup-start-now');

  //Added by Kamlesh Silag on 22/02/2018 for Login
  var btnLogin = document.getElementById('Login');
  var txtEmail1 = document.getElementById('id_email1');
  var txtPassword1 = document.getElementById('id_password1');

  //Added by kamlesh silag for more details popup
  var btnSubmit = document.getElementById("Submit");
  var userid ;
  var username;
  var userEmail;
  var collegeName = document.getElementById("id_CollegeName");
  var mobileNo = document.getElementById("id_MobileNo");
  var address = document.getElementById("id_Address");
  //var tags = document.getElementById("tags");
  


  /*btnSignup.addEventListener('click',e => {
      //Get email and password
      var email = txtEmail.value;
      var pass = txtPassword.value;
      var firstname = FirstName.value;
      var lastname = LastName.value;

      console.log("email: "+email);
      console.log("password: "+pass);

      const auth = firebase.auth();

      //signup
      const promise = auth.createUserWithEmailAndPassword(email,pass);
      console.log("done");

      promise
        .catch(e => console.log(e.message));
  });*/

  var flag = false; // to differentiate b/w signup and login

  //Login Added by Kamlesh on 22/02/2019
  btnLogin.addEventListener('click',e=>{
    var email = txtEmail1.value;
    var password = txtPassword1.value;

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(email,password);
    promise.then(function(){
      flag = true;
    })
    promise.catch(e=>alert(e.message));



  });

//Sign up by Zaid


  btnSignup.addEventListener('click',e => {
    var email = txtEmail.value;
    var password = txtPassword.value;
    var name = FirstName.value + " " + LastName.value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
    console.log("creation done");

  });


  function newfun(userId,name,email)
  {
    userid = userId;
    username = name;
    userEmail = email;
    $(".test3").modal('show');
  }

  btnSubmit.addEventListener('click',e=>
  {
      //alert(address)
      var tags = document.getElementsByClassName("tag");
      writeUserData(userid,username,userEmail,collegeName.value,address.value,mobileNo.value,tags);
      alert(userid + "   "+ userEmail);
      
  });


  /*firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });*/

 


  //Write data to database
  function writeUserData(userId, name, email,collegeName,Address,Mobileno,tags) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      collegename : collegeName,
      address : Address,
      mobileno : Mobileno
    });

    var Alltags = {};
    console.log(tags[0].innerHTML)
    for(var i=0;i<tags.length;i++){
      console.log("Your tags: "+tags[i].innerHTML);
      Alltags["tags"+i] = {"tag": tags[i].innerHTML};
    }

    firebase.database().ref('users/'+userId+"/skills/").set(Alltags).then(function(){
      window.location = "home/home.html";
    });
  }

  //Add a readtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
          //console.log(firebaseUser.uid);
          //console.log(FirstName.value+" "+LastName.value);
          if(!flag)
          {
              //userId = firebase.auth().currentUser.uid;
              //userEmail = firebase.auth().currentUser.email;
              newfun(firebaseUser.uid,FirstName.value+ " "+LastName.value,firebaseUser.email);
             //writeUserData(firebaseUser.uid,FirstName.value+" "+LastName.value,firebaseUser.email);
          }
          else 
          window.location = 'home/home.html';
      }
      else{
          console.log("not logged in");
      }
  });
}());