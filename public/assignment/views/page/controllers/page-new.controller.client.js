(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, pageService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page";
            model.headerTitle = "New Page";

            model.clickOk = createPage;
        }

        function createPage() {
            if (model.page != null) {
                pageService.createPage(model.webId, model.page);
                $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
            } else {
                model.errormsg = "Please enter some information about your new page.";
            }
        }
    }

})();