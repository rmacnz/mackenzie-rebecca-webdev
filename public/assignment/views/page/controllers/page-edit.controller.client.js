(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, pageService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.pageId = $routeParams["pid"];
            model.page = pageService.findPageById(model.pageId);

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page";
            model.headerTitle = "Edit Page";

            model.clickOk = updatePage;
            model.deletePage = deletePage;
        }

        function updatePage() {
            if (model.page.name != "") {
                pageService.updatePage(model.pageId, model.page);
                $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
            } else {
                model.errormsg = "Please enter a name for the page.";
            }
        }

        function deletePage() {
            pageService.deletePage(model.pageId);
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }
    }

})();