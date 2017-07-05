(function (){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)

    function FlickrImageSearchController (flickrService) {
        var model = this;
        init();

        function init() {
            model.searchPhotos = searchPhotos;
            model.selectPhoto = selectPhoto;
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server
            + "/" + photo.id + "_" + photo.secret + "_s.jpg";
            // TODO: Send photo url to edit/new widget page
        }


    }
})();