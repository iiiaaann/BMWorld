// BMWorld, display.js
// SI-CA1a
// groupe représentation, affichage
// début 30.01.2023
// À faire :
//  - Créer une liste des individus pour sélectionner l'un d'eux.

let selectedCreatureIndex = 0;
let cycles = 0;
let booleanPause = 0;
let cameraNumber = 1;
let camera1; //création des deux caméras
let camera2;
let camera3;
let politic = document.getElementById("WorldTypeList").value;

let img; //chargement de l'image de fond
/*let matrix;
function preload(){
    matrix = loadImage('matrix.jpg');
}*/

let nx = 40; // nombre de tuiles en x
let nz = 40; // nombre de tuiles en y
let unit = 50; // taille de l'unité de base du monde. Une tuile fait 50 de côté.
let tileSize = unit - 2; // L'affichage d'une tuile fait 48 de côté.
let aWorld = [
    {"name":"monde","type":"monde","x":1000,"y":-50,"z":1000,"rx":0,"ry":0,"rz":0,"l1":100,"l2":100,"l3":100,"color":"green"}
];

let ctxPersonStatus;
let ctxPersonPersonality;

let CouleurCube = ['rgb(77, 5, 232)', 'rgb(49, 55, 199)', 'rgb(39, 71, 188)', 'rgb(30, 88, 177)', 'rgb(20, 104, 166)', 'rgb(10, 120, 155)', 'rgb(0, 136, 143)', 'rgb(68, 31, 235)', 'rgb(59, 56, 238)', 'rgb(50, 82, 241)', 'rgb(41, 107, 244)', 'rgb(37, 120, 246)', 'rgb(32, 133, 247)', 'rgb(28, 146, 249)', 'rgb(23, 158, 250)', 'rgb(5, 209, 255)', 'rgb(28, 2, 99)', 'rgb(26, 28, 119)', 'rgb(23, 54, 138)', 'rgb(123, 141, 182)', 'rgb(19, 93, 168)', 'rgb(17, 106, 177)', 'rgb(14, 132, 197)', 'rgb(11, 158, 216)', 'rgb(8, 184, 236)'];
let CouleurCylinder = ['rgb(255, 128, 0)', 'rgb(255, 144, 0)', 'rgb(255, 160, 0)', 'rgb(255, 176, 0)', 'rgb(255, 192, 0)', 'rgb(255, 200, 0)', 'rgb(255, 208, 0)', 'rgb(255, 224, 0)', 'rgb(255, 240, 0)', 'rgb(255, 255, 0)', 'rgb(255, 121, 0)', 'rgb(255, 106, 0)', 'rgb(255, 98, 0)', 'rgb(255, 91, 0)', 'rgb(255, 83, 0)', 'rgb(255, 68, 0)', 'rgb(143, 0, 0)', 'rgb(152, 6, 0)', 'rgb(162, 11, 0)', 'rgb(171, 17, 0)', 'rgb(185, 26, 0)', 'rgb(199, 34, 0)', 'rgb(213, 43, 0)', 'rgb(227, 51, 0)', 'rgb(241, 60, 0)'];
let CouleurTorus = ['rgb(217, 0, 224)', 'rgb(203, 0, 217)', 'rgb(188, 0, 209)', 'rgb(173, 0, 202)', 'rgb(158, 0, 194)', 'rgb(143, 0, 187)', 'rgb(136, 0, 183)', 'rgb(128, 0, 179)', 'rgb(113, 0, 171)', 'rgb(98, 0, 163)', 'rgb(210, 0, 200)', 'rgb(206, 0, 188)', 'rgb(203, 0, 179)', 'rgb(200, 0, 170)', 'rgb(197, 0, 161)', 'rgb(194, 0, 151)', 'rgb(255, 0, 47)', 'rgb(248, 0, 60)', 'rgb(240, 0, 73)', 'rgb(237, 0, 80)', 'rgb(233, 0, 88)', 'rgb(226, 0, 100)', 'rgb(218, 0, 112)', 'rgb(210, 0, 125)', 'rgb(202, 0, 138)'];
let CouleurCone = ['rgb(86, 122, 0)', 'rgb(81, 131, 0)', 'rgb(76, 139, 0)', 'rgb(65, 156, 0)', 'rgb(54, 173, 0)', 'rgb(43, 189, 0)', 'rgb(33, 206, 0)', 'rgb(22, 222, 0)', 'rgb(11, 239, 0)', 'rgb(0, 255, 0)', 'rgb(101, 143, 1)', 'rgb(116, 164, 2)', 'rgb(134, 189, 2)', 'rgb(158, 222, 3)', 'rgb(170, 239, 4)', 'rgb(182, 255, 4)', 'rgb(2, 120, 57)', 'rgb(25, 137, 51)', 'rgb(47, 154, 44)', 'rgb(59, 163, 41)', 'rgb(70, 171, 38)', 'rgb(92, 188, 31)', 'rgb(115, 205, 25)', 'rgb(137, 222, 18)', 'rgb(160, 239, 11)'];
let RandomCar=[1,2,3,4,5,6];    //random pour les caractéristiques physiques des créatures
let ColorCylinder;
let ColorCube;
let ColorTorus;
let ColorCone;
let randomCylinder;
let randomCube;
let randomTorus;
let randomCone;

