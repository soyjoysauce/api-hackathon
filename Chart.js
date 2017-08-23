function Chart(defaultCountryCode, parentDom){

    var dom = null;
    var tableHeader = ["Country"];
    var tableContent = [];
    this.currentShowArea = "world";

    this.init = function(){
        tableContent.push(defaultCountryCode);
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

    this.showWholeWorld = function(){
        console.log("test world button");
        manager.chartManager.showRegion("world");
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
        var tableArray = [];
        tableArray.push(tableHeader);
        tableArray.push(tableContent);
        var data = google.visualization.arrayToDataTable(tableArray);
        var options = {
            region: manager.chartManager.currentShowArea
        };
        var chart = new google.visualization.GeoChart(dom);

        google.visualization.events.addListener(chart, 'regionClick', function(response) {
            var code = manager.currentCountry.code;
            var region = response.region;
            if(region === code || !isNaN(region)){
                return;
            }else {
                setCurrentRegion(region);
                manager.setCurrentCountry(region);
            }
            refreshChart();
          });

        chart.draw(data, options);
    }

    function setCurrentRegion(region){
        tableContent = [];
        tableContent.push(region)
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

    this.init();
}


