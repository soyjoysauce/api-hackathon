
/* Created by Carlos Blandino Aug 24, 2017*/
/**
 *
 *
 * @param searchString
 * @constructor
 *
 * instantiate Video object and
 * pass the country as a string to startVideo() method;
 */
// example: var  videoOfCountry = new Video();
// example: videoOfCountry.startVideo('china');

/**
 * obtain video from getVideo function
 * display the video with startVideo
 *
 */
function Video() {

    this.id = '';
//search data ajax get
    this.startVideo = function(videoToSearch){
        $.ajax({
            dataType: 'json',
            url: 'https://www.googleapis.com/youtube/v3/search',
            method: 'get',
            data: {
                key: 'AIzaSyDFDtGVH2VJlim-M-B5xW--zNKmSpgAthw',
                q: 'the+country+of+' + videoToSearch,
                part: 'snippet',
                type: 'video',
                videoCaption: 'closedCaption',
                maxResults: 1
            },

            success: function (response) {
                this.id = response.items[0].id.videoId;
                addVideoToDom(this.id);
            }

        });
    };


    /**
     * dynamically populate the #player div with the helper function addVideoToDom and passing a string
     * @param videoId
     */


    function addVideoToDom(videoId) {
//every time the function is called the div need to be empty for the next video
        $("#player").empty();

        var iframe = $('<iframe id="ytplayer" type="text/html" width="640" height="360" frameborder="0">')

        var url = 'https://www.youtube.com/embed/'+videoId+'?autoplay=&origin=http:';

        iframe.attr('src', url);

        $("#player").append(iframe);

    }


};

