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
                console.log(response);
                debugger;
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

        var iframe = $('<iframe id="ytplayer" type="text/html" width="640" height="360" frameborder="0">')

        var url = 'https://www.youtube.com/embed/'+videoId+'?autoplay=&origin=http:';
        iframe.attr('src', url);

        $('#player').append(iframe);


    }

};


var  videoOfCountry = new Video();
videoOfCountry.startVideo('russia');