randomCylinder = get_random(RandomCar); //random pour choisir les caractéristiques physiques des diverses créatures
randomCube = get_random(RandomCar);
randomTorus = get_random(RandomCar);
randomCone = get_random(RandomCar);

function setup() {
    // fonction appelée au lancement du programme
    mainDisplay = createCanvas(1200, 850, WEBGL);// canvas en 3D
    mainDisplay.parent("canvasDisplay");
    angleMode(DEGREES);// angles en degrés
    camera1 = createCamera();
    camera1.setPosition(-300, -500, -300);// placement de la caméra au départ, vise le centre
    camera1.lookAt(nx / 2 * unit, -0, nz / 2 * unit);
    camera2 = createCamera();//création d'une deuxième caméra
    camera2.setPosition(-300, -500, -300);
    camera2.lookAt(nx / 2 * unit, -0, nz / 2 * unit);
    camera3 = createCamera();//création d'une troisième caméra
    camera3.setPosition(-300, -500, -300);
    camera3.lookAt(nx / 2 * unit, -0, nz / 2 * unit);
    normalMaterial(250);// matériaux solides
    fnTiles();// Ajoute à aWorld un certain nombre de tuiles pour le sol
    frameRate(30);// On rafraîchit x fois par seconde
    ctxPersonStatus = document.getElementById("canvasPersonStatus").getContext("2d");
    ctxPersonPersonality = document.getElementById("canvasPersonPersonality").getContext("2d");
    ctxPersonStatus.canvas.width = 600;
    ctxPersonStatus.canvas.height = 374;
    ctxPersonPersonality.canvas.width = 600;
    ctxPersonPersonality.canvas.height = 374;
    createListOfCreatures();
    fnTypeOfSociety();
}

function get_random(list) {
    return list[Math.floor((Math.random() * list.length))];
}

function fnTiles() {
    //Crée un certain nb de tuiles
    for (x = 0; x <= nx; x++) {
        for (z = 0; z <= nz; z++) {
            aWorld.push({ "name": "tile", "type": "plane", "x": x * unit, "y": 0, "z": z * unit, "rx": 90, "ry": 0, "rz": 0, "l1": tileSize, "l2": tileSize, "color": "#90BE6D" }); //tuiles vertes
        }
    }
}

function draw() {
    // fonction appelée x fois par seconde (selon le frameRate choisi)
    // NB : même les objets statiques (ex: la grille) doivent être redessinés à chaque fois, pas possible de les
    //      dessiner juste une fois dans le setup.
    background("lightblue");
    lights();//Allumer les lumières
    directionalLight(250, 250, 250, 0.2, 1, 0.6);
    orbitControl(0.5, 0.5, 0.5);//autorise le controle par souris
    if (booleanPause == 0){
        fnEngine(); // Calcule le monde de l'état suivant (se trouve dans engine.js)
    }
    if(cameraNumber == 2){
        camera2.setPosition(creatureTotal[selectedCreatureIndex].position.x * unit - 500, - 400, creatureTotal[selectedCreatureIndex].position.z * unit -500);
    }
    if(cameraNumber == 3){
        camera3.lookAt(creatureTotal[selectedCreatureIndex].position.x * unit, -20, creatureTotal[selectedCreatureIndex].position.z * unit);
    }
    fnDisplay(); // Affiche les fonds des 3 canvas, le monde, les créatures et les graphes
    fnDisplayWorldStatus();
}

