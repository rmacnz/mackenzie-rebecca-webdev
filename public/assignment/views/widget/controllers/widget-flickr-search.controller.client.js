(function (){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)

    function FlickrImageSearchController ($routeParams, $location, flickrService, widgetService) {
        var model = this;
        init();

        function init() {
            model.searchPhotos = searchPhotos;
            model.selectPhoto = selectPhoto;

            model.widgetId = $routeParams["widgetId"];
            widgetService
                .findWidgetById(model.widgetId)
                .then(initializeWidget);
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
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server
            + "/" + photo.id + "_" + photo.secret + "_s.jpg";
            model.widget.url = url;
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(updateSuccess);

        }

        function initializeWidget(widget) {
            model.widget = widget;
        }

        function updateSuccess(widget) {
            model.widget = widget;
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget/" + widget._id);
        }


    }
})();