function Chart(defaultCountryCode, parentDom){

    var dom = null;
    var tableHeader = ["Country"];
    var tableContent = [""];
    this.currentShowArea = "world";
    var previousCountryCode = null;

    this.init = function(){
        dom = parentDom;
    }

    this.showMap = function(targetCountry){
        if(targetCountry === null){
            refreshChart();
            return;
        }
        var targetCode = getAreaCode(targetCountry);
        if(manager.chartManager.currentShowArea !== targetCode){
            manager.chartManager.currentShowArea = targetCode;
            refreshChart();
            return;
        }
        if(previousCountryCode !== targetCountry.code){
            console.log("different");
            refreshChart();
            return;
        }
    }

    this.showWholeWorld = function(){
        console.log("test world button");
        manager.chartManager.showMap("world");
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
            
            var code = manager.currentCountry !== null ? manager.currentCountry.code : "";
            var targetCode = response.region;
            if(!isNaN(targetCode)){
                return;
            }
            $("#youtubeModal").modal('show');
            if(targetCode === code){
                return;
            }else {
                setCurrentCountry(targetCode);
            }
          });

        chart.draw(data, options);
    }

    function setCurrentCountry(countryCode){
        previousCountryCode = manager.currentCountry !== null ? manager.currentCountry.code : "";
        tableContent = [];
        tableContent.push(countryCode);
        manager.setCurrentCountry(countryCode);
    }

    function getAreaCode(targetCountry){
        
        if(targetCountry.constructor !== Country){
            return "world";
        }
        if(targetCountry.name === "Svalbard and Jan Mayen"){
            return targetCountry.code;
        }
        var subregion = targetCountry.subregion;
            if(subregion.includes("Africa")){
                return "002";
            }
        
            if(subregion.includes("Eastern Europe")){
                return "151";
            }
        
            if(subregion.includes("Northern Europe")){
                return "154"
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


