//#region ///--------A   Start Set Root, Themes, Container, Chart, Legende, TitelHole---------------------------------
//#region ///--------A.2 Init Themes, Container, Chart, Legend, Title-----------------------------------------------
//-------------------------------Container und Radar Chart--------------------------------
var containerTechUDim = container.children.push(am5.Container.new(root, {
    width: myChartWidth,
    height: myChartHeight,
    //layout: root.verticalLayout
}));

var chartTechUDim = containerTechUDim.children.push(am5radar.RadarChart.new(root, {
    radius: radiusUDimRadarboard, //grösse chart in container, 80% lässtplatz für legende etc.
    innerRadius: radiusHoleDimUebersichtSeriesTausch, //grösse loch in der mitte
    panX: false,
    panY: false,
    wheelX: "panX",
    scale: scaleChartUDim,
    //dx: 50, //chart besser in mitte zentrieren, legend dann unten zurück schieben
    //dy: -50,
    dx: 100, //chart besser in mitte zentrieren, legend dann unten zurück schieben
    dy: -35,
}));


//-------- pseudo legend um andere legend anzeigen und verbergen zu können-------------
var legendUDimFilterAnzeigen = chartTechUDim.children.push(am5.Legend.new(root, {
    nameField: "categoryX",
    /*   y: am5.percent(39), */
    /* y: 355, */
    dy: 385,
    x: -87,
    /* dx: -10, */
    useDefaultMarker: true,
    layout: root.verticalLayout
}));
legendUDimFilterAnzeigen.markers.template.setup = function (marker) {
    var check = am5.Graphics.new(root, {
        fill: am5.Color.brighten(am5.color(0xffffff), 0),
        fillOpacity: 0.8,
        layer: 50,
        svgPath: "M15.75 2.527c-.61-.468-1.46-.328-1.902.32l-6.325 9.255L4.04 8.328a1.3 1.3 0 0 0-1.922-.062 1.505 1.505 0 0 0-.062 2.043s4.234 4.695 4.843 5.168c.61.468 1.457.328 1.903-.32L16.05 4.55c.445-.653.308-1.555-.301-2.024Zm0 0"
    });
    check.states.create("disabled", {
        fillOpacity: 0
    });
    marker.children.push(check);
}
legendUDimFilterAnzeigen.markers.template.setAll({ width: 20, height: 20 });
legendUDimFilterAnzeigen.labels.template.setAll({
    fontSize: fontSizeLegendeDim,
    fontWeight: "500"
});
//--------Ende pseudo legend um andere legend anzeigen und verbergen zu können-------------


var legendTechUDim = chartTechUDim.children.push(am5.Legend.new(root, {
    nameField: "categoryX",
    /*   y: am5.percent(39), */
    dy: 415,
    dx: -112,
    useDefaultMarker: true,


    /* layout: root.verticalLayout */
    layout: am5.GridLayout.new(root, {
        maxColumns: 2,
        /* fixedWidthGrid: true */
    })
}));
legendTechUDim.valueLabels.template.set("forceHidden", true); //macht Legende kompakter

//----------- Legend marker size und Aussehen-------------
legendTechUDim.markers.template.setup = function (marker) {
    var check = am5.Graphics.new(root, {
        fill: am5.Color.brighten(am5.color(0xffffff), 0),
        scale: 0.9,
        fillOpacity: 0.7,
        layer: 50,
        svgPath: "M15.75 2.527c-.61-.468-1.46-.328-1.902.32l-6.325 9.255L4.04 8.328a1.3 1.3 0 0 0-1.922-.062 1.505 1.505 0 0 0-.062 2.043s4.234 4.695 4.843 5.168c.61.468 1.457.328 1.903-.32L16.05 4.55c.445-.653.308-1.555-.301-2.024Zm0 0"
    });
    check.states.create("disabled", {
        fillOpacity: 0
    });
    marker.children.push(check);
}
legendTechUDim.markers.template.setAll({ width: 17, height: 17 });

//----------- Legend Textsize and value Textsize----------
legendTechUDim.labels.template.setAll({
    //fontSize: fontSizeLegendeUDim,
    fontSize: fontSizeLegendeUDim,
    //fill: ColorDim2Value1, //farbe legend text aber leider statisch für alle
    fontWeight: "500"
});



//var textStatisch = "[fontWeight: 500 fontSize: 0.8em]Technologische\nUnterdimensionen";
var textStatisch = "";
var titleHoleTechUDim = chartTechUDim.children.push(am5.Label.new(root, {
    //interactive: true,
    //tooltipText: "[fontWeight: 400 fontSize: 1em]Einschätzung der Schwerpunkte der\nProjekte auf Grundlage:\n- des Antrages, \n- des Zwischenberichtes 2021,\n- der Selbsteinschätzung der Projekte",
    text: textStatisch,
    textAlign: "center",
    fontWeight: 400,
    x: am5.percent(50),
    y: am5.percent(50),
    dy: -8, // etwas nach oben rücken da dynamisch drunter etwas abstand haben soll
    centerY: am5.percent(50),
    centerX: am5.percent(50),
    background: am5.Rectangle.new(root, {
        fill: am5.color(0x000000),
        fillOpacity: 0
    })
}));


/* var textDynamischStandAntrag = "[fontStyle: italic fontWeight: 400 fontSize: 1em]Stand Antrag[/]";
var textDynamischStandZB2021 = "[fontStyle: italic fontWeight: 400 fontSize: 1em]Stand ZB[/]";
var textDynamischStandTagung2021 = "[fontStyle: italic fontWeight: 400 fontSize: 1em]Projektabschluss[/]";
var textDynamisch = textDynamischStandAntrag; // wird in slider event handler dynamisch mit neuem text gesetzt wird schon in techdim gesetzt deshalb hier raus  */

var titleHoleTechUDimDynamisch = chartTechUDim.children.push(am5.Label.new(root, {
    text: textDynamisch,
    textAlign: "center",
    fontWeight: 500,
    x: am5.percent(50),
    y: am5.percent(50),
    dy: -5,
    centerY: am5.percent(50),
    centerX: am5.percent(50)
}));


//#endregion ///-----A.2 End Init Themes, Container, Chart, Legend, Title--------------------------
//#region ///--------A.3 Konfiguration Chart, Grid, Legend, Tooltip, Axes--------------------------------------
//grid in chart auf farbe weiss setzen damit es unsichtbar wird
root.interfaceColors.set("grid", ColorGrid);

var yAxisTechUDim = chartTechUDim.yAxes.push(am5xy.ValueAxis.new(root, {
    //visible: false,
    min: 0,
    max: 100, /// !!wenn über 100 erzeugt ring aussen aber ohne range daher nicht abschaltbar, wird in event seriesGesamtWerte gesetzt, damit dynamisch
    //max: 100, 
    numberFormat: "#'%'",
    strictMinMax: true,

    //extraMax: 0.1, //geht wegen grid? nur in 10% schritten
    renderer: am5radar.AxisRendererRadial.new(root, { minGridDistance: 50, opposite: true })
}));

//yAxisTechUDim.yAxes.set("max", "108");


var yRendererTechUDim = yAxisTechUDim.get("renderer");
yRendererTechUDim.grid.template.setAll({
    stroke: ColorGrid,
    strokeWidth: 0.05
});

