//#region ///--------C Set Data------------------------------------------------------------------------------------------------
var projekteNamen = ['CuC', 'NELE', 'KUKOBINA','Projekt-4', 'Projekt-5', 'Projekt-6', 'Projekt-7', 'Projekt-8', 'Projekt-9', 'Projekt-10', 'Projekt-11', 'Projekt-12', 'Projekt-13', 'Projekt-14', 'Projekt-15', 'Projekt-16', 'Projekt-17', 'Projekt-18', 'Projekt-19', 'Projekt-20', 'Projekt-21', 'Projekt-22', 'Projekt-23', 'Projekt-24', 'Projekt-25', 'Projekt-26', 'Projekt-27', 'Projekt-28', 'Projekt-29', 'Projekt-30', 'Projekt-31', 'Projekt-32', 'Projekt-xx'];


var projekteAuspraegung = ['Dim k.A.', 'Dim in Ansätzen.', 'Dim adressiert.', 'Dim ausgepr.'];

var unterdimensionenNamen = ['Empfehlungen zur individuellen Weiterentwicklung', 'Individuelles Suchen und Auffinden von Informationen', 'Individuelle Lernbestandsaufnahmen', 'Unterstützung von Kooperation, Kollaboration, Partizipation beim Lernen', 'Individualisierung des Lernens', 'Individuelle Lernfortschrittsdokumentation', 'Zugang', 'Gestaltung von Übergängen zwischen, Transferierbarkeit auf andere und Unabhängigkeit von Bildungsbereichen', 'Schutz, Sicherheit und Souveränität', 'Erstellung formaler Bildungsnachweise, Speicherung und Verwaltung digitaler Identitäten ', 'Verwaltungssysteme', 'Einbindung und Management dezentraler bzw. externer Systeme, Funktionen, Daten', 'Durch Dritte verwertbaretechnische und inhaltliche Entwicklungen', 'Entwicklung und Verfügbarmachung dezentraler Funktionen, Services', 'Beförderung der technischen Interoperabilität'];

// für Ansicht alle projekte pro UDim
if (thema == "UDim-Fachlich") { projekteNamen=unterdimensionenNamen; }
//projekteNamen=unterdimensionenNamen;

/// Zustand welche Projekte gerade in Einzeplorjektanzeige an sind
var projekteEinzelStatusInLegende = Array(projekteNamen.length).fill(0);
var unterdimensionenEinzelStatusInLegende = Array(unterdimensionenNamen.length).fill(0); // für Ansicht alle projekte pro Unterdimension
//console.log("projekteEinzelStatusInLegende:" + projekteEinzelStatusInLegende);

/// daten und Beschreibung der Oberdimensionen 
var dataDimensionenStandAntrag = [
    {id:1, value1:18, value2: 15,value3:67, dimension: "beraten", nameKurz: "beraten", name: "beraten", textLang: "individuelle Ebene: Instrumente, die Bildungsinteressierte beraten\nund mögliche Bildungswege aufzeigen"},
    {id:2, value1:18, value2: 23,value3:59, dimension: "lernen", nameKurz: "lernen", name: "lernen", textLang: "individuelle Ebene: Instrumente, die Lernende individuell im\nLernprozess unterstützen "},
    {id:3, value1:26, value2: 14,value3:60, dimension: "teilhaben", nameKurz: "teilhaben", name: "teilhaben", textLang: "ethisch-gesellschaftliche Ebene: Berücksichtigung der besonderen\nBedürfnisse verschiedener Zielgruppen, um ihnen eine Teilhabe\nan den Bildungsangeboten zu ermöglichen"},
    {id:4, value1:45, value2: 33,value3:22, dimension: "organisieren", nameKurz: "organisieren", name: "organisieren", textLang: "organisationale Ebene: Lösungen für Organisationen zur Umsetzung\nvon Bildungsangeboten"},
    {id:5, value1:10, value2: 16,value3:74, dimension: "bereichern", nameKurz: "bereichern", name: "bereichern", textLang: "systemische Ebene: Forschungs- und Entwicklungsarbeiten wie\nauch Verwertungsansätze zur Bereicherung des Bildungsökosystems"},
    {id:6, value1:30, value2: 40,value3:30, dimension: "Sonstige Aspekte", nameKurz: "Sonstige", name: "Sonstige Aspekte", textLang: "Weitere inhaltliche Merkmale in den Vorhaben die nicht durch die\nanderen Dimensionen abgedeckt sind."},
    
];

