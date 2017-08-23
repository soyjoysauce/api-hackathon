/**
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
    this.title = '';

    this.startVideo = function(videoToSearch){
        $.ajax({
            dataType: 'json',
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=the+country+of+' + videoToSearch +'&type=video&maxResult=1&videoCaption=closedCaption&key=AIzaSyDFDtGVH2VJlim-M-B5xW--zNKmSpgAthw',
            //'https://s-apis.learßningfuze.com/hackathon/youtube/search.php',
            method: 'get',
            data: {
                maxResults: 1
            },


            success: function (response) {
                console.log(response.items[0].id.videoId);
                console.log(response.items[0].snippet.title);

                //console.log(response.video[0].title);
                this.id = response.items[0].id.videoId;
                //this.title = response.video[0].title;ß


               addVideoToDom(this.id);


            },
            error: function(response){
                console.log('error');
            }
        });
    };





    function addVideoToDom(videoId) {

        $("#player").empty();
        console.log("addvideo to dom");
        var iframe = $('<iframe id="ytplayer" type="text/html" width="640" height="360" frameborder="0">')

        var url = 'https://www.youtube.com/embed/'+videoId+'?autoplay=&origin=http:';

        iframe.attr('src', url).css({"margin-top": "20px", "margin-left": "5px"});

        $("#player").append(iframe);
    }


};

