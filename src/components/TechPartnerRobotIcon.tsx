import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  X, 
  Sparkles,
  Bot,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { playSound } from '../utils/audio';
import {
  easeBackIn,
  easeBackOut,
  easeBackInOut,
  easeElasticOut,
  easeCubicIn,
  easeCubicOut,
  easeCubicInOut,
  easeQuadIn,
  easeQuadOut,
  easeBounceOut,
} from 'd3-ease';

export function TechPartnerRobotIcon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const positionWrapperRef = useRef<HTMLDivElement>(null);
  const [showHiBubble, setShowHiBubble] = useState<boolean>(false);
  const [isFlying, setIsFlying] = useState<boolean>(false);
  const [showSystemsModal, setShowSystemsModal] = useState<boolean>(false);
  const lastShowHiRef = useRef<boolean>(false);
  const lastIsFlyingRef = useRef<boolean>(false);

  // Single Persistent Three.js 3D WebGL Canvas Scene Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    const wrapper = positionWrapperRef.current;
    if (!container || !wrapper) return;

    // --- 1. SCENE & CAMERA SETUP ---
    const scene = new THREE.Scene();
    const width = 220;
    const height = 160;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.20, 6.4);
    camera.lookAt(0, 1.15, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 2, 3));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // --- 2. MULTI-ANGLE STUDIO LIGHTING RIG ---
    // Key Light (Crisp Neutral White Directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
    keyLight.position.set(3.5, 6, 4.5);
    scene.add(keyLight);

    // Fill Light (Soft White Studio Fill)
    const fillLight = new THREE.DirectionalLight(0xf8fafc, 2.2);
    fillLight.position.set(-4.5, 3.5, 3.5);
    scene.add(fillLight);

    // Rim Light (Warm Golden-White Studio Backlight Rim)
    const rimLight = new THREE.DirectionalLight(0xfef08a, 3.2);
    rimLight.position.set(0, 4, -4.5);
    scene.add(rimLight);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.2);
    scene.add(ambientLight);

    // --- 3. PREMIUM 3D MATERIALS & PHYSICAL SHADERS (EXACT IMAGE PARITY) ---
    // Silky Pearlescent Ceramic White Shell (Smooth Porcelain Finish with Clearcoat Gloss)
    const armorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    });

    // Satin Soft-White Ceramic Accent Panels
    const satinArmorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.16,
      metalness: 0.04,
      clearcoat: 0.8,
    });

    // Satin Dark Slate Mechanics (Dark Charcoal Black for Biceps, Neck, Inner Joints & Hands)
    const slateJointMaterial = new THREE.MeshStandardMaterial({
      color: 0x181e28,
      roughness: 0.28,
      metalness: 0.55,
    });

    // High-Gloss Jet Black Polycarbonate
    const blackGlossMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      roughness: 0.03,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    // Dark Titanium Core Accents
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.20,
      metalness: 0.90,
    });

    // Polished Liquid Chrome Micro-Joints & Trim
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.04,
      metalness: 0.98,
    });

    // High-Gloss Curved Obsidian Visor Glass (Deep Black Reflective Screen)
    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06080d,
      roughness: 0.02,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    // Radiant Glowing Electric Cyan (Antennas, Visor Light Beam, Chest Contour & Core)
    const cyanGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
    });
    // Compatibility alias
    const greenGlowMaterial = cyanGlowMaterial;

    // Helper to generate a soft optical bloom radial gradient canvas texture
    const createSoftBloomTexture = (centerColor: string, midColor: string, edgeColor: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, centerColor);
      grad.addColorStop(0.32, midColor);
      grad.addColorStop(0.68, edgeColor);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(canvas);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      return tex;
    };

    const eyeBloomTexture = createSoftBloomTexture(
      'rgba(254, 240, 138, 0.85)',
      'rgba(245, 158, 11, 0.40)',
      'rgba(217, 119, 6, 0.10)'
    );

    const smileBloomTexture = createSoftBloomTexture(
      'rgba(254, 240, 138, 0.75)',
      'rgba(245, 158, 11, 0.32)',
      'rgba(217, 119, 6, 0.08)'
    );

    // MWI Warm Amber-Gold Eye Lighting (Signature Glowing LED Ring Eyes from MWI Reference Image)
    // Refined with soft, professional OLED luminescence
    const amberEyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Warm golden amber glow
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const amberDotMaterial = new THREE.MeshBasicMaterial({
      color: 0xfde68a, // Soft warm cream-gold for micro-LED matrix dots
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const amberEyeCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffedd5, // Incandescent soft warm highlight
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const eyeBloomMaterial = new THREE.MeshBasicMaterial({
      map: eyeBloomTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Soft, professional glowing smile materials
    const amberSmileMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const amberSmileBloomMaterial = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const smileBloomPlateMaterial = new THREE.MeshBasicMaterial({
      map: smileBloomTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Satin Titanium Slate Material for MWI Top Crown Inlay & Chest Shield Panel
    const darkPlateMaterial = new THREE.MeshStandardMaterial({
      color: 0x475569, // Refined gunmetal slate
      roughness: 0.35,
      metalness: 0.65,
    });

    // Polished Warm Bronze/Gold Trim Material for Ear Pod Headphone Rings (from MWI image)
    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xc29543, // Warm metallic brass/gold
      roughness: 0.22,
      metalness: 0.88,
    });

    // Intense White-Hot Core for Neon Antenna Bulbs and Visor Beam
    const cyanCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xe0fbfc,
    });

    // Deep Cyan for Secondary Accents
    const deepGreenMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
    });

    // Pure Glowing Cyan (Status Rings & Telemetry)
    const emeraldGlowMaterial = cyanGlowMaterial;

    // Eye Specular Highlight Material (Pure Crisp White Catchlight)
    const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Cute Soft Blush Material (Glowing Peach/Pink)
    const pinkBlushMaterial = new THREE.MeshBasicMaterial({
      color: 0xfb7185,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    // Emissive Cyan Material for Dynamic Pulse
    const greenEmissiveMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x00d2f0,
      emissiveIntensity: 4.8,
      roughness: 0.06,
    });

    // High-Energy Incandescent Rocket Fire Materials (Blazing Orange, Vivid Gold, White-Hot Plasma)
    const fireOuterMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff2600,
      emissiveIntensity: 5.2,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const fireMidMaterial = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff8800,
      emissiveIntensity: 6.2,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const fireCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    });

    const fireRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xffe28a,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const flameCoreMaterial = fireCoreMaterial;
    const flameInnerMaterial = fireMidMaterial;
    const flameOuterMaterial = fireOuterMaterial;

    // Aerodynamic Air Glow & Speed Streamline Material
    const aeroTrailMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // --- 4. 3D ROBOT GEOMETRY HIERARCHY (EXACT MATCH WITH REFERENCE IMAGE) ---
    const robotRoot = new THREE.Group();
    robotRoot.scale.set(0.74, 0.74, 0.74);
    scene.add(robotRoot);

    const bobGroup = new THREE.Group();
    robotRoot.add(bobGroup);

    // ==================== A. TORSO & CHASSIS (SLEEK SCULPTED CARAPACE) ====================
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 1.38, 0);
    bobGroup.add(torsoGroup);

    // 1. Ultra-Smooth Silky White Torso Carapace (Capsule Geometry with gentle aesthetic curves)
    const chestGeom = new THREE.CapsuleGeometry(0.40, 0.44, 28, 44);
    const chestMesh = new THREE.Mesh(chestGeom, armorMaterial);
    chestMesh.scale.set(1.02, 1.04, 0.90);
    torsoGroup.add(chestMesh);

    // 2. Smooth Floating Collar Ring
    const collarGeom = new THREE.TorusGeometry(0.28, 0.024, 16, 36);
    const collar = new THREE.Mesh(collarGeom, chromeMaterial);
    collar.position.set(0, 0.32, 0);
    collar.rotation.x = Math.PI / 2;
    torsoGroup.add(collar);

    const collarHalo = new THREE.Mesh(
      new THREE.TorusGeometry(0.275, 0.012, 12, 32),
      cyanGlowMaterial
    );
    collarHalo.position.set(0, 0.32, 0);
    collarHalo.rotation.x = Math.PI / 2;
    torsoGroup.add(collarHalo);

    // 3. MWI Rounded Titanium Shield Chest Plate (Exact match from reference image)
    const chestPlateGroup = new THREE.Group();
    chestPlateGroup.position.set(0, 0.08, 0.385);
    torsoGroup.add(chestPlateGroup);

    // Outer Beveled Base
    const chestPlateBezel = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.128, 0.165, 18, 24),
      slateJointMaterial
    );
    chestPlateBezel.scale.set(1.18, 1.10, 0.25);
    chestPlateBezel.rotation.x = 0.09;
    chestPlateGroup.add(chestPlateBezel);

    // Vertical Rounded Shield Panel in Satin Titanium Slate (MWI signature)
    const chestPlate = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.122, 0.158, 18, 24),
      darkPlateMaterial
    );
    chestPlate.scale.set(1.15, 1.08, 0.28);
    chestPlate.position.set(0, 0, 0.012);
    chestPlate.rotation.x = 0.09;
    chestPlateGroup.add(chestPlate);

    // Circular Button / Sensor Pip in Lower Half of Chest Plate
    const chestPip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.030, 0.016, 24),
      chromeMaterial
    );
    chestPip.position.set(0, -0.050, 0.048);
    chestPip.rotation.x = Math.PI / 2 + 0.09;
    chestPlateGroup.add(chestPip);

    const chestPipCenter = new THREE.Mesh(
      new THREE.SphereGeometry(0.014, 14, 14),
      slateJointMaterial
    );
    chestPipCenter.position.set(0, -0.050, 0.056);
    chestPlateGroup.add(chestPipCenter);

    // 5. Streamlined Back Aero-Thruster Pack (Clean, Integrated, Agile Silhouette)
    const backPackGroup = new THREE.Group();
    backPackGroup.position.set(0, 0.06, -0.36);
    torsoGroup.add(backPackGroup);

    const backPackBody = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.20, 0.28, 18, 24),
      satinArmorMaterial
    );
    backPackBody.scale.set(1.2, 1.0, 0.65);
    backPackGroup.add(backPackBody);

    // Dual Vertical Amber Status Trim on Back
    const leftFinGlow = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.010, 0.16, 8, 12),
      amberEyeGlowMaterial
    );
    leftFinGlow.position.set(-0.14, 0, -0.09);
    backPackGroup.add(leftFinGlow);

    const rightFinGlow = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.010, 0.16, 8, 12),
      amberEyeGlowMaterial
    );
    rightFinGlow.position.set(0.14, 0, -0.09);
    backPackGroup.add(rightFinGlow);

    // ==================== JETPACK ROCKET FIRE MACHINE (BOTTOM OF BACKPACK) ====================
    const fireMachineGroup = new THREE.Group();
    fireMachineGroup.position.set(0, -0.26, -0.02);
    backPackGroup.add(fireMachineGroup);

    // Dark Titanium Thruster Manifold Base & Heat Shield
    const thrusterBaseGeom = new THREE.BoxGeometry(0.36, 0.07, 0.16);
    const thrusterBase = new THREE.Mesh(thrusterBaseGeom, titaniumMaterial);
    fireMachineGroup.add(thrusterBase);

    // Chrome Heat-Dissipation Grid
    const heatGridGeom = new THREE.BoxGeometry(0.30, 0.02, 0.12);
    const heatGrid = new THREE.Mesh(heatGridGeom, chromeMaterial);
    heatGrid.position.set(0, 0.04, 0);
    fireMachineGroup.add(heatGrid);

    // Twin High-Output Rocket Engine Nozzle Bells (Left and Right)
    const nozzleBellGeom = new THREE.CylinderGeometry(0.048, 0.075, 0.11, 24, 1, true);
    const nozzleLipGeom = new THREE.TorusGeometry(0.075, 0.008, 12, 24);
    const chamberDiskGeom = new THREE.CircleGeometry(0.046, 20);

    // Left Engine Nozzle
    const leftNozzleGroup = new THREE.Group();
    leftNozzleGroup.position.set(-0.11, -0.04, 0);
    leftNozzleGroup.rotation.x = 0.10;
    fireMachineGroup.add(leftNozzleGroup);

    const leftBell = new THREE.Mesh(nozzleBellGeom, titaniumMaterial);
    leftBell.rotation.x = Math.PI;
    leftNozzleGroup.add(leftBell);

    const leftLip = new THREE.Mesh(nozzleLipGeom, chromeMaterial);
    leftLip.position.set(0, -0.055, 0);
    leftLip.rotation.x = Math.PI / 2;
    leftNozzleGroup.add(leftLip);

    const leftChamber = new THREE.Mesh(chamberDiskGeom, fireMidMaterial);
    leftChamber.position.set(0, 0.045, 0);
    leftChamber.rotation.x = Math.PI / 2;
    leftNozzleGroup.add(leftChamber);

    // Right Engine Nozzle
    const rightNozzleGroup = new THREE.Group();
    rightNozzleGroup.position.set(0.11, -0.04, 0);
    rightNozzleGroup.rotation.x = 0.10;
    fireMachineGroup.add(rightNozzleGroup);

    const rightBell = new THREE.Mesh(nozzleBellGeom, titaniumMaterial);
    rightBell.rotation.x = Math.PI;
    rightNozzleGroup.add(rightBell);

    const rightLip = new THREE.Mesh(nozzleLipGeom, chromeMaterial);
    rightLip.position.set(0, -0.055, 0);
    rightLip.rotation.x = Math.PI / 2;
    rightNozzleGroup.add(rightLip);

    const rightChamber = new THREE.Mesh(chamberDiskGeom, fireMidMaterial);
    rightChamber.position.set(0, 0.045, 0);
    rightChamber.rotation.x = Math.PI / 2;
    rightNozzleGroup.add(rightChamber);

    // Dynamic Rocket Fire Plumes Container
    const jetpackFlamesGroup = new THREE.Group();
    fireMachineGroup.add(jetpackFlamesGroup);

    const createPlumeMesh = (parentGroup: THREE.Group, xOffset: number) => {
      const plumeGroup = new THREE.Group();
      plumeGroup.position.set(xOffset, -0.06, 0);
      plumeGroup.rotation.x = 0.10;
      parentGroup.add(plumeGroup);

      // Outer blazing orange/red flame cone
      const outerPlumeGeom = new THREE.ConeGeometry(0.125, 0.72, 20, 1, true);
      const outerPlume = new THREE.Mesh(outerPlumeGeom, fireOuterMaterial);
      outerPlume.position.set(0, -0.36, 0);
      outerPlume.rotation.x = Math.PI;
      plumeGroup.add(outerPlume);

      // Mid intense golden flame cone
      const midPlumeGeom = new THREE.ConeGeometry(0.088, 0.50, 18, 1, true);
      const midPlume = new THREE.Mesh(midPlumeGeom, fireMidMaterial);
      midPlume.position.set(0, -0.25, 0);
      midPlume.rotation.x = Math.PI;
      plumeGroup.add(midPlume);

      // Inner white-hot plasma core
      const corePlumeGeom = new THREE.ConeGeometry(0.046, 0.30, 16);
      const corePlume = new THREE.Mesh(corePlumeGeom, fireCoreMaterial);
      corePlume.position.set(0, -0.15, 0);
      corePlume.rotation.x = Math.PI;
      plumeGroup.add(corePlume);

      // Supersonic Mach shock diamond rings
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.007, 10, 20), fireRingMaterial);
      ring1.position.set(0, -0.16, 0);
      ring1.rotation.x = Math.PI / 2;
      plumeGroup.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.038, 0.006, 10, 20), fireRingMaterial);
      ring2.position.set(0, -0.32, 0);
      ring2.rotation.x = Math.PI / 2;
      plumeGroup.add(ring2);

      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.005, 10, 20), fireRingMaterial);
      ring3.position.set(0, -0.48, 0);
      ring3.rotation.x = Math.PI / 2;
      plumeGroup.add(ring3);

      return { plumeGroup, outerPlume, midPlume, corePlume, ring1, ring2, ring3 };
    };

    const leftJetPlume = createPlumeMesh(jetpackFlamesGroup, -0.11);
    const rightJetPlume = createPlumeMesh(jetpackFlamesGroup, 0.11);

    jetpackFlamesGroup.scale.set(0, 0, 0);
    jetpackFlamesGroup.visible = false;

    // 6. Seamless Magnetic Waist Joint
    const waistGeom = new THREE.CylinderGeometry(0.32, 0.28, 0.16, 36);
    const waistMesh = new THREE.Mesh(waistGeom, slateJointMaterial);
    waistMesh.position.set(0, -0.22, 0);
    torsoGroup.add(waistMesh);

    // 7. Smooth Rounded Pelvis
    const pelvisGeom = new THREE.CylinderGeometry(0.30, 0.24, 0.18, 32);
    const pelvis = new THREE.Mesh(pelvisGeom, armorMaterial);
    pelvis.position.set(0, -0.36, 0);
    torsoGroup.add(pelvis);

    // ==================== B. ROBOT HEAD, DUAL ANTENNAS, EAR PODS & VISOR ====================
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.54, 0);
    torsoGroup.add(headPivot);

    // Dark Magnetic Neck Cylinder (Exact from image)
    const neckPiston = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.16, 0.12, 32),
      slateJointMaterial
    );
    neckPiston.position.set(0, 0.05, 0);
    headPivot.add(neckPiston);

    const neckRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.155, 0.014, 16, 32),
      chromeMaterial
    );
    neckRing.position.set(0, 0.06, 0);
    neckRing.rotation.x = Math.PI / 2;
    headPivot.add(neckRing);

    // 1. Silky Smooth Porcelain White Helmet Dome (Chubby, lovable companion proportions)
    const helmetGeom = new THREE.SphereGeometry(0.55, 64, 48);
    const helmet = new THREE.Mesh(helmetGeom, armorMaterial);
    helmet.position.set(0, 0.44, 0);
    helmet.scale.set(1.10, 1.02, 1.02);
    headPivot.add(helmet);

    // 2. MWI Signature Recessed Satin Titanium Crown Plate (Top of head from reference image)
    const crownPlate = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.12, 0.28, 16, 24),
      darkPlateMaterial
    );
    crownPlate.position.set(0, 0.95, -0.015);
    crownPlate.rotation.x = Math.PI / 2;
    crownPlate.rotation.z = Math.PI / 2;
    crownPlate.scale.set(1.0, 0.36, 1.0);
    headPivot.add(crownPlate);

    // 3. MWI Forehead Optical Sensor / Camera Pip (Centered directly above visor)
    const foreheadSensorBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.024, 0.014, 20),
      slateJointMaterial
    );
    foreheadSensorBezel.position.set(0, 0.77, 0.435);
    foreheadSensorBezel.rotation.x = -0.34;
    headPivot.add(foreheadSensorBezel);

    const foreheadSensorLens = new THREE.Mesh(
      new THREE.SphereGeometry(0.015, 14, 14),
      blackGlossMaterial
    );
    foreheadSensorLens.position.set(0, 0.77, 0.440);
    headPivot.add(foreheadSensorLens);

    const foreheadSensorCatch = new THREE.Mesh(
      new THREE.SphereGeometry(0.005, 8, 8),
      eyeHighlightMaterial
    );
    foreheadSensorCatch.position.set(0.004, 0.774, 0.446);
    headPivot.add(foreheadSensorCatch);

    // 4. MWI CIRCULAR HI-FI EAR PODS WITH WARM BRONZE-GOLD ACCENT RINGS
    const earPodGeom = new THREE.CylinderGeometry(0.185, 0.185, 0.055, 32);
    const earGoldRingGeom = new THREE.TorusGeometry(0.138, 0.014, 16, 32);
    const earInnerDiscGeom = new THREE.CylinderGeometry(0.130, 0.130, 0.012, 32);
    const earCenterHubGeom = new THREE.SphereGeometry(0.038, 16, 16);

    // Left Ear Pod
    const leftEar = new THREE.Mesh(earPodGeom, armorMaterial);
    leftEar.position.set(-0.56, 0.44, 0);
    leftEar.rotation.z = Math.PI / 2;
    headPivot.add(leftEar);

    const leftEarGoldRing = new THREE.Mesh(earGoldRingGeom, goldTrimMaterial);
    leftEarGoldRing.position.set(-0.585, 0.44, 0);
    leftEarGoldRing.rotation.y = Math.PI / 2;
    headPivot.add(leftEarGoldRing);

    const leftEarInnerDisc = new THREE.Mesh(earInnerDiscGeom, darkPlateMaterial);
    leftEarInnerDisc.position.set(-0.588, 0.44, 0);
    leftEarInnerDisc.rotation.z = Math.PI / 2;
    headPivot.add(leftEarInnerDisc);

    const leftEarHub = new THREE.Mesh(earCenterHubGeom, chromeMaterial);
    leftEarHub.position.set(-0.596, 0.44, 0);
    leftEarHub.scale.set(0.35, 1.0, 1.0);
    headPivot.add(leftEarHub);

    // Right Ear Pod
    const rightEar = new THREE.Mesh(earPodGeom, armorMaterial);
    rightEar.position.set(0.56, 0.44, 0);
    rightEar.rotation.z = Math.PI / 2;
    headPivot.add(rightEar);

    const rightEarGoldRing = new THREE.Mesh(earGoldRingGeom, goldTrimMaterial);
    rightEarGoldRing.position.set(0.585, 0.44, 0);
    rightEarGoldRing.rotation.y = Math.PI / 2;
    headPivot.add(rightEarGoldRing);

    const rightEarInnerDisc = new THREE.Mesh(earInnerDiscGeom, darkPlateMaterial);
    rightEarInnerDisc.position.set(0.588, 0.44, 0);
    rightEarInnerDisc.rotation.z = Math.PI / 2;
    headPivot.add(rightEarInnerDisc);

    const rightEarHub = new THREE.Mesh(earCenterHubGeom, chromeMaterial);
    rightEarHub.position.set(0.596, 0.44, 0);
    rightEarHub.scale.set(0.35, 1.0, 1.0);
    headPivot.add(rightEarHub);

    // 5. MWI HIGH-RESOLUTION CURVED OBSIDIAN GLASS SCREEN & PRECISION BEZEL GASKET
    // High-resolution parametric squircle boundary ensuring an ultra-smooth, mathematically exact perimeter
    const generateRoundedRectPerimeter = (
      width: number,
      height: number,
      cornerRadius: number,
      cornerSegments = 24,
      edgeSegments = 16
    ) => {
      const points: { x: number; y: number }[] = [];
      const halfW = width / 2;
      const halfH = height / 2;
      const xIn = halfW - cornerRadius;
      const yIn = halfH - cornerRadius;

      // 1. Top-Right corner (angle 0 -> PI/2)
      for (let i = 0; i < cornerSegments; i++) {
        const theta = (i / cornerSegments) * (Math.PI / 2);
        points.push({
          x: xIn + Math.cos(theta) * cornerRadius,
          y: yIn + Math.sin(theta) * cornerRadius,
        });
      }

      // 2. Top Edge (x: xIn -> -xIn)
      for (let i = 0; i < edgeSegments; i++) {
        const t = i / edgeSegments;
        points.push({
          x: THREE.MathUtils.lerp(xIn, -xIn, t),
          y: yIn + cornerRadius,
        });
      }

      // 3. Top-Left corner (angle PI/2 -> PI)
      for (let i = 0; i < cornerSegments; i++) {
        const theta = Math.PI / 2 + (i / cornerSegments) * (Math.PI / 2);
        points.push({
          x: -xIn + Math.cos(theta) * cornerRadius,
          y: yIn + Math.sin(theta) * cornerRadius,
        });
      }

      // 4. Left Edge (y: yIn -> -yIn)
      for (let i = 0; i < edgeSegments; i++) {
        const t = i / edgeSegments;
        points.push({
          x: -xIn - cornerRadius,
          y: THREE.MathUtils.lerp(yIn, -yIn, t),
        });
      }

      // 5. Bottom-Left corner (angle PI -> 3*PI/2)
      for (let i = 0; i < cornerSegments; i++) {
        const theta = Math.PI + (i / cornerSegments) * (Math.PI / 2);
        points.push({
          x: -xIn + Math.cos(theta) * cornerRadius,
          y: -yIn + Math.sin(theta) * cornerRadius,
        });
      }

      // 6. Bottom Edge (x: -xIn -> xIn)
      for (let i = 0; i < edgeSegments; i++) {
        const t = i / edgeSegments;
        points.push({
          x: THREE.MathUtils.lerp(-xIn, xIn, t),
          y: -yIn - cornerRadius,
        });
      }

      // 7. Bottom-Right corner (angle 3*PI/2 -> 2*PI)
      for (let i = 0; i < cornerSegments; i++) {
        const theta = (3 * Math.PI) / 2 + (i / cornerSegments) * (Math.PI / 2);
        points.push({
          x: xIn + Math.cos(theta) * cornerRadius,
          y: -yIn + Math.sin(theta) * cornerRadius,
        });
      }

      // 8. Right Edge (y: -yIn -> yIn)
      for (let i = 0; i < edgeSegments; i++) {
        const t = i / edgeSegments;
        points.push({
          x: xIn + cornerRadius,
          y: THREE.MathUtils.lerp(-yIn, yIn, t),
        });
      }

      return points;
    };

    // Ellipsoid radii matching the helmet at headPivot (0, 0.44, 0)
    const rx = 0.605;
    const ry = 0.561;
    const rz = 0.561;

    const projectToHelmetSurface = (x: number, y: number, offsetZ: number) => {
      const normX = x / rx;
      const normY = (0.02 + y) / ry;
      const radSq = Math.max(0, 1 - normX * normX - normY * normY);
      const z = Math.sqrt(radSq) * rz + offsetZ;
      return { x, y: 0.46 + y, z };
    };

    // Ultra-high-resolution concentric-ring curved visor screen
    const createCurvedScreenGeometry = (
      perimeter: { x: number; y: number }[],
      offsetZ: number,
      numRings = 22
    ) => {
      const positions: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];
      const N = perimeter.length;

      // Center vertex (r = 0)
      const centerPt = projectToHelmetSurface(0, 0, offsetZ);
      positions.push(centerPt.x, centerPt.y, centerPt.z);
      uvs.push(0.5, 0.5);

      // Rings 1 to numRings
      for (let r = 1; r <= numRings; r++) {
        const frac = r / numRings;
        for (let i = 0; i < N; i++) {
          const px = perimeter[i].x * frac;
          const py = perimeter[i].y * frac;
          const pt = projectToHelmetSurface(px, py, offsetZ);
          positions.push(pt.x, pt.y, pt.z);
          uvs.push(px / 0.70 + 0.5, py / 0.36 + 0.5);
        }
      }

      // Triangles connecting center to ring 1
      for (let i = 0; i < N; i++) {
        const nextI = (i + 1) % N;
        indices.push(0, 1 + i, 1 + nextI);
      }

      // Triangles between consecutive concentric rings
      for (let r = 1; r < numRings; r++) {
        const ringStartCurr = 1 + (r - 1) * N;
        const ringStartNext = 1 + r * N;
        for (let i = 0; i < N; i++) {
          const nextI = (i + 1) % N;
          const c0 = ringStartCurr + i;
          const c1 = ringStartCurr + nextI;
          const n0 = ringStartNext + i;
          const n1 = ringStartNext + nextI;
          indices.push(c0, n0, c1);
          indices.push(c1, n0, n1);
        }
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geom.setIndex(indices);
      geom.computeVertexNormals();
      return geom;
    };

    // Chamfered bezel rim creating a razor-sharp, physical CNC split between white helmet & black glass
    const createCurvedBezelRimGeometry = (
      outerPerimeter: { x: number; y: number }[],
      innerPerimeter: { x: number; y: number }[],
      outerOffsetZ: number,
      innerOffsetZ: number
    ) => {
      const positions: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];
      const N = outerPerimeter.length;

      // Vertices 0 .. N-1: Outer boundary on the white helmet surface
      for (let i = 0; i < N; i++) {
        const pt = projectToHelmetSurface(outerPerimeter[i].x, outerPerimeter[i].y, outerOffsetZ);
        positions.push(pt.x, pt.y, pt.z);
        uvs.push(outerPerimeter[i].x / 0.76 + 0.5, outerPerimeter[i].y / 0.42 + 0.5);
      }

      // Vertices N .. 2N-1: Inner boundary at the recessed visor screen bed
      for (let i = 0; i < N; i++) {
        const pt = projectToHelmetSurface(innerPerimeter[i].x, innerPerimeter[i].y, innerOffsetZ);
        positions.push(pt.x, pt.y, pt.z);
        uvs.push(innerPerimeter[i].x / 0.70 + 0.5, innerPerimeter[i].y / 0.36 + 0.5);
      }

      // Chamfer quads connecting outer to inner rim
      for (let i = 0; i < N; i++) {
        const nextI = (i + 1) % N;
        const o0 = i;
        const o1 = nextI;
        const in0 = N + i;
        const in1 = N + nextI;
        indices.push(o0, in0, o1);
        indices.push(o1, in0, in1);
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geom.setIndex(indices);
      geom.computeVertexNormals();
      return geom;
    };

    // Perimeters: 160 analytical points per loop
    const outerBezelLoop = generateRoundedRectPerimeter(0.730, 0.395, 0.150, 24, 16);
    const innerBezelLoop = generateRoundedRectPerimeter(0.686, 0.352, 0.130, 24, 16);
    const visorScreenLoop = generateRoundedRectPerimeter(0.684, 0.350, 0.128, 24, 16);
    const cavityBackingLoop = generateRoundedRectPerimeter(0.690, 0.356, 0.132, 24, 16);

    // 1. Deep Obsidian Cavity Backing (Completely seals off white helmet inside face aperture)
    const cavityBackingGeom = createCurvedScreenGeometry(cavityBackingLoop, 0.002, 16);
    const cavityBacking = new THREE.Mesh(cavityBackingGeom, blackGlossMaterial);
    headPivot.add(cavityBacking);

    // 2. High-Precision Recessed Dark Slate / Titanium Bezel Rim (Physical split gasket)
    const visorBezelGeom = createCurvedBezelRimGeometry(outerBezelLoop, innerBezelLoop, 0.007, 0.003);
    const visorBezel = new THREE.Mesh(visorBezelGeom, slateJointMaterial);
    headPivot.add(visorBezel);

    // 3. Seamless High-Gloss Obsidian Glass Visor Screen
    const visorScreenGeom = createCurvedScreenGeometry(visorScreenLoop, 0.008, 24);
    const visorScreen = new THREE.Mesh(visorScreenGeom, blackGlossMaterial);
    headPivot.add(visorScreen);

    // 6. MWI SIGNATURE WARM AMBER LED RING EYES (Expression Engine with Soft Professional Glow)
    // visorBeamGroup acts as parent container so existing animation references remain completely valid
    const visorBeamGroup = new THREE.Group();
    visorBeamGroup.position.set(0, 0.46, 0);
    headPivot.add(visorBeamGroup);

    // Left Eye Group (positioned at left eye center on curved visor screen)
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.19, 0, 0.540);
    leftEyeGroup.rotation.y = -0.32;
    visorBeamGroup.add(leftEyeGroup);

    // Right Eye Group (positioned at right eye center on curved visor screen)
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.19, 0, 0.540);
    rightEyeGroup.rotation.y = 0.32;
    visorBeamGroup.add(rightEyeGroup);

    // Helper to populate the iconic MWI warm amber dotted LED ring eye with soft optical glow
    const createMwiRingEye = (eyeParent: THREE.Group) => {
      // 0. Soft Optical Bloom Halo Plane (Gentle atmospheric glow behind the eye)
      const eyeBloomPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.30, 0.30),
        eyeBloomMaterial
      );
      eyeBloomPlane.position.set(0, 0, 0.001);
      eyeParent.add(eyeBloomPlane);

      // 1. Base Luminous Amber-Gold Halo Rings
      const outerHalo = new THREE.Mesh(
        new THREE.TorusGeometry(0.095, 0.011, 20, 44),
        amberEyeGlowMaterial
      );
      outerHalo.position.set(0, 0, 0.003);
      eyeParent.add(outerHalo);

      const innerHalo = new THREE.Mesh(
        new THREE.TorusGeometry(0.070, 0.008, 18, 36),
        amberEyeGlowMaterial
      );
      innerHalo.position.set(0, 0, 0.003);
      eyeParent.add(innerHalo);

      // 2. Crisp Micro-LED Dot Ring Matrix (Concentric warm cream-gold pixel dots)
      const dotGeom = new THREE.SphereGeometry(0.0085, 10, 10);
      const innerDotGeom = new THREE.SphereGeometry(0.0068, 10, 10);

      // Outer ring of 22 glowing amber micro-dots
      const outerDotCount = 22;
      for (let i = 0; i < outerDotCount; i++) {
        const angle = (i / outerDotCount) * Math.PI * 2;
        const dot = new THREE.Mesh(dotGeom, amberDotMaterial);
        dot.position.set(Math.cos(angle) * 0.095, Math.sin(angle) * 0.095, 0.006);
        eyeParent.add(dot);
      }

      // Inner ring of 16 glowing amber micro-dots
      const innerDotCount = 16;
      for (let i = 0; i < innerDotCount; i++) {
        const angle = (i / innerDotCount) * Math.PI * 2;
        const dot = new THREE.Mesh(innerDotGeom, amberDotMaterial);
        dot.position.set(Math.cos(angle) * 0.070, Math.sin(angle) * 0.070, 0.006);
        eyeParent.add(dot);
      }

      // 3. Lively Crisp White Specular Catchlight Sparkles (Pupil Highlights)
      const primarySparkle = new THREE.Mesh(
        new THREE.SphereGeometry(0.019, 14, 14),
        eyeHighlightMaterial
      );
      primarySparkle.position.set(0.035, 0.035, 0.009);
      eyeParent.add(primarySparkle);

      const secondarySparkle = new THREE.Mesh(
        new THREE.SphereGeometry(0.009, 10, 10),
        amberEyeCoreMaterial
      );
      secondarySparkle.position.set(-0.030, -0.026, 0.008);
      eyeParent.add(secondarySparkle);
    };

    createMwiRingEye(leftEyeGroup);
    createMwiRingEye(rightEyeGroup);

    // 7. MWI CUTE EMISSIVE SMILING MOUTH (Luminous OLED Smile on Visor Screen with Soft Glow)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, 0.33, 0.552);
    mouthGroup.rotation.x = -0.22;
    headPivot.add(mouthGroup);

    // Soft Optical Bloom Plane for Smile
    const smileBloomPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(0.18, 0.10),
      smileBloomPlateMaterial
    );
    smileBloomPlate.position.set(0, 0, 0.001);
    mouthGroup.add(smileBloomPlate);

    // Soft Ambient Glow Torus (volumetric halo around the smile)
    const smileBloomGeom = new THREE.TorusGeometry(0.046, 0.014, 16, 36, Math.PI * 0.72);
    const smileBloomMesh = new THREE.Mesh(smileBloomGeom, amberSmileBloomMaterial);
    smileBloomMesh.rotation.z = Math.PI + 0.14;
    smileBloomMesh.position.set(0, 0, 0.002);
    mouthGroup.add(smileBloomMesh);

    // Primary Luminous Amber Smile Curve
    const smileCurveGeom = new THREE.TorusGeometry(0.046, 0.0075, 16, 36, Math.PI * 0.72);
    const smileMesh = new THREE.Mesh(smileCurveGeom, amberSmileMaterial);
    smileMesh.rotation.z = Math.PI + 0.14; // Friendly upward curve ‿
    smileMesh.position.set(0, 0, 0.004);
    mouthGroup.add(smileMesh);

    // Inner Cream-Gold Core Filament
    const smileCoreGeom = new THREE.TorusGeometry(0.046, 0.0035, 12, 32, Math.PI * 0.65);
    const smileCoreMesh = new THREE.Mesh(smileCoreGeom, amberDotMaterial);
    smileCoreMesh.rotation.z = Math.PI + 0.18;
    smileCoreMesh.position.set(0, 0, 0.005);
    mouthGroup.add(smileCoreMesh);

    // Rounded Emissive Smile End Caps
    const smileCapGeom = new THREE.SphereGeometry(0.0075, 12, 12);
    const leftSmileCap = new THREE.Mesh(smileCapGeom, amberSmileMaterial);
    leftSmileCap.position.set(-0.039, 0.013, 0.004);
    mouthGroup.add(leftSmileCap);

    const rightSmileCap = new THREE.Mesh(smileCapGeom, amberSmileMaterial);
    rightSmileCap.position.set(0.039, 0.013, 0.004);
    mouthGroup.add(rightSmileCap);

    // Eyebrows & Cheek Blushes (Kept for animation loop compatibility)
    const eyebrowGeom = new THREE.CapsuleGeometry(0.010, 0.040, 8, 12);
    const leftEyebrow = new THREE.Mesh(eyebrowGeom, amberEyeGlowMaterial);
    leftEyebrow.visible = false;
    headPivot.add(leftEyebrow);

    const rightEyebrow = new THREE.Mesh(eyebrowGeom, amberEyeGlowMaterial);
    rightEyebrow.visible = false;
    headPivot.add(rightEyebrow);

    const blushGeom = new THREE.CircleGeometry(0.040, 24);
    const leftBlush = new THREE.Mesh(blushGeom, pinkBlushMaterial);
    leftBlush.visible = false;
    headPivot.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeom, pinkBlushMaterial);
    rightBlush.visible = false;
    headPivot.add(rightBlush);

    // ==================== C. ARTICULATED ARMS (DARK BICEPS & WHITE-TIPPED HANDS) ====================
    const shoulderBallGeom = new THREE.SphereGeometry(0.11, 20, 20);
    const shoulderCapGeom = new THREE.SphereGeometry(0.135, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.75);
    const limbBicepGeom = new THREE.CapsuleGeometry(0.074, 0.20, 14, 18);
    const gauntletGeom = new THREE.CapsuleGeometry(0.082, 0.21, 16, 20);

    // ---------- LEFT ARM ----------
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.50, 0.22, 0);
    torsoGroup.add(leftShoulder);

    // Dark Inner Shoulder Socket
    const leftShoulderBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    leftShoulder.add(leftShoulderBall);

    // Smooth White Shoulder Deltoid Pauldron (Cap from image)
    const leftShoulderCap = new THREE.Mesh(shoulderCapGeom, armorMaterial);
    leftShoulderCap.position.set(0, 0.03, 0);
    leftShoulderCap.rotation.z = 0.20;
    leftShoulder.add(leftShoulderCap);

    // Glowing Cyan Shoulder Trim Ring
    const leftShoulderGlow = new THREE.Mesh(
      new THREE.TorusGeometry(0.095, 0.012, 12, 24),
      cyanGlowMaterial
    );
    leftShoulderGlow.position.set(0, -0.04, 0);
    leftShoulderGlow.rotation.x = Math.PI / 2;
    leftShoulder.add(leftShoulderGlow);

    // DARK CHARCOAL BICEP (Signature contrasting dark upper arm from image)
    const leftBicep = new THREE.Mesh(limbBicepGeom, slateJointMaterial);
    leftBicep.position.set(0, -0.18, 0);
    leftShoulder.add(leftBicep);

    const leftElbow = new THREE.Group();
    leftElbow.position.set(0, -0.32, 0);
    leftShoulder.add(leftElbow);

    // Dark Elbow Joint Hinge
    const leftElbowJoint = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16),
      slateJointMaterial
    );
    leftElbowJoint.rotation.z = Math.PI / 2;
    leftElbow.add(leftElbowJoint);

    const leftElbowPin = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), chromeMaterial);
    leftElbowJoint.add(leftElbowPin);

    // SMOOTH WHITE FOREARM GAUNTLET
    const leftGauntlet = new THREE.Mesh(gauntletGeom, armorMaterial);
    leftGauntlet.position.set(0, -0.16, 0);
    leftElbow.add(leftGauntlet);

    // Glowing Cyan Wrist Ring
    const leftWristGlow = new THREE.Mesh(
      new THREE.TorusGeometry(0.082, 0.010, 12, 24),
      cyanGlowMaterial
    );
    leftWristGlow.position.set(0, -0.26, 0);
    leftWristGlow.rotation.x = Math.PI / 2;
    leftElbow.add(leftWristGlow);

    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(0, -0.32, 0);
    leftElbow.add(leftHandGroup);

    // DARK CHARCOAL HAND PALM (From image)
    const leftPalm = new THREE.Mesh(
      new THREE.SphereGeometry(0.070, 16, 16),
      slateJointMaterial
    );
    leftPalm.scale.set(1.0, 0.9, 0.7);
    leftHandGroup.add(leftPalm);

    // ARTICULATED DARK FINGERS WITH PURE WHITE TIPS (Exact from image)
    for (let f = 0; f < 3; f++) {
      const fingerGroup = new THREE.Group();
      fingerGroup.position.set((f - 1) * 0.028, -0.060, 0.015);
      leftHandGroup.add(fingerGroup);

      // Dark Base
      const fBase = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.015, 0.032, 8, 10),
        slateJointMaterial
      );
      fingerGroup.add(fBase);

      // Clean White Ceramic Tip
      const fTip = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.015, 0.024, 8, 10),
        armorMaterial
      );
      fTip.position.set(0, -0.022, 0);
      fingerGroup.add(fTip);
    }

    // Thumb
    const leftThumbGroup = new THREE.Group();
    leftThumbGroup.position.set(0.048, -0.030, 0.025);
    leftThumbGroup.rotation.z = -0.55;
    leftHandGroup.add(leftThumbGroup);

    const lThumbBase = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.028, 8, 10),
      slateJointMaterial
    );
    leftThumbGroup.add(lThumbBase);

    const lThumbTip = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.020, 8, 10),
      armorMaterial
    );
    lThumbTip.position.set(0, -0.018, 0);
    leftThumbGroup.add(lThumbTip);

    // ---------- RIGHT ARM ----------
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.50, 0.22, 0);
    torsoGroup.add(rightShoulder);

    const rightShoulderBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    rightShoulder.add(rightShoulderBall);

    const rightShoulderCap = new THREE.Mesh(shoulderCapGeom, armorMaterial);
    rightShoulderCap.position.set(0, 0.03, 0);
    rightShoulderCap.rotation.z = -0.20;
    rightShoulder.add(rightShoulderCap);

    const rightShoulderGlow = new THREE.Mesh(
      new THREE.TorusGeometry(0.095, 0.012, 12, 24),
      cyanGlowMaterial
    );
    rightShoulderGlow.position.set(0, -0.04, 0);
    rightShoulderGlow.rotation.x = Math.PI / 2;
    rightShoulder.add(rightShoulderGlow);

    // DARK CHARCOAL BICEP (From image)
    const rightBicep = new THREE.Mesh(limbBicepGeom, slateJointMaterial);
    rightBicep.position.set(0, -0.18, 0);
    rightShoulder.add(rightBicep);

    const rightElbow = new THREE.Group();
    rightElbow.position.set(0, -0.32, 0);
    rightShoulder.add(rightElbow);

    const rightElbowJoint = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.04, 16),
      slateJointMaterial
    );
    rightElbowJoint.rotation.z = Math.PI / 2;
    rightElbow.add(rightElbowJoint);

    const rightElbowPin = new THREE.Mesh(new THREE.SphereGeometry(0.032, 12, 12), chromeMaterial);
    rightElbowJoint.add(rightElbowPin);

    // SMOOTH WHITE FOREARM GAUNTLET
    const rightGauntlet = new THREE.Mesh(gauntletGeom, armorMaterial);
    rightGauntlet.position.set(0, -0.16, 0);
    rightElbow.add(rightGauntlet);

    const rightWristGlow = new THREE.Mesh(
      new THREE.TorusGeometry(0.082, 0.010, 12, 24),
      cyanGlowMaterial
    );
    rightWristGlow.position.set(0, -0.26, 0);
    rightWristGlow.rotation.x = Math.PI / 2;
    rightElbow.add(rightWristGlow);

    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0, -0.32, 0);
    rightElbow.add(rightHandGroup);

    // DARK CHARCOAL HAND PALM (From image)
    const rightPalm = new THREE.Mesh(
      new THREE.SphereGeometry(0.070, 16, 16),
      slateJointMaterial
    );
    rightPalm.scale.set(1.0, 0.9, 0.7);
    rightHandGroup.add(rightPalm);

    // ARTICULATED DARK FINGERS WITH PURE WHITE TIPS
    for (let f = 0; f < 3; f++) {
      const fingerGroup = new THREE.Group();
      fingerGroup.position.set((f - 1) * 0.028, -0.060, 0.015);
      rightHandGroup.add(fingerGroup);

      const fBase = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.015, 0.032, 8, 10),
        slateJointMaterial
      );
      fingerGroup.add(fBase);

      const fTip = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.015, 0.024, 8, 10),
        armorMaterial
      );
      fTip.position.set(0, -0.022, 0);
      fingerGroup.add(fTip);
    }

    // Thumb
    const rightThumbGroup = new THREE.Group();
    rightThumbGroup.position.set(-0.048, -0.030, 0.025);
    rightThumbGroup.rotation.z = 0.55;
    rightHandGroup.add(rightThumbGroup);

    const rThumbBase = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.028, 8, 10),
      slateJointMaterial
    );
    rightThumbGroup.add(rThumbBase);

    const rThumbTip = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.020, 8, 10),
      armorMaterial
    );
    rThumbTip.position.set(0, -0.018, 0);
    rightThumbGroup.add(rThumbTip);

    // ==================== D. ARTICULATED LEGS & AERODYNAMIC BOOTS ====================
    const thighGeom = new THREE.CapsuleGeometry(0.11, 0.24, 14, 18);
    const shinGeom = new THREE.CylinderGeometry(0.10, 0.12, 0.30, 18);

    // Left Leg
    const leftHip = new THREE.Group();
    leftHip.position.set(-0.23, 0.96, 0);
    bobGroup.add(leftHip);

    const leftHipBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    leftHip.add(leftHipBall);

    const leftThigh = new THREE.Mesh(thighGeom, armorMaterial);
    leftThigh.position.set(0, -0.21, 0);
    leftHip.add(leftThigh);

    const leftKnee = new THREE.Group();
    leftKnee.position.set(0, -0.40, 0);
    leftHip.add(leftKnee);

    const leftKneeDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.05, 20),
      slateJointMaterial
    );
    leftKneeDisc.rotation.z = Math.PI / 2;
    leftKnee.add(leftKneeDisc);

    const leftKneePin = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), chromeMaterial);
    leftKneeDisc.add(leftKneePin);

    const leftShin = new THREE.Mesh(shinGeom, armorMaterial);
    leftShin.position.set(0, -0.20, 0);
    leftKnee.add(leftShin);

    // Glowing Cyan Telemetry Strip on Shin
    const leftShinLight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.10, 8, 12),
      cyanGlowMaterial
    );
    leftShinLight.position.set(0, -0.19, 0.115);
    leftKnee.add(leftShinLight);

    const leftAnkle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.11, 0.04, 18),
      slateJointMaterial
    );
    leftAnkle.position.set(0, -0.34, 0);
    leftKnee.add(leftAnkle);

    // Left Aerodynamic Hover/Stride Boot (Smooth, Streamlined, Precise Elevation)
    const leftBootGroup = new THREE.Group();
    leftBootGroup.position.set(0, -0.42, 0.06);
    leftKnee.add(leftBootGroup);

    const leftBootShell = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.135, 0.20, 16, 20),
      armorMaterial
    );
    leftBootShell.position.set(0, -0.01, 0.06);
    leftBootShell.rotation.x = Math.PI / 2;
    leftBootShell.scale.set(0.92, 1.25, 0.72);
    leftBootGroup.add(leftBootShell);

    // Sleek Rounded Toe Cap
    const leftToeCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      armorMaterial
    );
    leftToeCap.position.set(0, -0.02, 0.17);
    leftToeCap.rotation.x = Math.PI / 2;
    leftBootGroup.add(leftToeCap);

    // Glowing Cyan Sole Edge Runner Strip
    const leftBootSoleGlow = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.18, 8, 12),
      cyanGlowMaterial
    );
    leftBootSoleGlow.position.set(0, -0.08, 0.08);
    leftBootSoleGlow.rotation.z = Math.PI / 2;
    leftBootGroup.add(leftBootSoleGlow);

    // Smooth Ceramic Sole Plate
    const leftSole = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.038, 0.44),
      armorMaterial
    );
    leftSole.position.set(0, -0.09, 0.04);
    leftBootGroup.add(leftSole);

    // Slate Bottom Outsole (Touches baseline)
    const leftOutsole = new THREE.Mesh(
      new THREE.BoxGeometry(0.23, 0.018, 0.43),
      slateJointMaterial
    );
    leftOutsole.position.set(0, -0.115, 0.04);
    leftBootGroup.add(leftOutsole);

    // Rocket Flame Thruster (Sole Nozzle)
    const leftNitroGroup = new THREE.Group();
    leftNitroGroup.position.set(0, -0.02, 0);
    leftOutsole.add(leftNitroGroup);

    const nozzleGeom = new THREE.TorusGeometry(0.065, 0.014, 12, 20);
    const leftNozzle = new THREE.Mesh(nozzleGeom, chromeMaterial);
    leftNozzle.rotation.x = Math.PI / 2;
    leftNitroGroup.add(leftNozzle);

    const outerPlumeGeom = new THREE.ConeGeometry(0.082, 0.44, 16, 1, true);
    const leftOuterPlume = new THREE.Mesh(outerPlumeGeom, flameOuterMaterial);
    leftOuterPlume.position.set(0, -0.22, 0);
    leftOuterPlume.rotation.x = Math.PI;
    leftNitroGroup.add(leftOuterPlume);

    const innerFlameGeom = new THREE.ConeGeometry(0.056, 0.32, 14, 1, true);
    const leftInnerFlame = new THREE.Mesh(innerFlameGeom, flameInnerMaterial);
    leftInnerFlame.position.set(0, -0.16, 0);
    leftInnerFlame.rotation.x = Math.PI;
    leftNitroGroup.add(leftInnerFlame);

    const innerCoreGeom = new THREE.ConeGeometry(0.030, 0.18, 12);
    const leftInnerCore = new THREE.Mesh(innerCoreGeom, flameCoreMaterial);
    leftInnerCore.position.set(0, -0.09, 0);
    leftInnerCore.rotation.x = Math.PI;
    leftNitroGroup.add(leftInnerCore);

    leftNitroGroup.scale.set(0, 0, 0);
    leftNitroGroup.visible = false;

    // Right Leg
    const rightHip = new THREE.Group();
    rightHip.position.set(0.23, 0.96, 0);
    bobGroup.add(rightHip);

    const rightHipBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    rightHip.add(rightHipBall);

    const rightThigh = new THREE.Mesh(thighGeom, armorMaterial);
    rightThigh.position.set(0, -0.21, 0);
    rightHip.add(rightThigh);

    const rightKnee = new THREE.Group();
    rightKnee.position.set(0, -0.40, 0);
    rightHip.add(rightKnee);

    const rightKneeDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.05, 20),
      slateJointMaterial
    );
    rightKneeDisc.rotation.z = Math.PI / 2;
    rightKnee.add(rightKneeDisc);

    const rightKneePin = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), chromeMaterial);
    rightKneeDisc.add(rightKneePin);

    const rightShin = new THREE.Mesh(shinGeom, armorMaterial);
    rightShin.position.set(0, -0.20, 0);
    rightKnee.add(rightShin);

    // Glowing Cyan Telemetry Strip on Shin
    const rightShinLight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.10, 8, 12),
      cyanGlowMaterial
    );
    rightShinLight.position.set(0, -0.19, 0.115);
    rightKnee.add(rightShinLight);

    const rightAnkle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.11, 0.04, 18),
      slateJointMaterial
    );
    rightAnkle.position.set(0, -0.34, 0);
    rightKnee.add(rightAnkle);

    // Right Aerodynamic Hover/Stride Boot
    const rightBootGroup = new THREE.Group();
    rightBootGroup.position.set(0, -0.42, 0.06);
    rightKnee.add(rightBootGroup);

    const rightBootShell = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.135, 0.20, 16, 20),
      armorMaterial
    );
    rightBootShell.position.set(0, -0.01, 0.06);
    rightBootShell.rotation.x = Math.PI / 2;
    rightBootShell.scale.set(0.92, 1.25, 0.72);
    rightBootGroup.add(rightBootShell);

    // Sleek Rounded Toe Cap
    const rightToeCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      armorMaterial
    );
    rightToeCap.position.set(0, -0.02, 0.17);
    rightToeCap.rotation.x = Math.PI / 2;
    rightBootGroup.add(rightToeCap);

    // Glowing Cyan Sole Edge Runner Strip
    const rightBootSoleGlow = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.016, 0.18, 8, 12),
      cyanGlowMaterial
    );
    rightBootSoleGlow.position.set(0, -0.08, 0.08);
    rightBootSoleGlow.rotation.z = Math.PI / 2;
    rightBootGroup.add(rightBootSoleGlow);

    // Smooth Ceramic Sole Plate
    const rightSole = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.038, 0.44),
      armorMaterial
    );
    rightSole.position.set(0, -0.09, 0.04);
    rightBootGroup.add(rightSole);

    // Slate Bottom Outsole
    const rightOutsole = new THREE.Mesh(
      new THREE.BoxGeometry(0.23, 0.018, 0.43),
      slateJointMaterial
    );
    rightOutsole.position.set(0, -0.115, 0.04);
    rightBootGroup.add(rightOutsole);

    // Rocket Flame Thruster (Sole Nozzle)
    const rightNitroGroup = new THREE.Group();
    rightNitroGroup.position.set(0, -0.02, 0);
    rightOutsole.add(rightNitroGroup);

    const rightNozzle = new THREE.Mesh(nozzleGeom, chromeMaterial);
    rightNozzle.rotation.x = Math.PI / 2;
    rightNitroGroup.add(rightNozzle);

    const rightOuterPlume = new THREE.Mesh(outerPlumeGeom, flameOuterMaterial);
    rightOuterPlume.position.set(0, -0.22, 0);
    rightOuterPlume.rotation.x = Math.PI;
    rightNitroGroup.add(rightOuterPlume);

    const rightInnerFlame = new THREE.Mesh(innerFlameGeom, flameInnerMaterial);
    rightInnerFlame.position.set(0, -0.16, 0);
    rightInnerFlame.rotation.x = Math.PI;
    rightNitroGroup.add(rightInnerFlame);

    const rightInnerCore = new THREE.Mesh(innerCoreGeom, flameCoreMaterial);
    rightInnerCore.position.set(0, -0.09, 0);
    rightInnerCore.rotation.x = Math.PI;
    rightNitroGroup.add(rightInnerCore);

    rightNitroGroup.scale.set(0, 0, 0);
    rightNitroGroup.visible = false;

    // ==================== E. SPEED STREAMLINES & AERO PARTICLES ====================
    const aeroGroup = new THREE.Group();
    bobGroup.add(aeroGroup);
    aeroGroup.visible = false;

    // ==================== F. GROUND CONTACT SHADOW ====================
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const radGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radGrad.addColorStop(0, 'rgba(2, 6, 23, 0.82)');
    radGrad.addColorStop(0.35, 'rgba(6, 78, 59, 0.28)');
    radGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.12)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.02;
    bobGroup.add(shadowMesh);

    // --- 5. DYNAMIC TARGET MEASUREMENT ENGINE ---
    const getTargetCoordinates = () => {
      const containerElem = document.getElementById('hero-robot-container');
      const badgeElem = document.getElementById('hero-smart-systems-badge');
      const engElem = document.getElementById('hero-engineering-span');

      if (!containerElem || !badgeElem || !engElem) {
        return {
          badgeStart: { x: 0, y: 10 },
          badgeEnd: { x: 160, y: 10 },
          engStart: { x: 0, y: 64 },
          engEnd: { x: 380, y: 64 },
        };
      }

      const cRect = containerElem.getBoundingClientRect();
      const bRect = badgeElem.getBoundingClientRect();
      const eRect = engElem.getBoundingClientRect();

      const feetOffset = 128;
      const centerShift = 110; // (220 / 2) exact horizontal center of robot canvas
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

      // Top border line of SMART SYSTEMS badge
      const badgeY = bRect.top - cRect.top - feetOffset;
      const badgeStartX = bRect.left - cRect.left + (isMobile ? 28 : 22) - centerShift;
      const badgeEndX = bRect.right - cRect.left - 24 - centerShift;

      // Top border line of ENGINEERING heading
      const engY = eRect.top - cRect.top - feetOffset;
      const engStartX = eRect.left - cRect.left + (isMobile ? 22 : 20) - centerShift;
      
      let engEndX = eRect.right - cRect.left - 30 - centerShift;
      if (isMobile) {
        const maxMobileX = Math.max(badgeStartX + 30, cRect.width - 200);
        engEndX = Math.min(engEndX, maxMobileX);
      }

      return {
        badgeStart: { x: badgeStartX, y: badgeY },
        badgeEnd: { x: badgeEndX, y: badgeY },
        engStart: { x: engStartX, y: engY },
        engEnd: { x: engEndX, y: engY },
      };
    };

    // --- 6. CONTINUOUS MASTER TIME ENGINE & MOTION CHOREOGRAPHY ---
    let animFrameId: number;
    let clock = new THREE.Clock();

    // TOTAL LOOP DURATION: 15.2 SECONDS (Master-class trained choreography)
    // 0.0s -> 3.8s: Walk across SMART SYSTEMS badge
    // 3.8s -> 4.2s: Crouch anticipation at right edge
    // 4.2s -> 5.4s: High Parabolic Jump Arc to end of ENGINEERING
    // 5.4s -> 5.9s: Soft Landing & impact recovery
    // 5.9s -> 8.5s: Front-facing greeting: waving "Hi" with smiling eyes
    // 8.5s -> 9.0s: Turn and athletic launch stance facing flight vector
    // 9.0s -> 9.5s: Dual rocket pre-ignition & liftoff (backpack & shoe fire)
    // 9.5s -> 9.8s: Pitch into horizontal Superman flight pose
    // 9.8s -> 12.6s: Supersonic Superman flight arc across header (dual fire)
    // 12.6s -> 13.4s: Aerodynamic flare & rotation into upright standing pose at hover altitude
    // 13.4s -> 14.6s: Slow, controlled standing descent with hover retro-fire to start position
    // 14.6s -> 15.2s: Confident standing hero poise on badge start position before repeat
    const LOOP_DURATION = 15.2;

    const quatWalk = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 3.4, 0, 'YXZ'));
    const quatFront = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0, 'YXZ'));
    const quatFaceLeft = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2.0, 0, 'YXZ'));

    const thetaSuperman = 0.52; // ~30 deg tilt towards camera so face, visor, and eyes remain clearly visible
    const cosS = Math.cos(thetaSuperman);
    const sinS = Math.sin(thetaSuperman);
    const matSuperman = new THREE.Matrix4().set(
      0,     -1,     0, 0,
      sinS,   0, -cosS, 0,
      cosS,   0,  sinS, 0,
      0,      0,     0, 1
    );
    const quatSuperman = new THREE.Quaternion().setFromRotationMatrix(matSuperman);
    const targetQuat = new THREE.Quaternion();

    // ==================== SPRING-BASED DAMPED HARMONIC PHYSICS MODEL ====================
    // Solves: m * y'' + c * y' + k * y = 0
    // Realistically models physical mass (inertia), spring tension (k), and damping friction (c)
    // for weighty, lifelike biomechanical & robotic transitions.
    const solveDampedSpring = (
      t: number,
      tension = 185,
      friction = 16,
      mass = 1.0
    ): { displacement: number; velocity: number } => {
      const clampedT = Math.max(0, t);
      const omega0 = Math.sqrt(tension / mass);
      const zeta = friction / (2 * Math.sqrt(tension * mass));

      if (zeta < 1.0) {
        const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
        const envelope = Math.exp(-zeta * omega0 * clampedT);
        const cosTerm = Math.cos(omegaD * clampedT);
        const sinTerm = Math.sin(omegaD * clampedT);
        const displacement = 1 - envelope * (cosTerm + (zeta / Math.sqrt(1 - zeta * zeta)) * sinTerm);
        const velocity = envelope * (omega0 * (1 + zeta * zeta) * sinTerm + omegaD * cosTerm);
        return { displacement, velocity };
      } else {
        const envelope = Math.exp(-omega0 * clampedT);
        const displacement = 1 - envelope * (1 + omega0 * clampedT);
        const velocity = envelope * (omega0 * omega0 * clampedT);
        return { displacement, velocity };
      }
    };

    // Pre-configured d3-ease physics curves for authentic kinetic anticipation & ballistic arcs
    const springAnticipationEase = easeBackIn.overshoot(2.2);

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const t = elapsed % LOOP_DURATION;

      // Dynamic pulse calculation for lighting
      const pulse = Math.sin(elapsed * 4.0) * 0.5 + 1.0;
      greenEmissiveMaterial.emissiveIntensity = 4.0 + pulse * 0.8;

      const targets = getTargetCoordinates();
      let currentX = targets.badgeStart.x;
      let currentY = targets.badgeStart.y;
      let targetPitchX = 0;

      let isWalking = false;
      let isJumping = false;
      let isLanding = false;
      let isWaving = false;
      let flyingActive = false;

      // "HI" bubble state trigger (front-facing wave period)
      const shouldShowHi = t >= 5.9 && t <= 8.5;
      if (shouldShowHi !== lastShowHiRef.current) {
        lastShowHiRef.current = shouldShowHi;
        setShowHiBubble(shouldShowHi);
      }

      // Flight mode trigger
      const shouldFlyEffect = t >= 9.0 && t <= 13.4;
      if (shouldFlyEffect !== lastIsFlyingRef.current) {
        lastIsFlyingRef.current = shouldFlyEffect;
        setIsFlying(shouldFlyEffect);
      }

      // Lifelike natural blinking
      const blinkPeriod = 3.5;
      const blinkTime = elapsed % blinkPeriod;
      let blinkScaleY = 1.0;
      let blinkScaleX = 1.0;

      if (blinkTime < 0.16) {
        const p = blinkTime / 0.16;
        blinkScaleY = Math.max(0.04, 1.0 - 0.96 * Math.sin(p * Math.PI));
        blinkScaleX = 1.0 + 0.12 * Math.sin(p * Math.PI);
      } else if (blinkTime > 0.30 && blinkTime < 0.44) {
        const p = (blinkTime - 0.30) / 0.14;
        blinkScaleY = Math.max(0.05, 1.0 - 0.92 * Math.sin(p * Math.PI));
        blinkScaleX = 1.0 + 0.09 * Math.sin(p * Math.PI);
      }

      // Base eye & eyebrow positioning
      if (t < 5.9 || t >= 8.5) {
        const blinkDip = (1.0 - blinkScaleY) * 0.025;
        leftEyebrow.position.set(-0.19, 0.59 - blinkDip, 0.540);
        rightEyebrow.position.set(0.19, 0.59 - blinkDip, 0.540);
        leftEyebrow.rotation.set(-0.28, 0.20, 1.35);
        rightEyebrow.rotation.set(-0.28, -0.20, -1.35);
        pinkBlushMaterial.opacity = 0.55;
        leftEyeGroup.scale.set(blinkScaleX, blinkScaleY, 1.0);
        rightEyeGroup.scale.set(blinkScaleX, blinkScaleY, 1.0);
        visorBeamGroup.scale.set(blinkScaleX, blinkScaleY, 1.0);
        mouthGroup.scale.set(1.0, 1.0, 1.0);
      }

      if (t < 3.8) {
        // ==================== 1. WALKING ACROSS SMART SYSTEMS BADGE ====================
        isWalking = true;
        const progress = t / 3.8;
        const smoothP = 0.5 - 0.5 * Math.cos(Math.PI * progress);
        currentX = THREE.MathUtils.lerp(targets.badgeStart.x, targets.badgeEnd.x, smoothP);
        currentY = targets.badgeStart.y;
        targetQuat.copy(quatWalk);
        targetPitchX = 0;
        torsoGroup.rotation.x = 0;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
        leftNitroGroup.scale.set(0, 0, 0);
        rightNitroGroup.scale.set(0, 0, 0);
      } else if (t < 4.2) {
        // ==================== 2. TAKEOFF CROUCH ANTICIPATION (SPRING-LOADED PHYSICS) ====================
        // Two-phase biomechanical spring model:
        // Phase A (0.0 -> 0.70): Sinks mass into knees/hips, storing potential energy; torso tilts forward over toes
        // Phase B (0.70 -> 1.00): Explosive uncoil release where leg actuators rapidly extend and arms whip upward
        currentX = targets.badgeEnd.x;
        currentY = targets.badgeEnd.y;
        targetQuat.copy(quatWalk);
        targetPitchX = 0;

        const crouchP = (t - 3.8) / 0.4;

        if (crouchP <= 0.70) {
          // --- Phase A: Gravitational & Servo Spring Loading ---
          const loadFrac = crouchP / 0.70;
          const loadEase = easeCubicOut(loadFrac);

          // Deep, weighty sink into ground
          bobGroup.position.y = -0.165 * loadEase;

          // Knees flex forward deeply to store spring energy
          leftKnee.rotation.x = 0.86 * loadEase;
          rightKnee.rotation.x = 0.86 * loadEase;

          // Hips counter-flex backward
          leftHip.rotation.x = -0.50 * loadEase;
          rightHip.rotation.x = -0.50 * loadEase;

          // Torso tilts forward ~9 deg to balance center of gravity over feet
          torsoGroup.rotation.x = 0.16 * loadEase;

          // Arms swing backward to gather angular momentum
          leftShoulder.rotation.x = 0.58 * loadEase;
          rightShoulder.rotation.x = 0.58 * loadEase;
          leftShoulder.rotation.z = 0.10 * loadEase;
          rightShoulder.rotation.z = -0.10 * loadEase;

          // Head tilts slightly up, fixing gaze intently on jump destination
          headPivot.rotation.x = -0.12 * loadEase;

          // Contact shadow broadens and darkens as torso descends
          shadowMesh.visible = true;
          shadowMesh.scale.set(1.0 + 0.16 * loadEase, 1.0 + 0.16 * loadEase, 1);
          shadowMat.opacity = 0.88 + 0.12 * loadEase;
        } else {
          // --- Phase B: Explosive Spring-Release Liftoff Push ---
          const releaseP = (crouchP - 0.70) / 0.30;
          const explodeEase = easeCubicIn(releaseP);

          // Center of mass shoots upward
          bobGroup.position.y = THREE.MathUtils.lerp(-0.165, 0.02, explodeEase);

          // Leg actuators violently uncoil into extension
          leftKnee.rotation.x = THREE.MathUtils.lerp(0.86, 0.10, explodeEase);
          rightKnee.rotation.x = THREE.MathUtils.lerp(0.86, 0.10, explodeEase);

          leftHip.rotation.x = THREE.MathUtils.lerp(-0.50, 0, explodeEase);
          rightHip.rotation.x = THREE.MathUtils.lerp(-0.50, 0, explodeEase);

          // Torso snaps upright
          torsoGroup.rotation.x = THREE.MathUtils.lerp(0.16, 0.02, explodeEase);

          // Arms whip explosively upward to drive vertical momentum
          leftShoulder.rotation.x = THREE.MathUtils.lerp(0.58, -0.65, explodeEase);
          rightShoulder.rotation.x = THREE.MathUtils.lerp(0.58, -0.65, explodeEase);
          leftShoulder.rotation.z = THREE.MathUtils.lerp(0.10, 0.22, explodeEase);
          rightShoulder.rotation.z = THREE.MathUtils.lerp(-0.10, -0.22, explodeEase);

          headPivot.rotation.x = THREE.MathUtils.lerp(-0.12, 0.08, explodeEase);

          shadowMesh.visible = true;
          shadowMesh.scale.set(THREE.MathUtils.lerp(1.16, 0.95, explodeEase), THREE.MathUtils.lerp(1.16, 0.95, explodeEase), 1);
          shadowMat.opacity = THREE.MathUtils.lerp(1.0, 0.82, explodeEase);
        }

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 5.4) {
        // ==================== 3. HIGH PARABOLIC JUMP ARC (BALLISTIC NEWTONIAN GRAVITY) ====================
        // Incorporates horizontal momentum inertia (easeCubicInOut) and true kinematic gravity:
        // Launch velocity decelerates to zero at apex (easeQuadOut), momentary weightless hang-time,
        // followed by gravitational acceleration downward into the landing zone (easeQuadIn).
        isJumping = true;
        const jumpP = (t - 4.2) / 1.2;

        // Realistic horizontal inertia carrying across platforms
        currentX = THREE.MathUtils.lerp(targets.badgeEnd.x, targets.engEnd.x, easeCubicInOut(jumpP));

        // Kinematic Ballistic Gravity Arc
        const maxArcHeight = 52;
        let arcOffset = 0;
        if (jumpP <= 0.48) {
          // Ascent against gravity: decelerating kinetic energy reaching apex
          const ascentFraction = jumpP / 0.48;
          arcOffset = maxArcHeight * easeQuadOut(ascentFraction);
        } else {
          // Descent with gravitational acceleration pulling robot downward
          const descentFraction = (jumpP - 0.48) / 0.52;
          arcOffset = maxArcHeight * (1 - easeQuadIn(descentFraction));
        }

        const linearY = THREE.MathUtils.lerp(targets.badgeEnd.y, targets.engEnd.y, jumpP);
        currentY = linearY - arcOffset;

        // Dynamic aerodynamic pitch & banking along trajectory curve
        const jumpRotY = THREE.MathUtils.lerp(Math.PI / 3.4, 0.08, easeCubicOut(jumpP));
        const jumpBankZ = -Math.sin(jumpP * Math.PI) * 0.14;
        const jumpPitchTorso = (jumpP - 0.48) * 0.22; // Leans slightly upward on ascent, pitches forward on descent

        const jumpEuler = new THREE.Euler(0, jumpRotY, jumpBankZ, 'YXZ');
        targetQuat.setFromEuler(jumpEuler);
        targetPitchX = jumpPitchTorso;
        torsoGroup.rotation.x = 0;

        // In-flight limb kinematics: liftoff push -> apex athletic tuck -> anticipatory reach
        if (jumpP <= 0.30) {
          // Ascent extension into tuck transition
          const pushFrac = jumpP / 0.30;
          leftKnee.rotation.x = THREE.MathUtils.lerp(0.10, 0.78, easeCubicIn(pushFrac));
          rightKnee.rotation.x = THREE.MathUtils.lerp(0.10, 0.78, easeCubicIn(pushFrac));
          leftHip.rotation.x = THREE.MathUtils.lerp(0, -0.42, easeCubicIn(pushFrac));
          rightHip.rotation.x = THREE.MathUtils.lerp(0, -0.42, easeCubicIn(pushFrac));
          leftShoulder.rotation.x = -0.65;
          rightShoulder.rotation.x = -0.65;
          leftShoulder.rotation.z = 0.25 * pushFrac;
          rightShoulder.rotation.z = -0.25 * pushFrac;
          headPivot.rotation.x = 0.12;
        } else if (jumpP <= 0.70) {
          // Apex: tight, compact athletic tuck for dynamic aerodynamic balance
          leftKnee.rotation.x = 0.78;
          rightKnee.rotation.x = 0.78;
          leftHip.rotation.x = -0.42;
          rightHip.rotation.x = -0.42;
          leftShoulder.rotation.x = -0.60;
          rightShoulder.rotation.x = -0.60;
          leftShoulder.rotation.z = 0.38;
          rightShoulder.rotation.z = -0.38;
          headPivot.rotation.x = 0.14;
        } else {
          // Descent & Pre-Touchdown Reach: legs proactively uncoil downward to meet landing pad and prepare for shock absorption
          const reachP = (jumpP - 0.70) / 0.30;
          const reachEase = easeCubicOut(reachP);
          leftKnee.rotation.x = THREE.MathUtils.lerp(0.78, 0.22, reachEase);
          rightKnee.rotation.x = THREE.MathUtils.lerp(0.78, 0.22, reachEase);
          leftHip.rotation.x = THREE.MathUtils.lerp(-0.42, -0.12, reachEase);
          rightHip.rotation.x = THREE.MathUtils.lerp(-0.42, -0.12, reachEase);
          leftShoulder.rotation.x = THREE.MathUtils.lerp(-0.60, 0.12, reachEase);
          rightShoulder.rotation.x = THREE.MathUtils.lerp(-0.60, 0.12, reachEase);
          leftShoulder.rotation.z = THREE.MathUtils.lerp(0.38, 0.12, reachEase);
          rightShoulder.rotation.z = THREE.MathUtils.lerp(-0.38, -0.12, reachEase);
          headPivot.rotation.x = THREE.MathUtils.lerp(0.14, 0.02, reachEase);
        }

        // Realistic ground shadow: scales down and softens with altitude, expands as robot descends
        shadowMesh.visible = true;
        const shadowAltRatio = arcOffset / maxArcHeight;
        shadowMesh.scale.set(1.0 - shadowAltRatio * 0.55, 1.0 - shadowAltRatio * 0.55, 1);
        shadowMat.opacity = Math.max(0.18, 0.90 - shadowAltRatio * 0.70);

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 5.9) {
        // ==================== 4. SOFT LANDING & DAMPED SPRING STABILIZATION ====================
        // Models authentic spring-damper suspension absorbing downward momentum upon touchdown:
        // 1. Immediate compression shock (landP ~0.20): knees flex deeply, hips absorb load, torso & head pitch forward
        // 2. Elastic rebound recoil (landP ~0.50): springs push back upward past equilibrium
        // 3. Harmonic dampening (landP ~0.85): residual oscillations dissipate cleanly into solid stance
        isLanding = true;
        currentX = targets.engEnd.x;
        currentY = targets.engEnd.y;

        const landP = (t - 5.4) / 0.5;
        targetQuat.copy(quatWalk).slerp(quatFront, easeCubicOut(landP));
        targetPitchX = 0;

        // Damped harmonic oscillation curve for robotic suspension impact
        const impactCompression = Math.sin(Math.PI * Math.min(1.0, landP * 1.55)) * Math.exp(-landP * 4.4);
        const reboundOscillation = Math.sin(Math.PI * landP * 3.0) * Math.exp(-landP * 5.2);
        const springSuspension = impactCompression * 1.18 - reboundOscillation * 0.32;

        // Mechanical body sink into platform
        bobGroup.position.y = -springSuspension * 0.165;

        // Hips and knees compress in unison to dissipate kinetic impact
        leftHip.rotation.x = -springSuspension * 0.46;
        rightHip.rotation.x = -springSuspension * 0.46;
        leftKnee.rotation.x = springSuspension * 0.82;
        rightKnee.rotation.x = springSuspension * 0.82;

        // Torso inertia carries forward on impact then rebounds
        torsoGroup.rotation.x = springSuspension * 0.18;

        // Head inertia lags slightly behind torso then snaps to level
        headPivot.rotation.x = springSuspension * 0.14;

        // Arms swing forward to counterbalance dynamic shock
        leftShoulder.rotation.x = springSuspension * 0.42;
        rightShoulder.rotation.x = springSuspension * 0.42;
        leftShoulder.rotation.z = 0.12 + springSuspension * 0.10;
        rightShoulder.rotation.z = -0.12 - springSuspension * 0.10;

        // Shadow expands on impact compression, contracts on rebound, and stabilizes
        shadowMesh.visible = true;
        shadowMesh.scale.set(1.0 + springSuspension * 0.26, 1.0 + springSuspension * 0.26, 1);
        shadowMat.opacity = Math.min(1.0, 0.86 + springSuspension * 0.14);

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 8.5) {
        // ==================== 5. FRONT-FACING GREETING: LOOK AT USER & SAY "HI" ====================
        isWaving = true;
        currentX = targets.engEnd.x;
        currentY = targets.engEnd.y;

        targetQuat.copy(quatFront);
        targetPitchX = 0;

        // Friendly, gentle arm wave
        rightShoulder.rotation.x = -2.10;
        rightShoulder.rotation.z = -0.42 + Math.sin(elapsed * 12.0) * 0.08;
        rightElbow.rotation.x = -0.25;
        rightElbow.rotation.z = Math.sin(elapsed * 14.0) * 0.65;
        rightHandGroup.rotation.z = Math.sin(elapsed * 14.0) * 0.35;

        // Left arm relaxed at side
        leftShoulder.rotation.x = 0.08;
        leftShoulder.rotation.z = 0.20;
        leftElbow.rotation.x = -0.22;
        leftElbow.rotation.z = 0;

        // Friendly inquisitive head tilt facing straight towards user
        headPivot.rotation.z = Math.sin(elapsed * 4.5) * 0.12;
        headPivot.rotation.x = -0.02 + Math.cos(elapsed * 3.5) * 0.04;
        headPivot.rotation.y = Math.sin(elapsed * 2.5) * 0.05;

        // Cheerful smiling eye squash & soft wink
        leftEyeGroup.scale.set(1.02, 0.94 + Math.sin(elapsed * 6.0) * 0.06, 1.0);
        rightEyeGroup.scale.set(1.02, 0.78 + Math.sin(elapsed * 6.0) * 0.22, 1.0);
        visorBeamGroup.scale.set(1.04, 0.94 + Math.sin(elapsed * 6.0) * 0.08, 1.0);
        mouthGroup.scale.set(1.08 + Math.sin(elapsed * 6.0) * 0.06, 1.08 + Math.sin(elapsed * 6.0) * 0.06, 1.0);

        // Cheerful eyebrows
        leftEyebrow.position.y = 0.59 + Math.sin(elapsed * 6.0) * 0.015;
        rightEyebrow.position.y = 0.57 + Math.sin(elapsed * 6.0) * 0.02;
        leftEyebrow.rotation.z = 1.40 + Math.sin(elapsed * 6.0) * 0.05;
        rightEyebrow.rotation.z = -1.25 + Math.sin(elapsed * 6.0) * 0.08;

        pinkBlushMaterial.opacity = 0.75 + Math.sin(elapsed * 8.0) * 0.18;

        leftHip.rotation.x = 0;
        leftHip.rotation.z = 0.03;
        rightHip.rotation.x = 0;
        rightHip.rotation.z = -0.03;
        leftKnee.rotation.x = 0;
        rightKnee.rotation.x = 0;

        bobGroup.position.y = Math.sin(elapsed * 4.0) * 0.025;
        torsoGroup.rotation.x = 0;

        greenEmissiveMaterial.emissiveIntensity = 4.8 + Math.sin(elapsed * 8.0) * 1.5;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
        jetpackFlamesGroup.visible = false;
        shadowMesh.visible = true;
        shadowMat.opacity = 1.0;
        shadowMesh.scale.set(1.0, 1.0, 1.0);
      } else if (t < 9.0) {
        // ==================== 5B. TURN & PREPARE TO FLY (SPRING ANTICIPATION CROUCH) ====================
        // Smoothly turns body to face left along flight vector and coils into a grounded, athletic launch crouch
        currentX = targets.engEnd.x;
        currentY = targets.engEnd.y;

        const turnP = (t - 8.5) / 0.5;
        const smoothTurn = easeCubicInOut(turnP);

        // Turn body smoothly from facing front to facing left toward flight vector
        targetQuat.copy(quatFront).slerp(quatFaceLeft, smoothTurn);
        targetPitchX = 0;

        // Arm positioning with kinetic weight
        rightShoulder.rotation.x = THREE.MathUtils.lerp(-2.10, 0.10, smoothTurn);
        rightShoulder.rotation.y = THREE.MathUtils.lerp(0, 0.04, smoothTurn);
        rightShoulder.rotation.z = THREE.MathUtils.lerp(-0.42, -0.15, smoothTurn);
        rightElbow.rotation.x = THREE.MathUtils.lerp(-0.25, -0.12, smoothTurn);
        rightElbow.rotation.z = 0;
        rightHandGroup.rotation.z = 0;

        leftShoulder.rotation.x = THREE.MathUtils.lerp(0.08, 0.22, smoothTurn);
        leftShoulder.rotation.y = 0;
        leftShoulder.rotation.z = THREE.MathUtils.lerp(0.20, 0.12, smoothTurn);
        leftElbow.rotation.x = -0.15;
        leftElbow.rotation.z = 0;

        // Head fixes gaze eagerly along flight path
        headPivot.rotation.x = 0;
        headPivot.rotation.y = THREE.MathUtils.lerp(0, 0.16, smoothTurn);
        headPivot.rotation.z = 0;

        leftEyeGroup.scale.set(1.0, 1.0, 1.0);
        rightEyeGroup.scale.set(1.0, 1.0, 1.0);
        visorBeamGroup.scale.set(1.0, 1.0, 1.0);
        mouthGroup.scale.set(1.0, 1.0, 1.0);
        leftEyebrow.rotation.z = 1.32;
        rightEyebrow.rotation.z = -1.32;

        // Spring-loaded athletic launch crouch loading tension
        const crouchLoad = easeCubicOut(turnP);
        leftHip.rotation.x = -0.32 * crouchLoad;
        leftHip.rotation.z = 0.02;
        leftKnee.rotation.x = 0.55 * crouchLoad;
        rightHip.rotation.x = -0.32 * crouchLoad;
        rightHip.rotation.z = -0.02;
        rightKnee.rotation.x = 0.55 * crouchLoad;

        bobGroup.position.y = -0.08 * crouchLoad;
        torsoGroup.rotation.x = 0.14 * crouchLoad;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
        jetpackFlamesGroup.visible = false;

        shadowMesh.visible = true;
        shadowMat.opacity = 0.90 + 0.10 * crouchLoad;
        shadowMesh.scale.set(1.0 + 0.10 * crouchLoad, 1.0 + 0.10 * crouchLoad, 1.0);
      } else if (t < 9.5) {
        // ==================== 6A. DUAL THRUSTER PRE-IGNITION & SPRING LIFTOFF ====================
        // BOTH BACKPACK JETPACK AND BOTTOM OF SHOES IGNITE WITH HIGH-ENERGY FIRE!
        // Leg actuators explosively uncoil to launch the body upward into rocket ascent
        currentX = targets.engEnd.x;

        const ignP = (t - 9.0) / 0.5;
        const smoothIgn = easeQuadIn(ignP);

        currentY = THREE.MathUtils.lerp(targets.engEnd.y, targets.engEnd.y - 14, smoothIgn);

        targetQuat.copy(quatFaceLeft);
        targetPitchX = 0;

        // Leading right arm extends forward preparing Superman fist
        rightShoulder.rotation.x = THREE.MathUtils.lerp(0.10, -0.10, smoothIgn);
        rightShoulder.rotation.y = 0.04;
        rightShoulder.rotation.z = THREE.MathUtils.lerp(-0.15, Math.PI - 0.40, smoothIgn);
        rightElbow.rotation.x = 0;
        rightElbow.rotation.z = 0;

        // Left arm streams against hip
        leftShoulder.rotation.x = 0.16;
        leftShoulder.rotation.y = 0;
        leftShoulder.rotation.z = 0.12;
        leftElbow.rotation.x = -0.12;

        // Legs extend downward for explosive liftoff push
        leftHip.rotation.x = THREE.MathUtils.lerp(-0.32, 0, smoothIgn);
        leftKnee.rotation.x = THREE.MathUtils.lerp(0.55, 0.06, smoothIgn);
        rightHip.rotation.x = THREE.MathUtils.lerp(-0.32, 0, smoothIgn);
        rightKnee.rotation.x = THREE.MathUtils.lerp(0.55, 0.06, smoothIgn);

        headPivot.rotation.x = THREE.MathUtils.lerp(0, -0.28, smoothIgn);
        headPivot.rotation.y = 0.14;
        headPivot.rotation.z = 0;

        bobGroup.position.y = 0;
        torsoGroup.rotation.x = THREE.MathUtils.lerp(0.14, 0.02, smoothIgn);

        // BOTH JETPACK AND BOTTOM OF SHOES FIRE!
        jetpackFlamesGroup.visible = true;
        leftNitroGroup.visible = true;
        rightNitroGroup.visible = true;

        const ignScale = smoothIgn * (0.80 + Math.random() * 0.15);
        jetpackFlamesGroup.scale.set(ignScale, ignScale * 1.15, ignScale);
        leftNitroGroup.scale.set(ignScale * 0.90, ignScale * 1.10, ignScale * 0.90);
        rightNitroGroup.scale.set(ignScale * 0.90, ignScale * 1.10, ignScale * 0.90);

        fireOuterMaterial.emissiveIntensity = 4.5 + smoothIgn * 1.5;
        fireMidMaterial.emissiveIntensity = 5.5 + smoothIgn * 1.5;

        // Ground shadow fades out as robot ascends
        shadowMesh.visible = true;
        shadowMesh.scale.set(1 - smoothIgn * 0.6, 1 - smoothIgn * 0.6, 1);
        shadowMat.opacity = Math.max(0, 1 - smoothIgn * 1.3);
      } else if (t < 9.8) {
        // ==================== 6B. PITCH INTO HORIZONTAL SUPERMAN FLIGHT POSE ====================
        currentX = targets.engEnd.x;

        const pitchP = (t - 9.5) / 0.3;
        const smoothPitch = 0.5 - 0.5 * Math.cos(Math.PI * pitchP);

        currentY = THREE.MathUtils.lerp(targets.engEnd.y - 14, targets.engEnd.y - 24, smoothPitch);

        // Pitch smoothly from upright facing-left to authentic horizontal Superman flight orientation
        targetQuat.copy(quatFaceLeft).slerp(quatSuperman, smoothPitch);
        targetPitchX = 0;

        // Leading right arm locks into full forward Superman fist!
        rightShoulder.rotation.x = -0.10;
        rightShoulder.rotation.y = 0.04;
        rightShoulder.rotation.z = THREE.MathUtils.lerp(Math.PI - 0.40, Math.PI - 0.08, smoothPitch);
        rightElbow.rotation.x = 0;
        rightElbow.rotation.z = 0;

        // Left arm streamlined tight against hip
        leftShoulder.rotation.x = 0.18;
        leftShoulder.rotation.y = -0.05;
        leftShoulder.rotation.z = 0.10;
        leftElbow.rotation.x = -0.12;
        leftElbow.rotation.z = 0;

        // Streamline legs and point boots straight back
        leftHip.rotation.x = THREE.MathUtils.lerp(0, 0.04, smoothPitch);
        leftHip.rotation.z = 0.02;
        leftKnee.rotation.x = THREE.MathUtils.lerp(0.08, 0.04, smoothPitch);
        rightHip.rotation.x = THREE.MathUtils.lerp(0, -0.04, smoothPitch);
        rightHip.rotation.z = -0.02;
        rightKnee.rotation.x = THREE.MathUtils.lerp(0.08, 0.04, smoothPitch);
        leftBootGroup.rotation.x = THREE.MathUtils.lerp(0, -0.65, smoothPitch);
        rightBootGroup.rotation.x = THREE.MathUtils.lerp(0, -0.65, smoothPitch);

        // Head raises proudly looking forward along flight vector
        headPivot.rotation.x = THREE.MathUtils.lerp(-0.28, -0.52, smoothPitch);
        headPivot.rotation.y = THREE.MathUtils.lerp(0.14, 0.16, smoothPitch);
        headPivot.rotation.z = -0.02;

        bobGroup.position.y = 0;
        torsoGroup.rotation.x = 0;

        // BOTH JETPACK AND SHOE THRUSTERS SURGE INTO SUPERSONIC POWER!
        jetpackFlamesGroup.visible = true;
        leftNitroGroup.visible = true;
        rightNitroGroup.visible = true;

        const surgeScale = 0.85 + smoothPitch * 0.35 + Math.sin(elapsed * 60.0) * 0.06;
        jetpackFlamesGroup.scale.set(surgeScale, surgeScale * 1.25, surgeScale);
        leftNitroGroup.scale.set(surgeScale * 0.92, surgeScale * 1.20, surgeScale * 0.92);
        rightNitroGroup.scale.set(surgeScale * 0.92, surgeScale * 1.20, surgeScale * 0.92);

        // Ground shadow is now completely hidden during flight
        shadowMesh.visible = false;
      } else if (t < 12.6) {
        // ==================== 7. AUTHENTIC SUPERMAN FLIGHT (RIGHT → LEFT) ====================
        flyingActive = true;
        const flightDuration = 2.8;
        const flightP = (t - 9.8) / flightDuration;

        const smoothFlight = 0.5 - 0.5 * Math.cos(Math.PI * flightP);
        currentX = THREE.MathUtils.lerp(targets.engEnd.x, targets.badgeStart.x, smoothFlight);

        // Majestic parabolic flight arc over header text with clean breathing room
        const baseFlightY = THREE.MathUtils.lerp(targets.engEnd.y - 22, targets.badgeStart.y - 32, smoothFlight);
        const flightWave = Math.sin(flightP * Math.PI) * 22;
        currentY = baseFlightY - flightWave;

        // Dynamic aerodynamic pitch banking along trajectory
        const flightSlope = -Math.cos(flightP * Math.PI) * 0.12;
        targetQuat.copy(quatSuperman);
        targetPitchX = flightSlope;
        bobGroup.position.y = Math.sin(elapsed * 16.0) * 0.012;

        // Authentic superhero Superman posture:
        // Leading right arm locked straight forward with clutched fist cutting through the air!
        rightShoulder.rotation.x = -0.10;
        rightShoulder.rotation.y = 0.04;
        rightShoulder.rotation.z = Math.PI - 0.08;
        rightElbow.rotation.x = 0;
        rightElbow.rotation.z = 0;

        // Trailing left arm streamlined against hip
        leftShoulder.rotation.x = 0.18;
        leftShoulder.rotation.y = -0.05;
        leftShoulder.rotation.z = 0.10;
        leftElbow.rotation.x = -0.12;
        leftElbow.rotation.z = 0;

        // Legs streamlined back together, ankles extended with pointed toes
        leftHip.rotation.x = 0.04;
        leftHip.rotation.z = 0.02;
        leftKnee.rotation.x = 0.04;
        rightHip.rotation.x = -0.04;
        rightHip.rotation.z = -0.02;
        rightKnee.rotation.x = 0.04;
        leftBootGroup.rotation.x = -0.65;
        rightBootGroup.rotation.x = -0.65;

        // Head raised alertly looking directly forward along flight path
        headPivot.rotation.x = -0.52;
        headPivot.rotation.y = 0.16;
        headPivot.rotation.z = -0.02;

        torsoGroup.rotation.x = 0;
        torsoGroup.rotation.z = 0;

        // ==================== BOTH JETPACK AND SHOES: ROARING SUPERSONIC FIRE ====================
        jetpackFlamesGroup.visible = true;
        leftNitroGroup.visible = true;
        rightNitroGroup.visible = true;

        const flameFlicker = 1.0 + Math.sin(elapsed * 75.0) * 0.08 + Math.sin(elapsed * 120.0) * 0.05;
        const jetLength = 1.45 * flameFlicker;
        const jetWidth = 1.05 + Math.sin(elapsed * 50.0) * 0.05;
        jetpackFlamesGroup.scale.set(jetWidth, jetLength, jetWidth);

        const bootLength = 1.35 * flameFlicker;
        const bootWidth = 0.95 + Math.sin(elapsed * 50.0) * 0.05;
        leftNitroGroup.scale.set(bootWidth, bootLength, bootWidth);
        rightNitroGroup.scale.set(bootWidth, bootLength, bootWidth);

        fireOuterMaterial.emissiveIntensity = 5.2 + flameFlicker * 1.0;
        fireMidMaterial.emissiveIntensity = 6.2 + flameFlicker * 1.2;

        // Supersonic shock diamond rings pulsing along backpack exhaust
        leftJetPlume.ring1.scale.setScalar(0.95 + Math.sin(elapsed * 40.0) * 0.15);
        leftJetPlume.ring2.scale.setScalar(0.90 + Math.sin(elapsed * 40.0 + 1.0) * 0.15);
        leftJetPlume.ring3.scale.setScalar(0.85 + Math.sin(elapsed * 40.0 + 2.0) * 0.15);
        rightJetPlume.ring1.scale.setScalar(0.95 + Math.sin(elapsed * 40.0) * 0.15);
        rightJetPlume.ring2.scale.setScalar(0.90 + Math.sin(elapsed * 40.0 + 1.0) * 0.15);
        rightJetPlume.ring3.scale.setScalar(0.85 + Math.sin(elapsed * 40.0 + 2.0) * 0.15);

        // Zero blue cover up! Zero shadow in the sky!
        aeroGroup.visible = false;
        shadowMesh.visible = false;
      } else if (t < 13.4) {
        // ==================== 7B. AERODYNAMIC FLARE & ROTATION TO STANDING POSITION ====================
        // Reaches badge start point at hover altitude, smoothly rotates body from horizontal flight to upright standing posture
        const flareP = (t - 12.6) / 0.8;
        const smoothFlare = 0.5 - 0.5 * Math.cos(Math.PI * flareP);

        currentX = targets.badgeStart.x;
        currentY = targets.badgeStart.y - 32;

        aeroGroup.visible = false;

        // Rotate smoothly from horizontal Superman flight into upright standing orientation
        targetQuat.copy(quatSuperman).slerp(quatWalk, smoothFlare);
        targetPitchX = 0;
        bobGroup.position.y = 0;

        // Arms smoothly transition to relaxed balancing posture at sides
        rightShoulder.rotation.x = THREE.MathUtils.lerp(-0.10, 0, smoothFlare);
        rightShoulder.rotation.y = THREE.MathUtils.lerp(0.04, 0, smoothFlare);
        rightShoulder.rotation.z = THREE.MathUtils.lerp(Math.PI - 0.08, -0.12, smoothFlare);
        rightElbow.rotation.x = THREE.MathUtils.lerp(0, -0.22, smoothFlare);
        rightElbow.rotation.z = 0;

        leftShoulder.rotation.x = THREE.MathUtils.lerp(0.18, 0, smoothFlare);
        leftShoulder.rotation.y = THREE.MathUtils.lerp(-0.05, 0, smoothFlare);
        leftShoulder.rotation.z = THREE.MathUtils.lerp(0.10, 0.12, smoothFlare);
        leftElbow.rotation.x = THREE.MathUtils.lerp(-0.12, -0.22, smoothFlare);

        // Legs rotate downward directly beneath hips into standing posture
        leftHip.rotation.x = THREE.MathUtils.lerp(0.04, 0, smoothFlare);
        leftHip.rotation.z = THREE.MathUtils.lerp(0.02, 0, smoothFlare);
        leftKnee.rotation.x = THREE.MathUtils.lerp(0.04, 0, smoothFlare);
        rightHip.rotation.x = THREE.MathUtils.lerp(-0.04, 0, smoothFlare);
        rightHip.rotation.z = THREE.MathUtils.lerp(-0.02, 0, smoothFlare);
        rightKnee.rotation.x = THREE.MathUtils.lerp(0.04, 0, smoothFlare);

        leftBootGroup.rotation.x = THREE.MathUtils.lerp(-0.65, 0, smoothFlare);
        rightBootGroup.rotation.x = THREE.MathUtils.lerp(-0.65, 0, smoothFlare);

        // Head levels out facing forward
        headPivot.rotation.x = THREE.MathUtils.lerp(-0.52, 0.02, smoothFlare);
        headPivot.rotation.y = THREE.MathUtils.lerp(0.16, 0, smoothFlare);
        headPivot.rotation.z = THREE.MathUtils.lerp(-0.02, 0, smoothFlare);
        torsoGroup.rotation.x = 0;

        // BOTH JETPACK AND SHOES THROTTLE TO CONTROLLED HOVER RETRO-FIRE
        jetpackFlamesGroup.visible = true;
        leftNitroGroup.visible = true;
        rightNitroGroup.visible = true;

        const hoverScale = 0.85 - smoothFlare * 0.20 + Math.sin(elapsed * 45.0) * 0.05;
        jetpackFlamesGroup.scale.set(hoverScale, hoverScale * 0.85, hoverScale);
        leftNitroGroup.scale.set(hoverScale * 0.85, hoverScale * 0.90, hoverScale * 0.85);
        rightNitroGroup.scale.set(hoverScale * 0.85, hoverScale * 0.90, hoverScale * 0.85);

        // Ground shadow reappears on the badge directly below boots
        shadowMesh.visible = true;
        shadowMesh.scale.set(0.40 + smoothFlare * 0.25, 0.40 + smoothFlare * 0.25, 1);
        shadowMat.opacity = smoothFlare * 0.35;
      } else if (t < 14.6) {
        // ==================== 8. SLOW, CONTROLLED STANDING DESCENT & TOUCHDOWN DAMPING ====================
        // Descends gracefully in standing orientation onto the badge start position, cushioned by spring suspension
        const landP = (t - 13.4) / 1.2;
        const smoothDescent = easeCubicOut(Math.min(1.0, landP / 0.80));

        currentX = targets.badgeStart.x;
        currentY = THREE.MathUtils.lerp(targets.badgeStart.y - 32, targets.badgeStart.y, smoothDescent);

        aeroGroup.visible = false;

        // Fully upright standing orientation
        targetQuat.copy(quatWalk);
        targetPitchX = 0;

        // Spring-damped mechanical touchdown absorption upon contact with badge surface
        let touchdownShock = 0;
        if (landP >= 0.70) {
          const tdFrac = (landP - 0.70) / 0.30;
          // Damped spring oscillation: initial compression -> gentle recoil -> rest
          const tdCompression = Math.sin(Math.PI * Math.min(1.0, tdFrac * 1.5)) * Math.exp(-tdFrac * 3.8);
          const tdRebound = Math.sin(Math.PI * tdFrac * 2.8) * Math.exp(-tdFrac * 4.5);
          touchdownShock = tdCompression * 1.12 - tdRebound * 0.28;
        }

        bobGroup.position.y = -touchdownShock * 0.11;

        // Standing arm posture with subtle stabilization
        rightShoulder.rotation.x = touchdownShock * 0.15;
        rightShoulder.rotation.y = 0;
        rightShoulder.rotation.z = -0.12 - touchdownShock * 0.08;
        rightElbow.rotation.x = -0.22;
        rightElbow.rotation.z = 0;

        leftShoulder.rotation.x = touchdownShock * 0.15;
        leftShoulder.rotation.y = 0;
        leftShoulder.rotation.z = 0.12 + touchdownShock * 0.08;
        leftElbow.rotation.x = -0.22;

        // Knees gently compress to absorb touchdown kinetic energy
        leftHip.rotation.x = -touchdownShock * 0.30;
        leftHip.rotation.z = 0;
        leftKnee.rotation.x = touchdownShock * 0.54;
        rightHip.rotation.x = -touchdownShock * 0.30;
        rightHip.rotation.z = 0;
        rightKnee.rotation.x = touchdownShock * 0.54;

        leftBootGroup.rotation.x = 0;
        rightBootGroup.rotation.x = 0;

        headPivot.rotation.x = 0.02 + touchdownShock * 0.09;
        headPivot.rotation.y = 0;
        headPivot.rotation.z = 0;
        torsoGroup.rotation.x = touchdownShock * 0.10;

        // BOTH JETPACK AND SHOE THRUSTERS EMIT GENTLE RETRO-THRUST, TAPERING ON TOUCHDOWN
        const retroThrust = Math.max(0, 1 - landP * 1.15) * (0.65 + Math.sin(elapsed * 50.0) * 0.06);
        if (retroThrust > 0.06) {
          jetpackFlamesGroup.visible = true;
          leftNitroGroup.visible = true;
          rightNitroGroup.visible = true;
          jetpackFlamesGroup.scale.set(retroThrust * 0.75, retroThrust * 0.70, retroThrust * 0.75);
          leftNitroGroup.scale.set(retroThrust * 0.75, retroThrust * 0.75, retroThrust * 0.75);
          rightNitroGroup.scale.set(retroThrust * 0.75, retroThrust * 0.75, retroThrust * 0.75);
        } else {
          jetpackFlamesGroup.visible = false;
          leftNitroGroup.visible = false;
          rightNitroGroup.visible = false;
          jetpackFlamesGroup.scale.set(0, 0, 0);
          leftNitroGroup.scale.set(0, 0, 0);
          rightNitroGroup.scale.set(0, 0, 0);
        }

        // Ground shadow expands and sharpens right beneath the boots on the badge
        shadowMesh.visible = true;
        shadowMesh.scale.set(
          THREE.MathUtils.lerp(0.65, 1.0, landP),
          THREE.MathUtils.lerp(0.65, 1.0, landP),
          1
        );
        shadowMat.opacity = THREE.MathUtils.lerp(0.35, 1.0, landP);
      } else {
        // ==================== 9. CONFIDENT STANDING HERO POISE & SEAMLESS REPEAT ====================
        // Stands proudly in standing position at the start position, breathes naturally, then seamlessly repeats cycle
        currentX = targets.badgeStart.x;
        currentY = targets.badgeStart.y;

        targetQuat.copy(quatWalk);
        targetPitchX = 0;

        // Standing ready posture
        rightShoulder.rotation.x = 0;
        rightShoulder.rotation.y = 0;
        rightShoulder.rotation.z = -0.12;
        rightElbow.rotation.x = -0.22;
        rightElbow.rotation.z = 0;

        leftShoulder.rotation.x = 0;
        leftShoulder.rotation.y = 0;
        leftShoulder.rotation.z = 0.12;
        leftElbow.rotation.x = -0.22;

        leftHip.rotation.x = 0;
        leftHip.rotation.z = 0;
        leftKnee.rotation.x = 0;
        rightHip.rotation.x = 0;
        rightHip.rotation.z = 0;
        rightKnee.rotation.x = 0;

        leftBootGroup.rotation.x = 0;
        rightBootGroup.rotation.x = 0;

        headPivot.rotation.x = 0.02;
        headPivot.rotation.y = 0;
        headPivot.rotation.z = 0;
        torsoGroup.rotation.x = 0;

        bobGroup.position.y = Math.sin(elapsed * 4.0) * 0.015; // Natural subtle breathing

        // All thrusters off
        jetpackFlamesGroup.visible = false;
        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;

        // Ground shadow solid and stable on badge start position
        shadowMesh.visible = true;
        shadowMesh.scale.set(1.0, 1.0, 1.0);
        shadowMat.opacity = 1.0;
      }

      // Update DOM wrapper position
      wrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      robotRoot.quaternion.copy(targetQuat);
      bobGroup.rotation.x = THREE.MathUtils.lerp(bobGroup.rotation.x, targetPitchX, 0.28);

      if (!isWaving) {
        pinkBlushMaterial.opacity = 0.55;
        rightHandGroup.rotation.z = 0;
      }

      // Smooth biomechanical walking gait
      if (isWalking) {
        const walkFreq = 7.5;
        const walkCycle = elapsed * walkFreq;

        // Hip Stride
        leftHip.rotation.x = Math.sin(walkCycle) * 0.65;
        rightHip.rotation.x = -Math.sin(walkCycle) * 0.65;

        // Knee Flexion
        leftKnee.rotation.x = Math.max(0, -Math.sin(walkCycle) * 0.55);
        rightKnee.rotation.x = Math.max(0, Math.sin(walkCycle) * 0.55);

        // Counter-Swinging Arms
        leftShoulder.rotation.x = -Math.sin(walkCycle) * 0.48;
        leftShoulder.rotation.z = 0.12;
        leftElbow.rotation.x = -0.22 - Math.max(0, Math.sin(walkCycle) * 0.2);

        rightShoulder.rotation.x = Math.sin(walkCycle) * 0.48;
        rightShoulder.rotation.z = -0.12;
        rightElbow.rotation.x = -0.22 - Math.max(0, -Math.sin(walkCycle) * 0.2);
        rightElbow.rotation.z = 0;

        // Torso Pelvic Sway & Vertical Bobbing
        bobGroup.position.y = Math.abs(Math.sin(walkCycle)) * 0.07;
        torsoGroup.rotation.z = Math.sin(walkCycle) * 0.035;
        torsoGroup.rotation.y = -Math.sin(walkCycle) * 0.045;

        // Inquisitive Head Stabilizer
        headPivot.rotation.z = 0.04 - Math.sin(walkCycle) * 0.025;
        headPivot.rotation.x = 0.04;

        shadowMesh.scale.set(1 - Math.abs(Math.sin(walkCycle)) * 0.14, 1 - Math.abs(Math.sin(walkCycle)) * 0.14, 1);
        shadowMat.opacity = 1;
      } else if (!isJumping && !isLanding && !isWaving && !flyingActive) {
        shadowMesh.scale.set(1, 1, 1);
        shadowMat.opacity = 1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-none select-none overflow-visible">
      {/* Dynamic 2D/3D Transform Wrapper driven directly by RAF motion kinematics */}
      <div
        ref={positionWrapperRef}
        className="absolute top-0 left-0 flex flex-col items-center justify-end will-change-transform pointer-events-none"
        style={{ transform: 'translate3d(0px, 32px, 0)' }}
      >
        {/* ================= CUTE & USER-FRIENDLY "HI" SPEECH BUBBLE ================= */}
        <AnimatePresence>
          {(showHiBubble || showSystemsModal) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 6, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.75, y: -4, filter: 'blur(3px)' }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="absolute left-1/2 -translate-x-1/2 -top-4 sm:top-[14px] sm:left-[126px] sm:translate-x-0 lg:left-[126px] lg:top-[14px] lg:translate-x-0 z-50 flex items-center gap-1.5 pointer-events-auto select-none max-w-[calc(100vw-2rem)]"
            >
              {/* Cute speech bubble connector dots leading from robot's helmet */}
              <div className="hidden sm:flex items-center gap-1 -mr-1">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.05, duration: 0.25 }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" 
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.12, duration: 0.25 }}
                  className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" 
                />
              </div>

              {/* Ultra-Cute Rounded Speech Cloud (Interactive Click Trigger) */}
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setShowSystemsModal(prev => !prev);
                }}
                className="relative group flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-slate-900/95 hover:bg-slate-900 backdrop-blur-xl border border-emerald-400/60 hover:border-emerald-400 shadow-[0_12px_28px_rgba(0,0,0,0.6),0_0_20px_rgba(52,211,153,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)] whitespace-nowrap cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                title="Click for Smart Systems Overview"
              >
                {/* Soft Radiant Ambient Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-cyan-500/15 blur-sm pointer-events-none -z-10" />

                {/* Animated Waving Hand Emoji */}
                <motion.span
                  animate={{ 
                    rotate: [0, 18, -12, 18, -8, 0],
                    scale: [1, 1.12, 1, 1.12, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                  className="text-[13px] sm:text-[15px] origin-bottom-right inline-block filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                >
                  👋
                </motion.span>

                <div className="flex flex-col items-start leading-none py-0.5">
                  {/* Greeting Text with Sparkle */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-['Syne',sans-serif] font-bold text-xs sm:text-[13px] tracking-wide text-white drop-shadow-[0_2px_6px_rgba(52,211,153,0.5)]">
                      Hi there!
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-300 animate-pulse font-mono font-bold bg-emerald-950/80 px-1 py-0.5 rounded border border-emerald-500/30">
                      Smart AI
                    </span>
                  </div>

                  {/* Friendly Micro Subtitle */}
                  <span className="text-[8.5px] sm:text-[9px] font-medium tracking-wider text-emerald-300/90 flex items-center gap-1 mt-0.5 sm:mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_5px_#34d399] animate-ping" />
                    {showSystemsModal ? 'Hide Overview ✕' : 'View Smart Systems ⚡'}
                  </span>
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= HIGH-DEMAND SMART SYSTEMS OVERVIEW POPUP (DESKTOP) ================= */}
        <div className="hidden sm:block">
          <AnimatePresence>
            {showSystemsModal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(4px)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className="absolute left-[126px] top-[74px] lg:left-[126px] lg:top-[74px] z-50 w-[360px] max-w-[360px] max-h-[80vh] overflow-y-auto p-4 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_24px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(16,185,129,0.25)] text-left pointer-events-auto select-none"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Bot size={15} />
                    </div>
                    <div>
                      <h4 className="font-['Syne',sans-serif] text-sm font-bold text-white flex items-center gap-1.5">
                        Smart Systems Overview
                      </h4>
                      <p className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Core Telemetry • 99.98% Uptime
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setShowSystemsModal(false);
                    }}
                    className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close Overview"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* High-Demand Systems Grid */}
                <div className="grid grid-cols-1 gap-2.5 my-3">
                  {/* System 1: Autonomous AI */}
                  <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-slate-200">Autonomous AI & Robotics</span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">12ms Latency</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Neural decision loops, real-time edge intelligence, and automated task execution.
                      </p>
                    </div>
                  </div>

                  {/* System 2: IoT & Sensors */}
                  <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-teal-950/90 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Radio size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-slate-200">IoT Sensor & Edge Matrix</span>
                        <span className="text-[9px] font-mono text-teal-400 font-bold">Sub-10ms Mesh</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Distributed telemetry streams, fleet telematics, and predictive hardware diagnostics.
                      </p>
                    </div>
                  </div>

                  {/* System 3: High-Throughput POS & ERP */}
                  <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/90 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-slate-200">POS & Enterprise Engine</span>
                        <span className="text-[9px] font-mono text-cyan-400 font-bold">Offline-Sync</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Multi-register transaction speed, automated ledgers, and inventory synchronization.
                      </p>
                    </div>
                  </div>

                  {/* System 4: Cloud Resilience */}
                  <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-slate-200">Self-Healing Cloud DevOps</span>
                        <span className="text-[9px] font-mono text-emerald-300 font-bold">Zero-Downtime</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                        Auto-scaling Kubernetes infrastructure and resilient distributed DDoS shields.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <a
                    href="#solutions"
                    onClick={() => {
                      playSound('click');
                      setShowSystemsModal(false);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] cursor-pointer"
                  >
                    <span>Explore Smart Systems</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= HIGH-DEMAND SMART SYSTEMS OVERVIEW POPUP (MOBILE PORTAL) ================= */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {showSystemsModal && (
              <div className="sm:hidden fixed inset-0 z-[999] flex items-center justify-center p-3 pointer-events-auto select-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    playSound('click');
                    setShowSystemsModal(false);
                  }}
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 12 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="relative z-10 w-full max-w-[340px] max-h-[82vh] overflow-y-auto p-4 rounded-3xl bg-slate-950/98 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(16,185,129,0.3)] text-left"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Bot size={15} />
                      </div>
                      <div>
                        <h4 className="font-['Syne',sans-serif] text-sm font-bold text-white flex items-center gap-1.5">
                          Smart Systems Overview
                        </h4>
                        <p className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Core Telemetry • 99.98% Uptime
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSound('click');
                        setShowSystemsModal(false);
                      }}
                      className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Close Overview"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  {/* High-Demand Systems Grid */}
                  <div className="grid grid-cols-1 gap-2.5 my-3">
                    {/* System 1: Autonomous AI */}
                    <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Cpu size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11.5px] font-bold text-slate-200">Autonomous AI & Robotics</span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">12ms Latency</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          Neural decision loops, real-time edge intelligence, and automated task execution.
                        </p>
                      </div>
                    </div>

                    {/* System 2: IoT & Sensors */}
                    <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-950/90 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Radio size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11.5px] font-bold text-slate-200">IoT Sensor & Edge Matrix</span>
                          <span className="text-[9px] font-mono text-teal-400 font-bold">Sub-10ms Mesh</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          Distributed telemetry streams, fleet telematics, and predictive hardware diagnostics.
                        </p>
                      </div>
                    </div>

                    {/* System 3: High-Throughput POS & ERP */}
                    <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-cyan-950/90 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Activity size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11.5px] font-bold text-slate-200">POS & Enterprise Engine</span>
                          <span className="text-[9px] font-mono text-cyan-400 font-bold">Offline-Sync</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          Multi-register transaction speed, automated ledgers, and inventory synchronization.
                        </p>
                      </div>
                    </div>

                    {/* System 4: Cloud Resilience */}
                    <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11.5px] font-bold text-slate-200">Self-Healing Cloud DevOps</span>
                          <span className="text-[9px] font-mono text-emerald-300 font-bold">Zero-Downtime</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                          Auto-scaling Kubernetes infrastructure and resilient distributed DDoS shields.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <a
                      href="#solutions"
                      onClick={() => {
                        playSound('click');
                        setShowSystemsModal(false);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] cursor-pointer"
                    >
                      <span>Explore Smart Systems</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* ================= 3D WEBGL ROBOT CANVAS (HIGH RESOLUTION NO PIXELATION) ================= */}
        <div
          ref={containerRef}
          className="w-[220px] h-[160px] flex items-center justify-center filter drop-shadow-md pointer-events-none overflow-visible"
        />
      </div>
    </div>
  );
}