var dataDimensionenStandZeitpunktA = dataDimensionenStandAntrag; //in MBR kein Slider !!!
var dataDimensionenStandDezember2022 = dataDimensionenStandAntrag; //Zeitpunkt A ist 1. auf slider
var dataDimensionenStandZeitpunktB = dataDimensionenStandAntrag; 
var dataDimensionenStandAugust2023 = dataDimensionenStandAntrag; //Zeitpunkt A ist 1. auf slider
var dataDimensionenStandZeitpunktC = dataDimensionenStandAntrag;  // 3. Position auf Zeit slider

var dataDimensionen = dataDimensionenStandZeitpunktA;
var dataOhneLetzteDimension = dataDimensionen.slice(0, dataDimensionen.length - 1); //Für Initiale Anzeige Kopie des Datenarray aber ohne das letzte element= Dimension Sontiges

/// Daten für Beschreibung der Unterdimesionen, Prozent und absolut Werte der UnterDim sind jetzt in datensatz Einzeldimension

var dataBeschreibungUnterDimensionen = [ /// hier nur noch Text beschreibungen für die UDims, GesamtValues absolut und Prozent kommen aus Einzeldatensatz
{dimension: "Empfehlungen", nameKurz: "Empfehlungen", name: "Empfehlungen", oberdimension: "beraten", textLang: "Instrumente zur Unterstützung von auf das Individuum zugeschnittene\nEmpfehlungen, z.B.  Recommendersysteme, Visualisierungen anhand von\nLernpfaden, Mappingsysteme"},
{dimension: "Suchen & Auffinden", nameKurz: "Suchen & Auffinden", name: "Suchen & Auffinden", oberdimension: "beraten", textLang: "Instrumente zur Unterstützung des individuellen und insb. auch intelligenten\nSuchens und Auffindens, z.B. regelbasierte Suche, semantische Suche, \nmaschinelles und Deep Learning, Einbindung von Metadaten, Conversational\nAgents"},
{dimension: "Lernbestandsaufnahmen", nameKurz: "Lernbestandsaufn.", name: "Lernbestandsaufnahmen", oberdimension: "beraten", textLang: "Instrumente zur Erhebung und Dokumentation des Lern-Status-Quo bezogen\nauf formal, non-formal bis hin zu informell erworbenen Kompetenzen"},
{dimension: "gemeinsames Lernen", nameKurz: "gemeins. Lernen", name: "gemeinsames Lernen", oberdimension: "lernen", textLang: "Instrumente zur Interstützung kooperativer, kollaborativer und partizipativer\nLernprozesse, z. B. virtuelle Räume, Peer-Support, Train-the-Trainer-Support,\n Matchinginstrumente, Unterstützung des gemeinsamen Lernens, Mitgestaltung\nvon Lerninhalten, neue technisch oder didaktische innovative Lernarrangements\nbzw. Lehr-Lernkonzepte "},
{dimension: "Individualisierung", nameKurz: "Individualisierung", name: "Individualisierung", oberdimension: "lernen", textLang: "Instrumente, um die Individualisierung von Lerninhalten zu unterstützen,\nz. B. adaptive Ansätze, Einsatz vom Learning Analytics, AR / VR"},
{dimension: "Lernfortschritt", nameKurz: "Lernfortschritt", name: "Lernfortschritt", oberdimension: "lernen", textLang: "Instrumente zur Dokumentation und Sichtbarmachung des Lernerfolgs, non-\nformale Nachweise (z. B. Badges), Generierung von verlässlichen und \nstandardisierten Daten als Basis für die Vergabe von Digital Credentials"},
{dimension: "Zugang", nameKurz: "Zugang", name: "Zugang", oberdimension: "teilhaben", textLang: "barrierefreier Zugang zu den Beratungs- und Bildungsangeboten für Menschen\naller Fähigkeiten, Altersgruppen, sozialer Herkunft"},
{dimension: "Übergänge und Transfer", nameKurz: "Übergänge & Transfer", name: "Übergänge und Transfer", oberdimension: "teilhaben", textLang: "Gestaltung von Übergängen zwischen, Übertragbarkeit auf und Anpassbarkeit\nan, Anrechnung und Anerkennung zwischen und Verschränkung von\nBildungsbereichen"},
{dimension: "Schutz und Souveränität", nameKurz: "Schutz & Souveränität", name: "Schutz und Souveränität", oberdimension: "teilhaben", textLang: "Maßnahmen zu bzw. Umsetzung von Datenschutz, Datensicherheit, Datenethik,\nDatensouveränität, Pseudonymisierung, Vertrauen, Datensparsamkeit, Privacy by\n Design, Default"},
{dimension: "Digitale Nachweissysteme", nameKurz: "Digitale Nachweissyst.", name: "Digitale Nachweissysteme", oberdimension: "organisieren", textLang: "Systeme zur Speicherung und Verwaltung digitaler Identitäten (Digital Credentials),\nSpeicherung von technisch weiterverarbeitbaren Lernergebnissen/ Lernständen,\nErstellung und Speicherung formaler Bildungsnachweise (z. B. Zeugnissen,\nZertifikate etc.), Bereitstellung rechtssichere Prozesse für Prüfungen, Anrechnung,\nAnerkennung"},
{dimension: "Verwaltungssysteme", nameKurz: "Verwaltungssyst.", name: "Verwaltungssysteme", oberdimension: "organisieren", textLang: "Systeme zur Verwaltung von Rollen und/ oder Inhalten, Content-Management-\nSysteme (CMS), Learnmanagement-Systeme (LMS), Plattformvernetzung"},
{dimension: "dezentrale Lösungen", nameKurz: "dezentrale Lösungen", name: "dezentrale Lösungen", oberdimension: "organisieren", textLang: "Systeme wie Hubs, Middleware, Serviceprovider um die Nutzung von dezentralen\nSysteme/ Funktionen/ Daten in eigene Systeme zu ermöglichen"},
{dimension: "Weiterverwertung", nameKurz: "Weiterverwertung", name: "Weiterverwertung", oberdimension: "bereichern", textLang: "Ermöglichen, dass Entwicklungen durch Dritte weiterverwertet werden können,\nz. B. durch Modularisierung von Funktionalitäten oder Generalisierung von\nKonzepten, in Kombination mit einer Veröffentlichung unter passender OSS,\nOER-Lizenz"},
{dimension: "dezentrale Ansätze ", nameKurz: "dezentrale Ansätze ", name: "dezentrale Ansätze ", oberdimension: "bereichern", textLang: "Durch kreative technische Zusammenführung dezentraler\nFunktionen/Services (auch von Dritten) Entwicklung neuer\n(innovativer) Funktionen/Services/ Angebote, welche selbst\ngenutzt oder anderen zur Weiterverwendung zur Verfügung gestellt\nwerden können"},
{dimension: "Interoperabilität", nameKurz: "Interoperabilität", name: "Interoperabilität", oberdimension: "bereichern", textLang: "Arbeiten zu standardisierten Schnittstellen / API Zugriff / Prozessen / Metadaten,\nstrukturierte maschinenlesbare Daten, Ontologien / Datenmodelle / Wissensgraphen,\nstandardisierte Lerninhalte"},

];

