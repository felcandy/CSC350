/*
============================================================================
 Name        : Navigation.js
 Author      : Danielle Van Allen
 Date        : 11/30/2021
 Description : Week 6 Lab 6 Boiler Monitor
               Functions for Password Implementation
               (Based on Thyroid App)
============================================================================
*/

/* Adds given text to password field */
function addValueToPassword(button) {
    var currVal=$("#passcode").val();
    if (button == "bksp") {
        $("#passcode").val(currVal.substring(0, currVal.length-1));
    } else {
        $("#passcode").val(currVal.concat(button));
    }
}



/* On the main page, after password entry, directs
   user to user entry page if password not set. */
$("#btnEnter").click(function () {
    var password = getPassword();
  
    if (document.getElementById("passcode").value == password) {
        if (localStorage.getItem("user") == null) {
          $("#btnEnter").attr("href", "#changePW").button();
        } else {
          $("#btnEnter").attr("href", "#pageMenu").button();
        }
    } else {
      alert(
        "Incorrect password, please try again."
        
      );
      $.mobile.changePage("#pageHome");
    }
});

  /* Retrieves password from local storage if it
     exists, otherwise returns the default password */
function getPassword() {
    if (typeof (Storage) == "undefined") {
      alert(
        "Your browser does not support HTML5 localStorage. Try upgrading."
      );
    } else if (localStorage.getItem("user") !=
      null) {
      return JSON.parse(localStorage.getItem(
        "user")).NewPassword;
    } else {
      /*Default password*/
      return "0000";
    }
  }


  function checkUserForm() { 
    if(($("#changePassword").val() != ""))
        return true;
    else
        return false;

  }


  function saveUserForm() {
    if (checkUserForm()) {
      var user = {

        "NewPassword": $("#changePassword").val(),

      };
      try {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Saving Information");
  
        $.mobile.changePage("#pageMenu");
        window.location.reload();
      } catch (e) {
        /* Google browsers use different error 
         * constant
         */
        if (window.navigator.vendor === "Google Inc.") {
          if (e == DOMException.QUOTA_EXCEEDED_ERR) {
            alert(
              "Error: Local Storage limit exceeds."
            );
          }
        } else if (e == QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
  
        console.log(e);
      }
    } else {
      alert("Please complete the form properly.");
    }
  
  }

  $("#frmUserForm").submit(function () { //Event : submitting the form
    saveUserForm();
    return true;
  });
  