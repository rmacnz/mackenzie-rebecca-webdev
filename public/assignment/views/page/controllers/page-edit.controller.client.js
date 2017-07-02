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

            model.urlPrev = "#!/user/" + model.userId + "/website/" + model.webId + "/page";
            model.headerTitle = "Edit Page";

            model.clickOk = updatePage;
            model.deletePage = deletePage;

            pageService
                .findPageById(model.pageId)
                .then(initializePage);
        }

        function initializePage(page) {
            model.page = page;
        }

        function updatePage() {
            if (model.page.name != "") {
                pageService
                    .updatePage(model.pageId, model.page)
                    .then(updateSuccess);
            } else {
                model.errormsg = "Please enter a name for the page.";
            }
        }

        function updateSuccess(page) {
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(deleteSuccess);
        }

        function deleteSuccess() {
            $location.url("/user/" + model.userId + "/website/" + model.webId + "/page");
        }
    }

})();