//#region ///---------A Set root, Loading Indicator, Themes, Container, Title, Filter, Buttons----
var root = am5.Root.new("chartdiv");

//#region ///--------A.2 Themes, Container Chart und Text, Title-------------------------
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root),
]);

//-------------------------------Container und Radar Chart--------------------------------
var container = root.container.children.push(
  am5.Container.new(root, {
    width: myChartWidthEinzel,
    height: myChartHeightEinzel,
    layout: root.verticalLayout
  })
);

//------------------title------------------------------------------------
var containerTitle = container.children.push(
  am5.Container.new(root, {
    layout: root.horizontalLayout
  })
);

var title = containerTitle.children.push(am5.Label.new(root, {
  text: "", //wird später über update Title gesetzt
  x: am5.percent(52),
  textAlign: "center",
  fontSize: 18,
  fontWeight: 600,

  // paddingLeft: 400,
  // x: 450,
}));

var tooltipLabelTechFachUmschalten = am5.Tooltip.new(root, { getFillFromSprite: false, dy: 8, });
tooltipLabelTechFachUmschalten.get("background").setAll({ fillOpacity: 0.9, fill: ColorGrauDunkel });


//-------- pseudo legend für Umschalten Radarboard Fachlich <-> Technologisch----------
var legendUmschaltenFachlichTechnologisch = containerTitle.children.push(am5.Legend.new(root, {
  nameField: "categoryX",
  dy: 14,
  // dx: 420,
  // x: am5.percent(50),
  x: 990,
  useDefaultMarker: true,
  layout: root.horizontalLayout,
  tooltip: tooltipLabelTechFachUmschalten,
  tooltipText: "[fontWeight: 500 #fff fontSize: 13px]Umschalten Fachlich / Technologisch ",

}));
legendUmschaltenFachlichTechnologisch.valueLabels.template.set("forceHidden", true);

legendUmschaltenFachlichTechnologisch.markers.template.setup = function (marker) {
  var check = am5.Graphics.new(root, {
    fill: am5.Color.brighten(am5.color(0x000000), 0.2),
    fillOpacity: 0.7,
    layer: 50,
    scale: 0.9,
    svgPath: "M15.75 2.527c-.61-.468-1.46-.328-1.902.32l-6.325 9.255L4.04 8.328a1.3 1.3 0 0 0-1.922-.062 1.505 1.505 0 0 0-.062 2.043s4.234 4.695 4.843 5.168c.61.468 1.457.328 1.903-.32L16.05 4.55c.445-.653.308-1.555-.301-2.024Zm0 0"
  });
  check.states.create("disabled", {
    fillOpacity: 0
  });
  marker.children.push(check);
}
legendUmschaltenFachlichTechnologisch.markers.template.setAll({ width: 17, height: 17 });
legendUmschaltenFachlichTechnologisch.markerRectangles.template.setAll({
  fillOpacity: 0.3,
  strokeOpacity: 0
});

legendUmschaltenFachlichTechnologisch.labels.template.setAll({
  fontSize: fontSizeLegendeUmschalten,
  fontWeight: "500"
});
//-------------------------------Ende pseudo legend ----------------------------

