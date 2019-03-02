/////////////////////////////////////////////////////
  //Timeline project by kamlesh silag on 27/02/2019 
  // for dynamicalling adding messages on the screen and firebase
  /////////////////////////////////////////////////////

function main() {

    var projectKey = "-LZeub_mTXceGj4ZglaL";
    var facultyID = "demofaculty";
    var ref = firebase.database().ref("timeline/"+projectKey+"/");

    function img_set_in_timeline()
      {
        $(document).on("click", ".demoimage" , function() {
        var url_jquery = $(this).attr('value');
        //$(this).attr("src",url_jquery);
        console.log("url jquery : "+url_jquery);
        $(this).attr("src",url_jquery);
        console.log($(this).attr("src")+" src now ");
        
        });
      }

  //var projectTitleTimeline = document.getElementById("projectTitleTimeline");
  //to be done LATER ON

  try{
  var inputmessage = document.getElementById("comment");
  var txtckeditor = document.getElementById("editor1");
  var sendMessage = document.getElementById("submitMessage");

  sendMessage.addEventListener("click",function(event){
    
    var editorText = CKEDITOR.instances.editor1.getData();
    //console.log("editor ki value :"+editorText);

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var username = fullname[0].innerHTML;
    
    ref.push({
      message: editorText,
      username: username,
      time : time,
      flag : 0
    });


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

        var selectedFile;
        

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

                          "<div class='timeline-body'><pre>"+user_message+
                            "</pre></div>"+
                          "<img id='demoimage"+ timeline + "' value="+user_message +  "' class='demoimage'  width='400px' height='400px'>"+
                          "<div class='timeline-footer'>"+
                            "<a class='btn btn-primary btn-xs'>Read more</a>&nbsp"+
                            "<a class='btn btn-danger btn-xs delete'>Delete</a>"+
                          "</div>"+
                        "</div>"+
                      "</li>");

                      
                      //document.getElementById('demoimage').src = user_message;
                      img_set_in_timeline();
            }

          }
        });



    //For image uploading 

    var file = document.getElementById('file');
    var uploadButton = document.getElementById('uploadButton');
    
    file.addEventListener("change",function(event){
      selectedFile = event.target.files[0]; 
    });


    uploadButton.addEventListener("click",function(event){
      uploadFile();
      
    });



    function uploadFile(){
      var fileName = selectedFile.name;
      var storageRef = firebase.storage().ref('uploadimages/'+fileName);
      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function(snapshot){
        
        
      }, function(error) {
        console.log("error :"+error);
      }, function() {
        
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);

          var today = new Date();
          var time = today.getHours() + ":" + today.getMinutes() ;
          var username = fullname[0].innerHTML;



          //Add to firebase database
          
          firebase.database().ref("timeline/"+projectKey+"/").push({
            username : username,
            message: downloadURL,
            time : time,
            filename : selectedFile.name,
            flag : 1
          });

        }); 
      });


    }


    //Finish Project Request by kamlesh silag on 2/03/2019

    var buttonFinish = document.getElementById('btnFinish');
    buttonFinish.addEventListener("click",function(event){
      window.location = "FinishRequest.html?"+projectKey;
    });
}