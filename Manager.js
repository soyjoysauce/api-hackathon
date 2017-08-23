/**
 * Handle all things, because it's manager!
 * @constructor
 */
function Manager() {
    this.currentCountry = null;
    this.videoManager = null;
    this.chartManager = null;
    this.viewManager = null;

    /**
     * method - init the manager, fill all property
     */
    this.init = function () {
        
        this.viewManager = new View();
        this.chartManager = new Chart(document.getElementById("regions_div"));
        this.videoManager = new Video();
        //apply event handler
        $("#expand-btn").on("click", this.chartManager.showWholeWorld);
    }

    this.onCountryDataLoaded = function(){
        this.viewManager.displayVideo();
        this.viewManager.displayCountryData();
        this.viewManager.displayChart();
    }

    /**
     * method - set current country data
     * @param countryCode ISO-3166 format
     */
    this.setCurrentCountry = function (countryCode) {
        this.currentCountry = new Country(countryCode);
    }

    this.init();
}