function fnDisplay() {
    // Dessin du monde : grille, axes et autres objets statiques (ex: bâtiments)
    for (let i = 0; i < aWorld.length; i++) {
        fnDisplayObject(aWorld[i]);
    }

    // Dessin des créatures
    for (let i = 0; i < creatureTotal.length; i++) {
        ColorCylinder = CouleurCylinder[creatureTotal[i].color];
        ColorCube = CouleurCube[creatureTotal[i].color];
        ColorTorus = CouleurTorus[creatureTotal[i].color];
        ColorCone = CouleurCone[creatureTotal[i].color];
        fnDisplayCreature(creatureTotal[i], i);
    }

    // Fond du canvas PersonStatus
    ctxPersonStatus.fillStyle = "#00a85a";
    ctxPersonStatus.fillRect(0, 0, 600, 600);

    // Fond du canvas PersonPersonality
    ctxPersonPersonality.fillStyle = "#00a85a";
    ctxPersonPersonality.fillRect(0, 0, 600, 600);

    // Dessin des graphes
    bars(statusLegends, 250, 335, 300, 300, statusColors);
    spider(personalityLegends, personalityLegendsOfLegends, 400, 188, 150, "lightgreen", "yellow");

    // MAJ de l'affichage du nombre de cycles
    document.getElementById("cyclesNumber").innerHTML = "Cycles : " + cycles;
}

function fnUpdatePause(){
    if(booleanPause == 0){
        booleanPause = 1;
        document.getElementById("cyclesPauseButton").innerHTML = "Reprendre";
    }
    else{
        booleanPause = 0;
        document.getElementById("cyclesPauseButton").innerHTML = "Mettre en pause";
    }
}

function fnCameraSwitch(){//fonction de changement de caméra
    if(cameraNumber == 1){
        cameraNumber = 2;
        setCamera(camera2); //changement de caméra
    }
    else if(cameraNumber == 2){
        cameraNumber = 3;
        setCamera(camera3); //changement de caméra
    }
    else{
        cameraNumber = 1;
        setCamera(camera1); //changement de caméra
    }
}

function fnSpeedofCycles() {
    let framerate = parseInt(document.getElementById("speed").value)
    frameRate(framerate)
}



function bars(legends, x, y, l, h, colors) {
    //Cette fonction dessine un graphique en barres à partir
    //de x et y, de largeur l et de hauteur h

    // Pour stocker les valeurs de personnalité de l'individu sélectionné
    let arrayPersonalityStatus = [];

    for (let x in creatureTotal[selectedCreatureIndex].status) {
        arrayPersonalityStatus.push(creatureTotal[selectedCreatureIndex].status[x]);
    }


    // barres
    let largeur = l / arrayPersonalityStatus.length;

    for (let i = 0; i < arrayPersonalityStatus.length; i++) {
        ctxPersonStatus.fillStyle = colors[i];
        ctxPersonStatus.fillRect(x + i * largeur, y, largeur, -h * arrayPersonalityStatus[i] / 100);
    }

    // axes
    ctxPersonStatus.beginPath();
    ctxPersonStatus.moveTo(x, y);
    ctxPersonStatus.lineTo(x + l * 1, y);
    ctxPersonStatus.stroke(); // La méthode stroke() dessine le chemin actuel
    ctxPersonStatus.beginPath();
    ctxPersonStatus.moveTo(x, y);
    ctxPersonStatus.lineTo(x, y - h * 1);
    ctxPersonStatus.stroke();
    ctxPersonStatus.strokeRect(x, y, l, -h);

    //Ecritures des légendes (noir, 15pt Arial)
    ctxPersonStatus.font = "14pt Calibri";
    ctxPersonStatus.fillStyle = "black";

    for (let i = 0; i < legends.length; i++) {
        ctxPersonStatus.fillStyle = "black";
        ctxPersonStatus.fillText(legends[i], 50, y - 260 + i * 40);
        ctxPersonStatus.fillStyle = statusColors[i];
        ctxPersonStatus.fillRect(20, 58 + i * 40, 20, 20);
    }
}

