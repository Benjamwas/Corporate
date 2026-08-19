import React from 'react';

/**
 * Signature ambient layer: translucent green, blue and earth atmospheric bands
 * drifting slowly behind the page content.
 */
export function AtmosphereBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="absolute inset-0 bg-canvas" />
      <div
        className="atmosphere-layer atm-a absolute -left-[15%] -top-[20%] h-[65vh] w-[70vw] rounded-full"
        style={{ background: 'var(--atm-1)' }} />
      
      <div
        className="atmosphere-layer atm-b absolute -right-[18%] top-[18%] h-[70vh] w-[65vw] rounded-full"
        style={{ background: 'var(--atm-2)' }} />
      
      <div
        className="atmosphere-layer atm-c absolute bottom-[-18%] left-[10%] h-[55vh] w-[60vw] rounded-full"
        style={{ background: 'var(--atm-3)' }} />
      
    </div>);

}