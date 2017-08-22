

function Chart(defaultCountryCode){

    var dataTableHeader = ["Country"];
    var dataTableContent = [];

    //TODO a property hold current select country name;

    this.init = function(){
        dataTableContent.push(defaultCountryCode);
        createDom();
        refreshChart();
    }

    function refreshChart(){
        google.charts.load('current', {
            'packages':['geochart'],
            'mapsApiKey': 'AIzaSyAdw9GV5ddOTsXhUeLbQiQ0N_vJwMZ9HGw'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);
    }

    function deleteChart(){
        $("#regions_div").empty();
    }

    function drawRegionsMap() {
        var dataTableArray = [];
        dataTableArray.push(dataTableHeader);
        dataTableArray.push(dataTableContent);
        console.log(dataTableArray);
        var data = google.visualization.arrayToDataTable(dataTableArray);
        var options = {
        };
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        google.visualization.events.addListener(chart, 'regionClick', function(response) {
            console.log(response.region);
            setCurrentRegion(response.region);
            console.log(manager);
            manager.setCurrentCountry(response.region);
            deleteChart();
            refreshChart();
          });

        chart.draw(data, options);
    }

    function setCurrentRegion(region){
        dataTableContent = [];
        dataTableContent.push(region)
    }

    function createDom(){
        $("body").append(
        $("<div>",{
            id: "regions_div",
            style: "width: 900px; height: 500px;"
        }));
    }

    this.init();
}
