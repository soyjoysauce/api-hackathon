

function Chart(defaultCountryCode, parentDom){

    var dom = null;

    var dataTableHeader = ["Country"];
    var dataTableContent = [];

    //TODO a property hold current select country name;

    this.init = function(){
        dataTableContent.push(defaultCountryCode);
        console.log("parent dom = ", parentDom);
        dom = parentDom;
        refreshChart();
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
        console.log(dataTableArray);
        var data = google.visualization.arrayToDataTable(dataTableArray);
        var options = {
        };
        var chart = new google.visualization.GeoChart(dom);

        google.visualization.events.addListener(chart, 'regionClick', function(response) {
            console.log(response.region);
            setCurrentRegion(response.region);
            console.log(manager);
            manager.setCurrentCountry(response.region);
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
