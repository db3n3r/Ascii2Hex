// Utilidades
const byId = (id) => document.getElementById(id);

function bytesToHex(bytes, { uppercase = false, separator = "" } = {}) {
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0"));
  const joined = separator ? hex.join(separator) : hex.join("");
  return uppercase ? joined.toUpperCase() : joined;
}

function cleanHexInput(str) {
  // Remove 0x/0X, espaços, quebras e separadores comuns
  return str
    .replace(/0x/gi, " ")
    .replace(/[^0-9a-fA-F]/g, "") // mantém só hex
    .trim();
}

function isHex(str) {
  return /^[0-9a-fA-F]*$/.test(str);
}

// Converte texto (UTF-8) -> hex
function asciiToHex(text, { uppercase, separator }) {
  const enc = new TextEncoder(); // UTF-8
  const bytes = enc.encode(text);
  return bytesToHex(bytes, { uppercase, separator });
}

// Converte hex -> texto (UTF-8)
function hexToAscii(hexStr) {
  const cleaned = cleanHexInput(hexStr);
  if (!cleaned.length) return { ok: true, text: "" };
  if (!isHex(cleaned)) return { ok: false, error: "Há caracteres não-hexadecimais." };
  if (cleaned.length % 2 !== 0) return { ok: false, error: "Quantidade de dígitos hex deve ser par." };

  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    const byte = parseInt(cleaned.slice(i, i + 2), 16);
    if (Number.isNaN(byte)) return { ok: false, error: "Valor hexadecimal inválido." };
    bytes[i / 2] = byte;
  }

  try {
    const dec = new TextDecoder("utf-8", { fatal: true });
    const text = dec.decode(bytes);
    return { ok: true, text };
  } catch {
    // Se a sequência UTF-8 for inválida, avisamos claramente
    return { ok: false, error: "Sequência UTF-8 inválida (bytes não formam texto válido)." };
  }
}

// Elementos
const asciiInput = byId("asciiInput");
const hexUppercase = byId("hexUppercase");
const hexSeparator = byId("hexSeparator");
const btnAsciiToHex = byId("btnAsciiToHex");
const btnClearAscii = byId("btnClearAscii");
const btnExampleAscii = byId("btnExampleAscii");
const hexOutput = byId("hexOutput");
const btnCopyHex = byId("btnCopyHex");
const copiedHex = byId("copiedHex");

const hexInput = byId("hexInput");
const btnHexToAscii = byId("btnHexToAscii");
const btnClearHex = byId("btnClearHex");
const btnExampleHex = byId("btnExampleHex");
const asciiOutput = byId("asciiOutput");
const btnCopyAscii = byId("btnCopyAscii");
const copiedAscii = byId("copiedAscii");
const hexError = byId("hexError");

// Ações
function doAsciiToHex() {
  const text = asciiInput.value;
  const uppercase = hexUppercase.checked;
  const separator = hexSeparator.value;
  hexOutput.value = asciiToHex(text, { uppercase, separator });
  copiedHex.textContent = "";
}

function doHexToAscii() {
  const raw = hexInput.value;
  const res = hexToAscii(raw);
  if (!res.ok) {
    hexError.textContent = res.error;
    hexError.classList.add("show");
    asciiOutput.value = "";
  } else {
    hexError.textContent = "";
    hexError.classList.remove("show");
    asciiOutput.value = res.text;
  }
  copiedAscii.textContent = "";
}

// Botões
btnAsciiToHex.addEventListener("click", doAsciiToHex);
btnHexToAscii.addEventListener("click", doHexToAscii);

btnClearAscii.addEventListener("click", () => { asciiInput.value = ""; hexOutput.value = ""; copiedHex.textContent = ""; });
btnClearHex.addEventListener("click", () => { hexInput.value = ""; asciiOutput.value = ""; hexError.textContent = ""; hexError.classList.remove("show"); copiedAscii.textContent = ""; });

btnExampleAscii.addEventListener("click", () => {
  asciiInput.value = "Olá, mundo! 👋";
  doAsciiToHex();
});
btnExampleHex.addEventListener("click", () => {
  hexInput.value = "4f 6c c3 a1 2c 20 6d 75 6e 64 6f 21 20 f0 9f 91 8b";
  doHexToAscii();
});

// Mudanças de opções refletem automaticamente
hexUppercase.addEventListener("change", doAsciiToHex);
hexSeparator.addEventListener("change", doAsciiToHex);

// Cópia
async function copyToClipboard(el, feedbackEl) {
  try {
    await navigator.clipboard.writeText(el.value || "");
    feedbackEl.textContent = "Copiado!";
    setTimeout(() => feedbackEl.textContent = "", 1600);
  } catch {
    feedbackEl.textContent = "Não foi possível copiar.";
    setTimeout(() => feedbackEl.textContent = "", 2000);
  }
}
btnCopyHex.addEventListener("click", () => copyToClipboard(hexOutput, copiedHex));
btnCopyAscii.addEventListener("click", () => copyToClipboard(asciiOutput, copiedAscii));

// Atalhos básicos
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "enter") {
    // Converte o painel que estiver com foco
    const active = document.activeElement;
    if (active === asciiInput || active === hexSeparator || active === hexUppercase) doAsciiToHex();
    else if (active === hexInput) doHexToAscii();
  }
});
