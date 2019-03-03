let ipAddress
let userLocation

$.getJSON('https://api.ipify.org?format=json', function(data){
    console.log(data.ip);
    ipAddress = data.ip
    getAddress()
});

async function getAddress(){
  let key = "e40e24fe266d933bed14e008ec18a072"
  let address = await fetch("http://api.ipstack.com/"+ipAddress+"?access_key="+key)
  let userAddress = await address.json()
  userLocation = userAddress
  console.log(userAddress)
}

let button = document.querySelector("#signIn")
button.addEventListener("click",()=>{
  signInUser()
})

function signInUser(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user)
  var template_params = {
   "reply_to": "reply_to_value",
   "message_html": "The user " + user.displayName + " with email address " + user.email + " has an IP Address of " + ipAddress + ". This is located at " + userLocation.city
  }

  var service_id = "default_service";
  var template_id = "template_igpXS62H";
  emailjs.send(service_id, template_id, template_params);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