function spider(legends, legendsOfLegends, x, y, r, c1, c2) {
    // Cette fonction dessine un graphique en toile d'araignée
    // dans le dessin ctx, avec le tableau des valeurs et le tableau des légendes
    // Le graphique est placé en x, y et a pour rayon r
    // Les maxi sont repérés par la couleur c1, les valeurs par c2
    // Ici c'est le milieu du graphe qui est en x, y (pas le coin en haut à gauche)

    // Pour stocker les valeurs de personnalité de l'individu sélectionné
    let arrayPersonalityValues = [];

    for (let x in creatureTotal[selectedCreatureIndex].profile) {
        arrayPersonalityValues.push(creatureTotal[selectedCreatureIndex].profile[x]);
    }

    // Autre méthode : avec dictionnaire (buggé : les valeurs du array sont toujours 0,1,2,3,4)
    /* for(const [key] of Object.entries(creatureTotal[selectedCreatureIndex].profile))
    {
        arrayPersonalityValues.push(key);
    } */

    // Zone de maxi (en fond)
    ctxPersonPersonality.beginPath();
    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length; // Avec le - on tourne dans le sens horaire
        ctxPersonPersonality.lineTo(x + (r+15) * Math.cos(angle), y - (r+15) * Math.sin(angle));
    }
    ctxPersonPersonality.fillStyle = c1;
    ctxPersonPersonality.fill();

    //Zone des valeurs (par-dessus le fond)
    ctxPersonPersonality.beginPath();

    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length;

        ctxPersonPersonality.lineTo(x + (arrayPersonalityValues[i] * r+15) * Math.cos(angle),y - (arrayPersonalityValues[i] * r+15) * Math.sin(angle));
    }

    ctxPersonPersonality.fillStyle = c2;
    ctxPersonPersonality.fill();

    // Zone centrale
    ctxPersonPersonality.beginPath();
    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length; // Avec le - on tourne dans le sens horaire
        ctxPersonPersonality.lineTo(x + 15 * Math.cos(angle), y - 15 * Math.sin(angle));
    }
    ctxPersonPersonality.fillStyle = "black";
    ctxPersonPersonality.fill();

    // Zone de moitié (par-dessus le fond et les valeurs, épaisseur 1)
    // Pareil que le fond mais r*0,5 au lieu de r et stroke() au lieu de fill()
    ctxPersonPersonality.beginPath();
    for (let i = 0; i <= arrayPersonalityValues.length; i++) {
        let angle = -i * 2 * Math.PI / arrayPersonalityValues.length;
        ctxPersonPersonality.lineTo(x + (0.5 * r+15) * Math.cos(angle), y - (0.5 * r+15) * Math.sin(angle));
    }
    ctxPersonPersonality.stroke();

    // Tracé des axes (épaisseur 2, couleur noire)
    for (let i = 0; i < arrayPersonalityValues.length; i++) {
        let angle = i * 2 * Math.PI / arrayPersonalityValues.length;
        ctxPersonPersonality.beginPath();
        ctxPersonPersonality.moveTo(x, y);
        ctxPersonPersonality.lineTo(x + 1.1 * r * Math.cos(angle), y - 1.1 * r * Math.sin(angle));
        ctxPersonPersonality.lineWidth = 2;
        ctxPersonPersonality.stroke();
    }

    // Ecritures des légendes (noir, 15pt Arial)
    ctxPersonPersonality.font = "15pt Calibri";
    ctxPersonPersonality.fillStyle = "black";
    for (let i = 0; i < legends.length; i++) {
        let angle = -i * 2 * Math.PI / legends.length;
        ctxPersonPersonality.fillText(legends[i], x - 5 + 1.2 * r * Math.cos(angle), y + 5 - 1.2 * r * Math.sin(angle));
        // "-5" et "+5" uniquement pour peaufiner l'emplacement des légendes
    }

    ctxPersonStatus.fillStyle = "black";

    for (let i = 0; i < legendsOfLegends.length; i++) {
        ctxPersonPersonality.fillText(legendsOfLegends[i], 50, y -75 + i * 40);
    }
}

// Reçoit un objet en argument et le dessine
function fnDisplayObject(o) {
    switch (o.type) {
        case 'line':
            stroke(o.color);
            line(o.x, o.y, o.z, o.x1, o.y1, o.z1);
            noStroke();
            break;

        case 'cylinder':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            cylinder(o.r, o.l);
            pop();
            break;
        case 'plane':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(60,225,90,150); // couleur des tuiles, 150 correspond au niveau de transparence de la couleur
            plane(o.l1, o.l2);
            pop();
            break;
        case 'box':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            box(o.l1, o.l2, o.l3);
            pop();
            break;
        case 'sphere':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            sphere(o.r);
            pop();
            break;
        case 'ellipsoid':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            ellipsoid(o.r1, o.r2, o.r3);
            pop();
            break;
        case 'cone':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            cone(o.r, o.h);
            pop();
            break;
        case 'torus':
            push();
            translate(o.x, o.y, o.z);
            rotateX(o.rx);
            rotateY(o.ry);
            rotateZ(o.rz);
            fill(o.color);
            torus(o.r1, o.r2);
            pop();
            break;
        case "monde":
            push();
            translate(o.x,o.y,o.z);
            rotateX(o.rx);
            rotateY(180);
            rotateZ(o.rz);
            sphere(4800,4800);
            pop();
            break;
    }
}

