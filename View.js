
function View(){

    this.displayCountryData = function(){
        var data = manager.currentCountry;
        displayContent(data.name,$(".country_name"));
        displayContent(data.capital, $(".country_capital"));
        displayContent(data.population, $(".country_population"));
        displayContent(data.currencies[0].code + " " + data.currencies[0].symbol , $(".country_currency"));
    }

    function displayContent(content,parentDom){
        console.log("parentDom = ",parentDom);
        parentDom.html(content);
    }
    

}