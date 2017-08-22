//only for test now    
    
function Chart(){
    google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': 'AIzaSyAdw9GV5ddOTsXhUeLbQiQ0N_vJwMZ9HGw'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    
    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ]);

        createDom();

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }

    function createDom(){
        $("body").append(
        $("<div>",{
            id: "regions_div",
            style: "width: 900px; height: 500px;"
        }));
    }

    console.log(google);
    console.log(google.visualization);

    //
    google.visualization.events.addListener(chart, 'select', function() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          var country = data.getValue(selectedItem.row, 0);
          if (country = 'France') { alert ('ciao') };
        }
    
      });

    
}

Chart();
