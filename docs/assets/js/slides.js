// Importa todos los slides en orden
// Para añadir uno nuevo: crea el archivo en /slides/ e impórtalo aquí

import overview from '../../slides/intro/overview.js';
import targets from '../../slides/infraestructura/targets.js';
import opnsense from '../../slides/infraestructura/opnsense.js';
import secopsLab from '../../slides/secops/lab.js';
import secopsWorkflows from '../../slides/secops/workflows.js';
import openclawSetup from '../../slides/openclaw/setup.js';
import openclawWorkspace from '../../slides/openclaw/workspace.js';
import openclawAlertas from '../../slides/openclaw/alertas.js';
import siem from '../../slides/soc/siem.js';

export const slides = [
  overview,
  targets,
  opnsense,
  secopsLab,
  secopsWorkflows,
  openclawSetup,
  openclawWorkspace,
  openclawAlertas,
  siem,
];
