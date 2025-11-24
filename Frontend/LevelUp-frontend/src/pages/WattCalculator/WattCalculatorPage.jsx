import { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import SidebarMenu from "../../components/layout/SidebarMenu/SidebarMenu";
import Footer from "../../components/layout/Footer/Footer";
import "./wattcalc.css";

/*
  Página: Calculadora de Watts
  - Interfaz simple para seleccionar componentes y calcular consumo estimado.
  - Recomienda una fuente (PSU) con un 30% de margen por defecto y redondeo a 50W.
  - No muy compleja por pedido del usuario.
*/

const OPTIONS = {
  cpus: [
    { id: "i3", name: "Intel i3 (bajo consumo)", watt: 65 },
    { id: "i5", name: "Intel i5 (gama media)", watt: 95 },
    { id: "i7", name: "Intel i7 (alto)", watt: 125 },
    { id: "ryzen3", name: "AMD Ryzen 3", watt: 65 },
    { id: "ryzen5", name: "AMD Ryzen 5", watt: 95 },
    { id: "ryzen7", name: "AMD Ryzen 7", watt: 105 }
  ],
  gpus: [
    { id: "gtx1650", name: "GTX 1650 (baja)", watt: 75 },
    { id: "gtx1660", name: "GTX 1660 (media)", watt: 120 },
    { id: "rtx3060", name: "RTX 3060 (media-alta)", watt: 170 },
    { id: "rtx3070", name: "RTX 3070 (alta)", watt: 220 },
    { id: "rtx3080", name: "RTX 3080 (muy alta)", watt: 320 },
    { id: "no-gpu", name: "Sin GPU dedicada (APU / integrada)", watt: 0 }
  ],
  rams: [
    { id: "8", name: "8 GB (1 stick)", watt: 4 },
    { id: "16", name: "16 GB (2 x 8GB)", watt: 8 },
    { id: "32", name: "32 GB (2 x 16GB)", watt: 10 }
  ],
  storages: [
    { id: "hdd", name: "HDD 1TB", watt: 8 },
    { id: "ssd", name: "SSD SATA 1TB", watt: 5 },
    { id: "nvme", name: "NVMe M.2 1TB", watt: 6 }
  ]
};

function roundToNearest50(n) {
  return Math.ceil(n / 50) * 50;
}

export default function WattCalculatorPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Selecciones
  const [cpu, setCpu] = useState(OPTIONS.cpus[1].id); // por defecto i5
  const [gpu, setGpu] = useState(OPTIONS.gpus[1].id); // por defecto GTX 1660
  const [gpuCount, setGpuCount] = useState(1);
  const [ram, setRam] = useState(OPTIONS.rams[1].id); // 16GB
  const [storagePrimary, setStoragePrimary] = useState(OPTIONS.storages[1].id); // SSD
  const [extraFans, setExtraFans] = useState(2); // ventiladores adicionales
  const [overclock, setOverclock] = useState(false);
  const [headroomPercent, setHeadroomPercent] = useState(30);

  // Obtener valores de watt por id
  const findWatt = (list, id) => {
    const item = list.find((i) => i.id === id);
    return item ? item.watt : 0;
  };

  const cpuW = findWatt(OPTIONS.cpus, cpu);
  const gpuW = findWatt(OPTIONS.gpus, gpu);
  const ramW = findWatt(OPTIONS.rams, ram);
  const storageW = findWatt(OPTIONS.storages, storagePrimary);
  const fansW = extraFans * 5; // estimación 5W por ventilador

  // sumatorio base
  const baseSum = cpuW + gpuW * gpuCount + ramW + storageW + fansW;

  // si overclock, añadir un +15% al consumo base antes del headroom
  const ocFactor = overclock ? 1.15 : 1;
  const adjustedBase = baseSum * ocFactor;

  // aplicar headroom
  const recommendedWithHeadroom = adjustedBase * (1 + headroomPercent / 100);

  const recommendedPSU = roundToNearest50(recommendedWithHeadroom);

  return (
    <>
      <Navbar onMenuToggle={() => setMenuOpen(true)} />
      <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="watt-page container">
        <section className="watt-intro">
          <h1>Calculadora de Watts - LevelUp PCs</h1>
          <p className="muted">
            Estima la potencia necesaria para tu PC según los componentes seleccionados.
            Esta herramienta da una aproximación. Para builds muy avanzadas o sistemas con
            varias GPUs consulta la ficha técnica del fabricante.
          </p>
        </section>

        <section className="watt-grid">
          <div className="watt-form">
            <h2>Selecciona tus componentes</h2>

            <label className="field">
              <span>CPU</span>
              <select value={cpu} onChange={(e) => setCpu(e.target.value)}>
                {OPTIONS.cpus.map((c) => (
                  <option value={c.id} key={c.id}>
                    {c.name} — {c.watt}W TDP (estimado)
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>GPU</span>
              <select value={gpu} onChange={(e) => setGpu(e.target.value)}>
                {OPTIONS.gpus.map((g) => (
                  <option value={g.id} key={g.id}>
                    {g.name} — {g.watt}W (estimado)
                  </option>
                ))}
              </select>
            </label>

            <label className="field small">
              <span>Cantidad de GPUs</span>
              <input
                type="number"
                min={1}
                max={4}
                value={gpuCount}
                onChange={(e) => setGpuCount(Number(e.target.value))}
              />
            </label>

            <label className="field">
              <span>RAM</span>
              <select value={ram} onChange={(e) => setRam(e.target.value)}>
                {OPTIONS.rams.map((r) => (
                  <option value={r.id} key={r.id}>
                    {r.name} — ≈{r.watt}W
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Almacenamiento (principal)</span>
              <select
                value={storagePrimary}
                onChange={(e) => setStoragePrimary(e.target.value)}
              >
                {OPTIONS.storages.map((s) => (
                  <option value={s.id} key={s.id}>
                    {s.name} — ≈{s.watt}W
                  </option>
                ))}
              </select>
            </label>

            <label className="field small">
              <span>Ventiladores adicionales</span>
              <input
                type="number"
                min={0}
                max={10}
                value={extraFans}
                onChange={(e) => setExtraFans(Number(e.target.value))}
              />
            </label>

            <label className="field checkbox">
              <input
                type="checkbox"
                checked={overclock}
                onChange={(e) => setOverclock(e.target.checked)}
                id="oc"
              />
              <span>¿Planeas hacer overclock? (+15%)</span>
            </label>

            <label className="field range">
              <span>Margen de seguridad (headroom): {headroomPercent}%</span>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={headroomPercent}
                onChange={(e) => setHeadroomPercent(Number(e.target.value))}
              />
            </label>
          </div>

          <aside className="watt-summary">
            <h2>Resumen y recomendación</h2>

            <div className="summary-row">
              <span>Consumo estimado (base):</span>
              <strong>{Math.round(baseSum)} W</strong>
            </div>

            {overclock && (
              <div className="summary-row muted">
                <span>Incluye overclock (+15%):</span>
                <strong>{Math.round(adjustedBase)} W</strong>
              </div>
            )}

            <div className="summary-row">
              <span>Margen aplicado ({headroomPercent}%):</span>
              <strong>{Math.round(recommendedWithHeadroom)} W</strong>
            </div>

            <div className="recommend">
              <p>PSU recomendada (redondeado a 50W):</p>
              <div className="psu-badge">{recommendedPSU} W</div>
            </div>

            <div className="notes">
              <h3>Consejos</h3>
              <ul>
                <li>
                  Se recomienda elegir una PSU de buena marca con certificación 80+.
                </li>
                <li>
                  Si usas varias GPUs o haces overclock agresivo, considera un margen mayor.
                </li>
                <li>
                  Para builds con GPU de 300W o múltiples GPUs consulta las especificaciones.
                </li>
              </ul>
            </div>

            <button
              className="cta"
              onClick={() => {
                // simple acción: copia la recomendación al portapapeles
                const text = `Consumo estimado: ${Math.round(
                  recommendedWithHeadroom
                )}W — Recomendado: ${recommendedPSU}W`;
                navigator.clipboard?.writeText(text);
                alert("Recomendación copiada al portapapeles:\n" + text);
              }}
            >
              Copiar recomendación
            </button>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}