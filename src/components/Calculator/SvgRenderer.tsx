'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { calcWheelGeometry } from '@/utils/wheelMath';

interface SvgRendererProps {
  currentSpecs?: any;
  newSpecs: any;
  highlightedSize?: string;
}

export default function SvgRenderer({ currentSpecs, newSpecs, highlightedSize }: SvgRendererProps) {
  const newMath = calcWheelGeometry(newSpecs);
  let curMath = currentSpecs ? calcWheelGeometry(currentSpecs) : null;
  if (!curMath || isNaN(curMath.totalDiameter)) curMath = newMath;

  const AXLE_Y = 550; 
  const AXLE_X = 500; 
  
  const newCx = AXLE_X;
  const newRimW = newSpecs.rimWidth * 25.4;
  const newRimR = (newSpecs.rimDiameter * 25.4 / 2);
  const newOffset = newSpecs.offset;
  const newH = (newSpecs.width * newSpecs.profile / 100);
  const newXm = newCx + newOffset;
  
  const curCx = AXLE_X;
  const curRimW = currentSpecs ? currentSpecs.rimWidth * 25.4 : newRimW;
  const curRimR = currentSpecs ? (currentSpecs.rimDiameter * 25.4 / 2) : newRimR;
  const curOffset = currentSpecs ? currentSpecs.offset : newOffset;
  const curXm = curCx + curOffset;

  // Exact CAD-style Rim Polygon Match
  const getRimPolygon = (cx: number, cy: number, w: number, r: number, xm: number, s: number) => {
    const xl = cx - w / 2;
    const xr = cx + w / 2;
    const hW = 20; // half width of hub flat mount
    const hR = 50; // height of hub from axle
    const bh = 15; // bead tip height
    const bw = 15; // bead tip width
    const drop = 40; // drop center depth
    const dropW = 40; // drop center width
    const bThickness = 10; // inner thickness of barrel

    return `
      M ${xl} ${cy - s * r}
      L ${xl} ${cy - s * (r + bh)}
      L ${xl + bw} ${cy - s * (r + bh)}
      L ${xl + bw} ${cy - s * r}
      L ${xm - hW} ${cy - s * hR}
      L ${xm + hW} ${cy - s * hR}
      L ${xm + hW} ${cy - s * (r - drop)}
      L ${xr - bw - dropW} ${cy - s * (r - drop)}
      L ${xr - bw} ${cy - s * (r - 10)}
      L ${xr - bw} ${cy - s * (r + bh)}
      L ${xr} ${cy - s * (r + bh)}
      L ${xr} ${cy - s * r}
      L ${xr + 10} ${cy - s * r}
      L ${xr + 10} ${cy - s * (r - 10 - bThickness)}
      L ${xr - bw - dropW + 10} ${cy - s * (r - drop - bThickness)}
      L ${xm + hW + bThickness} ${cy - s * (r - drop - bThickness)}
      L ${xm + hW + bThickness} ${cy - s * (hR - bThickness)}
      L ${xm - hW - 5} ${cy - s * (hR - bThickness)}
      L ${xl + bw + 10} ${cy - s * (r - bThickness)}
      Z
    `;
  };

  const curRimTop = getRimPolygon(curCx, AXLE_Y, curRimW, curRimR, curXm, 1);
  const curRimBot = getRimPolygon(curCx, AXLE_Y, curRimW, curRimR, curXm, -1);
  const newRimTop = getRimPolygon(newCx, AXLE_Y, newRimW, newRimR, newXm, 1);
  const newRimBot = getRimPolygon(newCx, AXLE_Y, newRimW, newRimR, newXm, -1);

  // Exact colors from user's image
  const RIM_FILL = "#e8e8e8";
  const RIM_STROKE = "#666666";
  const BRAKE_FILL = "#e5e5e5";
  const BRAKE_STROKE = "#555555";
  const TEXT_COLOR = "#b23f2b";
  const LINE_COLOR = "#999999";
  const GHOST_STROKE = "#a0a0a0";

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-xl shadow-inner font-sans">
      <svg 
        viewBox="0 0 1014 1100" 
        className="max-h-[85vh] w-auto drop-shadow-sm font-medium"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="arrow-left" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 10 0 L 0 5 L 10 10 z" fill={LINE_COLOR} />
          </marker>
          <marker id="arrow-right" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LINE_COLOR} />
          </marker>
          <marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 10 L 5 0 L 10 10 z" fill={LINE_COLOR} />
          </marker>
          <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 5 10 L 10 0 z" fill={LINE_COLOR} />
          </marker>
        </defs>

        {/* STATIC CENTER ALIGNMENT GUIDELINES */}
        <g id="Guidelines" stroke={LINE_COLOR} strokeWidth="1">
          {/* Vertical dashed center line */}
          <motion.line x1={AXLE_X} x2={AXLE_X} y1="80" y2="1050" strokeDasharray="8 8" />
          {/* Horizontal dashed axle line */}
          <motion.line x1="280" x2="800" y1={AXLE_Y} y2={AXLE_Y} strokeDasharray="8 8" />
          {/* Vertical dashed offset hub line */}
          <motion.line animate={{ x1: newXm, x2: newXm }} y1="180" y2="950" strokeDasharray="4 4" transition={{ type: "spring" }} />
          {/* Rim edges vertical drops */}
          <motion.line animate={{ x1: newCx - newRimW/2, x2: newCx - newRimW/2 }} y1={AXLE_Y + newRimR} y2="850" strokeDasharray="2 4" transition={{ type: "spring" }} />
          <motion.line animate={{ x1: newCx + newRimW/2, x2: newCx + newRimW/2 }} y1={AXLE_Y + newRimR} y2="920" strokeDasharray="2 4" transition={{ type: "spring" }} />
          {/* Extended horizontal base for rim width */}
          <motion.line x1="0" x2="680" y1={AXLE_Y + newRimR + 50} y2={AXLE_Y + newRimR + 50} transition={{ type: "spring" }} />
        </g>

        {/* STATIC BRAKES AND HUB */}
        <g id="Brakes">
          {/* Top Rotor */}
          <rect x={newXm + 30} y={AXLE_Y - 180} width={25} height={130} fill={BRAKE_FILL} stroke={BRAKE_STROKE} strokeWidth="1.5" />
          <line x1={newXm + 42} y1={AXLE_Y - 180} x2={newXm + 42} y2={AXLE_Y - 50} stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Bottom Rotor */}
          <rect x={newXm + 30} y={AXLE_Y + 50} width={25} height={130} fill={BRAKE_FILL} stroke={BRAKE_STROKE} strokeWidth="1.5" />
          <line x1={newXm + 42} y1={AXLE_Y + 50} x2={newXm + 42} y2={AXLE_Y + 180} stroke="#999" strokeWidth="1" strokeDasharray="2 2" />

          {/* Caliper at the Top */}
          <rect x={newXm + 25} y={AXLE_Y - 140} width={55} height={50} fill={RIM_FILL} stroke={BRAKE_STROKE} strokeWidth="1.5" />
          
          {/* Central Axle Spindle */}
          <rect x={newXm + 20} y={AXLE_Y - 30} width={70} height={60} fill={BRAKE_FILL} stroke={BRAKE_STROKE} strokeWidth="1.5" />

          <text x={newXm + 85} y={AXLE_Y - 95} fill={TEXT_COLOR} fontSize="24" fontWeight="800" letterSpacing="0.05em">Brakes</text>
        </g>

        {/* GHOST OE WHEEL */}
        {currentSpecs && (
          <g id="Ghost-Wheel">
            <motion.path animate={{ d: curRimTop }} fill="transparent" stroke={GHOST_STROKE} strokeWidth="2" strokeDasharray="6 6" transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            <motion.path animate={{ d: curRimBot }} fill="transparent" stroke={GHOST_STROKE} strokeWidth="2" strokeDasharray="6 6" transition={{ type: "spring", stiffness: 120, damping: 20 }} />
          </g>
        )}

        {/* NEW CAD WHEEL */}
        <g id="New-Wheel">
          <motion.path animate={{ d: newRimTop }} fill={RIM_FILL} fillOpacity="0.8" stroke={RIM_STROKE} strokeWidth="1.5" strokeLinejoin="miter" transition={{ type: "spring", stiffness: 120, damping: 20 }} />
          <motion.path animate={{ d: newRimBot }} fill={RIM_FILL} fillOpacity="0.8" stroke={RIM_STROKE} strokeWidth="1.5" strokeLinejoin="miter" transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </g>

        {/* DIMENSIONS */}
        <g id="DimensionsText" fill={TEXT_COLOR} fontSize="19" letterSpacing="0.02em">
          
          {/* Overall Wheel Diameter */}
          <text x={120} y={490} textAnchor="middle">
            <tspan x="120" dy="0">Overall</tspan>
            <tspan x="120" dy="24">wheel</tspan>
            <motion.tspan animate={{ y: 550 }} x="120">diameter</motion.tspan>
          </text>
          <motion.line animate={{ y1: AXLE_Y - newRimR - newH, y2: AXLE_Y + newRimR + newH }} x1={120} x2={120} stroke={LINE_COLOR} strokeWidth="1.5" markerStart="url(#arrow-up)" markerEnd="url(#arrow-down)" transition={{ type: "spring" }} />
          <motion.line animate={{ y1: AXLE_Y - newRimR - newH, y2: AXLE_Y - newRimR - newH }} x1={110} x2={AXLE_X} stroke={LINE_COLOR} strokeWidth="1" transition={{ type: "spring" }} />
          <motion.line animate={{ y1: AXLE_Y + newRimR + newH, y2: AXLE_Y + newRimR + newH }} x1={110} x2={AXLE_X} stroke={LINE_COLOR} strokeWidth="1" transition={{ type: "spring" }} />

          {/* Rim Diameter */}
          <text x={260} y={530} textAnchor="middle">
            <tspan x="260" dy="0">Rim</tspan>
            <motion.tspan animate={{ y: 580 }} x="260">diameter</motion.tspan>
          </text>
          <motion.line animate={{ y1: AXLE_Y - newRimR, y2: AXLE_Y + newRimR }} x1={260} x2={260} stroke={LINE_COLOR} strokeWidth="1.5" markerStart="url(#arrow-up)" markerEnd="url(#arrow-down)" transition={{ type: "spring" }} />
          <motion.line animate={{ y1: AXLE_Y - newRimR, y2: AXLE_Y - newRimR }} x1={250} x2={newCx - newRimW/2 + 20} stroke={LINE_COLOR} strokeWidth="1" transition={{ type: "spring" }} />
          <motion.line animate={{ y1: AXLE_Y + newRimR, y2: AXLE_Y + newRimR }} x1={250} x2={newCx - newRimW/2 + 20} stroke={LINE_COLOR} strokeWidth="1" transition={{ type: "spring" }} />

          {/* Backspace & Offset right cluster */}
          <motion.line animate={{ x1: Math.min(newXm, newCx + newRimW/2), x2: Math.max(newXm, newCx + newRimW/2), y1: 750, y2: 750 }} stroke={LINE_COLOR} strokeWidth="1.5" markerStart="url(#arrow-left)" markerEnd="url(#arrow-right)" transition={{ type: "spring" }} />
          <motion.line animate={{ x1: Math.max(newXm, newCx + newRimW/2), x2: 670, y1: 750, y2: 750 }} stroke={LINE_COLOR} strokeWidth="1" transition={{ type: "spring" }} />
          <motion.text animate={{ x: 680, y: 755 }} transition={{ type: "spring" }}>Backspace {Math.round(newMath.backspace)} mm</motion.text>

          <motion.line animate={{ x1: Math.min(newCx, newXm), x2: Math.max(newCx, newXm), y1: 800, y2: 800 }} stroke={LINE_COLOR} strokeWidth="1.5" markerStart="url(#arrow-left)" markerEnd="url(#arrow-right)" transition={{ type: "spring" }} />
          <motion.line animate={{ x1: Math.max(newCx, newXm), x2: 660, y1: 800, y2: 800 }} stroke={LINE_COLOR} strokeWidth="1" transition={{ type: "spring" }} />
          <motion.text animate={{ x: 670, y: 805 }} transition={{ type: "spring" }}>Offset {newSpecs.offset} mm</motion.text>

          {/* Rim Width far right grouping */}
          <motion.line animate={{ x1: newCx - newRimW/2, x2: newCx + newRimW/2, y1: 860, y2: 860 }} stroke={LINE_COLOR} strokeWidth="1.5" markerStart="url(#arrow-left)" markerEnd="url(#arrow-right)" transition={{ type: "spring" }} />
          <motion.line animate={{ x1: newCx + newRimW/2, x2: 840, y1: 860, y2: 860 }} stroke="#bbb" strokeWidth="1" strokeDasharray="3 4" transition={{ type: "spring" }} />
          <motion.text animate={{ x: 860, y: 760 }} textAnchor="middle" transition={{ type: "spring" }}>
            <tspan x="860" dy="0">Rim width</tspan>
            <tspan x="860" dy="25">{Math.round(newRimW)} mm</tspan>
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
