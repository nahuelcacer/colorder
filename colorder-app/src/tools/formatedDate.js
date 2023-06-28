export function formatDate(dateString) {
    const parts = dateString.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    
    return `${day}/${month}/${year}`;
  }



export function FormatearFecha(fechaOriginal) {
  // const fechaOriginal = "2023-06-27T17:25:07.772369Z";
  const fecha = new Date(fechaOriginal);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  const hora = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');

  const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}hs`;
  return fechaFormateada

}