var dataUnterDimensionenEinzelStandAntrag = [ /// --------------------------------------------------------Stand Antrag--------------------------------
{id:"1", dimension: "Empfehlungen", value1:38, valueProzentGesamt1:38, value2: 9, valueProzentGesamt2: 9,value3:53,valueProzentGesamt3:53, valueGesamt1:18, valueGesamt2: 3,valueGesamt3:13, value1:1, value2: 3,value3:1, value4:1, value5: 2,value6:1, value7:3, value8: 3,value9:2, value10:1, value11: 1,value12:3, value13:1, value14: 1,value15:0, value16:1, value17: 3,value18:3, value19:1, value20: 1,value21:3, value22:0, value23: 3,value24:1, value25:0, value26:0, value27: 2,value28:3, value29:0, value30: 3,value31:3, value32:1, value33: 3,value34:3},
{id:"2", dimension: "Suchen & Auffinden", value1:12, valueProzentGesamt1:12, value2: 9, valueProzentGesamt2: 9,value3:79,valueProzentGesamt3:79, valueGesamt1:27, valueGesamt2: 3,valueGesamt3:4, value1:0, value2: 2,value3:1, value4:1, value5: 0,value6:1, value7:3, value8: 1,value9:1, value10:0, value11: 0,value12:1, value13:0, value14: 1,value15:2, value16:0, value17: 0,value18:1, value19:0, value20: 0,value21:2, value22:0, value23: 0,value24:1, value25:0, value26:1, value27: 1,value28:3, value29:0, value30: 1,value31:1, value32:1, value33: 3,value34:3},
{id:"3", dimension: "Lernbestandsaufnahmen", value1:3, valueProzentGesamt1:3, value2: 26, valueProzentGesamt2: 26,value3:71,valueProzentGesamt3:71, valueGesamt1:24, valueGesamt2: 9,valueGesamt3:1, value1:1, value2: 2,value3:0, value4:0, value5: 2,value6:2, value7:2, value8: 1,value9:2, value10:1, value11: 1,value12:1, value13:1, value14: 2,value15:1, value16:1, value17: 1,value18:1, value19:1, value20: 1,value21:1, value22:1, value23: 2,value24:1, value25:1, value26:2, value27: 1,value28:1, value29:1, value30: 3,value31:2, value32:1, value33: 1,value34:1},
{id:"4", dimension: "gemeinsames Lernen", value1:23, valueProzentGesamt1:23, value2: 24, valueProzentGesamt2: 24,value3:53,valueProzentGesamt3:53, valueGesamt1:18, valueGesamt2: 8,valueGesamt3:8, value1:3, value2: 2,value3:2, value4:3, value5: 0,value6:3, value7:1, value8: 1,value9:3, value10:0, value11: 1,value12:1, value13:1, value14: 2,value15:1, value16:1, value17: 0,value18:3, value19:1, value20: 3,value21:1, value22:1, value23: 2,value24:2, value25:2, value26:1, value27: 3,value28:3, value29:1, value30: 2,value31:1, value32:2, value33: 1,value34:1},
{id:"5", dimension: "Individualisierung", value1:21, valueProzentGesamt1:21, value2: 38, valueProzentGesamt2: 38,value3:41,valueProzentGesamt3:41, valueGesamt1:14, valueGesamt2: 13,valueGesamt3:7, value1:2, value2: 3,value3:1, value4:2, value5: 1,value6:2, value7:1, value8: 3,value9:3, value10:2, value11: 3,value12:1, value13:2, value14: 1,value15:2, value16:2, value17: 2,value18:2, value19:3, value20: 1,value21:1, value22:1, value23: 3,value24:2, value25:2, value26:1, value27: 3,value28:1, value29:1, value30: 2,value31:1, value32:1, value33: 1,value34:2},
{id:"6", dimension: "Lernfortschritt", value1:9, valueProzentGesamt1:9, value2: 6, valueProzentGesamt2: 6,value3:85,valueProzentGesamt3:85, valueGesamt1:29, valueGesamt2: 2,valueGesamt3:3, value1:3, value2: 1,value3:0, value4:3, value5: 1,value6:0, value7:0, value8: 0,value9:1, value10:0, value11: 2,value12:0, value13:0, value14: 0,value15:0, value16:0, value17: 0,value18:0, value19:0, value20: 0,value21:0, value22:0, value23: 0,value24:3, value25:2, value26:0, value27: 0,value28:0, value29:1, value30: 0,value31:1, value32:1, value33: 0,value34:0},
{id:"7", dimension: "Zugang", value1:41, valueProzentGesamt1:41, value2: 15, valueProzentGesamt2: 15,value3:44,valueProzentGesamt3:44, valueGesamt1:15, valueGesamt2: 5,valueGesamt3:14, value1:3, value2: 3,value3:1, value4:3, value5: 3,value6:1, value7:3, value8: 2,value9:3, value10:1, value11: 1,value12:3, value13:3, value14: 3,value15:3, value16:3, value17: 0,value18:3, value19:1, value20: 2,value21:1, value22:3, value23: 1,value24:1, value25:2, value26:2, value27: 0,value28:1, value29:2, value30: 1,value31:1, value32:1, value33: 1,value34:3},
{id:"8", dimension: "Übergänge und Transfer", value1:17, valueProzentGesamt1:17, value2: 12, valueProzentGesamt2: 12,value3:71,valueProzentGesamt3:71, valueGesamt1:24, valueGesamt2: 4,valueGesamt3:6, value1:3, value2: 2,value3:1, value4:0, value5: 1,value6:0, value7:1, value8: 1,value9:3, value10:0, value11: 1,value12:3, value13:1, value14: 1,value15:1, value16:2, value17: 0,value18:1, value19:1, value20: 1,value21:0, value22:1, value23: 1,value24:2, value25:3, value26:2, value27: 0,value28:0, value29:1, value30: 0,value31:3, value32:1, value33: 1,value34:3},
{id:"9", dimension: "Schutz und Souveränität", value1:20, valueProzentGesamt1:20, value2: 15, valueProzentGesamt2: 15,value3:65,valueProzentGesamt3:65, valueGesamt1:22, valueGesamt2: 5,valueGesamt3:7, value1:3, value2: 3,value3:1, value4:1, value5: 0,value6:1, value7:1, value8: 1,value9:3, value10:1, value11: 2,value12:1, value13:1, value14: 2,value15:1, value16:1, value17: 1,value18:2, value19:3, value20: 3,value21:1, value22:1, value23: 3,value24:1, value25:1, value26:0, value27: 0,value28:1, value29:2, value30: 1,value31:1, value32:2, value33: 1,value34:3},
{id:"10", dimension: "Digitale Nachweissysteme", value1:38, valueProzentGesamt1:38, value2: 44, valueProzentGesamt2: 44,value3:18,valueProzentGesamt3:18, valueGesamt1:6, valueGesamt2: 15,valueGesamt3:13, value1:2, value2: 2,value3:3, value4:3, value5: 0,value6:3, value7:3, value8: 2,value9:2, value10:2, value11: 3,value12:2, value13:1, value14: 3,value15:3, value16:2, value17: 3,value18:3, value19:3, value20: 3,value21:2, value22:1, value23: 2,value24:2, value25:1, value26:2, value27: 3,value28:3, value29:2, value30: 2,value31:1, value32:2, value33: 1,value34:2},
{id:"11", dimension: "Verwaltungssysteme", value1:56, valueProzentGesamt1:56, value2: 29, valueProzentGesamt2: 29,value3:15,valueProzentGesamt3:15, valueGesamt1:5, valueGesamt2: 10,valueGesamt3:19, value1:2, value2: 2,value3:2, value4:3, value5: 3,value6:2, value7:3, value8: 1,value9:2, value10:3, value11: 3,value12:1, value13:3, value14: 3,value15:2, value16:3, value17: 3,value18:3, value19:3, value20: 2,value21:3, value22:2, value23: 1,value24:3, value25:3, value26:3, value27: 1,value28:2, value29:3, value30: 3,value31:2, value32:3, value33: 1,value34:3},
{id:"12", dimension: "dezentrale Lösungen", value1:42, valueProzentGesamt1:42, value2: 26, valueProzentGesamt2: 26,value3:32,valueProzentGesamt3:32, valueGesamt1:11, valueGesamt2: 9,valueGesamt3:14, value1:3, value2: 3,value3:1, value4:1, value5: 2,value6:1, value7:3, value8: 2,value9:3, value10:3, value11: 3,value12:1, value13:1, value14: 2,value15:3, value16:3, value17: 2,value18:2, value19:2, value20: 1,value21:3, value22:2, value23: 1,value24:1, value25:1, value26:2, value27: 3,value28:2, value29:1, value30: 3,value31:0, value32:3, value33: 3,value34:3},
{id:"13", dimension: "Weiterverwertung", value1:0, valueProzentGesamt1:0, value2: 6, valueProzentGesamt2: 6,value3:94,valueProzentGesamt3:94, valueGesamt1:32, valueGesamt2: 2,valueGesamt3:0, value1:0, value2: 0,value3:0, value4:0, value5: 0,value6:0, value7:0, value8: 1,value9:0, value10:0, value11: 0,value12:0, value13:0, value14: 0,value15:0, value16:1, value17: 1,value18:1, value19:1, value20: 1,value21:0, value22:0, value23: 0,value24:1, value25:1, value26:1, value27: 0,value28:1, value29:0, value30: 2,value31:1, value32:1, value33: 1,value34:2},
{id:"14", dimension: "dezentrale Ansätze ", value1:27, valueProzentGesamt1:27, value2: 35, valueProzentGesamt2: 35,value3:38,valueProzentGesamt3:38, valueGesamt1:13, valueGesamt2: 12,valueGesamt3:9, value1:1, value2: 2,value3:1, value4:3, value5: 3,value6:1, value7:1, value8: 2,value9:0, value10:2, value11: 2,value12:2, value13:0, value14: 1,value15:1, value16:3, value17: 2,value18:3, value19:3, value20: 2,value21:1, value22:3, value23: 1,value24:1, value25:2, value26:2, value27: 2,value28:3, value29:1, value30: 3,value31:2, value32:2, value33: 3,value34:1},
{id:"15", dimension: "Interoperabilität", value1:3, valueProzentGesamt1:3, value2: 6, valueProzentGesamt2: 6,value3:91,valueProzentGesamt3:91, valueGesamt1:31, valueGesamt2: 2,valueGesamt3:1, value1:1, value2: 1,value3:1, value4:1, value5: 1,value6:2, value7:1, value8: 1,value9:1, value10:1, value11: 1,value12:1, value13:1, value14: 1,value15:1, value16:1, value17: 1,value18:1, value19:3, value20: 1,value21:1, value22:1, value23: 1,value24:1, value25:1, value26:1, value27: 1,value28:1, value29:1, value30: 2,value31:1, value32:1, value33: 1,value34:1},

];


