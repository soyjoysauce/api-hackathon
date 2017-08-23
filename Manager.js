/**
 * Handle all things, because it's manager!
 * @constructor
 */
function Manager() {

    this.defaultCountryCode = "US";

    /**
     * property - hold current select country data
     */
    this.currentCountry = null;

    /**
     * property - hold the youtube video manager
     */
    this.videoManager = null;

    /**
     * property - hold the geoCharts manager
     */
    this.chartManager = null;

    /**
     * property - hold the view manager
     */
    this.viewManager = null;

    /**
     * method - init the manager, fill all property
     */
    this.init = function () {
        this.setCurrentCountry(this.defaultCountryCode);
        this.chartManager = new Chart(this.defaultCountryCode,document.getElementById("regions_div"));
    }

    /**
     * method - show video, call function inside view manager
     */

    /**
     * method - show Chart, call function inside view manager
     */

    /**
     * method - show data, call function inside view manager
     */

    /**
     * method - set current country data
     * @param countryCode ISO-3166 format
     */
    this.setCurrentCountry = function (countryCode) {
        this.currentCountry = new Country(countryCode);
    }

    this.init();
}
