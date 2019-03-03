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
                console.log("yaha user id: "+userid);

                $(".form-group").append("<button style='background-color:red; color:white; width:100px ; margin-left:140px' class=btn btn-sm btn-info>"+username+"</button>&nbsp&nbsp"+
                "<input type='text' id='rating"+i+"'class='inputrate' width=20px tempvalue='"+userid+"'></input><br><br>");

                
            }

            console.log("sdafffffffff "+$('#rating0').attr('tempvalue'));
            console.log("sdaf "+$('#rating1').attr('tempvalue'));
      }
});

    var reference = firebase.database().ref("users/");
    var submit = document.getElementById("submitBtn");
    var useriid;
    submit.addEventListener("click",function(event){
        console.log('i is: '+i);
        for(var x= 0; x<i;x++)
        {
            var userRating = document.getElementById("rating"+x).value;
            var str = '#rating'+x;
            console.log('str is'+str);
            useriid = $(str).attr('tempvalue');
            console.log("usrid kamlesh ki bhr se: "+useriid);
            firebase.database().ref('users/'+useriid+'/').once('value',function(snapshot){
                console.log("usrid kamlesh ki: "+useriid);
                console.log("aarahi : "+snapshot.val().rating);
                userRating = Number(userRating) + snapshot.val().rating;
                console.log("usrraing jarahi ander: "+userRating);
            }).then(function(){
                console.log("usrraing jarahi: "+userRating);
                reference.child(useriid).update({
                    rating: Number(userRating)
                });

            });

               
            //need to fetch already store rating and compute rating average

           
            
        }
    }) ;    

}