var dataUnterDimensionenProUDimProjekteStandAntrag = [ /// Array für Radarboard alle projekte für eine Unterdimensionen

{id:"1", dimension: "CuC", value1:1, value2: 0,value3:1, value4:3, value5: 2,value6:3, value7:3, value8: 3,value9:3, value10:2, value11: 2,value12:3, value13:0, value14: 1, value15:1},
{id:"2", dimension: "NELE", value1:3, value2: 2,value3:2, value4:2, value5: 3,value6:1, value7:3, value8: 2,value9:3, value10:2, value11: 2,value12:3, value13:0, value14: 2, value15:1},
{id:"3", dimension: "KUKOBINA", value1:1, value2: 1,value3:0, value4:2, value5: 1,value6:0, value7:1, value8: 1,value9:1, value10:3, value11: 2,value12:1, value13:0, value14: 1, value15:1},
{id:"4", dimension: "Projekt-3", value1:1, value2: 1,value3:0, value4:3, value5: 2,value6:3, value7:3, value8: 0,value9:1, value10:3, value11: 3,value12:1, value13:0, value14: 3, value15:1},
{id:"5", dimension: "Projekt-4", value1:2, value2: 0,value3:2, value4:0, value5: 1,value6:1, value7:3, value8: 1,value9:0, value10:0, value11: 3,value12:2, value13:0, value14: 3, value15:1},
{id:"6", dimension: "Projekt-5", value1:1, value2: 1,value3:2, value4:3, value5: 2,value6:0, value7:1, value8: 0,value9:1, value10:3, value11: 2,value12:1, value13:0, value14: 1, value15:2},
{id:"7", dimension: "Projekt-6", value1:3, value2: 3,value3:2, value4:1, value5: 1,value6:0, value7:3, value8: 1,value9:1, value10:3, value11: 3,value12:3, value13:0, value14: 1, value15:1},
{id:"8", dimension: "Projekt-7", value1:3, value2: 1,value3:1, value4:1, value5: 3,value6:0, value7:2, value8: 1,value9:1, value10:2, value11: 1,value12:2, value13:1, value14: 2, value15:1},
{id:"9", dimension: "Projekt-8", value1:2, value2: 1,value3:2, value4:3, value5: 3,value6:1, value7:3, value8: 3,value9:3, value10:2, value11: 2,value12:3, value13:0, value14: 0, value15:1},
{id:"10", dimension: "Projekt-9", value1:1, value2: 0,value3:1, value4:0, value5: 2,value6:0, value7:1, value8: 0,value9:1, value10:2, value11: 3,value12:3, value13:0, value14: 2, value15:1},
{id:"11", dimension: "Projekt-10", value1:1, value2: 0,value3:1, value4:1, value5: 3,value6:2, value7:1, value8: 1,value9:2, value10:3, value11: 3,value12:3, value13:0, value14: 2, value15:1},
{id:"12", dimension: "Projekt-11", value1:3, value2: 1,value3:1, value4:1, value5: 1,value6:0, value7:3, value8: 3,value9:1, value10:2, value11: 1,value12:1, value13:0, value14: 2, value15:1},
{id:"13", dimension: "Projekt-12", value1:1, value2: 0,value3:1, value4:1, value5: 2,value6:0, value7:3, value8: 1,value9:1, value10:1, value11: 3,value12:1, value13:0, value14: 0, value15:1},
{id:"14", dimension: "Projekt-13", value1:1, value2: 1,value3:2, value4:2, value5: 1,value6:0, value7:3, value8: 1,value9:2, value10:3, value11: 3,value12:2, value13:0, value14: 1, value15:1},
{id:"15", dimension: "Projekt-14", value1:0, value2: 2,value3:1, value4:1, value5: 2,value6:0, value7:3, value8: 1,value9:1, value10:3, value11: 2,value12:3, value13:0, value14: 1, value15:1},
{id:"16", dimension: "Projekt-15", value1:1, value2: 0,value3:1, value4:1, value5: 2,value6:0, value7:3, value8: 2,value9:1, value10:2, value11: 3,value12:3, value13:1, value14: 3, value15:1},
{id:"17", dimension: "Projekt-16", value1:3, value2: 0,value3:1, value4:0, value5: 2,value6:0, value7:0, value8: 0,value9:1, value10:3, value11: 3,value12:2, value13:1, value14: 2, value15:1},
{id:"18", dimension: "Projekt-17", value1:3, value2: 1,value3:1, value4:3, value5: 2,value6:0, value7:3, value8: 1,value9:2, value10:3, value11: 3,value12:2, value13:1, value14: 3, value15:1},
{id:"19", dimension: "Projekt-18", value1:1, value2: 0,value3:1, value4:1, value5: 3,value6:0, value7:1, value8: 1,value9:3, value10:3, value11: 3,value12:2, value13:1, value14: 3, value15:3},
{id:"20", dimension: "Projekt-19", value1:1, value2: 0,value3:1, value4:3, value5: 1,value6:0, value7:2, value8: 1,value9:3, value10:3, value11: 2,value12:1, value13:1, value14: 2, value15:1},
{id:"21", dimension: "Projekt-20", value1:3, value2: 2,value3:1, value4:1, value5: 1,value6:0, value7:1, value8: 0,value9:1, value10:2, value11: 3,value12:3, value13:0, value14: 1, value15:1},
{id:"22", dimension: "Projekt-21", value1:0, value2: 0,value3:1, value4:1, value5: 1,value6:0, value7:3, value8: 1,value9:1, value10:1, value11: 2,value12:2, value13:0, value14: 3, value15:1},
{id:"23", dimension: "Projekt-22", value1:3, value2: 0,value3:2, value4:2, value5: 3,value6:0, value7:1, value8: 1,value9:3, value10:2, value11: 1,value12:1, value13:0, value14: 1, value15:1},
{id:"24", dimension: "Projekt-23", value1:1, value2: 1,value3:1, value4:2, value5: 2,value6:3, value7:1, value8: 2,value9:1, value10:2, value11: 3,value12:1, value13:1, value14: 1, value15:1},
{id:"25", dimension: "Projekt-24", value1:0, value2: 0,value3:1, value4:2, value5: 2,value6:2, value7:2, value8: 3,value9:1, value10:1, value11: 3,value12:1, value13:1, value14: 2, value15:1},
{id:"26", dimension: "Projekt-25", value1:0, value2: 1,value3:2, value4:1, value5: 1,value6:0, value7:2, value8: 2,value9:0, value10:2, value11: 3,value12:2, value13:1, value14: 2, value15:1},
{id:"27", dimension: "Projekt-26", value1:2, value2: 1,value3:1, value4:3, value5: 3,value6:0, value7:0, value8: 0,value9:0, value10:3, value11: 1,value12:3, value13:0, value14: 2, value15:1},
{id:"28", dimension: "Projekt-27", value1:3, value2: 3,value3:1, value4:3, value5: 1,value6:0, value7:1, value8: 0,value9:1, value10:3, value11: 2,value12:2, value13:1, value14: 3, value15:1},
{id:"29", dimension: "Projekt-28", value1:0, value2: 0,value3:1, value4:1, value5: 1,value6:1, value7:2, value8: 1,value9:2, value10:2, value11: 3,value12:1, value13:0, value14: 1, value15:1},
{id:"30", dimension: "Projekt-29", value1:3, value2: 1,value3:3, value4:2, value5: 2,value6:0, value7:1, value8: 0,value9:1, value10:2, value11: 3,value12:3, value13:2, value14: 3, value15:2},
{id:"31", dimension: "Projekt-30", value1:3, value2: 1,value3:2, value4:1, value5: 1,value6:1, value7:1, value8: 3,value9:1, value10:1, value11: 2,value12:0, value13:1, value14: 2, value15:1},
{id:"32", dimension: "Projekt-31", value1:1, value2: 1,value3:1, value4:2, value5: 1,value6:1, value7:1, value8: 1,value9:2, value10:2, value11: 3,value12:3, value13:1, value14: 2, value15:1},
{id:"33", dimension: "Projekt-32", value1:3, value2: 3,value3:1, value4:1, value5: 1,value6:0, value7:1, value8: 1,value9:1, value10:1, value11: 1,value12:3, value13:1, value14: 3, value15:1},
{id:"34", dimension: "Projekt-XX", value1:3, value2: 3,value3:1, value4:1, value5: 2,value6:0, value7:3, value8: 3,value9:3, value10:2, value11: 3,value12:3, value13:2, value14: 1, value15:1},

];
if (thema == "UDim-Fachlich") { dataUnterDimensionenEinzelStandAntrag = dataUnterDimensionenProUDimProjekteStandAntrag; }

