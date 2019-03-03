function main() {


  //to show timeline
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

       var selectedFile;

       var reftimeline = firebase.database().ref('timeline/-'+projectToken+"/");
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
           user_flag = temptimeline[x].flag;

           //console.log("x usermessage : "+user_message);

           if(user_flag==0)
           {
                     console.log('user_flag==0');
                           $('.timeline').prepend("<li>"+
                       "<i class='fa fa-comments bg-yellow'></i>"+

                       "<div class='timeline-item'>"+
                         "<span class='time'><i class='fa fa-clock-o'></i> "+user_time+"</span>"+

                         "<h3 class='timeline-header'><a href='#'>"+user_name+"</a> sent a message</h3>"+

                         "<div class='timeline-body'><pre>"+user_message+
                           "</pre></div>"+

                         "<div class='timeline-footer'>"+
                           "<a class='btn btn-primary btn-xs'>Read more</a>&nbsp"+
                           "<a class='btn btn-danger btn-xs delete'>Delete</a>"+
                         "</div>"+
                       "</div>"+
                     "</li>");
           }
           else if(user_flag==1)
           {
                     user_file_name = temptimeline[x].filename;
                     console.log("user_File_name :"+user_file_name);

                     console.log("message url : "+user_message);

                     $('.timeline').prepend("<li>"+
                     "<i class='fa fa-camera bg-purple'></i>"+

                     "<div class='timeline-item'>"+
                       "<span class='time'><i class='fa fa-bell-o'></i> "+user_time+"</span>"+

                       "<h3 class='timeline-header'><a href='#'>"+user_name+"</a> sent an image</h3>"+
                       "<br><img style='margin-left: 50px;  id='demoimage"+ timeline + "' value='"+user_message +  "' src='"+user_message+"' class='demoimage'  width='400px' height='400px'>"+
                       "<br><div class='timeline-footer'>"+
                         "<a class='btn btn-primary btn-xs'>Read more</a>&nbsp"+
                         "<a class='btn btn-danger btn-xs delete'>Delete</a>"+
                       "</div>"+
                     "</div>"+
                   "</li>");

           }
}
}); 


        var acceptBtn = document.getElementById("accept");
        acceptBtn.addEventListener("click",function(event){
            window.location="Accept_Finish.html?-"+projectToken;
        });


        
       
}
