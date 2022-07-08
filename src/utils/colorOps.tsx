export function LightenDarkenColor(col: string, amt: number, alpha = 1.0) {
  if (col[0] === '#') col = col.slice(1);

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  console.log(r, g, b);

  return `rgba(${r}, ${g}, ${b}, ${alpha}`;
}