yRendererTechUDim.labels.template.setAll({
    minPosition: 0.05,
    maxPosition: 1,
    fill: ColorBlackYAxisText,
    //fill: ColorBlack,
    fontSize: "0.75em",
    fontWeight: "bold",
    inside: true,
    visible: false //false für ausblenden beschriftung Y Achse
});

yRendererTechUDim.ticks.template.setAll({
    maxPosition: 0.95,
    stroke: ColorBlackYAxis,
    strokeWidth: 0.5,
    dy: -1, //ticks nach oben da label nach unten um 5 points wegen ring und 100% text
    visible: false //false für ausblenden ticks
});

yAxisTechUDim.labelsContainer.set("dy", "4");

// Create axes and their renderers, xAxis zweimal für Dim und für UDim
var xRendererTechUDim = am5radar.AxisRendererCircular.new(root, {});
xRendererTechUDim.labels.template.setAll({
    //fontSize: fontSizeUDimLabel, //wird in range individuell festgelegt, damit flexibler und pro range anpassbar
    fontSize: 0.1,
    textType: "circular",
    //radius: 12,
    fill: ColorWhite, //damit text nicht doppelt erscheint, range druckt auch noch mal text
    //damit text nicht doppelt erscheint, range druckt auch noch mal text
    inside: false,

});

var xAxisTechUDim = chartTechUDim.xAxes.push(am5xy.CategoryAxis.new(root, {
    /* visible: false, */
    maxDeviation: 0,
    categoryField: "dimension",
    renderer: xRendererTechUDim,
}));

xRendererTechUDim.grid.template.setAll({
    stroke: ColorGridEinzelProjekt,
    //stroke: ColorWhite,
    strokeWidth: 1 ///Bestimmt dicke und farbe des grids
});

xRendererTechUDim.labels.template.setAll({
    oversizedBehavior: "wrap",
    textAlign: "center"
});

/// Zoom buttons
var buttonsTechUDim = containerTechUDim.children.push(am5.Container.new(root, {
    //var buttons = container.children.push(am5.Container.new(root, {
    layout: root.horizontalLayout,
    x: am5.percent(100),
    dx: -95,
    y: am5.percent(0),
    //dy: -2,
}));
var currentScaleTechUDim = 1; //scale für zoom button + und - des graphen
function createButtonTechUDim(text, kat, textTooltip) {
    var buttonTechUDim = buttonsTechUDim.children.push(am5.Button.new(root, {
        paddingTop: -4, paddingRight: -4, paddingBottom: -4, paddingLeft: -4, marginLeft: 3, scale: 1.2,
        tooltip: am5.Tooltip.new(root, { pointerOrientation: "horizontal" }),
        tooltipText: textTooltip,
        label: am5.Label.new(root, { text: text, fontSize: 9, fill: colorTextButton, })
    }));
    buttonTechUDim.events.on("click", function () {
        if (kat == "Z1") { //zoom in
            currentScaleTechUDim = currentScaleTechUDim + 0.05; chartTechUDim.set("scale", currentScaleTechUDim);
            return buttonTechUDim;
        };
        if (kat == "Z2") { //zoom out
            currentScaleTechUDim = currentScaleTechUDim - 0.05; chartTechUDim.set("scale", currentScaleTechUDim);
            return buttonTechUDim;
        };
        if (kat == "Z3") { //zoom reset
            currentScaleTechUDim = 1; chartTechUDim.set("scale", currentScaleTechUDim);
            return buttonTechUDim;
        };
        buttonTechUDim.set("active", true);
    });
    buttonTechUDim.get("background").setAll({
        cornerRadiusTL: 5, cornerRadiusTR: 5, cornerRadiusBR: 5, cornerRadiusBL: 5,
        fill: colorKategorieButtonBackground, strokeOpacity: 0.6, fillOpacity: 0.1
    });
    buttonTechUDim.setAll({
        tooltipX: am5.percent(50),
        tooltipY: 22
    });
    buttonTechUDim.get("background").states.create("hover", {}).setAll({ fill: colorKategorieButtonHoverDownActive, fillOpacity: 0.6 });
    buttonTechUDim.get("background").states.create("active", {}).setAll({ fill: colorKategorieButtonHoverDownActive, fillOpacity: 0.6 });
    return buttonTechUDim;
};

//bZ1TechUDim = createButtonTechUDim("[fontSize: 11px white fontWeight: 500]+[/]", "Z1", "[fontSize: 12px fontWeight: 400]Zoom in[/]"); //Zoom in radarboard über scale
//bZ2TechUDim = createButtonTechUDim("[fontSize: 11px white fontWeight: 500]-[/]", "Z2", "[fontSize: 12px fontWeight: 400]Zoom out[/]"); //Zoom out radarboard über scale
//bZ3TechUDim = createButtonTechUDim("[fontSize: 11px white fontWeight: 400]100%[/]", "Z3", "[fontSize: 12px fontWeight: 400]Reset Zoom 100%[/]"); //Reset Zoom to scale=1

///tooltip für UDim mit Namen der projekte aufbauen, dann dynamisch in series bullet zuweisen
var tooltipNamenProjekteSeries1 = [];
var tooltipNamenProjekteSeries2 = [];
var tooltipNamenProjekteSeries3 = [];

textTooltipProjekteSeries3 = "[fontSize: 14px fontWeight: 500]Dimension in Ansätzen / keine Aussage in Vorhaben:\n[fontSize: 1.2em][fontSize: 13px fontStyle: italic]";
textTooltipProjekteSeries2 = "[fontSize: 14px fontWeight: 500]Dimension vorhanden in Vorhaben:\n[fontSize: 1.2em][fontSize: 13px fontStyle: italic]";
textTooltipProjekteSeries1 = "[fontSize: 14px #eee fontWeight: 500]Dimension ausgeprägt in Vorhaben:\n[fontSize: 1.2em #fff][fontSize: 13px fontStyle: italic #fff]";


for (var i = 0; i <= 2; i++) {
    tooltipNamenProjekteSeries1[i] = [];
    tooltipNamenProjekteSeries2[i] = [];
    tooltipNamenProjekteSeries3[i] = [];
}

