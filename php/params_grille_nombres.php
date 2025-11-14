<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo '
{
    "parametres_tableau": {
        "nombre_colonnes": 15,
        "nombre_lignes": 20,
        "plage_nombres_aleatoires" : {
            "nombre_minimum": 10,
            "nombre_maximum": 90
        },
        "nombre_base": 80,
        "couleur_fond_cellule": "rgb(5,173,131)",
        "couleur_texte_cellule": "rgb(255,255,255)"
    }
}
';