/* global _ */


window.addEventListener('DOMContentLoaded', initialiser)

function initialiser () {
  const main = document.createElement('main')

  const titre = document.createElement('h1')
  titre.textContent = 'Tableau de nombres'

  const grilleContainer = document.createElement('div')
  grilleContainer.id = 'grille-container'

  const compteur = document.createElement('p')
  compteur.id = 'compteur'

  main.appendChild(titre)
  main.appendChild(grilleContainer)
  main.appendChild(compteur)

  document.body.appendChild(main)

  fetch('http://localhost:8080/params_grille_nombres.php')
    .then(response => response.json())
    .then(data => {
      const config = data.parametres_tableau
      construireGrille(config)
    })
    .catch(err => console.error(err))  
}


function construireGrille (config) {
  const nbLignes = config.nombre_lignes
  const nbColonnes = config.nombre_colonnes
  const min = config.plage_nombres_aleatoires.nombre_minimum
  const max = config.plage_nombres_aleatoires.nombre_maximum
  const seuil = config.nombre_base
  const couleurFond = config.couleur_fond_cellule
  const couleurTexte = config.couleur_texte_cellule

  const container = document.getElementById('grille-container')
  const compteurElm = document.getElementById('compteur')

  const table = document.createElement('table')
  let nbSupSeuil = 0

  for (let i = 0; i < nbLignes; i++) {
    const tr = document.createElement('tr')

    for (let j = 0; j < nbColonnes; j++) {
      const td = document.createElement('td')
      const valeur = _.random(min, max)

      td.textContent = valeur

      if (valeur > seuil) {
        nbSupSeuil++
        td.style.backgroundColor = couleurFond
        td.style.color = couleurTexte
      }

      tr.appendChild(td)
    }

    table.appendChild(tr)
  }

  container.innerHTML = ''
  container.appendChild(table)

  compteurElm.textContent = `Nombre de cellules ayant un nombre superieur à ${seuil} : ${nbSupSeuil}`
}