//---------------------Menu links Hamburger rechts Hilfe Video------------------
var labelMenu = containerTitle.children.push(am5.Label.new(root, {
  paddingTop: 7,
  x: 17,
  text: "[fontWeight: 500 fontSize: 18px #000]☰[fontWeight: 500 fontSize: 13px #000 ]  Menü Visualisierung",
  fontSize: 18,
  fill: ColorBlackYAxisText,
  cursorOverStyle: "pointer",
  tooltip: am5.Tooltip.new(root, { paddingBottom: 5, paddingTop: 3, pointerOrientation:"left" }),
  tooltipX: 28,
  tooltipY: 18,
  tooltipText: "[fontWeight: 500 fontSize: 12px #fff]Menü zur Auswahl\neiner Visualisierung",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));

labelMenu.events.on("click", function (ev) {
  if (labelMenu.get("active")) { //Menu war active -> hide div
    //console.log("Menu active");
    labelMenu.set("active", false);
    document.getElementById('menu-radar').style.display = 'none';
  } else { //Menu war inactive -> div anzeigen
    //console.log("Menu inactive");
    labelMenu.set("active", true);
    document.getElementById('menu-radar').style.display = 'inline-block';
  };
});

var labelHilfe = containerTitle.children.push(am5.Label.new(root, {
 // paddingLeft: 65,
  paddingTop: 7,
  x: 59,
  x: 1290,
  text: "🛈",
  fontSize: 21,
  fill: ColorBlackYAxisText,
  cursorOverStyle: "pointer",
  tooltip: am5.Tooltip.new(root, { paddingBottom: 4, paddingTop: 2, pointerOrientation:"up" }),
  tooltipX: 20,
  tooltipY: 30,
  tooltipText: "[fontWeight: 500 fontSize: 12px #fff]Video-Erklärung anzeigen",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));

labelHilfe.events.on("click", function (ev) {
  helpVideoStatus = document.getElementById('helpvideo').style.display;

  if (helpVideoStatus == 'none') {
    document.getElementById('CloseButton').style.display = 'inline-block';
    document.getElementById('helpvideo').style.display = 'inline-block';
  }
  else {
    document.getElementById('helpvideo').style.display = 'none';
    document.getElementById('CloseButton').style.display = 'none';
  }
});
//---------------------Ende Menu links Hamburger rechts Hilfe Video------------------

var tooltipNetworkViz = am5.Tooltip.new(root, { pointerOrientation: "up", getFillFromSprite: false, dy: 9, dx: 0 });
tooltipNetworkViz.get("background").setAll({ fillOpacity: 0.9, fill: ColorGrauDunkel });

var textProjektTitel1 = ""; var textProjektTitel2 = ""; var textProjektTitel3 = ""; var textProjektTitel = "";
var indexDim = 1;
var colorTextDim;

function updateTitleText() {
  var counterVisible = 0;
  var indexSingle = 0;
  for (var udim = 1; udim <= projekteNamen.length; udim++) { //array aller projekte durchgehen
    if (seriesEinzelProjekt[udim].isVisible()) {
      containerTextRadarboardTech.show(0);
      counterVisible = counterVisible + 1;
      indexSingle = udim;
      textProjektTitel2 = "[fontWeight: 700]" + projekteNamen[udim - 1]; //array projekteNamen geht ab 0 los

    }
    else if (counterVisible == 0) {
      textProjektTitel3 = ""; textProjektTitel2 = ""; containerTextRadarboardTech.hide(1500);
    } //kein Legendeneintrag visible namen Projekt im Titel entfernen

  };
  indexDim = Math.ceil(indexSingle / 4);
  //console.log("indexSingle, indexDim=" + indexSingle + "," + indexDim);
  if (counterVisible > 0) {
   textProjektTitel = "[fontWeight: 700 fontSize: 18px]" + dataDimensionen[indexDim - 1].dimension + ": " + textProjektTitel2 + textProjektTitel3 + textProjektTitel1;
   title.set("fill", am5.Color.lighten(eval('ColorDim' + indexDim + 'Value1'), -0.2));
   title.set("text", textProjektTitel);
   colorTextDim = am5.Color.lighten(eval('ColorDim' + indexDim + 'Value1'), -0.2); //farbe aktuelle Dim 
  };
};

var containerTextRadarboardTech = root.container.children.push(
  am5.Container.new(root, {
    width: 325,
    x: 18,
    y: 210,
    layout: root.verticalLayout,
    background: am5.Rectangle.new(root, {
      fill: ColorGrauTextBoxEinzelprojekt,
      fillOpacity: 0.25 //war 0.3
    })
  })
);
var textProjektBeschreibung = "";
var indexVisibleUDim = 1; //für alle projekte pro UDim

function updateProjektBeschreibungText() {
  var counterVisible = 0;
  var indexVisible = 0;
  for (var indexProjekt = 1; indexProjekt <= projekteNamen.length; indexProjekt++) { //array aller projekte durchgehen
    if (seriesEinzelProjekt[indexProjekt].isVisible()) {
      indexVisible = indexProjekt - 1;
    }
  };
  //indexDim = Math.ceil(indexVisible / 4); // um Beschreibung Dim anzeigne zu können
  var text2 = dataDimensionen[indexDim]["textLang"].replace(/\n/g, ' ');
  var text4 = dataBeschreibungUnterDimensionen[indexVisible]["textLang"].replace(/\n/g, ' ');
  //colorTextDim = am5.Color.lighten(eval('ColorDim' + indexDim + 'Value1'), -0.3);
  //console.log("color text dimesnion:" + colorTextDim);

  if (indexVisible > 0) {
    var text1Projekt = "[fontSize: 13px fontWeight: 700 #" + colorTextDim + "]" + dataDimensionen[indexDim - 1].dimension; // Titel Dim
    var text2Projekt = "[fontWeight: 400 fontSize: 13px]" + text2; // Text Definition Dim
    var text3Projekt = "[fontSize: 13px fontWeight: 700 #" + colorTextDim + "]" + dataBeschreibungUnterDimensionen[indexVisible].dimension; //Titel UDim
    var text4Projekt = "[fontWeight: 400 fontSize: 13px]" + text4; //Titel UDim

    textProjektBeschreibung = text1Projekt + "\n[fontSize: 16px][fontSize: 13px]" + text2Projekt + "\n[fontSize: 25px][fontSize: 13px]" + text3Projekt + "\n[fontSize: 14px][fontSize: 13px]" + text4Projekt;
    textRadarboardTech.set("text", textProjektBeschreibung);

  }
  else {
    // containerTextRadarboardTech.hide(1500); //wird schon in update Title gemacht
  }
};

var textRadarboardTech = containerTextRadarboardTech.children.push(am5.Label.new(root, {
  text: textProjektBeschreibung,
  oversizedBehavior: "wrap",
  maxWidth: 328, // war 298
}));

//-----------------ende container & textRadarboard Links-------------------------

//#endregion ///-----A.2 End Themes, Container, Title--------------------------

//#region ///--------A.3 Chart-------------------------------------------------

var chartTechUDimEinzel = container.children.push(am5radar.RadarChart.new(root, {
  //scale: scaleChartUDim, ///0.92 intiale size chart etwas reduziren
  scale: 0.90, ///0.92 intiale size chart etwas reduziren
  panX: false,
  panY: false,
  //x: am5.percent(10),
  //dy: 230, //chart nach rechts schieben damit links platz für text box ist
  y: am5.percent(0),
  dy: 38,
  centerX: am5.percent(-11),
  //startAngle: -125,
  //endAngle: 235,
  startAngle: -120,
  endAngle: 240,
}));

var cursor = chartTechUDimEinzel.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "selectX",
}));
cursor.lineY.set("visible", false);
cursor.lineX.set("visible", false);

