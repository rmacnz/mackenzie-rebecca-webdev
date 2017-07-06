(function(){
    angular
        .module("WebAppMaker",["ngRoute"])
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {
        return {
            link: linkFunction
        }

        function linkFunction(scope, element) {
            element.sortable();
        }
    }
})();