var dataUnterDimensionenEinzelStandZeitpunktA = dataUnterDimensionenEinzelStandAntrag; //Datensatz Slider erste position (=links)
var dataUnterDimensionenEinzelStandZB2021 = dataUnterDimensionenEinzelStandAntrag; 
var dataUnterDimensionenProUDimProjekteStandZB2021 = dataUnterDimensionenEinzelStandAntrag; 
if (thema == "UDim-Fachlich") { dataUnterDimensionenEinzelStandZB2021 = dataUnterDimensionenProUDimProjekteStandZB2021; }

var dataUnterDimensionenEinzelStandZeitpunktB = dataUnterDimensionenEinzelStandZB2021; //Datensatz Slider 2. position (=mitte)

var dataUnterDimensionenEinzelStandTagung2022 = dataUnterDimensionenEinzelStandAntrag; 

var dataUnterDimensionenProUDimProjekteStandTagung2022 =dataUnterDimensionenEinzelStandAntrag; 
if (thema == "UDim-Fachlich") { dataUnterDimensionenEinzelStandTagung2022 = dataUnterDimensionenProUDimProjekteStandTagung2022; }

var dataUnterDimensionenEinzelStandZeitpunktC = dataUnterDimensionenEinzelStandTagung2022; //Datensatz Slider 3. position (=rechts) = Stand August 2023


//var dataUnterDimensionenEinzel = dataUnterDimensionenEinzelStandZB2021; ///aktuellen Datensatz auf den letzten Stand setzen, dieser ist dann der inital angezeigte Datensatz
var dataUnterDimensionenEinzel = dataUnterDimensionenEinzelStandAntrag; /// slider steht zu Beginn auf StandAntrag
var dataUnterDimensionen = dataUnterDimensionenEinzel; //values nur noch in Einzelarray enthalten

//#endregion ///-----C END Set Data----------------------------------------------------------------------------------------------