//#endregion ///-----A.3 End Chart-------------------------------------------

//#region ///--------A.5 Axes und Legend---------------------------------------
// Create axes and their renderers
var xRendererTechUDimEinzel = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 30,
});

xRendererTechUDimEinzel.labels.template.setAll({
  fontSize: fontSizeLabelProjekteEinzelUDim,
  textType: "adjusted", // optionen "circular","radial","regular"
  fill: am5.Color.brighten(ColorBlack, 0.40),
  //fontFamily: "Helvetica",
  fontWeight: 500,
  radius: radiusLabelProjekteEinzelUDim,

  //fontSize: 0.1,
  // textType: "circular",
  //fill: ColorWhite, //damit text nicht doppelt erscheint, range druckt auch noch mal text

});

var tooltip = am5.Tooltip.new(root, {
  getFillFromSprite: true,
  getLabelFillFromSprite: true,
  autoTextColor: true,
  //pointerOrientation: "up",
  pointerOrientation: "right",
  labelText: "[fontSize: 11px fontWeight: 500]{category}"
});
tooltip.get("background").setAll({
  fillOpacity: 0.82,
  fill: ColorGrauValue3,
});


var xAxisTechUDimEinzel = chartTechUDimEinzel.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "dimension",
  renderer: xRendererTechUDimEinzel,

}));

xRendererTechUDimEinzel.grid.template.setAll({
  stroke: ColorGridEinzelUDim,
  //stroke: ColorWhite,
  strokeWidth: 0.13 ///Bestimmt dicke und farbe des grids
});

xRendererTechUDimEinzel.labels.template.setAll({
  // oversizedBehavior: "wrap",
  //textAlign: "center",
});


var yAxisTechUDimEinzel = chartTechUDimEinzel.yAxes.push(am5xy.ValueAxis.new(root, {
  visible: false,
  min: 0,
  //max: 3.3,
  max: 3.1, //war 3.4 , 3.5, 3.1

  //max: 3.04, //damit bullets bei value=3 komplett sichtbar sind 
  strictMinMax: true,
  renderer: am5radar.AxisRendererRadial.new(root, { minGridDistance: 50 })
}));

var yRendererTechUDimEinzel = yAxisTechUDimEinzel.get("renderer");
yRendererTechUDimEinzel.grid.template.setAll({
  stroke: ColorGridEinzelUDim,
  //strokeWidth: 0 //funktoniert nicht
});

yRendererTechUDimEinzel.ticks.template.setAll({
  maxPosition: 0.95,
  stroke: ColorBlackYAxis,
  strokeWidth: 0.8,
  visible: true //false für ausblenden ticks
});
yRendererTechUDimEinzel.labels.template.setAll({
  minPosition: 0.05,
  fill: ColorBlackYAxisText,
  fontSize: "0.85em",
  fontWeight: fontWeightUDimSkala,
  visible: true //false für ausblenden beschriftung Y Achse
});


/// legend horizontal
var maxLegendGridUDim = 5;
if (thema == "UDim-Fachlich") {maxLegendGridUDim = 4}

var legendTechUDimEinzel = container.children.push(am5.Legend.new(root, {
  nameField: "categoryX",
  dx: 365,
  useDefaultMarker: true,
  //layout: root.horizontalLayout
  layout: am5.GridLayout.new(root, {
    maxColumns: maxLegendGridUDim,
    fixedWidthGrid: false
  })
}));


legendTechUDimEinzel.labels.template.setAll({
  fill: ColorDim1Value1,
  fontSize: fontSizeLegendeEinzelUDim,
  fontWeight: "700",
});

counterLegendItem = 0;
legendTechUDimEinzel.labels.template.events.on("dataitemchanged", function (ev) {
  counterLegendItem = counterLegendItem + 1;
  dim = Math.ceil(counterLegendItem / 8);
  if (thema == "UDim-Fachlich") {dim = Math.ceil(counterLegendItem / 6);}
 
  //console.log("Leg. ev DataItCh. counter,dim: ", counterLegendItem + "," + dim)
  if (thema == "UDim-Technologisch" && counterLegendItem < 41) {
    //console.log("Leg. ev DataItCh. counter,dim: ", counterLegendItem + "," + dim)
    color1 = am5.Color.lighten(eval('ColorDim' + dim + 'Value1'), 0.0);
    ev.target.set("fill", color1);
  };
  if (thema == "UDim-Fachlich" && counterLegendItem < 31) {
    color1 = am5.Color.lighten(eval('ColorDim' + dim + 'Value1'), 0.0);
    ev.target.set("fill", color1);
  };
});

legendTechUDimEinzel.valueLabels.template.set("forceHidden", true);