function createTooltipNamenProjekte(nameDatensatz, indexDatensatz) {
    datensatz = nameDatensatz;
    //  console.log("nameDatensatz:", datensatz);
    tooltipNamenProjekteSeries1[indexDatensatz] = [];
    tooltipNamenProjekteSeries2[indexDatensatz] = [];
    tooltipNamenProjekteSeries3[indexDatensatz] = [];

    for (var indexUDim = 0; indexUDim < datensatz.length; indexUDim++) {
        //tooltipNamenProjekteSeries2[indexUDim] = "";
        startProjekt = 1; endProjekt = 34;
        for (var indexValue = startProjekt; indexValue <= endProjekt; indexValue++) { //value1 bis value 34 in datensatz Einzel
            //* console.log("iUDim,Projekt,value:" + indexUDim + "," + projekteNamen[indexValue - 1] + " " + datensatz[indexUDim]["value" + indexValue]);
            if (datensatz[indexUDim]["value" + indexValue] == 0) { tooltipNamenProjekteSeries3[indexDatensatz][indexUDim] = tooltipNamenProjekteSeries3[indexDatensatz][indexUDim] ? tooltipNamenProjekteSeries3[indexDatensatz][indexUDim] + " | " + projekteNamen[indexValue - 1] : projekteNamen[indexValue - 1] };
            if (datensatz[indexUDim]["value" + indexValue] == 1) { tooltipNamenProjekteSeries3[indexDatensatz][indexUDim] = tooltipNamenProjekteSeries3[indexDatensatz][indexUDim] ? tooltipNamenProjekteSeries3[indexDatensatz][indexUDim] + " | " + projekteNamen[indexValue - 1] : projekteNamen[indexValue - 1] };
            if (datensatz[indexUDim]["value" + indexValue] == 2) { tooltipNamenProjekteSeries2[indexDatensatz][indexUDim] = tooltipNamenProjekteSeries2[indexDatensatz][indexUDim] ? tooltipNamenProjekteSeries2[indexDatensatz][indexUDim] + " | " + projekteNamen[indexValue - 1] : projekteNamen[indexValue - 1] };
            if (datensatz[indexUDim]["value" + indexValue] == 3) { tooltipNamenProjekteSeries1[indexDatensatz][indexUDim] = tooltipNamenProjekteSeries1[indexDatensatz][indexUDim] ? tooltipNamenProjekteSeries1[indexDatensatz][indexUDim] + " | " + projekteNamen[indexValue - 1] : projekteNamen[indexValue - 1] };

        };
    }
    //console.log("tooltipProjekte:", tooltipNamenProjekteSeries1);

};

createTooltipNamenProjekte(dataUnterDimensionenEinzelStandZeitpunktA, indexDatensatz = 0);
createTooltipNamenProjekte(dataUnterDimensionenEinzelStandZeitpunktB, indexDatensatz = 1);
createTooltipNamenProjekte(dataUnterDimensionenEinzelStandZeitpunktC, indexDatensatz = 2);

//#endregion ///-----A.3 End Anpassung Chart, Grid, Legend, Tooltip, Axes, Zoom Buttons-------------------------------
//#endregion ///-----A   End Set Root, Loading Indicator, Themes, Container, Title, Filter, Buttons-----------------


//#region ///--------B   Start Series, Ranges, Legenden Ausblenden, Events -----------------------------------------
//#region ///--------B.1 Init & Konfiguration Serie, Range ---------------------------------------------------
// Create series für UDim extra series 
/// series 3 aussen neu innen Bewertung 0-1 keine Aussagen
var series3TechUDim = chartTechUDim.series.push(am5radar.RadarColumnSeries.new(root, {
    categoryXField: "dimension",
    fill: ColorGrauValue3,
    stacked: true,
    name: "keine Aussage oder in Ansätzen",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    valueYField: "value3",
    /* valueXField: "id" */
    valueXField: "id"
}));

series3TechUDim.columns.template.setAll({
    fillOpacity: fillOpacitySeriesKeineAussage,
    strokeWidth: 1,
    width: am5.percent(100)
});

series3TechUDim.columns.template.adapters.add("fill", function (fill, target) {
    var id = target.dataItem.get("valueX"); //array coplors fängt bei 0 an, dim id fängt bei 1 an
    //console.log("series3 id:" + id);
    return series3TechUDimColors[id - 1];
});

var labelTechUDimSeries3 = [];
var circleTechUDimSeries3 = [];
var series3TechUDimCounter = 0;
var tooltipMitProjektNamenSeries3 = "";

series3TechUDim.bullets.push(function () {
    color = series3TechUDimColors[series3TechUDimCounter];
    color = am5.Color.brighten(color, -0.3);

    ///tooltip mit den Projektnamen ergänzen damit in UDim radar sichtbar welche Porjekte ausgeprägt, vorhaden etc sind
    //* textTooltip = "[fontSize: 1em]Dimension [fontSize: 1em fontWeight: bold]keine Aussage\noder keine Relevanz[/] in [fontSize: 1em fontWeight: bold]\n{valueY}%[/][fontSize: 1em] der Vorhaben"
    textTooltip = "[fontSize: 14px fontWeight: 500]Dimension in Ansätzen/keine Aussage in Vorhaben:";
    tooltipMitProjektNamenSeries3 = textTooltip + "\n[fontSize: 1.2em][fontSize: 13px fontStyle: italic]" + tooltipNamenProjekteSeries3[0][series3TechUDimCounter];
    //tooltipMitProjektNamenSeries3 = textTooltip + ":\n[fontSize: 14px]" + tooltipNamenProjekteSeries3[series3TechUDimCounter];

    series3TechUDimCounter = series3TechUDimCounter + 1;

    var container = am5.Container.new(root, {});
    circleTechUDimSeries3[series3TechUDimCounter] = container.children.push(am5.Circle.new(root, {
        interactive: true,
        radius: 15,
        tooltipY: -7,
        //fill: color,
        fill: ColorWhiteCircleFill,
        fillOpacity: fillOpacityWhiteCircleSeries3,
        //stroke: root.interfaceColors.get("background"),
        strokeWidth: 0.0,
    }));

    var tooltipCircle = am5.Tooltip.new(root, { getFillFromSprite: false });
    tooltipCircle.get("background").setAll({
        fillOpacity: 0.95,
        fill: am5.Color.brighten(color, 0.8)
    });

    tooltipCircle.label.setAll({ /// wrap automatisch in tooltip label funktioniert!!
        oversizedBehavior: "wrap",
        maxWidth: 350
    });

    circleTechUDimSeries3[series3TechUDimCounter].setAll({
        tooltip: tooltipCircle,
        //tooltipText: "[fontSize: 1em #fff]Dimension [fontSize: 1em fontWeight: bold]adressiert[/][#fff] in\n[fontSize: 1em fontWeight: bold #fff]{valueY}%[/][fontSize: 1em #fff] der Vorhaben",
        tooltipText: tooltipMitProjektNamenSeries3,
    });

    circleTechUDimSeries3[series3TechUDimCounter].states.create("hover", { scale: 1.1, fillOpacity: 0.4 }); //bei mouse over circle, diesen auf das doppelte vergrössern

    labelTechUDimSeries3[series3TechUDimCounter] = container.children.push(am5.Label.new(root, {
        text: "{valueY}",
        fontSize: fontSizeUDimValue,
        fontWeight: 400,
        //fill: ColorWhite,
        fill: color,
        //fill: colorLabelCircleSeries3,
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
    }));

    return am5.Bullet.new(root, {
        locationX: 0.5,
        //locationY: 1,
        locationY: 0.5,
        sprite: container
    });
});

/// series 2 mitte Merkmal adressiert
var series2TechUDim = chartTechUDim.series.push(am5radar.RadarColumnSeries.new(root, {
    categoryXField: "dimension",
    fill: ColorWhite,
    stacked: true,
    name: "Dimension vorhanden",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    valueYField: "value2",
    /*   tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "down", //"left", "right", "vertical", "down", "up" orig down
        dy: -45,
        dx: -10,
        labelText: "[fontSize: 14px fontWeight: 500]{name}:\n[fontSize: 13px fontWeight: 400]{textLang}"
      }), */
    valueXField: "id"
}));


series2TechUDim.columns.template.setAll({
    //tooltipText: "[fontSize: 14px fontWeight: 500]{name}:\n[fontSize: 13px fontWeight: 400]{textLang}",
    fillOpacity: fillOpacitySeriesVorhanden, ///keine farbe definiert, da diese von range kommt und hier nur opacity angepasst wird
    strokeWidth: 1,
    width: am5.percent(100)
});

