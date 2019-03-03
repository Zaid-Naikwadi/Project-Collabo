/* For Adding new project
      /* Zaid Naikwadi 24/02/19
      /* 
                                */
                               
function main(){
                               var title = document.getElementById("projectTitle");
                               var description = document.getElementById("projectDescription");
                               var branch = document.getElementById("branch");
                               var submitBtn = document.getElementById("submitBtn");
                               
                               
                         
                               submitBtn.addEventListener("click", e =>{
                                   console.log("in submit");
                                   var tags = document.getElementsByClassName("tag");
                                   writeAddProjectData(title.value,description.value,tags,branch.value);
                               });
                         
                         
}

function writeAddProjectData(title,description,tags,branch)
{
                         
                                     projectKey = firebase.database().ref('Projects/'+userId+"/").push({
                                       title: title,
                                       description: description,
                                       userId : userId,
                                       branch : branch
                                     }).key;
                         
                                     var Alltags = {};
                         
                                     for(var i=0;i<tags.length;i++){
                                       console.log("Your tags: "+tags[i].innerHTML);
                                       Alltags["tags"+i] = {"tag": tags[i].innerHTML};
                                     }
                         
                                     firebase.database().ref('Projects/'+userId+"/"+projectKey+"/tags/").set(Alltags).then(function(){
                                       alert("Project successfully added");
                                       window.location = "home.html";
                                     });
}
                         