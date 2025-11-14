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
 
}