series2TechUDim.columns.template.adapters.add("fill", function (fill, target) {
    var id = target.dataItem.get("valueX"); //array coplors fängt bei 0 an, dim id fängt bei 1 an
    return series2TechUDimColors[id - 1];
});

var labelTechUDimSeries2 = [];
var circleTechUDimSeries2 = [];
var series2TechUDimCounter = 0;
var tooltipMitProjektNamenSeries2 = "";



series2TechUDim.bullets.push(function () {
    color = series2TechUDimColors[series2TechUDimCounter];
    color = am5.Color.brighten(color, -0.3);


    ///tooltip mit den Projektnamen ergänzen damit in UDim radar sichtbar welche Porjekte ausgeprägt, vorhaden etc sind
    textTooltip = "[fontSize: 14px fontWeight: 500]Dimension vorhanden in Vorhaben:";
    textTooltipMitProjektNamenSeries2 = textTooltip + "\n[fontSize: 1.2em][fontSize: 13px fontStyle: italic]" + tooltipNamenProjekteSeries2[0][series2TechUDimCounter];

    series2TechUDimCounter = series2TechUDimCounter + 1;

    var container = am5.Container.new(root, {});
    //if (wertValue2 >= 0) { /// circle mit label nur an datenpunkt anbringen wenn wert value >0 ist

    circleTechUDimSeries2[series2TechUDimCounter] = container.children.push(am5.Circle.new(root, {
        interactive: true,
        radius: radiusLabelUDimValue,
        fill: ColorWhiteCircleFill,
        fillOpacity: fillOpacityWhiteCircleSeries2,

        tooltipY: -7,
        strokeWidth: 0.5,
    }));

    var tooltipCircle = am5.Tooltip.new(root, { getFillFromSprite: false });
    tooltipCircle.get("background").setAll({
        fillOpacity: 0.95,
        fill: am5.Color.brighten(color, 0.7)
    });

    tooltipCircle.label.setAll({ /// wrap automatisch in tooltip label funktioniert!!
        oversizedBehavior: "wrap",
        maxWidth: 350
    });

    circleTechUDimSeries2[series2TechUDimCounter].setAll({
        tooltip: tooltipCircle,
        //tooltipText: "[fontSize: 1em #fff]Dimension [fontSize: 1em fontWeight: bold]adressiert[/][#fff] in\n[fontSize: 1em fontWeight: bold #fff]{valueY}%[/][fontSize: 1em #fff] der Vorhaben",
        tooltipText: textTooltipMitProjektNamenSeries2,
    });

    circleTechUDimSeries2[series2TechUDimCounter].states.create("hover", { scale: 1.1, fillOpacity: 0.2 }); //bei mouse over circle, diesen auf das doppelte vergrössern

    labelTechUDimSeries2[series2TechUDimCounter] = container.children.push(am5.Label.new(root, {
        text: "{valueY}",
        fontSize: fontSizeUDimValue,
        fontWeight: 400,
        // fill: color,
        fill: colorLabelCircleSeries2,
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
    }));

    return am5.Bullet.new(root, {
        locationY: 0.5,
        sprite: container
    });
});

/// series 1 innnen Merkmal sehr ausgeprägt jetzt aussen
var series1TechUDim = chartTechUDim.series.push(am5radar.RadarColumnSeries.new(root, {

    categoryXField: "dimension",
    stacked: true,
    name: "Dimension sehr ausgeprägt",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    valueYField: "value1",
    valueXField: "id",
    stroke: ColorWhite,

    fill: fillSeriesAusgepraegt,  /// wird auch für legenden eintrag benutzt, color in column kommt von range, dann wir pro serie opacity angepasst
}));

series1TechUDim.columns.template.setAll({

    fillOpacity: fillOpacitySeriesAusgepraegt,
    strokeWidth: 0.5,
    width: am5.percent(100)
});

series1TechUDim.columns.template.adapters.add("fill", function (fill, target) {
    var id = target.dataItem.get("valueX"); //array coplors fängt bei 0 an, dim id fängt bei 1 an
    return series1TechUDimColors[id - 1];
});


var labelTechUDimSeries1 = [];
var circleTechUDimSeries1 = [];
var series1TechUDimCounter = 0;
var tooltipMitProjektNamenSeries1 = "";

series1TechUDim.bullets.push(function () {
    color = series1TechUDimColors[series1TechUDimCounter];
    color = am5.Color.brighten(color, -0.3);

    //console.log("value1=" + wertValue1);
    textTooltip = "[fontSize: 14px #eee fontWeight: 500]Dimension ausgeprägt in Vorhaben:";
    tooltipMitProjektNamenSeries1 = textTooltip + "\n[fontSize: 1.2em #fff][fontSize: 13px fontStyle: italic #fff]" + tooltipNamenProjekteSeries1[0][series1TechUDimCounter];

    series1TechUDimCounter = series1TechUDimCounter + 1;

    var series1bulletContainerTechUDim = am5.Container.new(root, {});

    circleTechUDimSeries1[series1TechUDimCounter] = series1bulletContainerTechUDim.children.push(am5.Circle.new(root, {
        interactive: true,
        radius: radiusLabelUDimValue,
        tooltipY: -7,
        fill: ColorWhiteCircleFill,
        fillOpacity: fillOpacityWhiteCircleSeries1,
        strokeWidth: 0.5,
    }));

    var tooltipCircle = am5.Tooltip.new(root, { getFillFromSprite: false });
    tooltipCircle.get("background").setAll({
        fillOpacity: 0.95,
        fill: am5.Color.lighten(color, 0.2)
    });

    tooltipCircle.label.setAll({ /// wrap automatisch in tooltip label funktioniert!!
        oversizedBehavior: "wrap",
        maxWidth: 350
    });

    circleTechUDimSeries1[series1TechUDimCounter].setAll({
        tooltip: tooltipCircle,
        tooltipText: tooltipMitProjektNamenSeries1
    });



    /*  if (dataUnterDimensionen[series1TechUDimCounter - 1].valueProzentGesamt1 == '0') {
         circleLabelText = "{valueY}";
     } else {
         circleLabelText = "";
         console.log("series1 valueProzentGesamt1=" + dataUnterDimensionen[series1TechUDimCounter - 1].valueProzentGesamt1);
     }; */
    //circleLabelText = "99";

    labelTechUDimSeries1[series1TechUDimCounter] = series1bulletContainerTechUDim.children.push(am5.Label.new(root, {
        // text: "{valueY}",
        //text: circleLabelText,
        text: "",
        fontSize: fontSizeUDimValue,
        fontWeight: 400,
        fill: colorLabelCircleSeries1,
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
    }));
    circleTechUDimSeries1[series1TechUDimCounter].states.create("hover", { scale: 0.9, fillOpacity: 0.3 }); //bei mouse over circle, diesen auf das doppelte vergrössern

    return am5.Bullet.new(root, {
        locationY: 0.5,
        //sprite: (dataUnterDimensionenEinzel[series1TechUDimCounter - 1].valueProzentGesamt1 == 0) ? undefined : series1bulletContainerTechUDim //wenn wert von value1 (Dim ausgeprägt) 0 ist keine bullet zeichnen

        sprite: series1bulletContainerTechUDim //wenn wert von value1 (Dim ausgeprägt) 0 ist keine bullet zeichnen
    });
});