legendTechUDimEinzel.markers.template.setup = function (marker) {
  var check = am5.Graphics.new(root, {
    fill: am5.Color.brighten(am5.color(0x000000), 0.0),
    //fill: series1TechDimColors[0],
    fillOpacity: 0.7,
    layer: 50,
    scale: 0.85,
    svgPath: "M15.75 2.527c-.61-.468-1.46-.328-1.902.32l-6.325 9.255L4.04 8.328a1.3 1.3 0 0 0-1.922-.062 1.505 1.505 0 0 0-.062 2.043s4.234 4.695 4.843 5.168c.61.468 1.457.328 1.903-.32L16.05 4.55c.445-.653.308-1.555-.301-2.024Zm0 0"
  });
  check.states.create("disabled", {
    fillOpacity: 0
  });
  marker.children.push(check);
}

legendTechUDimEinzel.markers.template.setAll({ width: 15, height: 15 });

legendTechUDimEinzel.markerRectangles.template.setAll({
  fillOpacity: 0.3,
  strokeOpacity: 0,
  // fill: ColorWhite,
  //fill: am5.Color.brighten(colorTextDim, 0.3),
});
//#endregion ///--------A.5 End Axes, Legends----------------------------------------
//#endregion ///-----A End Set root, Loading Indicator, Themes, Container, Title, Filter, Buttons, Legende----

//-----------------Range Beschriftung mit Projektnamen Aussen------------------------------------------------------
var rangeTechUDimEinzelLabelOnly = [];
var rangeDataItemTechUDimEinzelLabelOnly = [];

function erstelleRangeTechUDimEinzelLabelOnly(indexRange, colorAchseLabel, radiusLabel, fontSize, labelText, text, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
  rangeDataItemTechUDimEinzelLabelOnly[indexRange] = xAxisTechUDimEinzel.makeDataItem({ above: true, category: startKategorie, endCategory: endKategorie });
  rangeTechUDimEinzelLabelOnly[indexRange] = xAxisTechUDimEinzel.createAxisRange(rangeDataItemTechUDimEinzelLabelOnly[indexRange]);

   rangeDataItemTechUDimEinzelLabelOnly[indexRange].get("label").setAll({
    fill: colorAchseLabel,
    fontWeight: fontWeightUDimLabelAussen,
    radius: radiusLabel, fontSize: fontSize,
    text: labelText
  });

  rangeTechUDimEinzelLabelOnly[indexRange].get("axisFill").setAll({
    visible: true,
    fillOpacity: 0.99, //war 0.15, 0.08
    fill: colorAchseLabel,
    toggleKey: "active",
    cursorOverStyle: "pointer",
    dRadius: 70, //war 74
    innerRadius: -70 //war -49, -39
  });
}

function generiereRangesProjektNamen() {
 for (var udim = 1; udim <= dataUnterDimensionenEinzel.length; udim++) {
  index = udim;
  dim = Math.ceil(indexVisibleUDim / 4);
    if (thema == "UDim-Fachlich") { dim = Math.ceil(indexVisibleUDim / 3) }
    var labelText = "";
    var tooltipText = "";
    //console.log("dim:"+ dim)
  var color = am5.Color.lighten(eval('ColorDim' + dim + 'Value1'), 0.97);
  radiusProjektNamen = 0;
  erstelleRangeTechUDimEinzelLabelOnly(index, color, radiusProjektNamen, fontSizeLabelAussen, "", "", dataUnterDimensionenEinzel[index-1].dimension, dataUnterDimensionenEinzel[index-1].dimension);
 }
};

generiereRangesProjektNamen();
//-----------------Ende Range Beschriftung mit Projektnamen Aussen------------------------------------------------------

var rangeCircleAussen = [];
var rangeDataItemCircleAussen = [];

/// Hilsfunktion für Aufruf der Gesamtvalue Beschriftung um aufruf aus series hide/show event zu ermöglichen
function erstelleRangeCircleAussen(indexRange, colorAchseLabel, radiusLabel, fontWeightLabel, fontSize, labelText, tooltipText, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
  var tooltip = am5.Tooltip.new(root, { getFillFromSprite: true });
  rangeDataItemCircleAussen[indexRange] = xAxisTechUDimEinzel.makeDataItem({ category: startKategorie, endCategory: endKategorie });
  rangeCircleAussen[indexRange] = xAxisTechUDimEinzel.createAxisRange(rangeDataItemCircleAussen[indexRange]);
  rangeDataItemCircleAussen[indexRange].get("axisFill").setAll({ visible: true, fill: colorAchseLabel, fillOpacity: 1, dRadius: 0, innerRadius: -76, tooltip: tooltip, tooltipText: tooltipText }); //innerRadius -55 ist dicker dicke farbiger streifen
}

