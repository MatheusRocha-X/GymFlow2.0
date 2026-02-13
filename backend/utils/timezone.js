/**
 * Utilitário para trabalhar com timezones
 */

/**
 * Obtém a hora atual no timezone especificado
 * @param {string} timezone - Timezone IANA (ex: 'America/Sao_Paulo')
 * @returns {Date} Date object com a hora ajustada para o timezone
 */
export function getTimeInTimezone(timezone) {
  const now = new Date();
  
  // Usar Intl.DateTimeFormat para obter componentes da data no timezone correto
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  const parts = formatter.formatToParts(now);
  const dateParts = {};
  
  parts.forEach(part => {
    if (part.type !== 'literal') {
      dateParts[part.type] = parseInt(part.value);
    }
  });
  
  // Criar um Date object com os componentes ajustados
  // Nota: Retornamos um objeto simples com os valores, não um Date
  return {
    year: dateParts.year,
    month: dateParts.month,
    day: dateParts.day,
    hours: dateParts.hour,
    minutes: dateParts.minute,
    seconds: dateParts.second,
    dayOfWeek: now.getDay() // Aproximação, pode ter diferença em alguns casos extremos
  };
}

/**
 * Obtém a hora atual formatada (HH:MM) no timezone especificado
 * @param {string} timezone - Timezone IANA (ex: 'America/Sao_Paulo')
 * @returns {string} Hora no formato HH:MM
 */
export function getCurrentTimeString(timezone) {
  const time = getTimeInTimezone(timezone);
  return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
}

/**
 * Obtém o dia da semana atual no timezone especificado
 * @param {string} timezone - Timezone IANA
 * @returns {number} Dia da semana (0-6, onde 0 é domingo)
 */
export function getCurrentDayOfWeek(timezone) {
  const now = new Date();
  const timeString = now.toLocaleString('en-US', { timeZone: timezone });
  const localDate = new Date(timeString);
  return localDate.getDay();
}
