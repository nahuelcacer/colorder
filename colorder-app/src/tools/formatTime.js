export function formatTime(timeString) {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parseInt(parts[2]);
  
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
  
    const formattedTime = date.toTimeString().split(" ")[0];
    return formattedTime;
  }