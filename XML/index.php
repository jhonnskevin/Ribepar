<?php
include 'ejemplo.php';
$peliculas = new SimpleXMLElement($xmlstr);

$personaje = $peliculas->pelicula[0]->personajes->addChild('personaje');
$personaje->addChild('nombre', 'Sr. Analizador');
$personaje->addChild('actor', 'John Doe');

$puntuacion = $peliculas->pelicula[0]->addChild('puntuacion', 'Todos los públicos');
$puntuacion->addAttribute('tipo', 'clasificacion');

echo $peliculas->asXML();
?>