function generiereRangesCircleAussen() {
  var radius = -23; var fontWeight = 300; var fontSize = "0.8em"; //radius war -23
  // var color = am5.Color.lighten(ColorGrauValue3, -0.04); 

  for (var udim = 1; udim <= dataUnterDimensionenEinzel.length; udim++) {
    index = udim;
    // dim = Math.ceil(udim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
    dim = Math.ceil(indexVisibleUDim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
    if (thema == "UDim-Fachlich") { dim = Math.ceil(indexVisibleUDim / 3) }
    var labelText = "";
    var tooltipText = "";
    // var color = am5.Color.brighten(ColorGrauValue3, -0.09);
    var color = am5.Color.lighten(eval('ColorDim' + dim + 'Value3'), 0.4);
    erstelleRangeCircleAussen(index - 1, color, radius, fontWeight, fontSize, labelText, tooltipText, dataUnterDimensionenEinzel[index - 1].dimension, dataUnterDimensionenEinzel[index - 1].dimension);

  };
};

var rangeCircleMitte = [];
var rangeDataItemCircleMitte = [];

function erstelleRangeCircleMitte(indexRange, colorAchseLabel, radiusLabel, fontWeightLabel, fontSize, labelText, tooltipText, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
  var tooltip = am5.Tooltip.new(root, { getFillFromSprite: true });
  rangeDataItemCircleMitte[indexRange] = xAxisTechUDimEinzel.makeDataItem({ category: startKategorie, endCategory: endKategorie });
  rangeCircleMitte[indexRange] = xAxisTechUDimEinzel.createAxisRange(rangeDataItemCircleMitte[indexRange]);
  rangeDataItemCircleMitte[indexRange].get("axisFill").setAll({ visible: true, fill: colorAchseLabel, fillOpacity: 0.9, dRadius: -75, innerRadius: -65, tooltip: tooltip, tooltipText: tooltipText }); //innerRadius -55 ist dicker dicke farbiger streifen
}

function generiereRangesCircleMitte() {
  var radius = -23; var fontWeight = 300; var fontSize = "0.8em"; var color = am5.Color.lighten(ColorGrauValue2, -0.04);//war radius = -23;
  for (var udim = 1; udim <= dataUnterDimensionenEinzel.length; udim++) {
    index = udim;
    //dim = Math.ceil(udim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
    dim = Math.ceil(indexVisibleUDim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
    if (thema == "UDim-Fachlich") { dim = Math.ceil(indexVisibleUDim / 3) }
    var labelText = "";
    var tooltipText = "";
    //var color = am5.Color.brighten(ColorGrauValue2, -0.06);
    var color = am5.Color.lighten(eval('ColorDim' + dim + 'Value2'), 0.35);
    erstelleRangeCircleMitte(index - 1, color, radius, fontWeight, fontSize, labelText, tooltipText, dataUnterDimensionenEinzel[index - 1].dimension, dataUnterDimensionenEinzel[index - 1].dimension);
  };
};

var rangeCircleInnen = [];
var rangeDataItemCircleInnen = [];

function erstelleRangeCircleInnen(indexRange, colorAchseLabel, radiusLabel, fontWeightLabel, fontSize, labelText, tooltipText, startKategorie, endKategorie) { //radius ist abstand des Textlabels in px vom äußeren Kreis
  var tooltip = am5.Tooltip.new(root, { getFillFromSprite: true });
  rangeDataItemCircleInnen[indexRange] = xAxisTechUDimEinzel.makeDataItem({ category: startKategorie, endCategory: endKategorie });
  rangeCircleInnen[indexRange] = xAxisTechUDimEinzel.createAxisRange(rangeDataItemCircleInnen[indexRange]);
  rangeDataItemCircleInnen[indexRange].get("axisFill").setAll({ visible: true, fill: colorAchseLabel, fillOpacity: 0.9, dRadius: -140, innerRadius: 0, tooltip: tooltip, tooltipText: tooltipText }); //innerRadius -55 ist dicker dicke farbiger streifen
}

function generiereRangesCircleInnen() {
  var radius = -23; var fontWeight = 300; var fontSize = "0.8em"; var color = am5.Color.lighten(ColorGrauValue1, -0.04); //war radius = -23;
  for (var udim = 1; udim <= dataUnterDimensionenEinzel.length; udim++) {
    index = udim;
    //dim = Math.ceil(udim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
    dim = Math.ceil(indexVisibleUDim / 4); //runden auf nächst höheren integer damit dim von 1 bis 5 läuft während udim von 1 bis 20 läuft
    if (thema == "UDim-Fachlich") { dim = Math.ceil(indexVisibleUDim / 3) }
    var labelText = "";
    var tooltipText = "";
    //var color = ColorGrauValue1;
    var color = am5.Color.lighten(eval('ColorDim' + dim + 'Value1'), 0.35); //war 0.2
    if (dim == 2) { color = am5.Color.brighten(eval('ColorDim' + dim + 'Value1'), 0.65); };
    if (dim == 3) { color = am5.Color.lighten(eval('ColorDim' + dim + 'Value1'), 0.55); };

    erstelleRangeCircleInnen(index - 1, color, radius, fontWeight, fontSize, labelText, tooltipText, dataUnterDimensionenEinzel[index - 1].dimension, dataUnterDimensionenEinzel[index - 1].dimension);
  };
};

//#endregion ///-----B Ranges------------------------------------------------------

//#region ///--------C Series-----------------------------------------------------------------------------

var seriesEinzelProjekt = [];
function erstelleSeriesEinzelTechUDimEinzel(index) { /// index= Index für Projekt geht von 1..34
  //var auspraegung = projekteAuspraegung[{ valueY }];
  color = colorSetKoordinatoren[index];
  color = am5.Color.lighten(am5.color(color), -0.65); //war 0.1

  seriesEinzelProjekt[index] = chartTechUDimEinzel.series.push(am5radar.RadarLineSeries.new(root, {
    name: projekteNamen[index - 1], //projekteNamen Array läuft von 0..33 deshalb index-1
    xAxis: xAxisTechUDimEinzel,
    yAxis: yAxisTechUDimEinzel,
    valueYField: "value" + index,
    categoryXField: "dimension",
    stroke: color,
    fill: color,

  }));
  
  seriesEinzelProjekt[index].strokes.template.setAll({ strokeWidth: 2.3, fillOpacity: 0, fill: color }); //war fillOpacity: 0.2 weg wegen grau zonen
  seriesEinzelProjekt[index].bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fillOpacity: 0.9,
        //fill: ColorWhite
        fill: am5.Color.lighten(seriesEinzelProjekt[index].get("fill"), 0)
      })
    });
  });
};

