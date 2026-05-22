export default function Icon({ name, size = 18, stroke = 1.6, style }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
    style,
  };
  switch (name) {
    case 'arrow-right': return (<svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>);
    case 'arrow-up-right': return (<svg {...common}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>);
    case 'check': return (<svg {...common}><path d="M5 12l4 4 10-10"/></svg>);
    case 'x': return (<svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>);
    case 'play': return (<svg {...common}><path d="M6 5v14l12-7Z"/></svg>);
    case 'pause': return (<svg {...common}><path d="M7 5v14M17 5v14"/></svg>);
    case 'plus': return (<svg {...common}><path d="M12 5v14M5 12h14"/></svg>);
    case 'minus': return (<svg {...common}><path d="M5 12h14"/></svg>);
    case 'bolt': return (<svg {...common}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>);
    case 'brain': return (<svg {...common}><path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.83V11a3 3 0 0 0 1.5 2.6V15a3 3 0 0 0 3 3h.5a2.5 2.5 0 0 0 2.5-2.5V4.5A1.5 1.5 0 0 0 9 3Z"/><path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.83V11a3 3 0 0 1-1.5 2.6V15a3 3 0 0 1-3 3h-.5A2.5 2.5 0 0 1 12.5 15.5V4.5A1.5 1.5 0 0 1 15 3Z"/></svg>);
    case 'workflow': return (<svg {...common}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/></svg>);
    case 'plug': return (<svg {...common}><path d="M9 2v6"/><path d="M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-12 0V8z"/><path d="M12 17v5"/></svg>);
    case 'doc': return (<svg {...common}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/></svg>);
    case 'inbox': return (<svg {...common}><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>);
    case 'eye': return (<svg {...common}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>);
    case 'shield': return (<svg {...common}><path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5z"/></svg>);
    case 'mic': return (<svg {...common}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>);
    case 'cart': return (<svg {...common}><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l3 12h11l2-8H6"/></svg>);
    case 'chart': return (<svg {...common}><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/></svg>);
    case 'cube': return (<svg {...common}><path d="M21 16V8l-9-5-9 5v8l9 5z"/><path d="m3 8 9 5 9-5M12 13v10"/></svg>);
    case 'calendar': return (<svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>);
    case 'phone': return (<svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.19a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92z"/></svg>);
    case 'globe': return (<svg {...common}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>);
    case 'menu': return (<svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>);
    default: return null;
  }
}