/// pseudo series für Anzeige der Prozentwerte also insgesamt 60 zahlen
seriesProzentValuesUDim = chartTechUDim.series.push(am5radar.RadarLineSeries.new(root, {
    name: "Anzahl Vorhaben in %",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    fill: ColorGrauValue1,
    valueYField: undefined,
    categoryXField: "dimension",
}));

function showHideProzentValuesUDim(zeigeBeschriftung) {
    var counterUDimDatensatz = 0; am5.array.each(series1TechUDim.dataItems, function (dataItem) { counterUDimDatensatz++; if (labelTechUDimSeries1[counterUDimDatensatz]) { labelTechUDimSeries1[counterUDimDatensatz].set("visible", zeigeBeschriftung) }; });
    var counterUDimDatensatz = 0; am5.array.each(series2TechUDim.dataItems, function (dataItem) { counterUDimDatensatz++; if (labelTechUDimSeries2[counterUDimDatensatz]) { labelTechUDimSeries2[counterUDimDatensatz].set("visible", zeigeBeschriftung) }; });
    var counterUDimDatensatz = 0; am5.array.each(series3TechUDim.dataItems, function (dataItem) { counterUDimDatensatz++; if (labelTechUDimSeries3[counterUDimDatensatz]) { labelTechUDimSeries3[counterUDimDatensatz].set("visible", zeigeBeschriftung) }; });
};

seriesProzentValuesUDim.on("visible", function (visible, target) {
    if (visible) { showHideProzentValuesUDim(true) } // true bedeutet Beschriftung anzeigen
    else { showHideProzentValuesUDim(false) } // false bedeutet Beschriftung ausblenden
});

/// pseudo series für keineAussage ausblenden
seriesUDimKeineAussageAusblenden = chartTechUDim.series.push(am5radar.RadarLineSeries.new(root, {
    name: "alle Ausprägungen anzeigen",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    fill: ColorGrauValue1,
    valueYField: undefined,
    categoryXField: "dimension",
}));

seriesUDimKeineAussageAusblenden.on("visible", function (visible, target) { //UDim werte in Ansätzen / nicht relevant ein und ausblenden
    // wegen bug UDim Ausprägung keine Aussage anzeigen problem in darstellung

    if (visible) {
        series3TechUDim.show();
        // wegen bug anzeige UDim keine AUssage über Rand hinaus, slider kurz hin und her bewegen, dann anzeige wieder korrekt
        sliderTechUDimStand = sliderTechUDim.get("start");
        sliderTechUDim.set("start", 0.45);
        sliderTechUDim.set("start", sliderTechUDimStand);
    }
    else {
        series3TechUDim.hide();
    }


});

/// pseudo series für wird adressiert ausblenden
seriesUDimWirdAdressiertAusblenden = chartTechUDim.series.push(am5radar.RadarLineSeries.new(root, {
    name: "Dim vorhanden",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    fill: ColorGrauValue1,
    valueYField: undefined,
    categoryXField: "dimension",
}));

seriesUDimWirdAdressiertAusblenden.on("visible", function (visible, target) { //UDim werte in Ansätzen / nicht relevant ein und ausblenden
    for (var index = 0; index < dataUnterDimensionen.length; index++) {
        if (visible) { series2TechUDim.dataItems[index].show(); }
        else { series2TechUDim.dataItems[index].hide(); }
    }
});

/// pseudo series für alle UDim ausblenden 
seriesUDimAusblenden = chartTechUDim.series.push(am5radar.RadarLineSeries.new(root, {
    name: "alle Dimensionen anzeigen",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    fill: ColorGrauValue1,
    valueYField: undefined,
    categoryXField: "dimension",
}));

seriesUDimAusblenden.on("visible", function (visible, target) { //Dim ausblenden
    var keineAussageUDimEingeblendet = seriesUDimKeineAussageAusblenden.get("visible");
    for (var index = 0; index < dataUnterDimensionen.length; index++) { //ein UDim weniger sonst ubekanter hide() error
        if (!visible) {
            series1TechUDim.dataItems[index].hide();
            series2TechUDim.dataItems[index].hide();
            series3TechUDim.dataItems[index].hide();
        }
        else {
            series1TechUDim.dataItems[index].show();
            series2TechUDim.dataItems[index].show();
            //* später series 3 show nur wenn entsprechnende legend box auf an steht
            if (keineAussageUDimEingeblendet) {
                series3TechUDim.dataItems[index].show();
            }
        }
    };
    indexlastUDim = dataUnterDimensionen.length - 1;
    console.log("indexlastUDim:", indexlastUDim);

});

/// pseudo series für UDim Filter anzeigenn
seriesUDimFilterAnzeigen = chartTechUDim.series.push(am5radar.RadarLineSeries.new(root, {
    name: "Filter anzeigen",
    xAxis: xAxisTechUDim,
    yAxis: yAxisTechUDim,
    /* fill: ColorGrauValue1, */
    fill: ColorBlack,
    valueYField: undefined,
    categoryXField: "dimension",
}));

seriesUDimFilterAnzeigen.on("visible", function (visible, target) {

    if (visible) {
        legendTechUDim.show();
        // console.log("Filter visible")
    }
    else {
        legendTechUDim.hide();
        // console.log("Filter else")
    }
});

///Range definieren für Hintergrund Farbe und Label Text
// Funktion für range definieren, da bei UDim 20 Kategorien anfallen
var rangeTechUDim = [];
var rangeDataItemTechUDim = [];

var rangeTechUDimLabelOnly = [];
var rangeDataItemTechUDimLabelOnly = [];

function erstelleRangeTechUDim(indexRange, colorAchseLabel, radiusLabel, fontWeightLabel, fontSize, labelText, text, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
    rangeDataItemTechUDim[indexRange] = xAxisTechUDim.makeDataItem({ above: true, category: startKategorie, endCategory: endKategorie });
    rangeTechUDim[indexRange] = xAxisTechUDim.createAxisRange(rangeDataItemTechUDim[indexRange]);
    // rangeDataItemTechUDim[indexRange].get("label").setAll({ fill: colorAchseLabel, fontWeight: fontWeightLabel, fontSize: fontSize, radius: radiusLabel });
    var tooltip = am5.Tooltip.new(root, { getFillFromSprite: true });
    tooltip.get("background").setAll({ fillOpacity: 0.8 });

    rangeDataItemTechUDim[indexRange].get("label").setAll({
        text: labelText,
        fill: colorAchseLabel,
        fontWeight: fontWeightLabel,
        fontSize: fontSize,
        radius: radiusLabel
    });

    rangeTechUDim[indexRange].get("axisFill").setAll({
        tooltip: tooltip,
        tooltipText: text,
        tooltipX: -600,
        tooltipY: -600,
        visible: true,
        fillOpacity: 0.08, //war 0.15
        fill: colorAchseLabel,
        toggleKey: "active",
        cursorOverStyle: "pointer",
        dRadius: 35,
        innerRadius: -35
    });

    rangeTechUDim[indexRange].get("axisFill").events.on("click", function (event) {
        {
            var dataItem = event.target.dataItem;
            console.log("dataItem:" + dataItem.get("category"));
            // später tabelle anzeigen mit url parameter category
        }
    });

}