// series automatisch für alle 34 Projekte erstellen
for (var index = 1; index <= projekteNamen.length; index++) {
  erstelleSeriesEinzelTechUDimEinzel(index);
};

/// pseudo series für Umschalten Radarboard Fachlich <-> Technologisch
seriesUmschaltenFachlich = chartTechUDimEinzel.series.push(am5radar.RadarLineSeries.new(root, {
  name: "Fachlich-Didaktisch",
  xAxis: xAxisTechUDimEinzel,
  yAxis: yAxisTechUDimEinzel,
  // fill: ColorBlackYAxisText,
  fill: ColorGrauDunkel,
  valueYField: undefined,
  categoryXField: "dimension",
}));

seriesUmschaltenTechnologisch = chartTechUDimEinzel.series.push(am5radar.RadarLineSeries.new(root, {
  name: "Technologisch",
  xAxis: xAxisTechUDimEinzel,
  yAxis: yAxisTechUDimEinzel,
  fill: ColorGrauDunkel,
  valueYField: undefined,
  categoryXField: "dimension",
}));

seriesUmschaltenFachlich.on("visible", function (visible, target) {
  if (visible) {
    seriesUmschaltenTechnologisch.hide();
    window.location.href = "radar-broschuere-f-einzel_udim_alle_projekte.html";
  }
});

seriesUmschaltenTechnologisch.on("visible", function (visible, target) {
  if (visible) {
    seriesUmschaltenFachlich.hide();
    window.location.href = "radar-broschuere-t-einzel_udim_alle_projekte.html";
  }
});

seriesCircleAussen = chartTechUDimEinzel.series.push(am5radar.RadarLineSeries.new(root, {
  //name: "G3", //projekteNamen Array läuft von 0..33 deshalb index-1
  xAxis: xAxisTechUDimEinzel,
  yAxis: yAxisTechUDimEinzel,
  fill: ColorGrauValue3,
  valueYField: undefined,
  categoryXField: "dimension",
}));
generiereRangesCircleAussen();

seriesCircleMitte = chartTechUDimEinzel.series.push(am5radar.RadarLineSeries.new(root, {
  //name: "G2", //projekteNamen Array läuft von 0..33 deshalb index-1
  xAxis: xAxisTechUDimEinzel,
  yAxis: yAxisTechUDimEinzel,
  fill: ColorGrauValue2,
  valueYField: undefined,
  categoryXField: "dimension",
}));
generiereRangesCircleMitte();

seriesCircleInnen = chartTechUDimEinzel.series.push(am5radar.RadarLineSeries.new(root, {
  //name: "G1", //projekteNamen Array läuft von 0..33 deshalb index-1
  xAxis: xAxisTechUDimEinzel,
  yAxis: yAxisTechUDimEinzel,
  fill: ColorGrauValue1,
  valueYField: undefined,
  categoryXField: "dimension",
}));
generiereRangesCircleInnen();

function erstelleLegendEventsTechUDimEinzel(index) {
  seriesEinzelProjekt[index].on("visible", function (visible, ev) {
    updateTitleText();
    updateProjektBeschreibungText();

    if (visible) {
      var dim = Math.ceil(index / 4);
      // console.log("Legend Event visible Dim: ", dim)
      var color1 = am5.Color.lighten(eval('ColorDim' + dim + 'Value1'), 0.0);
     
      indexVisibleUDim = index;
      //noch ändernnur wechsel farbe range wenn nötig also neue dim  
      generiereRangesProjektNamen();
      generiereRangesCircleAussen();
      generiereRangesCircleMitte();
      generiereRangesCircleInnen();

      for (var i = 1; i <= projekteNamen.length; i++) {
        if (i == index) {
          // console.log("i==index show", i, index)
          seriesEinzelProjekt[i].show();
          nameProjekt = projekteNamen[i - 1];
          // console.log("on.visible p=" + nameProjekt);
          indexVisibleUDim = i;

        }
        else {
          //console.log("i<>index hide", i, index)
          seriesEinzelProjekt[i].hide();
        }
      };

    }
    else {
      // console.log("not visible: ",index)

    }
  });
};

