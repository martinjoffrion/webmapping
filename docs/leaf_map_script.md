---
outline: deep
---
# Creation of a Leaflet Map

<script setup>

import { useData } from 'vitepress'

import { onMounted, reactive, ref } from 'vue'

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

const { site, theme, page, frontmatter } = useData()

onMounted(() => {
  // Création d'une carte Leaflet dont relié à l'id html 'map' qui a comme coordonnées 
  var map = L.map('map').setView( [43.3, 1.4], 10);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var ortho = L.tileLayer.wms('https://wxs.ign.fr/ortho/geoportail/r/wms', {
    layers: 'ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO'
}).addTo(map);

var bd_forest = L.tileLayer.wms('https://wxs.ign.fr/environnement/geoportail/r/wms', {
    layers: 'LANDCOVER.FORESTINVENTORY.V2',
    attribution: '&copy; IGN BD_forêt',
    transparent: true,
    format: 'image/png',
    
});

var result_cla = L.tileLayer.wms('https://www.geotests.net/geoserver/m_joffrion/wms', {
    layers: 'lvl2_from_lvl3',
    transparent: true,
    format: 'image/png'
}).addTo(map);

console.log("url", result_cla);

var baseMaps = {
    'OpenStreetMap': osm,
    'Otho-imagery': ortho,
};

var overlayMaps = {
    'Carte forestière (2006-...' : bd_forest,
    'Resultat Nomenclature 2' : result_cla
};

//Add forest Legend
var legend_simple = L.control({position: 'bottomleft'});
legend_simple.onAdd = function (map) {

    let divlegend = L.DomUtil.create('divlegend', 'info legend');
    divlegend.innerHTML = ('<div style = "color : white;"> <h3>Forest legend</h3>'+
    '<img src="https://www.geotests.net/geoserver/m_joffrion/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=lvl2_from_lvl3&transparent=true&legend_options=fontColor:0xffffff;dpi:100" alt="">'+
    '</div>');
    return divlegend;
    };
legend_simple.addTo(map);

L.control.layers(baseMaps,overlayMaps).addTo(map);

});

</script>

## Results

<html>
<body>
<div id="map" class="mapleaflet" style="height: 500px;width: 100%; "></div>
</body>
</html>

## Details code

#### Creation of a map variable
To start with this js API, we need to create a map variable. She has to be centered on the Haute Garonne and its zoom level needs to permit us to observe a large part of the department. 
```js{3}
onMounted(() => {
  // Création d'une carte Leaflet dont relié à l'id html 'map' qui a comme coordonnées 
  var map = L.map('map').setView( [43.3, 1.4], 10);
```

#### Importation of flows
Once we have this map variable, we can add it some webservices. In our case, we are adding wms flows with the **tileLayer** function. We submit the general link, the layer we want, the attributions (authors and sources) and then, several others options such as the image format...  
At the end, we can add the flow to the map variable. 
```js{2,6,12,13}
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var ortho = L.tileLayer.wms('https://wxs.ign.fr/ortho/geoportail/r/wms', {
    layers: 'ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO'
}).addTo(map);

var bd_forest = L.tileLayer.wms('https://wxs.ign.fr/environnement/geoportail/r/wms', {
    layers: 'LANDCOVER.FORESTINVENTORY.V2',
    attribution: '&copy; IGN BD_forêt',
    transparent: true,
    format: 'image/png',
});
```
#### Importation of the Geoserver flow 
We should reiterates this process to add our own flow, previously published via geoserver. 

```js
var result_cla = L.tileLayer.wms('https://www.geotests.net/geoserver/m_joffrion/wms', {
    layers: 'lvl2_from_lvl3',
    transparent: true,
    format: 'image/png'
}).addTo(map);
```
#### Layer control
At this point, we can add the layer control panel to the map. 
```js
var baseMaps = {
    'OpenStreetMap': osm,
    'Otho-imagery': ortho,
};

var overlayMaps = {
    'Carte forestière (2006-...' : bd_forest,
    'Resultat Nomenclature 2' : result_cla
};

L.control.layers(baseMaps,overlayMaps).addTo(map);
```
#### Adding of the key map (legend)
Every self-respecting map must have a legend. The legend of our flow is reachable with the **GetLegendGraphics** request. We can beautified the png legend output with the **legend_options** like font color and background color. 
We add this request inside a div that is managed by the **DomUtil.create** from leaflet, then add it to the map. 
```js{5,7}
//Add forest Legend
var legend_simple = L.control({position: 'bottomleft'});
legend_simple.onAdd = function (map) {

    let divlegend = L.DomUtil.create('divlegend', 'info legend');
    divlegend.innerHTML = ('<div style = "color : white;">  Forest legend <br>'+
    '<img src="https://www.geotests.net/geoserver/m_joffrion/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=lvl2_from_lvl3&transparent=true&legend_options=fontColor:0xffffff;dpi:100" alt="">'+
    '</div>');
    return divlegend;
    };

legend_simple.addTo(map);
```


