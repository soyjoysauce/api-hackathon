
function Chart(defaultCountryCode, parentDom){

    var dom = null;
    var dataTableHeader = ["Country"];
    var dataTableContent = [];
    this.currentShowArea = "world";

    this.init = function(){
        dataTableContent.push(defaultCountryCode);
        dom = parentDom;
        refreshChart();
    }

    this.showRegion = function(areaName){
        var targetCode = getAreaCode(areaName);
        if(manager.chartManager.currentShowArea !== targetCode){
            manager.chartManager.currentShowArea = targetCode;
            refreshChart();
        }
    }

    function refreshChart(){
        $(dom).empty();
        google.charts.load('current', {
            'packages':['geochart'],
            'mapsApiKey': 'AIzaSyAdw9GV5ddOTsXhUeLbQiQ0N_vJwMZ9HGw'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);
    }

    function drawRegionsMap() {
        var dataTableArray = [];
        dataTableArray.push(dataTableHeader);
        dataTableArray.push(dataTableContent);
        var data = google.visualization.arrayToDataTable(dataTableArray);
        var options = {
            region: manager.chartManager.currentShowArea
        };
        var chart = new google.visualization.GeoChart(dom);

        google.visualization.events.addListener(chart, 'regionClick', function(response) {
            if(response.region === manager.currentCountry.code){
                return;
            }
            //should remove this, use a button to go back to world map
            if(!isNaN(response.region)){
                manager.chartManager.currentShowArea = "world";
            }else{
                setCurrentRegion(response.region);
                manager.setCurrentCountry(response.region);
            }
            refreshChart();
          });

        chart.draw(data, options);
    }

    function setCurrentRegion(region){
        dataTableContent = [];
        dataTableContent.push(region)
    }

    this.init();
}

function getAreaCode(subregion){

    if(subregion.includes("Africa")){
        return "002";
    }

    if(subregion.includes("Eastern Europe")){
        return "151";
    }

    if(subregion.includes("Northern Europe")){
        return "021"
    }

    if(subregion.includes("Europe")){
        return "150";
    }

    if(subregion.includes("Asia")){
        return "142";
    }

    switch(subregion){
        case "Northern America":
            return "021";
        case "Caribbean":
            return "029";
        case "Central America":
            return "013";
        case "South America":
            return "005";
        case "Australia and New Zealand":
            return "053";
        case "Melanesia":
            return "054";
        case "Micronesia":
            return "057";
        case "Polynesia":
            return "061";
        default:
            return "world";
    }
    
}
