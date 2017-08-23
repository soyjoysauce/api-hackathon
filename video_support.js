/**
 *
 * @param searchString
 * @constructor
 */

function Video(searchString) {
    this.videoToSearch = searchString;
    this.id = '';
    this.title = '';

    this.startVideo = function(videoToSearch){
        $.ajax({
            dataType: 'json',
            url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            data: {
                q: 'national geographic: ' +  videoToSearch,
                maxResults: 1,
                type: 'video'
            },
            success: function (response) {
                console.log(response.video[0].id);
                console.log(response.video[0].title);
                id = response.video[0].id;
                title = response.video[0].title;


            },
            error: function(response){
                console.log('error');
            }
        });
    };

    this.loadPlayer = function() {
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '270',
                width: '480',
                videoId: this.id,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
                setTimeout(stopVideo, 6000);
                done = true;
            }
        }
        function stopVideo() {
            player.stopVideo();
        }
    };


    this.loadPlayer();




};


var  videoOfCountry = new Video();
videoOfCountry.startVideo('russia');