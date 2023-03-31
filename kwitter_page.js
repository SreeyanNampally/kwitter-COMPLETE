var firebaseConfig = {
    apiKey: "AIzaSyDHFhPMLAI2-xGDAPAdYO3Cst8OKYCxGRs",
    authDomain: "kwitter-app-8f6d5.firebaseapp.com",
    databaseURL: "https://kwitter-app-8f6d5-default-rtdb.firebaseio.com",
    projectId: "kwitter-app-8f6d5",
    storageBucket: "kwitter-app-8f6d5.appspot.com",
    messagingSenderId: "251772333317",
    appId: "1:251772333317:web:bd3709c5e38a50c52a9b6c",
    measurementId: "G-9FGC8NE0W1"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var username = localStorage.getItem("username")
  var roomname = localStorage.getItem("room_name")

  function send(){
    message = document.getElementById("message").value
    firebase.database().ref(roomname).push({
        name: username,
        message: message,
        like: 0
    })
    document.getElementById("message").value = "";
  }

  function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
 name = message_data['name']
 message = message_data['message']
 like = message_data['like']
 namewithtag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>"
 messagewithtag = "<h4 class = 'message_h4'>" +message+ "</h4>"
 likebutton = "<button class = 'btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
 span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
 row = namewithtag+messagewithtag+likebutton+span_with_tag
 document.getElementById("output").innerHTML+= row;
//End code
 } });  }); }
getData();

function updatelike(message_id){
buttonid=message_id;
likes = document.getElementById(buttonid).value
updatedlikes = Number(likes)+1
firebase.database().ref(roomname).child(message_id).update({
  like:updatedlikes
})
}

function logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("room_name")
      window.location = "index.html";
}