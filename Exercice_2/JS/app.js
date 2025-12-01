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

/* --------------------------------------------------------------
   CHARGEMENT CDp & K
-------------------------------------------------------------- */
function chargerParamsCD () {
  fetch('http://localhost:8080/data_cdp_k.php')
    .then(res => res.json())
    .then(data => {
      const cdp = data.data_cdp_k.cdp
      const k = data.data_cdp_k.k

      paramsCD[0] = { cdp: cdp[0], k: k[0] }
      paramsCD[20] = { cdp: cdp[1], k: k[1] }
      paramsCD[45] = { cdp: cdp[2], k: k[2] }
    })
    .catch(() => console.error('Erreur chargement CDp/K'))
}