/// Range über Unterdim für zusatz Beschriftung der UDim mit den Dim Namen
function erstelleRangeTechUDimLabelOnly(indexRange, colorAchseLabel, radiusLabel, labelText, text, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
    rangeDataItemTechUDimLabelOnly[indexRange] = xAxisTechUDim.makeDataItem({ above: true, category: startKategorie, endCategory: endKategorie });
    rangeTechUDimLabelOnly[indexRange] = xAxisTechUDim.createAxisRange(rangeDataItemTechUDimLabelOnly[indexRange]);

    var tooltip = am5.Tooltip.new(root, { getFillFromSprite: true });
    tooltip.get("background").setAll({ fillOpacity: 0.8 });

    //rangeDataItemTechUDimLabelOnly[indexRange].get("grid").setAll({ visible: true }); //macht gesamten kreis dunkler evtl. später
    //rangeDataItemTechUDimLabelOnly[indexRange].get("axisFill").setAll({ fill: ColorGrauValue1, fillOpacity: 0.95, visible: true }); //macht gesamten kreis dunkler evtl. später

    rangeDataItemTechUDimLabelOnly[indexRange].get("label").setAll({
        text: labelText, /// überschreibt vor initialisierten wert von dimension
        fill: colorAchseLabel,
        fontWeight: fontWeightLabelDimKreis,
        radius: radiusLabel,
        fontSize: fontSizeLabelDimKreis,

    });

    rangeTechUDimLabelOnly[indexRange].get("axisFill").setAll({
        tooltip: tooltip,
        tooltipText: text,
        tooltipX: -600,
        tooltipY: -600,
        visible: true,
        fillOpacity: 0.08, //war 0.15, 0.08
        fill: colorAchseLabel,
        toggleKey: "active",
        cursorOverStyle: "pointer",
        dRadius: 74,
        innerRadius: -39
    });

    rangeTechUDimLabelOnly[indexRange].get("axisFill").events.on("click", function (event) {
        {
            var dataItem = event.target.dataItem;
            console.log("dataItem:" + dataItem.get("category"));
            // tabelle anzeigen mit url parameter category
        }
    });
}

fontWeightLabel2 = 500;  //fontWeightLabel1 ist erstes Label am Aussenkreis des Radarborads, Label 2 ist zweites Label weiter aussen
/// Range für UDim 1-20 erstellen
console.log("thema:", thema);

