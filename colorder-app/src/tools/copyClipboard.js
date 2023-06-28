export function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(function() {
        console.log("Texto copiado al portapapeles: " + text);
      })
      .catch(function(error) {
        console.error("Error al copiar el texto: ", error);
      });
  }
  