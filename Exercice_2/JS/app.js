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

/* --------------------------------------------------------------
   INITIALISATION FORMULAIRE
-------------------------------------------------------------- */
function initialiserFormulaire () {
  const form = document.getElementById('form-cd')
  form.addEventListener('submit', handleSubmit)
}

/* --------------------------------------------------------------
   VALIDATION
-------------------------------------------------------------- */
function validerChamps (flap, mach, cl, flapRaw, machRaw) {
  let ok = true

  const flapInput = document.getElementById('flap')
  const machInput = document.getElementById('mach')
  const clInput = document.getElementById('cl')

  const flapError = document.getElementById('flap-error')
  const machError = document.getElementById('mach-error')
  const clError = document.getElementById('cl-error')

  // reset
  flapInput.classList.remove('is-invalid')
  machInput.classList.remove('is-invalid')
  clInput.classList.remove('is-invalid')

  flapError.textContent = ''
  machError.textContent = ''
  clError.textContent = ''

  // VALIDATION FLAP
  if (flapRaw === '') {
    flapInput.classList.add('is-invalid')
    flapError.textContent = 'Veuillez choisir une valeur.'
    ok = false
  } else if (![0, 20, 45].includes(flap)) {
    flapInput.classList.add('is-invalid')
    flapError.textContent = 'Valeur de flap invalide.'
    ok = false
  }

  // VALIDATION MACH (cas champ vide + hors bornes)
  if (machRaw === '') {
    machInput.classList.add('is-invalid')
    machError.textContent = 'Veuillez entrer une valeur pour Mach.'
    ok = false
  } else if (isNaN(mach) || mach < 0 || mach > 0.85) {
    machInput.classList.add('is-invalid')
    machError.textContent = 'Mach doit être un nombre entre 0 et 0.85.'
    ok = false
  }

  // VALIDATION CL
  if (isNaN(cl) || cl < 0.2 || cl > 1.2) {
    clInput.classList.add('is-invalid')
    clError.textContent = 'Cl doit être un nombre entre 0.2 et 1.2.'
    ok = false
  }

  return ok
}

/* --------------------------------------------------------------
   CDcomp = fonction du Mach
-------------------------------------------------------------- */
function calculCDcomp (mach, cl) {
  if (mach >= 0 && mach <= 0.60) return 0

  if (mach > 0.60 && mach <= 0.78) {
    return (0.0508 - 0.1748 * mach + 0.1504 * mach * mach) * cl * cl
  }

  if (mach > 0.78 && mach <= 0.85) {
    return (
      -99.3434 +
      380.888 * mach -
      486.8 * mach * mach +
      207.408 * mach * mach * mach
    ) * cl * cl
  }

  return 0
}

/* --------------------------------------------------------------
   CALCUL CD TOTAL
-------------------------------------------------------------- */
function calculerCD (flap, mach, cl) {
  const p = paramsCD[flap]
  const cdcomp = calculCDcomp(mach, cl)
  return p.cdp + p.k * cl * cl + cdcomp
}

/* --------------------------------------------------------------
   SOUMISSION FORMULAIRE
-------------------------------------------------------------- */
function handleSubmit (e) {
  e.preventDefault()

  const flapRaw = document.getElementById('flap').value
  const flap = Number(flapRaw)

  const machInput = document.getElementById('mach')
  const machRaw = machInput.value
  const mach = Number(machRaw)

  const cl = Number(document.getElementById('cl').value)

  if (!validerChamps(flap, mach, cl, flapRaw, machRaw)) return

  const cd = calculerCD(flap, mach, cl)
  document.getElementById('resultat-cd').textContent = `CD = ${cd.toFixed(4)}`
}
