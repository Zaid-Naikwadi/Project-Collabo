function main(){

    try {
        // Block of code to try
              var currenLocation=document.URL;
              var projectToken= currenLocation.split('?-')[1];
              projectKey=projectToken.split('#')[0];
              console.log("URL="+currenLocation);
              console.log("Token="+projectToken);
    }
    catch(err) {
                //Block of code to handle errors
                console.log("cannot split this URL");
        }
              
    
    //for users added to projects
    var temp , i;
    var keys;
    var refusers = firebase.database().ref("collaborate/-"+projectToken+"/");
    refusers.on('value',function(snapshot){
      temp = snapshot.val();
      if(temp)
      {
        keys = Object.keys(temp);
        for(i=0;i<keys.length;i++)
            {
                var k = keys[i];
                var username = temp[k].username;
                var userid = temp[k].userid;

                $(".form-group").append("<button style='background-color:red; color:white; width:100px ; margin-left:140px' class=btn btn-sm btn-info>"+username+"</button>&nbsp&nbsp"+
                "<input type='text' id='rating"+i+"'class='inputrate' width=20px tempvalue='"+userid+"'></input><br><br>");

                
            }
      }
});

    var reference = firebase.database().ref("users/");
    var submit = document.getElementById("submitBtn");
    submit.addEventListener("click",function(event){
        for(var x= 0; x<i;x++)
        {
            var userRating = document.getElementById("rating"+x).value;
            var userid = $('#rating'+x).attr('tempvalue');

            //need to fetch already store rating and compute rating average

            reference.child(userid).update({
                rating: userRating
            });
            
        }
    }) ;    

}
