/*example
    //@param is ISO-3166 format 
var c = new Country("US"); 
*/

function Country(code){
    this.code = "";
    this.name = "";
    this.nativeName = "";
    this.flag = "";
    this.capital = "";
    this.languages = [];
    this.region = "";
    this.subregion = "";
    this.population = "";
    this.area = "";
    this.currencies = [];

    this.getData = function(code){
        
        var option = {
            url: ("https://restcountries.eu/rest/v2/alpha/"+ code),
            method: "get",
            dataType: "json",
            success: function(response){
                console.log("get country data success => ", response);
                assignData(response);
                manager.onCountryDataLoaded();
                if(response.name === manager.chartManager.currentQuizCountryName){
                    manager.chartManager.currentQuizScore += 1;
                    $("#quiz_score_data_box").html(manager.chartManager.currentQuizScore);
                    if(manager.chartManager.currentQuizScore >= 5){
                        manager.chartManager.win = true;
                    }
                }
                console.log("response name = ", response.name);
                console.log(manager.chartManager.currentQuizCountryName);
                console.log("quiz score = ",$("#quiz_score_data_box").html());
            },
            error: function(response){
                console.log("get country data error");
            }
        }
        $.ajax(option);
    }
    var self = this;
    function assignData(countryData){
        self.code = countryData.alpha2Code;
        self.name = countryData.name;
        console.log(self.name);
        self.nativeName = countryData.nativeName;
        self.flag = countryData.flag;
        self.capital = countryData.capital;
        for(var i = 0; i < countryData.languages.length; ++i){
            self.languages.push({
                name : countryData.languages[i].name, 
                nativeName : countryData.languages[i].nativeName});
        };
        self.region = countryData.region;
        self.subregion = countryData.subregion;
        self.population = countryData.population;
        self.area = countryData.area;
        for(var i = 0; i < countryData.currencies.length; ++i){
            self.currencies.push({
                code: countryData.currencies[i].code,
                name: countryData.currencies[i].name,
                symbol: countryData.currencies[i].symbol
            });
        }
    }

    this.getData(code);
}