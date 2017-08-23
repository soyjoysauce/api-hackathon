function Video() {


    this.startVideo = function(searchString){
        $.ajax({
            dataType: 'json',
            url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            data: {
                q: 'national geographic: ' +  searchString,
                maxResults: 4,
                type: 'video'
            },
            success: function (response) {
                console.log(response);
            },
            error: function(response){
                console.log('error');
            }
        });
    };

};

var  videoOfCountry = new Video();
videoOfCountry.startVideo('Africa');