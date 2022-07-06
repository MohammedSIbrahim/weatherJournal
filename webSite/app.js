/******************
1- Global Variables 
******************/

let zipElmnt = document.getElementById("zip");
let feelingsElmnt = document.getElementById("feelings");
let buttonElmnt = document.getElementById("generate");
let dateDiv = document.getElementById("date");
let temperatureDiv = document.getElementById("temp");
let feelingsDiv = document.getElementById("content");

// Personal API Key for OpenWeatherMap API
const apiKey = "&APPID=18d2f0ef28dc81e0ada0d73663c99fbc&&units=metric";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
/****************************
2- Creating of event listener
****************************/

//the event
buttonElmnt.addEventListener("click", generator);

// Function called by event listener
async function generator() {
  //get the Values of the main inputs elemnts
  const zipCodeValue = zipElmnt.value;
  const feelingsValue = feelingsElmnt.value;

  //fetching the url for extracting the infos we need
  let apiReturnedInfo = await getInfo(apiURL, zipCodeValue, apiKey);

  let nodeServerResponse = await postData("http://localhost:3000/add", {
    temperature: apiReturnedInfo.main.temp,
    date: newDate,
    feelings: feelingsValue,
  });

  UI(nodeServerResponse);
}

//Function to GET Web API Data

const getInfo = async (url, zip, Api) => {
  const myGetInfoRequest = await fetch(url + zip + Api, { method: "post" });
  try {
    const data = await myGetInfoRequest.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//Function to POST data
const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const targetData = await request.json();
    return targetData;
  } catch (error) {
    console.log("Error", error);
  }
};

//update interface
const UI = async (nodeServerResponse) => {
  try {
    dateDiv.innerHTML = `date is : ${nodeServerResponse.date}`;
    temperatureDiv.innerHTML = `tempertuer is : ${nodeServerResponse.temp} c`;
    feelingsDiv.innerHTML = `I feel : ${nodeServerResponse.feelings}`;
  } catch (error) {
    console.log("error", error);
  }
};