for (var dim = 1; dim < dataDimensionen.length; dim++) {
    for (var udim = 1; udim <= dataUnterDimensionen.length; udim++) {
        index = udim;
        dim = Math.ceil(udim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
        if (thema == "Fachlich") { //wenn facjliches Radarboard dann nur 15 UDim statt 20
            dim = Math.ceil(udim / 3);
        }
        //console.log("dim,udim,index:", dim, udim, index);
        textUDimTooltip = "[fontSize: 12px fontWeight: 700]" + dataBeschreibungUnterDimensionen[index - 1].name + "[/]\n[fontSize: 12px fontWeight: 400]" + dataBeschreibungUnterDimensionen[index - 1].textLang + "[/]";
        //  erstelleRangeTechUDim(index - 1, eval('ColorDim' + dim + 'Value1'), radiusTechUDimLabel, fontWeightUDimLabel, fontSizeUDimLabel, dataUnterDimensionen[index - 1].dimension, textUDimTooltip, dataUnterDimensionen[index - 1].dimension, dataUnterDimensionen[index - 1].dimension);

        erstelleRangeTechUDim(index - 1, eval('ColorDim' + dim + 'Value1'), radiusTechUDimLabel, fontWeightUDimLabel, fontSizeUDimLabel, dataBeschreibungUnterDimensionen[index - 1].nameKurz, textUDimTooltip, dataUnterDimensionen[index - 1].dimension, dataUnterDimensionen[index - 1].dimension);

    };
};

// Range für Dim 1 bis 5 erstellen beginnt bei 0 da array series auch bei 0 beginnt
fontSizeLabelOnly = "1em";

for (var index = 0; index < dataDimensionen.length - 1; index++) {
    start = index * 4;
    end = start + 3;
    if (thema == "Fachlich") { //wenn fachliches Radarboard dann nur 15 UDim statt 20 UDim
        start = index * 3;
        end = start + 2;
    }
    textDimTooltip = "[fontSize: 13px fontWeight: 700]" + dataDimensionen[index].nameKurz + "[/]\n[fontSize: 13px fontWeight: 400]" + dataDimensionen[index].textLang + "[/]";

    erstelleRangeTechUDimLabelOnly(index, eval('ColorDim' + (index + 1) + 'Value1'), radiusUDimDimLabel, dataDimensionen[index].dimension, textDimTooltip, dataUnterDimensionen[start].dimension, dataUnterDimensionen[end].dimension);
};

/// Range über Unterdim für Zusatz-Beschriftung der Gesamtvalues
var rangeTechUDimGesamtValues = [];
var rangeDataItemTechUDimGesamtValues = [];

function erstelleRangeTechUDimGesamtValues(indexRange, colorAchseLabel, radiusLabel, fontWeightLabel, fontSize, labelText, tooltipText, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
    rangeDataItemTechUDimGesamtValues[indexRange] = xAxisTechUDim.makeDataItem({ category: startKategorie, endCategory: endKategorie });
    rangeTechUDimGesamtValues[indexRange] = xAxisTechUDim.createAxisRange(rangeDataItemTechUDimGesamtValues[indexRange]);
    ///nicht nötig da farbkreis durch hauptrange erzeugt wird rangeDataItemTechUDimGesamtValues[indexRange].get("axisFill").setAll({ visible: true, fill: colorAchseLabel, fillOpacity: 0.9, dRadius: -2, innerRadius: -25, tooltipText: tooltipText }); //innerRadius dicke farbiger streifen
    rangeDataItemTechUDimGesamtValues[indexRange].get("label").setAll({ fill: ColorWhite /* colorAchseLabel */, fontWeight: fontWeightLabel, radius: radiusLabel, fontSize: fontSize, text: labelText });
}

//#region ///----------------------------Slider----------------------------------------------------------------------------------------------------------------------------
var containerSliderTechUDim = chartTechUDim.children.push(am5.Container.new(root, {
    y: am5.percent(102),
    centerX: am5.p50,
    x: am5.p50,
    width: am5.percent(52),
    layout: root.horizontalLayout
}));

var playButtonTechUDim = containerSliderTechUDim.children.push(am5.Button.new(root, {
    themeTags: ["play"],
    centerY: am5.p50,
    marginRight: 15,
    icon: am5.Graphics.new(root, { themeTags: ["icon"] })
}));

playButtonTechUDim.get("background").setAll({ fill: ColorGrauValue1 });

playButtonTechUDim.events.on("click", function () {
    if (playButtonTechUDim.get("active")) {
        sliderTechUDim.set("start", sliderTechUDim.get("start") + 0.0001);
    } else {
        sliderTechUDim.animate({ key: "start", to: 1, duration: 10000 * (1 - sliderTechUDim.get("start")) });
    }
})

// slider steht zu Beginn rechts aussen
var sliderTechUDim = containerSliderTechUDim.children.push(am5.Slider.new(root, {
    orientation: "horizontal",
    //start: 0.90,
    start: 0.05,
    centerY: am5.p50
}));

sliderTechUDimStand = sliderTechUDim.get("start");
//console.log("sliderTechUDimStand:", sliderTechUDimStand);

sliderTechUDim.on("start", function (start) { if (start === 1) { playButtonTechUDim.set("active", false); } });

sliderTechUDim.events.on("rangechanged", function () {
    updateSliderDatensatzTechUDim(Math.round(sliderTechUDim.get("start", 0) * anzahlSliderKategorienDimUDim));
    sliderTechUDimStand = sliderTechUDim.get("start");
}); /// wenn slider bewegt wird dann aufruf funktions zum update der values


var sliderTextStandATechUDim = chartTechUDim.children.push(am5.Label.new(root, {
    text: "Stand 2021",
    y: am5.percent(96),
    x: am5.percent(27),
    fontSize: "0.9em",
    fontWeight: 500,
    fill: ColorBlackYAxisText,
    tooltipText: "[fontWeight: 500 fontSize: 13px]Datengrundlage\n[fontWeight: 400 fontSize: 12px]Fremdeinschätzung der Projektanträge,\ndie im Zeitraum März – September 2021 \n(in zwei Förderwellen) eingegangen sind,\nsowie ergänzende Antragsgespräche.",
    background: am5.Rectangle.new(root, {
        fill: am5.color(0x000000),
        fillOpacity: 0
    })
}));
var sliderTextStandBTechUDim = chartTechUDim.children.push(am5.Label.new(root, {
    text: "Stand Dezember 2022",
    y: am5.percent(96),
    x: am5.percent(49),
    centerX: am5.percent(50),
    fontSize: "0.9em",
    fontWeight: 500,
    fill: ColorBlackYAxisText,
    tooltipText: "[fontWeight: 500 fontSize: 13px]Datengrundlage\n[fontWeight: 400 fontSize: 12px]Fremdeinschätzung der ersten Zwischenberichte\nfür den Berichtszeitraum 2021, anschließend\nerfolgte eine erste Validierungsschleife mittels\nSelbsteinschätzung der Projektkonsortien.",
    background: am5.Rectangle.new(root, {
        fill: am5.color(0x000000),
        fillOpacity: 0
    })
}));
var sliderTextStandCTechUDim = chartTechUDim.children.push(am5.Label.new(root, {
    text: "Stand August 2023",
    y: am5.percent(96),
    x: am5.percent(71),
    centerX: am5.percent(50),
    fontSize: "0.9em",
    fontWeight: 500,
    fill: ColorBlackYAxisText,
    tooltipText: "[fontWeight: 500 fontSize: 13px]Datengrundlage\n[fontWeight: 400 fontSize: 12px]Fremdeinschätzung der zweiten Zwischenberichte\nfür den Berichtszeitraum 2022, anschließend\nerfolgte eine zweite Validierungsschleife mittels\nSelbsteinschätzung der Projektkonsortien.",
    background: am5.Rectangle.new(root, {
        fill: am5.color(0x000000),
        fillOpacity: 0
    })
}));



function updateValuesDatensatzTechUDim(datensatz, indexDatensatz) { ///update der value1..3 in series 1..3 bei slider bewegeung
    dataUnterDimensionen = datensatz;
    var keineAussageUDimEingeblendet = seriesUDimKeineAussageAusblenden.get("visible");
    var wirdAdressiertUDimEingeblendet = seriesUDimWirdAdressiertAusblenden.get("visible");
    //createTooltipNamenProjekte(datensatz)  ///noch einfügen update tooltips mit Namen 

    var counterUDimDatensatz = 0; /// update series1 values
    am5.array.each(series1TechUDim.dataItems, function (dataItem) {
        // var newValue = (dataUnterDimensionen[counterUDimDatensatz].valueProzentGesamt1 > 0) ? dataUnterDimensionen[counterUDimDatensatz].valueProzentGesamt1 : "";
        var newValue = dataUnterDimensionen[counterUDimDatensatz].valueProzentGesamt1;

        var newTooltipText = textTooltipProjekteSeries1 + tooltipNamenProjekteSeries1[indexDatensatz][counterUDimDatensatz];

        if (newValue == 0) { newValue = ""; newTooltipText = "" };

        //*console.log("newvalue1:" + newValue);
        counterUDimDatensatz = counterUDimDatensatz + 1;
        dataItem.set("valueY", newValue);
        if (labelTechUDimSeries1[counterUDimDatensatz]) { labelTechUDimSeries1[counterUDimDatensatz].set("text", newValue) };

        if (circleTechUDimSeries1[counterUDimDatensatz]) { circleTechUDimSeries1[counterUDimDatensatz].set("tooltipText", newTooltipText) };

        dataItem.animate({ key: "valueYWorking", to: newValue, duration: 500 });
    });

    if (wirdAdressiertUDimEingeblendet) { /// update values von serie wird adressiert nur wenn in UDim sichtbar
        var counterUDimDatensatz = 0; /// update series2 values
        am5.array.each(series2TechUDim.dataItems, function (dataItem) {
            var newValue = dataUnterDimensionen[counterUDimDatensatz].valueProzentGesamt2;
            var newTooltipText = textTooltipProjekteSeries2 + tooltipNamenProjekteSeries2[indexDatensatz][counterUDimDatensatz];
            //*console.log("newvalue2:" + newValue);
            counterUDimDatensatz = counterUDimDatensatz + 1; dataItem.set("valueY", newValue);
            if (labelTechUDimSeries2[counterUDimDatensatz]) { labelTechUDimSeries2[counterUDimDatensatz].set("text", newValue) };

            if (circleTechUDimSeries2[counterUDimDatensatz]) { circleTechUDimSeries2[counterUDimDatensatz].set("tooltipText", newTooltipText) };

            dataItem.animate({ key: "valueYWorking", to: newValue, duration: 500 });
        });
    };

    if (keineAussageUDimEingeblendet) { /// update values von serie in Ansätzen nur wenn in UDim sichtbar
        var counterUDimDatensatz = 0; /// update series3 values
        am5.array.each(series3TechUDim.dataItems, function (dataItem) {
            var newValue = dataUnterDimensionen[counterUDimDatensatz].valueProzentGesamt3;
            var newTooltipText = textTooltipProjekteSeries3 + tooltipNamenProjekteSeries3[indexDatensatz][counterUDimDatensatz];
            //*console.log("newvalue3:" + newValue);
            counterUDimDatensatz = counterUDimDatensatz + 1;
            dataItem.set("valueY", newValue);
            if (labelTechUDimSeries3[counterUDimDatensatz]) { labelTechUDimSeries3[counterUDimDatensatz].set("text", newValue) };

            if (circleTechUDimSeries3[counterUDimDatensatz]) { circleTechUDimSeries3[counterUDimDatensatz].set("tooltipText", newTooltipText) };

            dataItem.animate({ key: "valueYWorking", to: newValue, duration: 500 });
        });
    };

};

function updateSliderDatensatzTechUDim(sliderWert) { /// bei slider move updatevalues funktioin aufrufen und text in hole updaten
    //* console.log("UDim slider wert:" + sliderWert);
    if (sliderWert == 0 || sliderWert == 1) {
        updateValuesDatensatzTechUDim(dataUnterDimensionenEinzelStandAntrag, indexDatensatz = 0);
        createTooltipNamenProjekte(dataUnterDimensionenEinzelStandAntrag);
        titleHoleTechUDimDynamisch.set("text", textDynamischStandAntrag);
        //updateSliderDatensatzTechDim(sliderWert); //wegn bug anzeige labels in corcle

    }
    else if (sliderWert == 4 || sliderWert == 5 || sliderWert == 6) {
        updateValuesDatensatzTechUDim(dataUnterDimensionenEinzelStandZB2021, indexDatensatz = 1);
        createTooltipNamenProjekte(dataUnterDimensionenEinzelStandZB2021);
        titleHoleTechUDimDynamisch.set("text", textDynamischStandZB2021);

    }
    else if (sliderWert == 9 || sliderWert == 10 || sliderWert == 11) {
        updateValuesDatensatzTechUDim(dataUnterDimensionenEinzelStandTagung2022, indexDatensatz = 2);
        createTooltipNamenProjekte(dataUnterDimensionenEinzelStandTagung2022);
        titleHoleTechUDimDynamisch.set("text", textDynamischStandTagung2021);

    };
};
//#endregion ///----------------------------Slider------------------------------------------------------------------------

//#endregion ///---------B.4 End Init & Anpassung Serie, Range -----------------------------------------------------------
//#region ///--------B.2 Series füllen mit data Array---------------------------------------------------------
// Series füllen mit data Array

series1TechUDim.data.setAll(dataUnterDimensionen);
series2TechUDim.data.setAll(dataUnterDimensionen);
series3TechUDim.data.setAll(dataUnterDimensionen);




//#endregion ///-----B.2  END Series füllen-------------------------------------------
//#region ///--------B.3 Legend: series2+3 & range ausblenden bei klick in Legende ----------------------------
/// evenbts für series2,3 ausblenden wenn 1 ausgeblendet wird
function erstelleSeriesLegendEventsTechUDim(index) {

    series1TechUDim.dataItems[index].on("visible", function (visible, target) { ///UDim an stelle index
        if (visible) {
            series2TechUDim.dataItems[index].show();
            series3TechUDim.dataItems[index].show();

            //*rangeTechUDim[index].get("axisFill").setAll({ fillOpacity: 1 });
            //*rangeTechUDim[index].get("axisFill").setAll({ visible: true });
        }
        else {
            series2TechUDim.dataItems[index].hide();
            series3TechUDim.dataItems[index].hide();
            //*rangeTechUDim[index].get("axisFill").setAll({ visible: false });
            //*rangeTechUDim[index].get("axisFill").setAll({ fillOpacity: 0.08 });
        }
    });

};

for (var index = 0; index < dataUnterDimensionen.length; index++) {
    erstelleSeriesLegendEventsTechUDim(index);
};

//#endregion ///--------Legend: series2+3 & range ausblenden  --------------------------------------------
//#endregion ///-----B   End Start Series, Ranges, Legenden Ausblenden, Events---------------------------------------


//#region ///--------C   Init Datenstrukturen für serie, legende, chart beim ersten laden-----------------------------

xAxisTechUDim.data.setAll(dataUnterDimensionen);
//*xAxisTechUDim.data.setAll(dataUnterDimensionen);

// Legende befüllen 

//pseudo Series für Optionen
seriesUDimFilterAnzeigen.hide();
legendUDimFilterAnzeigen.data.push(seriesUDimFilterAnzeigen);


legendTechUDim.data.push(seriesUDimAusblenden);
legendTechUDim.data.push(seriesProzentValuesUDim);

legendTechUDim.data.push(seriesUDimKeineAussageAusblenden);
legendTechUDim.data.push(seriesUDimWirdAdressiertAusblenden);

if (thema == "Fachlich") { //wenn fachliches Radarboard dann nur 15 UDim statt 20 UDim
    legendTechUDim.data.push(series1TechUDim.dataItems[0]);
    legendTechUDim.data.push(series1TechUDim.dataItems[1]);
    legendTechUDim.data.push(series1TechUDim.dataItems[2]);
    legendTechUDim.data.push(series1TechUDim.dataItems[3]);
    legendTechUDim.data.push(series1TechUDim.dataItems[4]);
    legendTechUDim.data.push(series1TechUDim.dataItems[5]);
    legendTechUDim.data.push(series1TechUDim.dataItems[6]);
    legendTechUDim.data.push(series1TechUDim.dataItems[7]);
    legendTechUDim.data.push(series1TechUDim.dataItems[8]);
    legendTechUDim.data.push(series1TechUDim.dataItems[9]);
    legendTechUDim.data.push(series1TechUDim.dataItems[10]);
    legendTechUDim.data.push(series1TechUDim.dataItems[11]);
    legendTechUDim.data.push(series1TechUDim.dataItems[12]);
    legendTechUDim.data.push(series1TechUDim.dataItems[13]);
    legendTechUDim.data.push(series1TechUDim.dataItems[14]);

} else { //technologische UDim Radarboard mit 20 UDim
    legendTechUDim.data.push(series1TechUDim.dataItems[0]);
    legendTechUDim.data.push(series1TechUDim.dataItems[1]);
    legendTechUDim.data.push(series1TechUDim.dataItems[2]);
    legendTechUDim.data.push(series1TechUDim.dataItems[3]);
    legendTechUDim.data.push(series1TechUDim.dataItems[4]);
    legendTechUDim.data.push(series1TechUDim.dataItems[5]);
    legendTechUDim.data.push(series1TechUDim.dataItems[6]);
    legendTechUDim.data.push(series1TechUDim.dataItems[7]);
    legendTechUDim.data.push(series1TechUDim.dataItems[8]);
    legendTechUDim.data.push(series1TechUDim.dataItems[9]);
    legendTechUDim.data.push(series1TechUDim.dataItems[10]);
    legendTechUDim.data.push(series1TechUDim.dataItems[11]);
    legendTechUDim.data.push(series1TechUDim.dataItems[12]);
    legendTechUDim.data.push(series1TechUDim.dataItems[13]);
    legendTechUDim.data.push(series1TechUDim.dataItems[14]);
    legendTechUDim.data.push(series1TechUDim.dataItems[15]);
    legendTechUDim.data.push(series1TechUDim.dataItems[16]);
    legendTechUDim.data.push(series1TechUDim.dataItems[17]);
    legendTechUDim.data.push(series1TechUDim.dataItems[18]);
    legendTechUDim.data.push(series1TechUDim.dataItems[19]);
}



//#endregion ///-----C END Init Datenstrukturen für serie, legende, chart beim ersten laden---------------------------------------------

//#region ///--------D   Series & Chart Hide und appear------------------------------------------------------------------
showHideProzentValuesUDim(true);
seriesProzentValuesUDim.show(); // beim start gesamtvalues ausblenden
seriesUDimKeineAussageAusblenden.hide();

//showHideProzentValuesUDim(false); seriesProzentValuesUDim.hide(); // beim start gesamtvalues ausblenden

chartTechUDim.appear(3000, 100);

//#endregion ///----D END Series & Chart appear-----------------------------------------------------------------------------

//containerTechDim.hide(); // intial UDim nicht anzeigen, wir bei changeDatensatz gewechselt
containerTechUDim.hide(); // intial UDim nicht anzeigen, wird bei changeDatensatz gewechselt




