// variables needed for the code
const fileBtn = document.getElementById("file-input")
const tableEl = document.getElementById("output-tbl")


//event listener for the file input button
fileBtn.addEventListener("change", function(event){
    const file = event.target.files[0]

    if (file){
    Papa.parse(file, {
        complete: (results) =>{
            console.log("Parsed data:", results.data)
            let areaRevenueData = processCSV(results.data)
            outputTable(areaRevenueData)
        },
        header: true,
        skipEmptyLines: true
    })}else{
        alert("Please select a CSV file")
    }
})

//process the necessary data
function processCSV(data){
    let areaRevenue = {
        "Roanoke":0,
        "Nova":0,
        "Other":0
    }

    //loop through each row in the data
    data.forEach(row=> {
        const location = determineLocation(row["Service Location City"])
        const total = parseFloat(row["Total"])

        //add to area revenue total
        if (location === "Roanoke"){
            areaRevenue["Roanoke"] += total
        }else if (location === "Nova"){
            areaRevenue["Nova"] += total
        }else{
            areaRevenue["Other"] += total
        }
    })
    return areaRevenue
}

//process location
function determineLocation(location){
    //set string to lowercase
    const lowercaseLocation = location.toLowerCase()

    //arrays containing cities
    let Nova = ["sterling", "great falls", "alexandria","fairfax station","leesburg",
        "vienna","herndon","catharpin","ashburn","aldie","falls church","middleburg",
        "reston","centreville","springfield","arlington","manassas","annandale",
        "purcellville","fairfax","south riding","mclean","oakton","round hill"]
    
    let Roanoke = ["salem","roanoke","christiansburg","troutville","bent mountain","blacksburg","goodview",
        "glade hill", "radford", "bedford", "lexington","rocky mount","moneta","boones mill",
        "floyd","hardy","shawsville","new castle","catawba","vinton","willis","pittsville",
        "huddleston","meadows of dan","lynchburg","pilot","buchanan","daleville","fincastle"]
    
    if (Nova.includes(lowercaseLocation)){
        return "Nova"
    }else if(Roanoke.includes(lowercaseLocation)){
        return "Roanoke"
    }else{
        console.log(lowercaseLocation)
        return "Other"
    }
}

function outputTable(data){
    if(!tableEl){
        console.error("Table element not found!")
        return;
    }

    //clear existing table
    tableEl.innerHTML=""

    //add data to the row
    tableEl.innerHTML = `
    <tr class="header-row">
        <td>Nova</td>
        <td>Roanoke</td>
        <td>Other</td>
    </tr>
    <tr class="revenue-row">
        <td>$${data.Nova.toLocaleString()}</td>
        <td>$${data.Roanoke.toLocaleString()}</td>
        <td>$${data.Other.toLocaleString()}</td><td>$${data.Nova}</td>    
    </tr>
    `
}
