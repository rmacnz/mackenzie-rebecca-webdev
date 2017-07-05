(function() {
    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "40ce58bbdec1c740e36770dccdcf42f5";
        var secret = "726f986ca084b340";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            searchTerm = searchTerm.replace(" ", "+");
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();