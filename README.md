# Conversor ASCII ⇄ Hexadecimal (UTF-8)

Ferramenta web simples e moderna para converter:
- **Texto → Hex** (usando bytes em **UTF-8**)
- **Hex → Texto** (decodificando **UTF-8**)

> A página é 100% cliente (HTML/CSS/JS), sem dependências externas.

## ✨ Recursos

- Conversão bidirecional com um clique
- Suporte completo a **UTF-8** (inclusive emojis e acentos)
- Validações claras para entradas inválidas
- Opções de saída: **maiúsculas** e **separadores** (`""`, espaço ou `:`)
- Botões de **limpar**, **exemplo** e **copiar para a área de transferência**
- Acessível (rótulos, `aria-live` para mensagens, foco preservado)
- Layout **responsivo** e visual escuro agradável

## 🚀 Como usar

1. Baixe/clonar este repositório.
2. Abra `index.html` no navegador.
3. Use um dos painéis:
   - **ASCII/Unicode → Hex:** digite texto, ajuste as opções (maiúsculas/separador) e clique **Converter**.
   - **Hex → ASCII/Unicode:** cole hex (com ou sem `0x`, espaços, `:`). Clique **Converter**.

Atalhos:
- **Ctrl + Enter** converte o painel que está em foco.

### Exemplos

- Texto → Hex  
  `Olá, mundo! 👋` → `4f6cc3a12c206d756e646f2120f09f918b`  
  (ou `4F 6C C3 A1 ...` com maiúsculas + espaço)

- Hex → Texto  
  `4f 6c c3 a1 2c 20 6d 75 6e 64 6f 21` → `Olá, mundo!`

## 🧠 Observações técnicas

- O conversor usa `TextEncoder`/`TextDecoder` (UTF-8).  
- A entrada **hex** é “limpa” (remove `0x`, espaços, quebras, `:`).  
- A quantidade de dígitos hex (após limpeza) **deve ser par**.  
- Hex inválido ou sequência UTF-8 inválida mostram mensagem de erro (sem quebrar a página).



