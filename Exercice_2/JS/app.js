/* global fetch */

const paramsCD = {}

window.addEventListener('DOMContentLoaded', () => {
  chargerParamsCD()
  chargerDefinitionForces()
  initialiserFormulaire()
})

/* --------------------------------------------------------------
   CHARGEMENT DÉFINITIONS
-------------------------------------------------------------- */
function chargerDefinitionForces () {
  fetch('http://localhost:8080/definition_forces.php')
    .then(res => res.json())
    .then(data => {
      const defs = data.definition_forces
      const zone = document.getElementById('definition-forces')

      let html = ''
      defs.forEach(d => {
        html += `<h5>${d.force}</h5>`
        html += `<p>${d.definition}</p>`
        html += '<hr>'
      })
      zone.innerHTML = html
    })
    .catch(() => {
      document.getElementById('definition-forces').innerHTML =
        '<p class="text-danger">Erreur de chargement des définitions.</p>'
    })
}
