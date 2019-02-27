/////////////////////////////////////////////////////
  //Timeline project by kamlesh silag on 27/02/2019 
  // for dynamicalling adding messages on the screen and firebase
  /////////////////////////////////////////////////////

function main() {
    var projectKey = "-LZeub_mTXceGj4ZglaL";
    var ref = firebase.database().ref("timeline/"+projectKey+"/");

  //var projectTitleTimeline = document.getElementById("projectTitleTimeline");
  //to be done LATER ON
  try{
  var inputmessage = document.getElementById("comment");
  inputmessage.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {

      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() ;
      var username = fullname[0].innerHTML;
      console.log("username current: "+username);

      ref.push({
        message: inputmessage.value,
        username: username,
        time : time
      });


        $('.timeline').prepend("<li>"+
        "<i class='fa fa-comments bg-yellow'></i>"+

        "<div class='timeline-item'>"+
          "<span class='time'><i class='fa fa-clock-o'></i> "+time+"</span>"+

          "<h3 class='timeline-header'><a href='#'>"+fullname[0].innerHTML+"</a> sent a message</h3>"+

          "<div class='timeline-body'>"+
            inputmessage.value+
            "</div>"+

          "<div class='timeline-footer'>"+
            "<a class='btn btn-primary btn-xs'>Read more</a>&nbsp"+
            "<a class='btn btn-danger btn-xs delete'>Delete</a>"+
          "</div>"+
        "</div>"+
      "</li>");
    }

    inputmessage.innerHTML="";

});

}
catch(err){
    console.log("timeline err: "+err);
}




    /////////////////////////////////////////////////////
  // to set my messages on screen by kamlesh silag
  // to fetch from firebase and add on screen
  ///////////////////////////////////////////
  //////////

        var reftimeline = firebase.database().ref('timeline/'+projectKey+"/");
        reftimeline.on('value',function(snapshottimeline){

          var temptimeline = snapshottimeline.val();
          var keystimeline = Object.keys(temptimeline);

          for(var timeline = 0; timeline < keystimeline.length;timeline++)
          {
            //fetching data from firebase
            x = keystimeline[timeline];

            //data from firebase
            user_message = temptimeline[x].message;
            user_name = temptimeline[x].username;
            user_time = temptimeline[x].time;

            console.log("x usermessage : "+user_message);

            $('.timeline').prepend("<li>"+
        "<i class='fa fa-comments bg-yellow'></i>"+

        "<div class='timeline-item'>"+
          "<span class='time'><i class='fa fa-clock-o'></i> "+user_time+"</span>"+

          "<h3 class='timeline-header'><a href='#'>"+user_name+"</a> sent a message</h3>"+

          "<div class='timeline-body'>"+user_message+
            "</div>"+

          "<div class='timeline-footer'>"+
            "<a class='btn btn-primary btn-xs'>Read more</a>&nbsp"+
            "<a class='btn btn-danger btn-xs delete'>Delete</a>"+
          "</div>"+
        "</div>"+
      "</li>");
          }
        });



     /*   //Collaboration button by kamlesh silag
        //////////////////////////////////////

        var collaboButton = document.getElementById("collab");

        collaboButton.addEventListener('click',e=>
        {
            alert('clicked collb');
            var projectKey_ = document.getElementById('hiddenProjectKey').innerHTML;
            var refcollab = firebase.database().ref("users/requests/"+projectKey_+"/");
            refcollab.push({
              Userid : userId,
            });

        });
*/

    
}