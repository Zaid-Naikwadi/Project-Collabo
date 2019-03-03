function main()
{
    var tags="";
    var i;

      var twitterShare = document.querySelector('[data-js="twitter-share"]');

      twitterShare.onclick = function(e) {
    e.preventDefault();
    var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
    if(twitterWindow.focus) { twitterWindow.focus(); }
      return false;
    }

    var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function(e) {
  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/' + document.URL, 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
}
    var ref=firebase.database().ref('users/'+userId+'/skills/');
    ref.on('value',function(snapshot){
        var temp = snapshot.val();
        var keys = Object.keys(temp);
        console.log(keys);

        for(i=0;i<keys.length;i++)
      {
        
        var k2 = keys[i];
        var tagvalue = temp[k2].tag
        
        var reference2 = firebase.database().ref("materials/"+tagvalue+"/");
        reference2.on("value",function(snapshot){
            
                var description = snapshot.val().description;
                var more = snapshot.val().more;
                var datatype=snapshot.val().datatype;
                var variable=snapshot.val().variable;
                var operators=snapshot.val().operators;
                
                $(".studyMaterial").prepend("<p>"   +description+   "</p>");
                $(".studyMaterial").prepend("<p>Two data types "+datatype+"</p>");
                $(".studyMaterial").prepend("<p>"+variable+"</p>");
                $(".studyMaterial").prepend("<p>"+operators+"</p>");
                $(".studyMaterial").prepend("<p>"+more+"</p>");

                $(".studyMaterial").prepend("<hr>");
                
           
        }); 
      }
      
    });
}