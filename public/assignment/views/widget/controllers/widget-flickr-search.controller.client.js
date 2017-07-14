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

            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.widgetId = $routeParams["wgid"];
            widgetService
                .findWidgetById(model.widgetId)
                .then(initializeWidget, errorWhenInitializing);
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
            if (model.widget == null) {
                errorWhenInitializing("Widget was never initialized");
            }
            model.widget.url = url;
            if (model.widgetId != null) {
                widgetService
                    .updateWidget(model.widgetId, model.widget)
                    .then(updateSuccess);
            } else {
                var togo = "/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId +
                    "/widget/new/image?url=" + url;
                if (model.widget.name != null) {
                    togo = togo + "&name=" + model.widget.name;
                }
                if (model.widget.text != null) {
                    togo = togo + "&text=" + model.widget.text;
                }
                if (model.widget.width != null) {
                    togo = togo + "&width=" + model.widget.width;
                }
                $location.url(togo);
            }

        }

        function initializeWidget(widget) {
            if (widget._id == null) {
                errorWhenInitializing("No such widget");
            } else {
                model.widget = widget;
            }
        }

        function errorWhenInitializing(error) {
            model.widgetId = null;
            model.widget = {};
            model.widget.name = $routeParams["name"];
            model.widget.text = $routeParams["text"];
            model.widget.width = $routeParams["width"];
        }

        function updateSuccess(widget) {
            model.widget = widget;
            var url = "/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId + "/widget/" + widget._id;
            $location.url(url);
        }
    }
})();