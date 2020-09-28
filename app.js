//data viz for coronavirus confirmed cases in us since january 2020
const countriesURL = `https://api.covid19api.com/countries`
const svg = d3.select("svg")
const height = window.innerHeight
const width = window.innerWidth
const select = document.querySelector("select")
const cases = document.querySelector("#cases")
const deaths = document.querySelector("#deaths")
const days = document.querySelector("#days")
let confirmedCases = []
let totalDeaths = []
const countryName = document.querySelector("#countryName")


const stuff = d3.json(countriesURL, function(data){
 return {
     Slug: data.Slug,
     Country: data.Country
 }

})


.then(data => {
    data.forEach(function(data){
        const option = document.createElement("option")
        select.appendChild(option)
        option.textContent = data.Country
        option.value = data.Slug
    })


})

select.addEventListener("change", function(event){
   
let chosen = event.target.value
console.log(chosen)
d3.json(`https://api.covid19api.com/total/country/${chosen}`, data => {
    
        return {
            confirmed: data.Confirmed,
            deaths: data.Deaths,
            date: data.Date
        }})
    .then(data =>{
        
        data.forEach(data => {
          
            totalDeaths.push(data.Deaths)
            confirmedCases.push(data.Confirmed);
            console.log(totalDeaths)
            
        });
        const last = confirmedCases.length - 1

        if (last>0) {
           
            cases.textContent = confirmedCases[last]
            deaths.textContent = totalDeaths[last]
            
            
        } else {
            deaths.textContent = 0
            cases.textContent = 0
        }
    })
    })
   



    
    
    
  





