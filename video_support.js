/**
 *
 * @param searchString
 * @constructor
 */


function Video() {

    this.id = '';
    this.title = '';

    this.startVideo = function(videoToSearch){
        $.ajax({
            dataType: 'json',
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=sightseeing+' + videoToSearch +'&type=video&maxResult=1&videoCaption=closedCaption&key=AIzaSyDFDtGVH2VJlim-M-B5xW--zNKmSpgAthw',
            //'https://s-apis.learßningfuze.com/hackathon/youtube/search.php',
            method: 'get',
            data: {
                maxResults: 1
            },


            success: function (response) {
                console.log(response.items[0].id.videoId);
                console.log(response.items[0].snippet.title);


                this.id = response.items[0].id.videoId;

                addVideoToDom(this.id);


            },
            error: function(response){
                console.log('error');
            }
        });
    };


    function addVideoToDom(videoId) {

        var iframe = $('<iframe id="ytplayer" type="text/html" width="560" height="340" frameborder="0">')

        var url = 'https://www.youtube.com/embed/'+videoId+'?autoplay=0&origin=http:';
        iframe.attr('src', url);

        $('#player').append(iframe);


    }

};


var  videoOfCountry = new Video();
videoOfCountry.startVideo('russia');