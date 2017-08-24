function Chart(parentDom){


    var dom = null;
    var tableHeader = ["Country"];
    var tableContent = [""];
    this.currentShowArea = "world";
    var previousCountryCode = null;

    var stopShowModel = false;
    this.currentQuizCountryName = "";
    this.currentQuizScore = 0;
    this.gameStarted = false;
    this.win = false;

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
            region: manager.chartManager.currentShowArea,
            "backgroundColor" : "#04235b",
            "datalessRegionColor": "#bec9db",
            "defaultColor": "#00FFB6"
        };
        var chart = new google.visualization.GeoChart(dom);

        google.visualization.events.addListener(chart, 'regionClick', function(response) {
            
            var code = manager.currentCountry !== null ? manager.currentCountry.code : "";
            var targetCode = response.region;
            if(!isNaN(targetCode)){
                return;
            }
            if(!stopShowModel){
                $("#youtubeModal").modal('show');
            }
            
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


        $('#game_start').click(geo_game);
       
       
       
        function geo_game(){
            if(manager.chartManager.gameStarted === true){
                return;
            }
            /* code by hawkscode   */ 
           // getcountry();
            manager.chartManager.gameStarted = true;
            stopShowModel = true;
              function randomdata($max){
               var RandomNumber = []; 
                    for(var i = 0; i < 10; i++) {
                        var numberIsInArray = false;
                        var rand = generateRandomNumb(1, $max);
                        for(var j = 0; j < RandomNumber.length; j++){
                            if(rand === RandomNumber[j]) {
                                numberIsInArray = true;
                                i--;
                            }
                        }
                        if(!numberIsInArray){
                           RandomNumber.push(rand);
                        }
                    }
                    //console.log('RandomNumber' + RandomNumber); 
                    function generateRandomNumb(min, max) {
                        return Math.floor(Math.random() * (max - min) + min);
                    }
                   
                    
                     return RandomNumber;
              }
            
            getcountry();
             function getcountry($dataNumber)
                {
                    var country_list_data=[];
                    $.getJSON('countries.json', function(data_country) {
                          var lengthCountry= data_country.countries.length;
                         
                          var $getData = randomdata(lengthCountry);
                          console.log($getData); 
                           for(var i=0;i<$getData.length;i++)
                           { 
                          
                            var $country_num = $getData[i];
                              console.log($country_num);
                            var county_name  = data_country.countries[$country_num].Name;
                            
                            var county_iso  = data_country.countries[$country_num].ISO;
                            var county_code  = data_country.countries[$country_num].Code;
                            country_list_data.push([county_name,county_iso,county_code]); 
                        //   console.log('county_name: '+ county_name+', county_iso: '+ county_iso +', county_code: '+county_code);                            
                        
                              
                           }
                        
                           country_data_fire(country_list_data);
                       });
                } 
                function country_data_fire($countryList){
                    var $countFireCountry =0;
                    setDataCountry();
                    
                    function setDataCountry(){ 

                        $('#quiz_data_box').html($countryList[$countFireCountry][0]);
                        manager.chartManager.currentQuizCountryName = $countryList[$countFireCountry][0];

                    }
                    var dataCountryDuration = setInterval(function(){
                        $countFireCountry= $countFireCountry+1;
                        if($countFireCountry>=10)
                        { 
                        clearInterval(dataCountryDuration);
                        }
                        else{
                         setDataCountry();
                        }
                         
                    },6000);
                    
                };
                
                $('#map_container_section').addClass('quiz_active');
               
                quiztime();
                
                function quiztime(){
                    var $totalTime = 60;
                   
                    var counterInt = setInterval(function(){
                       $totalTime = $totalTime-1;  
                       $('#remaining_quiz_time').text($totalTime);
                        var $progressquizeLength = $totalTime/60*100; 
                        $('#quiz_progress_length').css({'width':$progressquizeLength+'%'});
                       if($totalTime<=0)
                       {
                        clearInterval(counterInt);

                        if(manager.chartManager.win === true){
                            alert("YOU ARE GEO MASTER!!!");
                        }else{
                            alert('Quiz has been ended');
                        }
                        location.reload();

                       }
                       
                    },1000);
                    
                }
                

        }



    this.init();


}


