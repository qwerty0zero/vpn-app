export const normalizeColorToRgb = (input: string | undefined): string => {
  if (!input || typeof input !== 'string') {
    throw new Error(`Color parsing error: Input is empty or not a string.`);
  }

  const cleanInput = input.trim().replace(/\s+/g, '');

  let r: number, g: number, b: number;

  const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6})$/i;

  if (hexRegex.test(cleanInput)) {
    let hexBody = cleanInput.replace('#', '');

    if (hexBody.length === 3) {
      hexBody = hexBody.split('').map(char => char + char).join('');
    }

    const intVal = parseInt(hexBody, 16);
    r = (intVal >> 16) & 255;
    g = (intVal >> 8) & 255;
    b = intVal & 255;

  } else {
    const rawValues = cleanInput.replace(/^rgb\(|\)$/gi, '');

    const rgbParts = rawValues.split(',');

    if (rgbParts.length !== 3) {
      throw new Error(`Color parsing error: Invalid RGB format "${input}". Expected 3 values.`);
    }

    [r, g, b] = rgbParts.map(num => Number(num));

    if ([r, g, b].some(n => isNaN(n))) {
      throw new Error(`Color parsing error: Non-numeric values found in "${input}".`);
    }
  }

  if ([r, g, b].some(val => val < 0 || val > 255)) {
    throw new Error(`Color parsing error: Values out of range (0-255) in "${input}".`);
  }

  return `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`;
};