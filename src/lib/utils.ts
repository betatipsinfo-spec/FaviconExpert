import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FONT_PAIRINGS = [
  { name: 'Inter + Space Grotesk', description: 'Modern startup aesthetic' },
  { name: 'Playfair Display + Plus Jakarta', description: 'Luxury editorial feel' },
  { name: 'JetBrains Mono + Outfit', description: 'Technical & precise' },
  { name: 'Montserrat + Open Sans', description: 'Friendly & universal' },
];

export const SHAPES = ['square', 'rounded', 'circle'] as const;

export const AESTHETIC_PRESETS = [
  {
    name: 'Neon Cyber',
    bg: '#090d16',
    text: '#06b6d4',
    gradient: ['#a855f7', '#06b6d4'],
    shadow: 'rgba(168, 85, 247, 0.5)',
    type: 'linear'
  },
  {
    name: 'Solar Sunset',
    bg: '#1e0c1b',
    text: '#ffffff',
    gradient: ['#f59e0b', '#ec4899'],
    shadow: 'rgba(236, 72, 153, 0.4)',
    type: 'linear'
  },
  {
    name: 'Deep Ocean',
    bg: '#0c1b2a',
    text: '#ffffff',
    gradient: ['#1e40af', '#06b6d4'],
    shadow: 'rgba(6, 182, 212, 0.3)',
    type: 'radial'
  },
  {
    name: 'Emerald Night',
    bg: '#06161a',
    text: '#ffffff',
    gradient: ['#10b981', '#3b82f6'],
    shadow: 'rgba(16, 185, 129, 0.3)',
    type: 'linear'
  }
];

