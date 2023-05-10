export function formatDate(dateString) {
    const parts = dateString.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    
    return `${day}/${month}/${year}`;
  }