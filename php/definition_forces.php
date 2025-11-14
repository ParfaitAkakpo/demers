<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo '
{
    "definition_forces": [
        {
            "force": "Le poids",
            "definition": "La force du poids correspond à la force qu\'exerce la terre sur chaque corps. On l\'appelle aussi force de pesanteur ou force de gravité. Il est possible de calculer le poids grâce à la formule P=mg où m correspond à la masse de l\'objet et g à la constante gravitationnelle. L\'unité de cette force est le Newton (N)."
        },
        {
            "force": "La traînée",
            "definition": "La force de traînée est, dans le domaine de l\'aviation, la force de résistance exercée par l\'air sur l\'avion. Cette force est parallèle à l\'écoulement de l\'air et à un sens contraire au déplacement de l\'avion."
        },
        {
            "force": "La poussée",
            "definition": "La poussée est la force qui entraîne l\'avion à une certaine vitesse. Dans le cas de l\'avion en papier, c\'est la force exercée sur l\'avion lors du lancer. Elle donne le sens du déplacement de l\'avion.  La poussée est également exprimée en Newton (N)."
        },
        {
            "force": "La portance",
            "definition": "La force de portance est la force qui permet à l\'avion de s\'élever en altitude. Elle est perpendiculaire au déplacement de l\'avion et, compense, lorsque l\'avion vole correctement, la force du poids."
        }
    ]
}
';