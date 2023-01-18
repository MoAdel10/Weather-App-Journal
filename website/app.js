/* Global Variables */

const key = "28117751604054c756d3d5d17db6b9a7" // This is my key on openweather api


// Getting the main ui elements on the website
const zip_code = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const btn = document.getElementById("generate");

// Getting the <p> elements to display the date,temp and conent
let dateE = document.getElementById('date-field');
const tempE = document.getElementById('temp-field')
const contentE = document.getElementById('feeling-field') 


//these <p> elements will display error if the user didn't input any data or a valid data 
const zip_error = document.getElementById("error-msg-zipcode") //this for zip code errors
const feel_error = document.getElementById("error-msg-feeling") // this for the feeling errors



// fetching the openweather api                                                                   
//                                                               Here goes the zip code   ,  used metric measurments
//                                                                       |                        |
async function ZipCode(zip){ //                                          V                        V
    console.log(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=metric`)
    return await(await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}&units=metric`)).json()
}                                                                            
btn.addEventListener('click',GetData)
function GetData(){
// Create a new date instance dynamically with JS

    let d = new Date();
    let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear()+"  "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); //added one to month to display month value proberly
    
    let projectData = {
         zip : zip_code.value,
        feel : feeling.value,
        temp : 0
    }
    if(isNaN(zip)){   // if the zip code is not a number or it doesn't exist it will return error in zip code error area
    ZipCode(projectData.zip).then(zipinfo =>{
        if(zipinfo.cod != 200){
             zip_error.innerHTML = `<p id='error-msg-zipcode'>Please Enter a valid zip code</p>`
        }else{  // if the zip code is writtin proberly it will check that the feeling field is not empty
            feel_error.innerHTML = `<p id='error-msg-feeling'></p>`
            if(feeling.value != 0){  // displaying the date , temp and feeling after checking for required fields
                projectData.temp = zipinfo.main.temp
                dateE.innerHTML =  `<p id='date-field'>Date: ${newDate}  -Live time</p>`
                contentE.innerHTML =`<p id='feeling-field'>Feeling : ${projectData.feel}</p>`
                tempE.innerHTML = `<p id='temp-field'>Temp: ${projectData.temp} C</p>`
                
                zip_error.innerHTML = `<p id='error-msg-zipcode'></p>`
                SendData(projectData)
            }else{ // returning an error message in feeling error field if the field is empty
                feel_error.innerHTML = `<p id='error-msg-feeling'>Please Enter a your feeling</p>`
            }

        }
    })
    }else{ // returning an error in the zip code error field if zip code is not valid 
        zip_error.innerHTML = `<p id='error-msg-zipcode'>Please Enter a valid zip code</p>`
    }

    
}

// sending data to server
async function SendData(projectData){
    let res = await fetch('http://localhost:8181/insert',{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(projectData)
        
    });

    
}



