export function generateCover(id, width = 800, height = 450) {
  const gradients = [
    ['#4FACFE', '#00F2FE'],
    ['#BD00FF', '#8B5CF6'],
    ['#F093FB', '#F5576C'],
    ['#43E97B', '#38F9D7'],
    ['#FA709A', '#FEE140'],
    ['#667EEA', '#764BA2'],
    ['#00C6FB', '#005BEA'],
  ];
  
  const gradient = gradients[(id - 1) % gradients.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${gradient[0]};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${gradient[1]};stop-opacity:1" />
      </linearGradient>
      <filter id="blur${id}">
        <feGaussianBlur stdDeviation="20" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g${id})" />
    <circle cx="${width * 0.2}" cy="${height * 0.3}" r="80" fill="${gradient[0]}" opacity="0.3" filter="url(#blur${id})" />
    <circle cx="${width * 0.8}" cy="${height * 0.7}" r="60" fill="${gradient[1]}" opacity="0.3" filter="url(#blur${id})" />
    <rect x="0" y="${height - 4}" width="${width}" height="4" fill="rgba(255,255,255,0.3)" />
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function generateAvatar(name, size = 120) {
  const colors = ['#4FACFE', '#BD00FF', '#00F0FF', '#F093FB', '#43E97B'];
  const color = colors[name.length % colors.length];
  const initial = name.charAt(0).toUpperCase();
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="avatar${name.length}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color}88;stop-opacity:1" />
      </linearGradient>
    </defs>
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#avatar${name.length})" />
    <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="central" fill="white" font-size="${size * 0.4}" font-weight="bold" font-family="Inter, sans-serif">${initial}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
