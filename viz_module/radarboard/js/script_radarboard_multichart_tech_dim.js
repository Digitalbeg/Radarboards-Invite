//#region ///--------A Set Root, Wraper Container, Function Change Datensatz----------------------------------------------------
var root = am5.Root.new("chartdiv");

// disable browser rigth context menu
root.addDisposer(
    am5.utils.addEventListener(root.dom, "contextmenu", function (ev) {
        ev.preventDefault();
    })
);

root.setThemes([
    am5themes_Animated.new(root),
    am5themes_Responsive.new(root)
]);

/// Create wrapper container für beide charts
var container = root.container.children.push(am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    //layout: root.verticalLayout
}));

var aktuellerDatensatz = "Tech-Dimensionen";
/// Funktion zum Wechsel des aktuellen Datensatzes über select box in html seite
function changeDatensatz(nameDatensatz) {
    // show chart Dim und hide chart UDim
    if (nameDatensatz == "Tech-Dimensionen") {
        aktuellerDatensatz = "Tech-Dimensionen";
        sliderTechDim.set("start", sliderTechUDimStand); //slider Stand von UDim übernehmen bei umschalten datensatz, damit konsistent zu UDim Zeitpunkt
        containerTechDim.show(1000);
        containerTechUDim.hide(500);

    }
    // show chart UDim und hide chart Dim
    else if (nameDatensatz == "Tech-UnterDimensionen") {
        aktuellerDatensatz = "Tech-UnterDimensionen";
        containerTechDim.hide(500);

        sliderTechUDim.set("start", sliderTechDimStand); //slider Stand von Dim übernehmen bei umschalten datensatz, damit konsistent zu Dim Zeitpunkt
        containerTechUDim.show(1000);


    }

}
//#endregion ///-----A END Set Root, Warper Container---------------------------------------------------------------------------------