// Crée la liste des créatures sur la page HTML à partir du tableau creatureTotal
function createListOfCreatures() {
    for (let i = 0; i < creatureTotal.length; i++) {
        let optElement = document.createElement("option");
        optElement.setAttribute("value", creatureTotal[i].name); // Peut-être optionnel
        // optElement.setAttribute("id", i); // Probablement optionnel
        let optNode = document.createTextNode(creatureTotal[i].name);
        optElement.appendChild(optNode);
        let rootElement = document.getElementById("listPerson");
        rootElement.appendChild(optElement);
    }
}

// Appelée quand une créature est sélectionnée dans la liste
// Met à jour la variable globale avec l'index de la créature sélectionnée
function updateSelectedCreature() {
    let selectedElement = document.getElementById("listPerson");
    selectedCreatureIndex = selectedElement.selectedIndex;
    let selectedCreatureDisplay = selectedCreatureIndex + 1;

    //console.log("Index créature sélectionnée : " + selectedCreatureIndex);
    //console.log("Donc créature sélectionnée : " + selectedCreatureDisplay);
}

// Appelée en cliquant sur l'onglet "État du monde"
// Lien pour le calcul de la moyenne avec la fonction reduce() : https://www.codingem.com/javascript-calculate-average/
function fnDisplayWorldStatus() {
    let textToDisplay = "<tr> <td>Statut</td><td>Minimum</td><td>Moyenne</td><td>Maximum</td> </tr>";

    textToDisplay += fnStatusValues("Force", "FC");
    textToDisplay += fnStatusValues("Compétences", "CP");
    textToDisplay += fnStatusValues("Argent", "RA");
    textToDisplay += fnStatusValues("Patrimoine", "RP");
    textToDisplay += fnStatusValues("Compétences", "CP");
    textToDisplay += fnStatusValues("Bien-être Court", "BC");
    textToDisplay += fnStatusValues("Bien-être Long", "BL");
    textToDisplay += fnStatusValues("Relations", "RE");

    document.getElementById("tableWorldEtat").innerHTML = textToDisplay;
}

function fnStatusValues(statusFullName, statusShortName) {
    let arrayValues = [];
    for (let i = 0; i < creatureTotal.length; i++)
    {
        arrayValues.push(creatureTotal[i].status[statusShortName]);
    }

    let min = Math.round(Math.min(...arrayValues));
    let avg = Math.round(arrayValues.reduce((a, b) => a + b, 0) / arrayValues.length);
    let max = Math.round(Math.max(...arrayValues));

    if(statusShortName == "RA") {
        min *= 1000;
        avg *= 1000;
        max *= 1000;
    }

    return "<tr> <td>" + statusFullName + "</td><td>" + min + "</td><td>" + avg + "</td><td>" + max + "</td> </tr>";
}

function fnTypeOfSociety(){
    let monde = parseInt(document.getElementById("WorldTypeList").value);
    actualSociety = societyModels[monde];

    let textToDisplay = "<h3>" + actualSociety.state + "</h3>";

    textToDisplay += "<p> Aides : " + actualSociety.help + " %</p>";
    textToDisplay += "<p> Taxes : " + actualSociety.tax + " %</p>";
    textToDisplay += "<p> Sanctions : " + actualSociety.penalty + "</p>";
    textToDisplay += "<p> Salaire : " + actualSociety.salary + " </p> <br>";
    textToDisplay += "<p id='societyDescription'>" + actualSociety.description + "</p>";

    document.getElementById("WorldType").innerHTML = textToDisplay;
}

function fnjumpCycles(){
    let skipText = document.getElementById("skipCounter").value;
    var cyclesToSkip = skipText * 50;
    for(let i=0;i<cyclesToSkip;i++){
        setTimeout(() => {  fnEngine(); }, 50);
    }
}