/// series events automatisch für alle 34 Projekte erstellen
for (var index = 1; index <= projekteNamen.length; index++) {
  erstelleLegendEventsTechUDimEinzel(index);
};

//#endregion ///--------C End Series-------------------------------------------------------

//#region ///--------D Slider-----------------------------------------------------------------------------
var containerSlider = chartTechUDimEinzel.children.push(am5.Container.new(root, {
  //y: am5.percent(101),
  y: am5.percent(95),
  dy: 85,
  centerX: am5.p50,
  x: am5.p50,
  dx: -20,
  width: am5.percent(57),
  layout: root.horizontalLayout
}));

var playButton = containerSlider.children.push(am5.Button.new(root, {
  themeTags: ["play"],
  centerY: am5.p50,
  marginRight: 15,
  icon: am5.Graphics.new(root, { themeTags: ["icon"] })
}));

playButton.get("background").setAll({ fill: ColorGrauValue1 });
playButton.events.on("click", function () {
  if (playButton.get("active")) {
    slider.set("start", slider.get("start") + 0.0001);
  }
  else {
    slider.animate({
      key: "start",
      to: 1,
      duration: 10000 * (1 - slider.get("start"))
    });
  }
})

var slider = containerSlider.children.push(am5.Slider.new(root, {
  orientation: "horizontal",
  //start: 0.05,
  start: 0.90, //slider zu beginn rechts aussen
  centerY: am5.p50
}));

slider.on("start", function (start) {
  if (start === 1) {
    playButton.set("active", false);
  }
});

slider.events.on("rangechanged", function () {
  updateSliderDatensatz(Math.round(slider.get("start", 0) * anzahlSliderKategorienEinzel));
});


var tooltiplSliderText = am5.Tooltip.new(root, { getFillFromSprite: false, dy: -5, });
tooltiplSliderText.get("background").setAll({ fillOpacity: 0.9, fill: ColorGrauDunkel });

