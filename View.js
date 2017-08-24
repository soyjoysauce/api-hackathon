
function View(){
    

    this.displayCountryData = function(){
        var data = manager.currentCountry;
        //flag 
        console.log("data flag",data.flag);
        displayContent("<img src='"+ data.flag +"' style='width:240px; height:160px;'/>", $(".country_flag"));
        displayContent(data.name,$(".country_name"));
        displayContent(data.capital, $(".country_capital"));
        displayContent(data.population, $(".country_population"));
        displayContent(data.nativeName, $(".country_nativeName"));
        displayContent(data.area + " sq. km", $(".country_area"));
        var languages = [];
        for(var i = 0; i < data.languages.length; ++i){
            languages.push(data.languages[i].name);
        }
        displayContent(languages.join(" / "), $(".country_languages"));
        displayContent(data.region, $(".country_region"));
        var currencies = [];
        for(var i = 0; i < data.currencies.length; ++i){
            if(data.currencies[i].name === null){
                continue;
            }
            currencies.push(data.currencies[i].code + " " + (data.currencies[i].symbol || ""));
        }
        displayContent(currencies.join(" / ") , $(".country_currency"));
    }

    function displayContent(content,parentDom){
        console.log("parentDom = ",parentDom);
        parentDom.html(content);
    }

    this.displayChart = function(){
        manager.chartManager.showMap(manager.currentCountry);
    }

    this.displayVideo = function(){
        console.log("display video");
        manager.videoManager.startVideo(manager.currentCountry.name);
    }
}