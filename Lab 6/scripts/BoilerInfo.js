/*
============================================================================
 Name        : BoilerInfo.js
 Author      : Danielle Van Allen
 Date        : 12/04/2021
 Description : Week 6 Lab 6 Boiler Monitor
               Functions for Collecting Boiler Information
============================================================================
*/

function storeInfo() {
    if(checkBoilerForm()) {
        var boilerObj = {
            "boilerID" : $("#ident").val(),
            "purchaseDate" : $("#dop").val(),
            "maxPressure" : $("#maxP").val(),
            "maxTemperature" : $("#maxT").val()
        };

        try {
            localStorage.setItem("boilerObj", JSON.stringify(boilerObj));
            alert("Saving Information");
        }
        catch(e) {
            /* Google browsers use different error 
            * constant
            */
            if (window.navigator.vendor === "Google Inc.") {
                if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Local Storage limit exceeds.");
                }
            } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
            }
    
            console.log(e);
        }
    } else {
        alert("Please complete the form properly.")
    }
}

function checkBoilerForm() { 
    if(($("#ident").val() != "") && ($("#dop").val() != "") && ($("#maxP").val() != "") && ($("#maxT").val() != ""))
        return true;
    else
        return false;

  }

function displayInfo() {
    try {
        var boilerObj = JSON.parse(localStorage.getItem("boilerObj"));
    }
    catch(e) {
       /* Google browsers use different error 
            * constant
            */
       if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Storage limit exceeds.");
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
        } 
        console.log(e);
    }

    if(boilerObj != null) {
        $("#ident").html(boilerObj.boilerID);
        $("#dop").html(boilerObj.purchaseDate);
        $("#maxP").html(boilerObj.maxPressure);
        $("#maxT").html(boilerObj.maxTemperature);
    }
}

$("#frmBoiler").submit(function () { //Event : submitting the form
    storeInfo();
    return true;
  });