export function generateFaviconDataUrl(
  canvas: HTMLCanvasElement,
  size: number,
  settings: import('../types').FaviconSettings,
  mode: 'text' | 'emoji'
): string {
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  canvas.width = size;
  canvas.height = size;

  const margin = settings.showBackgroundShadow ? (size * 0.1) : 0;
  const drawSize = size - (margin * 2);

  // Draw Background
  ctx.clearRect(0, 0, size, size);
  
  // Shadow for background
  if (settings.showBackgroundShadow) {
    ctx.shadowColor = settings.backgroundShadowColor;
    ctx.shadowBlur = (size * settings.backgroundShadowBlur) / 100;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = (size * 2) / 100;
  } else {
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // Path for clipping/drawing shape
  ctx.beginPath();
  const radius = settings.shape === 'circle' ? drawSize / 2 : (settings.shape === 'rounded' ? (drawSize * settings.borderRadius) / 100 : 0);
  
  if (settings.shape === 'circle') {
    ctx.arc(size / 2, size / 2, drawSize / 2, 0, Math.PI * 2);
  } else {
    ctx.roundRect(margin, margin, drawSize, drawSize, radius);
  }
  
  // Fill Background
  if (settings.gradientType === 'none') {
    ctx.fillStyle = settings.backgroundColor;
    ctx.fill();
  } else {
    const gradient = settings.gradientType === 'linear' 
      ? ctx.createLinearGradient(margin, margin, size - margin, size - margin)
      : ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, drawSize / 1.4);
    
    settings.gradientColors.forEach((color, i) => {
      gradient.addColorStop(i / (settings.gradientColors.length - 1), color);
    });
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  // Reset shadow for content if needed or keep for content
  ctx.save();
  
  // Clip content to background shape
  ctx.clip();

  // Draw Content
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  if (settings.showShadow) {
    ctx.shadowColor = settings.shadowColor;
    ctx.shadowBlur = (size * settings.shadowBlur) / 100;
    ctx.shadowOffsetX = (size * settings.shadowOffsetX) / 100;
    ctx.shadowOffsetY = (size * settings.shadowOffsetY) / 100;
  } else {
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
  
  if (mode === 'text') {
    const fontSize = (drawSize * settings.fontSize) / 100;
    ctx.font = `${settings.fontWeight} ${fontSize}px ${settings.fontFamily}`;
    ctx.fillStyle = settings.textColor;
    ctx.fillText(settings.text, size / 2, size / 2 + (fontSize * 0.1));
  } else {
    const fontSize = (drawSize * settings.fontSize) / 100;
    ctx.font = `${fontSize}px serif`;
    ctx.fillText(settings.emoji, size / 2, size / 2 + (fontSize * 0.05));
  }

  ctx.restore();

  return canvas.toDataURL('image/png');
}

export function generateFaviconSvg(
  settings: import('../types').FaviconSettings,
  mode: 'text' | 'emoji'
): string {
  const size = 512;
  const margin = settings.showBackgroundShadow ? (size * 0.1) : 0;
  const drawSize = size - (margin * 2);
  const radius = settings.shape === 'circle' ? drawSize / 2 : (settings.shape === 'rounded' ? (drawSize * settings.borderRadius) / 100 : 0);

  let gradientDef = '';
  let fillStyle = settings.backgroundColor;

  if (settings.gradientType !== 'none') {
    const id = 'favicon-gradient';
    fillStyle = `url(#${id})`;
    if (settings.gradientType === 'linear') {
      gradientDef = `
        <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          ${settings.gradientColors.map((c, i) => `<stop offset="${(i / (settings.gradientColors.length - 1)) * 100}%" stop-color="${c}" />`).join('')}
        </linearGradient>`;
    } else {
      gradientDef = `
        <radialGradient id="${id}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          ${settings.gradientColors.map((c, i) => `<stop offset="${(i / (settings.gradientColors.length - 1)) * 100}%" stop-color="${c}" />`).join('')}
        </radialGradient>`;
    }
  }

  const shadowDef = settings.showShadow ? `
    <filter id="content-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="${(size * settings.shadowOffsetX) / 100}" dy="${(size * settings.shadowOffsetY) / 100}" stdDeviation="${(size * settings.shadowBlur) / 200}" shadow-color="${settings.shadowColor}" />
    </filter>` : '';

  const bgShadowDef = settings.showBackgroundShadow ? `
    <filter id="bg-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="${(size * 2) / 100}" stdDeviation="${(size * settings.backgroundShadowBlur) / 200}" shadow-color="${settings.backgroundShadowColor}" opacity="0.6" />
    </filter>` : '';

  const shape = settings.shape === 'circle' 
    ? `<circle cx="${size / 2}" cy="${size / 2}" r="${drawSize / 2}" fill="${fillStyle}" ${settings.showBackgroundShadow ? 'filter="url(#bg-shadow)"' : ''} />`
    : `<rect x="${margin}" y="${margin}" width="${drawSize}" height="${drawSize}" rx="${radius}" ry="${radius}" fill="${fillStyle}" ${settings.showBackgroundShadow ? 'filter="url(#bg-shadow)"' : ''} />`;

  const fontSize = (drawSize * settings.fontSize) / 100;
  let content = '';

  if (mode === 'text') {
    content = `<text x="50%" y="${50 + 1}%" dominant-baseline="middle" text-anchor="middle" font-family="${settings.fontFamily}" font-weight="${settings.fontWeight}" font-size="${fontSize}" fill="${settings.textColor}" ${settings.showShadow ? 'filter="url(#content-shadow)"' : ''}>${settings.text}</text>`;
  } else {
    content = `<text x="50%" y="${50 + 1}%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" ${settings.showShadow ? 'filter="url(#content-shadow)"' : ''}>${settings.emoji}</text>`;
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${gradientDef}
        ${shadowDef}
        ${bgShadowDef}
        <clipPath id="shape-clip">
          ${settings.shape === 'circle' 
            ? `<circle cx="${size / 2}" cy="${size / 2}" r="${drawSize / 2}" />`
            : `<rect x="${margin}" y="${margin}" width="${drawSize}" height="${drawSize}" rx="${radius}" ry="${radius}" />`}
        </clipPath>
      </defs>
      ${shape}
      <g clip-path="url(#shape-clip)">
        ${content}
      </g>
    </svg>
  `.trim();
}