var sliderTextStandA = chartTechUDimEinzel.children.push(am5.Label.new(root, {
  text: "Stand 2021",
  y: am5.percent(95.5),
  dy: 40,
  x: am5.percent(24),
  fontSize: 14,
  fontWeight: 500,
  fill: ColorBlackYAxisText,
  cursorOverStyle: "pointer",
  tooltip: tooltiplSliderText,
  tooltipText: "[fontWeight: 500 fontSize: 13px]Datengrundlage\n[fontWeight: 400 fontSize: 12px]Fremdeinschätzung der Projektanträge,\ndie im Zeitraum März – September 2021 \n(in zwei Förderwellen) eingegangen sind,\nsowie ergänzende Antragsgespräche.",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));

var sliderTextStandB = chartTechUDimEinzel.children.push(am5.Label.new(root, {
  text: "Stand Dezember 2022",
  y: am5.percent(95.5),
  dy: 40,
  x: am5.percent(48),
  centerX: am5.percent(50),
  fontSize: 14,
  fontWeight: 500,
  fill: ColorBlackYAxisText,
  cursorOverStyle: "pointer",
  tooltip: tooltiplSliderText,
  tooltipText: "[fontWeight: 500 fontSize: 13px]Datengrundlage\n[fontWeight: 400 fontSize: 12px]Fremdeinschätzung der ersten Zwischenberichte\nfür den Berichtszeitraum 2021, anschließend\nerfolge eine erste Validierungsschleife mittels\nSelbsteinschätzung der Projektkonsortien.",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));
var sliderTextStandC = chartTechUDimEinzel.children.push(am5.Label.new(root, {
  text: "Stand August 2023",
  y: am5.percent(95.5),
  dy: 40,
  x: am5.percent(70),
  centerX: am5.percent(50),
  fontSize: 14,
  fontWeight: 500,
  fill: ColorBlackYAxisText,
  cursorOverStyle: "pointer",
  tooltip: tooltiplSliderText,
  tooltipText: "[fontWeight: 500 fontSize: 13px]Datengrundlage\n[fontWeight: 400 fontSize: 12px]Fremdeinschätzung der zweiten Zwischenberichte\nfür den Berichtszeitraum 2022, anschließend\nerfolge eine zweite Validierungsschleife mittels\nSelbsteinschätzung der Projektkonsortien.",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));

function updateValuesDatensatz(datensatz, indexDatensatz) { ///update der value1..34 in series 1..34 bei slider bewegeung
  dataUnterDimensionenEinzel = datensatz;
  //* alte version geht aber sehr langsam, slider kann nur schwer bewegt werden
  //* for (var index = 1; index <= projekteNamen.length; index++) {
  //*   seriesEinzelProjekt[index].data.setAll(dataUnterDimensionenEinzel);
  //* };

  for (var index = 1; index <= projekteNamen.length; index++) {
    var counterDatensatz = 0;
    am5.array.each(seriesEinzelProjekt[index].dataItems, function (dataItem) {
      var newValue = dataUnterDimensionenEinzel[counterDatensatz]['value' + index]; //alle 34 series (34Projekte) durchgehen und value1..34 updaten

      //*console.log("newvalue1:" + newValue);
      counterDatensatz = counterDatensatz + 1;
      dataItem.set("valueY", newValue);
      dataItem.animate({ key: "valueYWorking", to: newValue, duration: 500 });
    });
  };
  var newLabelGesamtValues = "";
};

function updateSliderDatensatz(sliderWert) { /// bei slider move updatevalues funktion aufrufen
  // console.log("slider wert:" + sliderWert);
  if (sliderWert == 0 || sliderWert == 1) {
    updateValuesDatensatz(dataUnterDimensionenEinzelStandAntrag, indexDatensatz = 0);
    //updateLabelGesamtValues();

  }
  else if (sliderWert == 4 || sliderWert == 5 || sliderWert == 6) {
    updateValuesDatensatz(dataUnterDimensionenEinzelStandZB2021, indexDatensatz = 1);
    //updateLabelGesamtValues();

  }
  else if (sliderWert == 9 || sliderWert == 10 || sliderWert == 11) {
    updateValuesDatensatz(dataUnterDimensionenEinzelStandTagung2022, indexDatensatz = 2);
    //updateLabelGesamtValues();

  }
};

//#endregion ///-----------D End Slider-------------------------------------------------------
function changeProjekt(name) {
  // change Auswahlbox Projekte zu nameProjekt
  for (var i = 0; i < projekteNamen.length; i++) {
    //console.log("i,projekteNamen[i],nameProjekt=", i, projekteNamen[i].toLowerCase(), nameProjekt)
    if (name == projekteNamen[i].toLowerCase()) {
      seriesEinzelProjekt[i + 1].show();
      nameProjekt = projekteNamen[i].toLowerCase();
      //console.log("p=" + nameProjekt);
    }
    else {
      //console.log("i<>index hide", i, index)
      seriesEinzelProjekt[i + 1].hide();
    }
  };
}
//#region ///--------E Main Init Chart Data, Hide Series at startup etc-----------------------------------

//chartTechUDimEinzel.set("scale", 0.95); /// intial chart herunterskalieren da evtl. schriften zu gross

///series mit neuem datensatz initialisieren
for (var index = 1; index <= projekteNamen.length; index++) {
  seriesEinzelProjekt[index].data.setAll(dataUnterDimensionenEinzel);
};


///series ab Projekt 2 hide damit nur erstes sichtbar ist
for (var index = 2; index <= projekteNamen.length; index++) {
  seriesEinzelProjekt[index].hide();
};

//generiereRangesGesamtValues(); ///Anzeige Gesamtvalues beim start aktivieren, wird schon an anderer stelle gemacht
//seriesGesamtValues.show();
//seriesGesamtValues.hide(); ///Anzeige Gesamtvalues beim start deaktivieren

xAxisTechUDimEinzel.data.setAll(dataUnterDimensionenEinzel);

//legendTechUDimEinzel.data.setAll(chartTechUDimEinzel.series.values);

for (var index = 1; index <= projekteNamen.length; index++) {
  legendTechUDimEinzel.data.push(seriesEinzelProjekt[index]);
};

function insertLegendLabel(text, index, color) {
  var label = legendTechUDimEinzel.children.insertIndex(index, am5.Label.new(root, {
    text: text,
    fontSize: 12,
    fontWeight: "bold",
    fill: color,
    paddingTop: 5,
    //paddingLeft: 0
  }));
}
if (thema == "UDim-Technologisch") {
  insertLegendLabel("Informationssicherheit & Datensouveränität", 16, ColorDim5Value1);
  insertLegendLabel("Nachnutzbarkeit durch Dritte", 12, ColorDim4Value1);
  insertLegendLabel("Zugänglichkeit und Zusammenarbeit", 8, ColorDim3Value1);
  insertLegendLabel("Algorithmen zur Unterstützung der Lernenden", 4, ColorDim2Value1);
  insertLegendLabel("Interoperabilität durch Bildungstandards", 0, ColorDim1Value1);
};

if (thema == "UDim-Fachlich") {
  insertLegendLabel("Unterstützung von KMU beim Strukturwandel", 12, ColorDim5Value1);
  insertLegendLabel("Personalisierung und Adaptivität", 9, ColorDim4Value1);
  insertLegendLabel("Digitale Kompetenzvalidierung", 6, ColorDim3Value1);
  insertLegendLabel("Niedrigschwellige Zugangsmöglichkeiten", 3, ColorDim2Value1);
  insertLegendLabel("Digitale Ökosysteme", 0, ColorDim1Value1);
};


if (thema == "UDim-Fachlich") {
  seriesUmschaltenTechnologisch.hide();
}

if (thema == "UDim-Technologisch") {
  seriesUmschaltenFachlich.hide();
}
legendUmschaltenFachlichTechnologisch.data.push(seriesUmschaltenFachlich);
legendUmschaltenFachlichTechnologisch.data.push(seriesUmschaltenTechnologisch);

// weg wegen alle projekte pro UDim
//legendTechUDimEinzel.data.push(seriesGesamtValues); //bug bei einausblenden, 

legendTechUDimEinzel.appear(2000, 10);

seriesEinzelProjekt[1].appear(2000); //erstes Projekt anzeigen, die anderen ausgeblendet lassen

chartTechUDimEinzel.appear(300, 10);

//#endregion ///-----------E End Main Init Chart Data, Hide Series at startup etc---------------------------

