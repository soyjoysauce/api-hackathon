/**
 * Handle all things, because it's manager!
 * @constructor
 */
function Manager(){
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
    this.init = function(){
        this.currentCountry = new Country("us")
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

    

    this.init();
}