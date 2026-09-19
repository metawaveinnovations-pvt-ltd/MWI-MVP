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
    // Key Light (Crisp White Directional)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3.5, 6, 4.5);
    scene.add(keyLight);

    // Fill Light (Vibrant Cyan Studio Fill)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    fillLight.position.set(-4.5, 2.5, 3);
    scene.add(fillLight);

    // Rim Light (High-Intensity Emerald Backlight Rim)
    const rimLight = new THREE.DirectionalLight(0x34d399, 3.8);
    rimLight.position.set(0, 4, -4.5);
    scene.add(rimLight);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.0);
    scene.add(ambientLight);

    // --- 3. PREMIUM 3D MATERIALS & PHYSICAL SHADERS (FRIENDLY ROBOT REFERENCE REPLICA) ---
    // Pure Ultra-Glossy White Ceramic/Polycarbonate Armor
    const armorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    // Satin Dark Slate / Charcoal Mechanics (Underbelly, Joints, Sockets)
    const slateJointMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.32,
      metalness: 0.45,
    });

    // High-Gloss Jet Black Polycarbonate
    const blackGlossMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      roughness: 0.03,
      metalness: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    // Dark Matte Laptop Chassis Material
    const laptopChassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.25,
      metalness: 0.65,
    });

    // Dark Titanium Mechanics
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.22,
      metalness: 0.88,
    });

    // Polished Chrome Joints
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.06,
      metalness: 0.96,
    });

    // High-Gloss Deep Black Obsidian Visor Screen Glass
    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x020408,
      roughness: 0.02,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    // Radiant Glowing Mint / Emerald Green (Eyes, Smile, Antenna Bulb, Ear Rings, Reactor Core, Shin Lights)
    const greenGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f59b,
    });

    // Deep Mint Green for depth
    const deepGreenMaterial = new THREE.MeshBasicMaterial({
      color: 0x059669,
    });

    // Pure Glowing Emerald (Status LEDs & Leaf Emblem)
    const emeraldGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
    });

    // Eye Specular Highlight Material (Pure Crisp White Reflection)
    const eyeHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Soft Screen Sheen Specular Reflection
    const screenReflectionMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.20,
      blending: THREE.AdditiveBlending,
    });

    // Cute Rosy Cheek Blush Material (Soft Glowing Peach/Coral)
    const pinkBlushMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7a8a,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    // Emissive Green Material for Standard Shading
    const greenEmissiveMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f59b,
      emissive: 0x00d284,
      emissiveIntensity: 4.8,
      roughness: 0.08,
    });

    // Rocket Thruster Fire Flame Materials (Emerald/Mint Ion Discharge + Warm Core)
    const flameCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xfffbeb,
      transparent: true,
      opacity: 0.95,
    });

    const flameInnerMaterial = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 4.5,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
    });

    const flameOuterMaterial = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x047857,
      emissiveIntensity: 3.5,
      transparent: true,
      opacity: 0.65,
      roughness: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const flameHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f59b,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    // Aerodynamic Air Glow / Speed Trail Material
    const aeroTrailMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Nitro Outer Ion Halo Flame Material (Emerald edge ion discharge)
    const nitroHaloMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    // --- 4. 3D ROBOT GEOMETRY HIERARCHY ---
    const robotRoot = new THREE.Group();
    robotRoot.scale.set(0.78, 0.78, 0.78);
    scene.add(robotRoot);

    const bobGroup = new THREE.Group();
    robotRoot.add(bobGroup);

    // ==================== A. TORSO & CHASSIS (FRIENDLY ROBOT DESIGN) ====================
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 1.38, 0);
    bobGroup.add(torsoGroup);

    // 1. Glossy White Curved Upper Chest Carapace
    const chestGeom = new THREE.CapsuleGeometry(0.44, 0.42, 24, 40);
    const chestMesh = new THREE.Mesh(chestGeom, armorMaterial);
    chestMesh.scale.set(1.04, 1.05, 0.94);
    torsoGroup.add(chestMesh);

    // 2. Glossy Slate / Dark Collar Joint Ring
    const collarGeom = new THREE.CylinderGeometry(0.40, 0.44, 0.12, 36);
    const collar = new THREE.Mesh(collarGeom, slateJointMaterial);
    collar.position.set(0, 0.32, 0);
    torsoGroup.add(collar);

    // 3. Iconic Circular Arc Reactor (Dark Bezel Ring + Glowing Emerald Green Ring)
    const reactorMount = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.03, 36),
      slateJointMaterial
    );
    reactorMount.position.set(0, 0.09, 0.44);
    reactorMount.rotation.x = Math.PI / 2;
    torsoGroup.add(reactorMount);

    // Dark Titanium Outer Ring
    const reactorBezel = new THREE.Mesh(
      new THREE.TorusGeometry(0.108, 0.016, 20, 36),
      titaniumMaterial
    );
    reactorBezel.position.set(0, 0.09, 0.452);
    torsoGroup.add(reactorBezel);

    // Glowing Vibrant Emerald/Mint Green Ring
    const reactorGreenRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.082, 0.022, 20, 36),
      greenGlowMaterial
    );
    reactorGreenRing.position.set(0, 0.09, 0.458);
    torsoGroup.add(reactorGreenRing);

    // Dark Inner Core Center
    const reactorCenter = new THREE.Mesh(
      new THREE.CircleGeometry(0.058, 32),
      blackGlossMaterial
    );
    reactorCenter.position.set(0, 0.09, 0.462);
    torsoGroup.add(reactorCenter);

    // 4. Sleek Aerodynamic Underchassis (Slate Mechanical Connector to Pelvis)
    const waistGeom = new THREE.CylinderGeometry(0.36, 0.32, 0.20, 36);
    const waistMesh = new THREE.Mesh(waistGeom, slateJointMaterial);
    waistMesh.position.set(0, -0.22, 0);
    torsoGroup.add(waistMesh);

    // 5. Glossy White Rounded Pelvis Brief
    const pelvisGeom = new THREE.CylinderGeometry(0.35, 0.26, 0.18, 32);
    const pelvis = new THREE.Mesh(pelvisGeom, armorMaterial);
    pelvis.position.set(0, -0.36, 0);
    torsoGroup.add(pelvis);

    // ==================== B. ROBOT HEAD, VISOR, ANTENNA, SMILING EYES & HEADPHONE EARS ====================
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.54, 0);
    torsoGroup.add(headPivot);

    // Slate / Dark Segmented Neck Joint
    const neckPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.14, 32), slateJointMaterial);
    neckPiston.position.set(0, 0.05, 0);
    headPivot.add(neckPiston);

    const neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.165, 0.016, 18, 32), chromeMaterial);
    neckRing.position.set(0, 0.06, 0);
    neckRing.rotation.x = Math.PI / 2;
    headPivot.add(neckRing);

    // 1. Glossy White Big Cute Spherical Helmet Dome (Ultra-smooth seamless white face)
    const helmetGeom = new THREE.SphereGeometry(0.56, 48, 40);
    const helmet = new THREE.Mesh(helmetGeom, armorMaterial);
    helmet.position.set(0, 0.44, 0);
    helmet.scale.set(1.06, 1.02, 1.04);
    headPivot.add(helmet);

    // 2. TOP SLANTED ANTENNA WITH GLOWING GREEN SPHERE (EXACT AS IMAGE)
    const antennaGroup = new THREE.Group();
    antennaGroup.position.set(-0.25, 0.88, 0.06);
    antennaGroup.rotation.z = 0.42;
    antennaGroup.rotation.x = -0.16;
    headPivot.add(antennaGroup);

    // Antenna Base Socket
    const antBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.055, 0.05, 24),
      slateJointMaterial
    );
    antennaGroup.add(antBase);

    // Antenna Dark Stem
    const antStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.022, 0.022, 0.34, 24),
      titaniumMaterial
    );
    antStem.position.set(0, 0.18, 0);
    antennaGroup.add(antStem);

    // Glowing Bright Emerald Green Bulb / Sphere on Antenna Tip
    const antBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.088, 32, 32),
      greenGlowMaterial
    );
    antBulb.position.set(0, 0.36, 0);
    antennaGroup.add(antBulb);

    // Bulb Specular Glow Point
    const antBulbCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 16, 16),
      eyeHighlightMaterial
    );
    antBulbCore.position.set(0.02, 0.38, 0.04);
    antennaGroup.add(antBulbCore);

    // ==================== CUTE GLOWING MINT GREEN HAPPY SMILING EYES (^_^) ====================
    // Dual Cute Recessed Ocular Sockets + Glowing High-Contrast Arched Eyes
    const eyeArcGeom = new THREE.TorusGeometry(0.075, 0.022, 20, 36, Math.PI * 0.98);
    const eyeArcCoreGeom = new THREE.TorusGeometry(0.075, 0.012, 16, 32, Math.PI * 0.98);
    const eyeSocketBezelGeom = new THREE.TorusGeometry(0.098, 0.014, 18, 36);
    const eyeSocketBackGeom = new THREE.CircleGeometry(0.095, 32);

    // Left Eye Socket & Glowing Eye
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.19, 0.44, 0.565);
    leftEyeGroup.rotation.y = 0.20;
    leftEyeGroup.rotation.x = -0.06;
    headPivot.add(leftEyeGroup);

    // Dark high-contrast backing so eyes POP cleanly against white ceramic
    const leftSocketBack = new THREE.Mesh(eyeSocketBackGeom, blackGlossMaterial);
    leftSocketBack.position.set(0, 0, -0.004);
    leftEyeGroup.add(leftSocketBack);

    const leftSocketBezel = new THREE.Mesh(eyeSocketBezelGeom, slateJointMaterial);
    leftSocketBezel.position.set(0, 0, -0.002);
    leftEyeGroup.add(leftSocketBezel);

    const leftEyeArc = new THREE.Mesh(eyeArcGeom, greenGlowMaterial);
    leftEyeArc.rotation.z = Math.PI * 0.02;
    leftEyeGroup.add(leftEyeArc);

    const leftEyeArcCore = new THREE.Mesh(eyeArcCoreGeom, eyeHighlightMaterial);
    leftEyeArcCore.position.set(0, 0, 0.006);
    leftEyeArcCore.rotation.z = Math.PI * 0.02;
    leftEyeGroup.add(leftEyeArcCore);

    // Cute catchlight sparkle highlight
    const leftSparkle = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      eyeHighlightMaterial
    );
    leftSparkle.position.set(0.038, 0.042, 0.010);
    leftEyeGroup.add(leftSparkle);

    // Right Eye Socket & Glowing Eye
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.19, 0.44, 0.565);
    rightEyeGroup.rotation.y = -0.20;
    rightEyeGroup.rotation.x = -0.06;
    headPivot.add(rightEyeGroup);

    const rightSocketBack = new THREE.Mesh(eyeSocketBackGeom, blackGlossMaterial);
    rightSocketBack.position.set(0, 0, -0.004);
    rightEyeGroup.add(rightSocketBack);

    const rightSocketBezel = new THREE.Mesh(eyeSocketBezelGeom, slateJointMaterial);
    rightSocketBezel.position.set(0, 0, -0.002);
    rightEyeGroup.add(rightSocketBezel);

    const rightEyeArc = new THREE.Mesh(eyeArcGeom, greenGlowMaterial);
    rightEyeArc.rotation.z = -Math.PI * 0.02;
    rightEyeGroup.add(rightEyeArc);

    const rightEyeArcCore = new THREE.Mesh(eyeArcCoreGeom, eyeHighlightMaterial);
    rightEyeArcCore.position.set(0, 0, 0.006);
    rightEyeArcCore.rotation.z = -Math.PI * 0.02;
    rightEyeGroup.add(rightEyeArcCore);

    // Cute catchlight sparkle highlight
    const rightSparkle = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      eyeHighlightMaterial
    );
    rightSparkle.position.set(0.038, 0.042, 0.010);
    rightEyeGroup.add(rightSparkle);

    // ==================== CUTE GLOWING MINT GREEN SMILE MOUTH (‿) ====================
    const mouthArcGeom = new THREE.TorusGeometry(0.050, 0.018, 18, 32, Math.PI * 0.92);
    
    // Subtle dark backing for mouth definition
    const mouthBack = new THREE.Mesh(
      new THREE.TorusGeometry(0.052, 0.020, 16, 28, Math.PI * 0.92),
      slateJointMaterial
    );
    mouthBack.position.set(0, 0.315, 0.580);
    mouthBack.rotation.z = Math.PI;
    mouthBack.rotation.x = -0.08;
    headPivot.add(mouthBack);

    const smileMouth = new THREE.Mesh(mouthArcGeom, greenGlowMaterial);
    smileMouth.position.set(0, 0.315, 0.584);
    smileMouth.rotation.z = Math.PI; // Opening upwards as a cheerful smile ‿
    smileMouth.rotation.x = -0.08;
    headPivot.add(smileMouth);

    // Animated Digital Eyebrows
    const eyebrowGeom = new THREE.CapsuleGeometry(0.016, 0.068, 10, 16);

    const leftEyebrow = new THREE.Mesh(eyebrowGeom, greenGlowMaterial);
    leftEyebrow.position.set(-0.19, 0.59, 0.548);
    leftEyebrow.rotation.z = 1.35;
    leftEyebrow.rotation.x = -0.28;
    leftEyebrow.rotation.y = 0.20;
    headPivot.add(leftEyebrow);

    const rightEyebrow = new THREE.Mesh(eyebrowGeom, greenGlowMaterial);
    rightEyebrow.position.set(0.19, 0.59, 0.548);
    rightEyebrow.rotation.z = -1.35;
    rightEyebrow.rotation.x = -0.28;
    rightEyebrow.rotation.y = -0.20;
    headPivot.add(rightEyebrow);

    // Soft Cute Rosy Cheeks (Coral / Pink Glow)
    const blushGeom = new THREE.CircleGeometry(0.054, 28);
    const leftBlush = new THREE.Mesh(blushGeom, pinkBlushMaterial);
    leftBlush.position.set(-0.27, 0.32, 0.535);
    leftBlush.rotation.y = 0.32;
    leftBlush.scale.set(1.2, 0.75, 1);
    headPivot.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeom, pinkBlushMaterial);
    rightBlush.position.set(0.27, 0.32, 0.535);
    rightBlush.rotation.y = -0.32;
    rightBlush.scale.set(1.2, 0.75, 1);
    headPivot.add(rightBlush);

    // 4. Large Circular Headphone Ear Pods with Glowing Neon Green Ring Lights
    const earPodGeom = new THREE.CylinderGeometry(0.23, 0.23, 0.12, 32);
    const earInnerGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.05, 32);
    const earCenterCapGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.06, 24);
    const earNeonRingGeom = new THREE.TorusGeometry(0.155, 0.026, 16, 32);

    // Left Ear Headphone
    const leftEar = new THREE.Mesh(earPodGeom, armorMaterial);
    leftEar.position.set(-0.57, 0.44, 0);
    leftEar.rotation.z = Math.PI / 2;
    headPivot.add(leftEar);

    const leftEarInner = new THREE.Mesh(earInnerGeom, slateJointMaterial);
    leftEarInner.position.set(-0.62, 0.44, 0);
    leftEarInner.rotation.z = Math.PI / 2;
    headPivot.add(leftEarInner);

    const leftEarCap = new THREE.Mesh(earCenterCapGeom, chromeMaterial);
    leftEarCap.position.set(-0.64, 0.44, 0);
    leftEarCap.rotation.z = Math.PI / 2;
    headPivot.add(leftEarCap);

    // Glowing Neon Green Ear Ring
    const leftEarNeonRing = new THREE.Mesh(earNeonRingGeom, greenGlowMaterial);
    leftEarNeonRing.position.set(-0.635, 0.44, 0);
    leftEarNeonRing.rotation.y = Math.PI / 2;
    headPivot.add(leftEarNeonRing);

    // Right Ear Headphone
    const rightEar = new THREE.Mesh(earPodGeom, armorMaterial);
    rightEar.position.set(0.57, 0.44, 0);
    rightEar.rotation.z = Math.PI / 2;
    headPivot.add(rightEar);

    const rightEarInner = new THREE.Mesh(earInnerGeom, slateJointMaterial);
    rightEarInner.position.set(0.62, 0.44, 0);
    rightEarInner.rotation.z = Math.PI / 2;
    headPivot.add(rightEarInner);

    const rightEarCap = new THREE.Mesh(earCenterCapGeom, chromeMaterial);
    rightEarCap.position.set(0.64, 0.44, 0);
    rightEarCap.rotation.z = Math.PI / 2;
    headPivot.add(rightEarCap);

    // Glowing Neon Green Ear Ring
    const rightEarNeonRing = new THREE.Mesh(earNeonRingGeom, greenGlowMaterial);
    rightEarNeonRing.position.set(0.635, 0.44, 0);
    rightEarNeonRing.rotation.y = Math.PI / 2;
    headPivot.add(rightEarNeonRing);

    // ==================== C. ARTICULATED ARMS, HANDS & HIGH-TECH ECO LAPTOP ====================
    const shoulderBallGeom = new THREE.SphereGeometry(0.12, 20, 20);
    const pauldronGeom = new THREE.SphereGeometry(0.17, 18, 18, 0, Math.PI * 2, 0, Math.PI / 1.8);
    const limbBicepGeom = new THREE.CylinderGeometry(0.082, 0.074, 0.26, 18);
    const gauntletGeom = new THREE.CapsuleGeometry(0.088, 0.22, 12, 18);

    // Left Arm
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.52, 0.22, 0);
    torsoGroup.add(leftShoulder);

    const leftShoulderBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    leftShoulder.add(leftShoulderBall);

    const leftPauldron = new THREE.Mesh(pauldronGeom, armorMaterial);
    leftPauldron.position.set(-0.04, 0.05, 0);
    leftShoulder.add(leftPauldron);

    // Glowing Green Shoulder Trim Ring
    const leftShoulderGlow = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.014, 12, 24), greenGlowMaterial);
    leftShoulderGlow.position.set(0, -0.06, 0);
    leftShoulderGlow.rotation.x = Math.PI / 2;
    leftShoulder.add(leftShoulderGlow);

    const leftBicep = new THREE.Mesh(limbBicepGeom, armorMaterial);
    leftBicep.position.set(0, -0.20, 0);
    leftShoulder.add(leftBicep);

    const leftElbow = new THREE.Group();
    leftElbow.position.set(0, -0.34, 0);
    leftShoulder.add(leftElbow);

    const leftElbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 16), slateJointMaterial);
    leftElbowJoint.rotation.z = Math.PI / 2;
    leftElbow.add(leftElbowJoint);

    const leftElbowPin = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), chromeMaterial);
    leftElbowJoint.add(leftElbowPin);

    const leftGauntlet = new THREE.Mesh(gauntletGeom, armorMaterial);
    leftGauntlet.position.set(0, -0.18, 0);
    leftElbow.add(leftGauntlet);

    // Glowing Green Wrist Ring
    const leftWristGlow = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.012, 12, 24), greenGlowMaterial);
    leftWristGlow.position.set(0, -0.28, 0);
    leftWristGlow.rotation.x = Math.PI / 2;
    leftElbow.add(leftWristGlow);

    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(0, -0.34, 0);
    leftElbow.add(leftHandGroup);

    const leftPalm = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 0.11), slateJointMaterial);
    leftHandGroup.add(leftPalm);

    const leftBackplate = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.035), armorMaterial);
    leftBackplate.position.set(0, 0, -0.05);
    leftHandGroup.add(leftBackplate);

    // 4 Articulated Fingers (Typing / resting posture)
    for (let f = 0; f < 4; f++) {
      const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.055, 8, 10), armorMaterial);
      finger.position.set((f - 1.5) * 0.028, -0.075, 0.02);
      leftHandGroup.add(finger);
    }
    const leftThumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.020, 0.045, 8, 10), armorMaterial);
    leftThumb.position.set(0.055, -0.035, 0.03);
    leftThumb.rotation.z = -0.55;
    leftHandGroup.add(leftThumb);

    // Right Arm
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.52, 0.22, 0);
    torsoGroup.add(rightShoulder);

    const rightShoulderBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    rightShoulder.add(rightShoulderBall);

    const rightPauldron = new THREE.Mesh(pauldronGeom, armorMaterial);
    rightPauldron.position.set(0.04, 0.05, 0);
    rightShoulder.add(rightPauldron);

    // Glowing Green Shoulder Trim Ring
    const rightShoulderGlow = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.014, 12, 24), greenGlowMaterial);
    rightShoulderGlow.position.set(0, -0.06, 0);
    rightShoulderGlow.rotation.x = Math.PI / 2;
    rightShoulder.add(rightShoulderGlow);

    const rightBicep = new THREE.Mesh(limbBicepGeom, armorMaterial);
    rightBicep.position.set(0, -0.20, 0);
    rightShoulder.add(rightBicep);

    const rightElbow = new THREE.Group();
    rightElbow.position.set(0, -0.34, 0);
    rightShoulder.add(rightElbow);

    const rightElbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.05, 16), slateJointMaterial);
    rightElbowJoint.rotation.z = Math.PI / 2;
    rightElbow.add(rightElbowJoint);

    const rightElbowPin = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), chromeMaterial);
    rightElbowJoint.add(rightElbowPin);

    const rightGauntlet = new THREE.Mesh(gauntletGeom, armorMaterial);
    rightGauntlet.position.set(0, -0.18, 0);
    rightElbow.add(rightGauntlet);

    // Glowing Green Wrist Ring
    const rightWristGlow = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.012, 12, 24), greenGlowMaterial);
    rightWristGlow.position.set(0, -0.28, 0);
    rightWristGlow.rotation.x = Math.PI / 2;
    rightElbow.add(rightWristGlow);

    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0, -0.34, 0);
    rightElbow.add(rightHandGroup);

    const rightPalm = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 0.11), slateJointMaterial);
    rightHandGroup.add(rightPalm);

    const rightBackplate = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.035), armorMaterial);
    rightBackplate.position.set(0, 0, -0.06);
    rightHandGroup.add(rightBackplate);

    // 4 Articulated Fingers
    for (let f = 0; f < 4; f++) {
      const finger = new THREE.Mesh(new THREE.CapsuleGeometry(0.018, 0.055, 8, 10), armorMaterial);
      finger.position.set((f - 1.5) * 0.028, -0.075, 0.02);
      rightHandGroup.add(finger);
    }
    const rightThumb = new THREE.Mesh(new THREE.CapsuleGeometry(0.020, 0.045, 8, 10), armorMaterial);
    rightThumb.position.set(-0.055, -0.035, 0.03);
    rightThumb.rotation.z = 0.55;
    rightHandGroup.add(rightThumb);

    // ==================== SLIM HIGH-TECH LAPTOP WITH GLOWING GREEN LEAF LOGO ====================
    // Canvas texture for the laptop lid featuring the iconic double-leaf sprout logo
    const laptopLidCanvas = document.createElement('canvas');
    laptopLidCanvas.width = 512;
    laptopLidCanvas.height = 360;
    const lCtx = laptopLidCanvas.getContext('2d')!;

    // Dark sleek laptop chassis background
    lCtx.fillStyle = '#334155';
    lCtx.fillRect(0, 0, 512, 360);

    // Subtle edge rim border
    lCtx.strokeStyle = '#475569';
    lCtx.lineWidth = 6;
    lCtx.strokeRect(8, 8, 496, 344);

    // Glowing Neon Green Leaf Emblem in Center
    lCtx.save();
    lCtx.translate(256, 180);

    // Left Leaf (Organic Curved Teardrop)
    lCtx.fillStyle = '#00f59b';
    lCtx.shadowColor = '#00f59b';
    lCtx.shadowBlur = 18;
    lCtx.beginPath();
    lCtx.moveTo(0, 35);
    lCtx.bezierCurveTo(-35, 20, -65, -35, -25, -70);
    lCtx.bezierCurveTo(5, -30, -5, 10, 0, 35);
    lCtx.closePath();
    lCtx.fill();

    // Right Leaf (Larger Upright Teardrop)
    lCtx.fillStyle = '#10b981';
    lCtx.beginPath();
    lCtx.moveTo(0, 35);
    lCtx.bezierCurveTo(30, 20, 75, -25, 45, -80);
    lCtx.bezierCurveTo(15, -45, 5, 0, 0, 35);
    lCtx.closePath();
    lCtx.fill();

    // Center Sprout Stem
    lCtx.strokeStyle = '#34d399';
    lCtx.lineWidth = 6;
    lCtx.beginPath();
    lCtx.moveTo(0, 35);
    lCtx.quadraticCurveTo(0, 55, -8, 65);
    lCtx.stroke();

    lCtx.restore();

    const laptopLidTexture = new THREE.CanvasTexture(laptopLidCanvas);
    const laptopLidMat = new THREE.MeshStandardMaterial({
      map: laptopLidTexture,
      roughness: 0.25,
      metalness: 0.7,
    });

    // Laptop Assembly Group
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-0.10, 0.02, 0.44);
    laptopGroup.rotation.x = -0.45;
    laptopGroup.rotation.y = 0.35;
    laptopGroup.rotation.z = -0.10;
    torsoGroup.add(laptopGroup);

    // 1. Laptop Base / Keyboard Deck
    const laptopBaseGeom = new THREE.BoxGeometry(0.50, 0.02, 0.36);
    const laptopBaseMesh = new THREE.Mesh(laptopBaseGeom, laptopChassisMaterial);
    laptopGroup.add(laptopBaseMesh);

    // Keyboard Bed & Keys
    const keyboardBed = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.005, 0.20),
      slateJointMaterial
    );
    keyboardBed.position.set(0, 0.012, -0.04);
    laptopGroup.add(keyboardBed);

    // Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.004, 0.09),
      titaniumMaterial
    );
    trackpad.position.set(0, 0.012, 0.10);
    laptopGroup.add(trackpad);

    // 2. Laptop Upright Display Lid (Angled back ~105 degrees)
    const laptopScreenGroup = new THREE.Group();
    laptopScreenGroup.position.set(0, 0.01, -0.175);
    laptopScreenGroup.rotation.x = -1.75; // Angled open display
    laptopGroup.add(laptopScreenGroup);

    // Display Lid (Back facing camera with glowing leaf logo)
    const laptopLidMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.50, 0.36, 0.016),
      laptopLidMat
    );
    laptopLidMesh.position.set(0, 0.175, 0);
    laptopScreenGroup.add(laptopLidMesh);

    // Inner Glowing Screen (Facing Robot's eyes)
    const laptopInnerScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.46, 0.32),
      new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.85 })
    );
    laptopInnerScreen.position.set(0, 0.175, -0.01);
    laptopInnerScreen.rotation.y = Math.PI;
    laptopScreenGroup.add(laptopInnerScreen);

    // ==================== D. ARTICULATED LEGS, SHIN NEON LIGHTS & BOOTS ====================
    const thighGeom = new THREE.CapsuleGeometry(0.12, 0.26, 12, 18);
    const shinGeom = new THREE.CylinderGeometry(0.11, 0.13, 0.32, 18);

    // Left Leg
    const leftHip = new THREE.Group();
    leftHip.position.set(-0.24, 0.96, 0);
    bobGroup.add(leftHip);

    const leftHipBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    leftHip.add(leftHipBall);

    const leftThigh = new THREE.Mesh(thighGeom, armorMaterial);
    leftThigh.position.set(0, -0.23, 0);
    leftHip.add(leftThigh);

    const leftKnee = new THREE.Group();
    leftKnee.position.set(0, -0.42, 0);
    leftHip.add(leftKnee);

    const leftKneeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 20), slateJointMaterial);
    leftKneeDisc.rotation.z = Math.PI / 2;
    leftKnee.add(leftKneeDisc);

    const leftKneePin = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), chromeMaterial);
    leftKneeDisc.add(leftKneePin);

    const leftShin = new THREE.Mesh(shinGeom, armorMaterial);
    leftShin.position.set(0, -0.22, 0);
    leftKnee.add(leftShin);

    // Glowing Emerald Green Vertical Indicator Capsule on Shin
    const leftShinLight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.018, 0.09, 8, 12),
      greenGlowMaterial
    );
    leftShinLight.position.set(0, -0.20, 0.125);
    leftKnee.add(leftShinLight);

    const leftAnkle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 18), slateJointMaterial);
    leftAnkle.position.set(0, -0.36, 0);
    leftKnee.add(leftAnkle);

    // Left Rounded Space Boot
    const leftBootGroup = new THREE.Group();
    leftBootGroup.position.set(0, -0.44, 0.08);
    leftKnee.add(leftBootGroup);

    const leftSneakerMain = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.17, 0.44),
      armorMaterial
    );
    leftBootGroup.add(leftSneakerMain);

    const leftToeCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      armorMaterial
    );
    leftToeCap.position.set(0, -0.01, 0.18);
    leftToeCap.rotation.x = Math.PI / 2;
    leftBootGroup.add(leftToeCap);

    // Glowing Emerald Green Sole Edge Light Ring
    const leftBootSoleGlow = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.020, 0.16, 8, 12),
      greenGlowMaterial
    );
    leftBootSoleGlow.position.set(0, -0.08, 0.14);
    leftBootSoleGlow.rotation.z = Math.PI / 2;
    leftBootGroup.add(leftBootSoleGlow);

    // Thick White Sneaker Midsole
    const leftSole = new THREE.Mesh(
      new THREE.BoxGeometry(0.27, 0.045, 0.47),
      armorMaterial
    );
    leftSole.position.set(0, -0.09, 0.01);
    leftBootGroup.add(leftSole);

    // Slate Rubber Bottom Runner Outsole
    const leftOutsole = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.018, 0.46),
      slateJointMaterial
    );
    leftOutsole.position.set(0, -0.115, 0.01);
    leftBootGroup.add(leftOutsole);

    // ================= 3D ROCKET FLAME THRUSTER (LEFT BOOT SOLE) =================
    const leftNitroGroup = new THREE.Group();
    leftNitroGroup.position.set(0, -0.02, 0);
    leftOutsole.add(leftNitroGroup);

    const nozzleGeom = new THREE.TorusGeometry(0.07, 0.016, 12, 20);
    const leftNozzle = new THREE.Mesh(nozzleGeom, slateJointMaterial);
    leftNozzle.rotation.x = Math.PI / 2;
    leftNitroGroup.add(leftNozzle);

    const outerPlumeGeom = new THREE.ConeGeometry(0.078, 0.38, 16, 1, true);
    const leftOuterPlume = new THREE.Mesh(outerPlumeGeom, flameOuterMaterial);
    leftOuterPlume.position.set(0, -0.19, 0);
    leftOuterPlume.rotation.x = Math.PI;
    leftNitroGroup.add(leftOuterPlume);

    const innerFlameGeom = new THREE.ConeGeometry(0.052, 0.28, 14);
    const leftInnerFlame = new THREE.Mesh(innerFlameGeom, flameInnerMaterial);
    leftInnerFlame.position.set(0, -0.14, 0);
    leftInnerFlame.rotation.x = Math.PI;
    leftNitroGroup.add(leftInnerFlame);

    const innerCoreGeom = new THREE.ConeGeometry(0.028, 0.16, 12);
    const leftInnerCore = new THREE.Mesh(innerCoreGeom, flameCoreMaterial);
    leftInnerCore.position.set(0, -0.08, 0);
    leftInnerCore.rotation.x = Math.PI;
    leftNitroGroup.add(leftInnerCore);

    leftNitroGroup.scale.set(0, 0, 0);
    leftNitroGroup.visible = false;

    // Right Leg
    const rightHip = new THREE.Group();
    rightHip.position.set(0.24, 0.96, 0);
    bobGroup.add(rightHip);

    const rightHipBall = new THREE.Mesh(shoulderBallGeom, slateJointMaterial);
    rightHip.add(rightHipBall);

    const rightThigh = new THREE.Mesh(thighGeom, armorMaterial);
    rightThigh.position.set(0, -0.23, 0);
    rightHip.add(rightThigh);

    const rightKnee = new THREE.Group();
    rightKnee.position.set(0, -0.42, 0);
    rightHip.add(rightKnee);

    const rightKneeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 20), slateJointMaterial);
    rightKneeDisc.rotation.z = Math.PI / 2;
    rightKnee.add(rightKneeDisc);

    const rightKneePin = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), chromeMaterial);
    rightKneeDisc.add(rightKneePin);

    const rightShin = new THREE.Mesh(shinGeom, armorMaterial);
    rightShin.position.set(0, -0.22, 0);
    rightKnee.add(rightShin);

    // Glowing Emerald Green Vertical Indicator Capsule on Shin
    const rightShinLight = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.018, 0.09, 8, 12),
      greenGlowMaterial
    );
    rightShinLight.position.set(0, -0.20, 0.125);
    rightKnee.add(rightShinLight);

    const rightAnkle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 18), slateJointMaterial);
    rightAnkle.position.set(0, -0.36, 0);
    rightKnee.add(rightAnkle);

    // Right Rounded Space Boot
    const rightBootGroup = new THREE.Group();
    rightBootGroup.position.set(0, -0.44, 0.08);
    rightKnee.add(rightBootGroup);

    const rightSneakerMain = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.17, 0.44),
      armorMaterial
    );
    rightBootGroup.add(rightSneakerMain);

    const rightToeCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      armorMaterial
    );
    rightToeCap.position.set(0, -0.01, 0.18);
    rightToeCap.rotation.x = Math.PI / 2;
    rightBootGroup.add(rightToeCap);

    // Glowing Emerald Green Sole Edge Light Ring
    const rightBootSoleGlow = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.020, 0.16, 8, 12),
      greenGlowMaterial
    );
    rightBootSoleGlow.position.set(0, -0.08, 0.14);
    rightBootSoleGlow.rotation.z = Math.PI / 2;
    rightBootGroup.add(rightBootSoleGlow);

    // Thick White Sneaker Midsole
    const rightSole = new THREE.Mesh(
      new THREE.BoxGeometry(0.27, 0.045, 0.47),
      armorMaterial
    );
    rightSole.position.set(0, -0.09, 0.01);
    rightBootGroup.add(rightSole);

    // Slate Rubber Bottom Runner Outsole
    const rightOutsole = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.018, 0.46),
      slateJointMaterial
    );
    rightOutsole.position.set(0, -0.115, 0.01);
    rightBootGroup.add(rightOutsole);

    // ================= 3D ROCKET FLAME THRUSTER (RIGHT BOOT SOLE) =================
    const rightNitroGroup = new THREE.Group();
    rightNitroGroup.position.set(0, -0.02, 0);
    rightOutsole.add(rightNitroGroup);

    const rightNozzle = new THREE.Mesh(nozzleGeom, slateJointMaterial);
    rightNozzle.rotation.x = Math.PI / 2;
    rightNitroGroup.add(rightNozzle);

    const rightOuterPlume = new THREE.Mesh(outerPlumeGeom, flameOuterMaterial);
    rightOuterPlume.position.set(0, -0.19, 0);
    rightOuterPlume.rotation.x = Math.PI;
    rightNitroGroup.add(rightOuterPlume);

    const rightInnerFlame = new THREE.Mesh(innerFlameGeom, flameInnerMaterial);
    rightInnerFlame.position.set(0, -0.14, 0);
    rightInnerFlame.rotation.x = Math.PI;
    rightNitroGroup.add(rightInnerFlame);

    const rightInnerCore = new THREE.Mesh(innerCoreGeom, flameCoreMaterial);
    rightInnerCore.position.set(0, -0.08, 0);
    rightInnerCore.rotation.x = Math.PI;
    rightNitroGroup.add(rightInnerCore);

    rightNitroGroup.scale.set(0, 0, 0);
    rightNitroGroup.visible = false;

    // ==================== E. SOFT AERODYNAMIC AIR GLOW & SPEED STREAMLINES ====================
    const aeroGroup = new THREE.Group();
    bobGroup.add(aeroGroup);

    // 1. Soft Streamlined Cylinder Aura Envelope around body
    const aeroAuraGeom = new THREE.CylinderGeometry(0.55, 0.62, 1.8, 20, 1, true);
    const aeroAuraMesh = new THREE.Mesh(aeroAuraGeom, aeroTrailMaterial);
    aeroAuraMesh.position.set(0, 1.15, 0);
    aeroGroup.add(aeroAuraMesh);

    // 2. Dynamic Streamline Ribbons (Subtle glowing air trails flanking the robot during flight)
    const streamlineGeom = new THREE.PlaneGeometry(0.04, 1.4);
    const trailPositions = [
      { x: -0.52, y: 1.4, z: 0.15 },
      { x: 0.52, y: 1.4, z: 0.15 },
      { x: -0.38, y: 1.6, z: -0.25 },
      { x: 0.38, y: 1.6, z: -0.25 },
      { x: 0.0, y: 1.8, z: -0.32 },
    ];

    const trailMeshes: THREE.Mesh[] = [];
    trailPositions.forEach((pos) => {
      const trail = new THREE.Mesh(streamlineGeom, aeroTrailMaterial);
      trail.position.set(pos.x, pos.y, pos.z);
      aeroGroup.add(trail);
      trailMeshes.push(trail);
    });

    aeroGroup.visible = false;

    // ==================== E. GROUND CONTACT SHADOW ====================
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const radGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radGrad.addColorStop(0, 'rgba(2, 6, 23, 0.85)');
    radGrad.addColorStop(0.35, 'rgba(6, 78, 59, 0.3)');
    radGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.15)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.6), shadowMat);
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

      // Mathematical Sole Elevation Offset:
      // In 220x160 canvas with camera at y=1.20, fov=36 deg, z=6.4, looking at y=1.15:
      // The bottom outsole plane of the robot's boots projects to exactly Y = 128px from the canvas top.
      // Setting feetOffset = 128 ensures the boot soles touch down flush against the top border lines.
      const feetOffset = 128;
      const centerShift = 110; // (220 / 2) exact horizontal center of robot canvas
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

      // Top border line of the SMART SYSTEMS badge (div)
      const badgeY = bRect.top - cRect.top - feetOffset;
      const badgeStartX = bRect.left - cRect.left + (isMobile ? 28 : 22) - centerShift;
      const badgeEndX = bRect.right - cRect.left - 24 - centerShift;

      // Top border line of the ENGINEERING heading (span)
      const engY = eRect.top - cRect.top - feetOffset;
      const engStartX = eRect.left - cRect.left + (isMobile ? 22 : 20) - centerShift;
      
      let engEndX = eRect.right - cRect.left - 30 - centerShift;
      if (isMobile) {
        // Prevent robot canvas from extending beyond screen/container on mobile viewports
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

    // TOTAL LOOP DURATION: 13.6 SECONDS
    // 0.0s -> 3.8s: Walk across SMART SYSTEMS badge (div) top border (Left to Right)
    // 3.8s -> 4.2s: Crouch anticipation at right edge of SMART SYSTEMS badge (badgeEnd)
    // 4.2s -> 5.4s: High Parabolic Jump Arc directly from SMART SYSTEMS end to the END of "ENGINEERING" (engEnd)
    // 5.4s -> 5.9s: Soft Landing & impact recovery on the END of "ENGINEERING"
    // 5.9s -> 9.2s: Turn directly towards user/screen (front-facing), waving "Hi" with smiling eyes & greeting bubble
    // 9.2s -> 9.9s: Levitation lift-off & Dual Rocket Thrusters ignition
    // 9.9s -> 12.6s: Authentic Superman flight arc returning from right to left (engEnd -> badgeStart)
    // 12.6s -> 13.6s: Retro-thruster deceleration & soft touchdown at starting position (badgeStart)
    const LOOP_DURATION = 13.6;

    // Rigid Quaternion definitions for pure 2D viewport alignment with clear visibility
    const quatWalk = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 3.4, 0, 'YXZ'));
    const quatFront = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0, 'YXZ')); // Directly facing user / screen
    const quatFaceLeft = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2.0, 0, 'YXZ'));

    // Authentic Superman Horizontal Flight Rotation Matrix:
    // Head (+Y) points straight in the direction of flight towards the LEFT -> World (-1, 0, 0)
    // Feet (-Y) trail straight behind towards the RIGHT -> World (+1, 0, 0) with rocket thrusters
    // Chest & Face (+Z) angle with 22-degree aerodynamic tilt toward viewer -> World (0, -sin(theta), cos(theta))
    // Lateral Right Side (+X) -> World (0, cos(theta), sin(theta))
    const thetaSuperman = 0.38; // ~22 degrees aerodynamic angle toward camera for full facial & chest visibility
    const cosS = Math.cos(thetaSuperman);
    const sinS = Math.sin(thetaSuperman);
    const matSuperman = new THREE.Matrix4().set(
      0,    -1,     0, 0,
      cosS,  0, -sinS, 0,
      sinS,  0,  cosS, 0,
      0,     0,     0, 1
    );
    const quatSuperman = new THREE.Quaternion().setFromRotationMatrix(matSuperman);
    const targetQuat = new THREE.Quaternion();

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

      // Animation mode flags
      let isWalking = false;
      let isJumping = false;
      let isLanding = false;
      let isWaving = false;
      let flyingActive = false;

      // "HI" bubble state trigger (shows when robot turns to user/screen between 5.9s and 9.2s)
      const shouldShowHi = t >= 5.9 && t <= 9.2;
      if (shouldShowHi !== lastShowHiRef.current) {
        lastShowHiRef.current = shouldShowHi;
        setShowHiBubble(shouldShowHi);
      }

      // Flight mode trigger for DOM speed effects (active during aerial flight)
      const shouldFlyEffect = t >= 9.2 && t <= 12.6;
      if (shouldFlyEffect !== lastIsFlyingRef.current) {
        lastIsFlyingRef.current = shouldFlyEffect;
        setIsFlying(shouldFlyEffect);
      }

      // ==================== LIFELIKE 2-EYE NATURAL BLINKING MECHANICS ====================
      const blinkPeriod = 3.5;
      const blinkTime = elapsed % blinkPeriod;
      let blinkScaleY = 1.0;
      let blinkScaleX = 1.0;

      if (blinkTime < 0.16) {
        // Primary natural blink (down to 0.04 closed eye slit and back up)
        const p = blinkTime / 0.16;
        blinkScaleY = Math.max(0.04, 1.0 - 0.96 * Math.sin(p * Math.PI));
        blinkScaleX = 1.0 + 0.12 * Math.sin(p * Math.PI);
      } else if (blinkTime > 0.30 && blinkTime < 0.44) {
        // Cute secondary micro-blink
        const p = (blinkTime - 0.30) / 0.14;
        blinkScaleY = Math.max(0.05, 1.0 - 0.92 * Math.sin(p * Math.PI));
        blinkScaleX = 1.0 + 0.09 * Math.sin(p * Math.PI);
      }

      // Base eye & eyebrow positioning
      if (t < 5.9 || t >= 9.2) {
        const blinkDip = (1.0 - blinkScaleY) * 0.025;
        leftEyebrow.position.set(-0.19, 0.59 - blinkDip, 0.548);
        rightEyebrow.position.set(0.19, 0.59 - blinkDip, 0.548);
        leftEyebrow.rotation.set(-0.3, 0.22, 1.35);
        rightEyebrow.rotation.set(-0.3, -0.22, -1.35);
        pinkBlushMaterial.opacity = 0.65;
        leftEyeGroup.scale.set(blinkScaleX, blinkScaleY, 1.0);
        rightEyeGroup.scale.set(blinkScaleX, blinkScaleY, 1.0);
      }

      if (t < 3.8) {
        // ==================== 1. WALKING ACROSS SMART SYSTEMS BADGE (DIV) BORDER ====================
        isWalking = true;
        const progress = t / 3.8;
        const smoothP = 0.5 - 0.5 * Math.cos(Math.PI * progress);
        currentX = THREE.MathUtils.lerp(targets.badgeStart.x, targets.badgeEnd.x, smoothP);
        currentY = targets.badgeStart.y;
        targetQuat.copy(quatWalk);
        targetPitchX = 0;
        torsoGroup.rotation.x = 0;

        // Ensure nitro thrusters are off during walking
        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
        leftNitroGroup.scale.set(0, 0, 0);
        rightNitroGroup.scale.set(0, 0, 0);
      } else if (t < 4.2) {
        // ==================== 2. TAKEOFF CROUCH ANTICIPATION AT END OF SMART SYSTEMS BADGE ====================
        currentX = targets.badgeEnd.x;
        currentY = targets.badgeEnd.y;
        targetQuat.copy(quatWalk);
        targetPitchX = 0;

        const crouchP = (t - 3.8) / 0.4;
        const crouchVal = Math.sin(Math.PI * crouchP);
        bobGroup.position.y = -crouchVal * 0.14;
        leftHip.rotation.x = -crouchVal * 0.45;
        rightHip.rotation.x = -crouchVal * 0.45;
        leftKnee.rotation.x = crouchVal * 0.75;
        rightKnee.rotation.x = crouchVal * 0.75;
        leftShoulder.rotation.x = crouchVal * 0.6;
        rightShoulder.rotation.x = crouchVal * 0.6;
        torsoGroup.rotation.x = 0;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 5.4) {
        // ==================== 3. HIGH PARABOLIC JUMP ARC DIRECTLY TO END OF "ENGINEERING" ====================
        isJumping = true;
        const jumpP = (t - 4.2) / 1.2;
        const smoothJump = 0.5 - 0.5 * Math.cos(Math.PI * jumpP);

        // Direct leap from badgeEnd to engEnd (End of ENGINEERING)
        currentX = THREE.MathUtils.lerp(targets.badgeEnd.x, targets.engEnd.x, smoothJump);

        const linearY = THREE.MathUtils.lerp(targets.badgeEnd.y, targets.engEnd.y, jumpP);
        const arcHeight = 48; // High, graceful jump arc
        const arcOffset = Math.sin(jumpP * Math.PI) * arcHeight;
        currentY = linearY - arcOffset;

        const jumpEuler = new THREE.Euler(0, THREE.MathUtils.lerp(Math.PI / 3.4, 0.08, jumpP), -Math.sin(jumpP * Math.PI) * 0.14, 'YXZ');
        targetQuat.setFromEuler(jumpEuler);
        targetPitchX = 0;

        const flightTuck = Math.sin(jumpP * Math.PI);
        leftHip.rotation.x = -0.38 * flightTuck;
        rightHip.rotation.x = -0.38 * flightTuck;
        leftKnee.rotation.x = 0.70 * flightTuck;
        rightKnee.rotation.x = 0.70 * flightTuck;
        leftShoulder.rotation.x = -0.55 * flightTuck;
        leftShoulder.rotation.z = 0.35 * flightTuck;
        rightShoulder.rotation.x = -0.55 * flightTuck;
        rightShoulder.rotation.z = -0.35 * flightTuck;
        headPivot.rotation.x = 0.15 * flightTuck;
        torsoGroup.rotation.x = 0;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 5.9) {
        // ==================== 4. SOFT LANDING & STABILIZATION ON END OF "ENGINEERING" ====================
        isLanding = true;
        currentX = targets.engEnd.x;
        currentY = targets.engEnd.y;

        const landP = (t - 5.4) / 0.5;
        // Smoothly rotate to face user/screen (front-facing)
        targetQuat.copy(quatWalk).slerp(quatFront, landP);
        targetPitchX = 0;

        const impactVal = Math.sin(Math.PI * landP) * (1 - landP * 0.5);
        bobGroup.position.y = -impactVal * 0.12;
        leftHip.rotation.x = -impactVal * 0.35;
        rightHip.rotation.x = -impactVal * 0.35;
        leftKnee.rotation.x = impactVal * 0.6;
        rightKnee.rotation.x = impactVal * 0.6;
        leftShoulder.rotation.x = impactVal * 0.4;
        rightShoulder.rotation.x = impactVal * 0.4;
        headPivot.rotation.x = -impactVal * 0.1;
        torsoGroup.rotation.x = 0;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 9.2) {
        // ==================== 5. FRONT-FACING GREETING: LOOK DIRECTLY AT USER/SCREEN & SAY "HI" ====================
        isWaving = true;
        currentX = targets.engEnd.x;
        currentY = targets.engEnd.y;

        // 100% Facing the user/screen directly (front view)
        targetQuat.copy(quatFront);
        targetPitchX = 0;

        // Cheerful arm wave directly visible to user
        rightShoulder.rotation.x = -2.10;
        rightShoulder.rotation.z = -0.42 + Math.sin(elapsed * 12.0) * 0.08;
        rightElbow.rotation.x = -0.25;
        rightElbow.rotation.z = Math.sin(elapsed * 14.0) * 0.65;
        rightHandGroup.rotation.z = Math.sin(elapsed * 14.0) * 0.35;

        // Left arm relaxed at side with gentle friendly stance
        leftShoulder.rotation.x = 0.08;
        leftShoulder.rotation.z = 0.20;
        leftElbow.rotation.x = -0.22;
        leftElbow.rotation.z = 0;

        // Inquisitive, cheerful head tilt facing straight towards user
        headPivot.rotation.z = Math.sin(elapsed * 4.5) * 0.12;
        headPivot.rotation.x = -0.02 + Math.cos(elapsed * 3.5) * 0.04;
        headPivot.rotation.y = Math.sin(elapsed * 2.5) * 0.05;

        // Happy smiling eye squash & cheerful wink looking right at user
        leftEyeGroup.scale.set(1.02, 0.94 + Math.sin(elapsed * 6.0) * 0.06, 1.0);
        rightEyeGroup.scale.set(1.02, 0.78 + Math.sin(elapsed * 6.0) * 0.22, 1.0);

        // Expressive animated cheerful eyebrows
        leftEyebrow.position.y = 0.59 + Math.sin(elapsed * 6.0) * 0.015;
        rightEyebrow.position.y = 0.57 + Math.sin(elapsed * 6.0) * 0.02;
        leftEyebrow.rotation.z = 1.40 + Math.sin(elapsed * 6.0) * 0.05;
        rightEyebrow.rotation.z = -1.25 + Math.sin(elapsed * 6.0) * 0.08;

        // Warm blushing pink cheek glow
        pinkBlushMaterial.opacity = 0.78 + Math.sin(elapsed * 8.0) * 0.20;

        // Stable standing legs on the end of ENGINEERING
        leftHip.rotation.x = 0;
        leftHip.rotation.z = 0.03;
        rightHip.rotation.x = 0;
        rightHip.rotation.z = -0.03;
        leftKnee.rotation.x = 0;
        rightKnee.rotation.x = 0;

        // Gentle breathing bobbing
        bobGroup.position.y = Math.sin(elapsed * 4.0) * 0.025;
        torsoGroup.rotation.x = 0;

        greenEmissiveMaterial.emissiveIntensity = 4.8 + Math.sin(elapsed * 8.0) * 1.5;

        leftNitroGroup.visible = false;
        rightNitroGroup.visible = false;
      } else if (t < 9.9) {
        // ==================== 6. TAKEOFF TRANSITION INTO SUPERMAN FLIGHT POSE ====================
        currentX = targets.engEnd.x;

        const prepP = (t - 9.2) / 0.7; // 0 to 1 smooth launch transition
        const smoothPrep = 0.5 - 0.5 * Math.cos(Math.PI * prepP);

        // Gentle levitation lift-off into the air
        currentY = THREE.MathUtils.lerp(targets.engEnd.y, targets.engEnd.y - 24, smoothPrep);

        // Smoothly rotate body from Front-facing "Hi" stance into horizontal Superman orientation (Head pointing LEFT towards destination)
        targetQuat.copy(quatFront).slerp(quatSuperman, smoothPrep);
        targetPitchX = 0;

        // 1. EXTEND LEADING RIGHT ARM STRAIGHT FORWARD PAST HEAD TOWARDS DESTINATION
        rightShoulder.rotation.x = THREE.MathUtils.lerp(-2.10, -0.15, smoothPrep);
        rightShoulder.rotation.y = THREE.MathUtils.lerp(0, 0.05, smoothPrep);
        rightShoulder.rotation.z = THREE.MathUtils.lerp(-0.42, Math.PI - 0.18, smoothPrep);
        rightElbow.rotation.x = THREE.MathUtils.lerp(-0.25, 0, smoothPrep);
        rightElbow.rotation.z = 0;

        // 2. STREAMLINE LEFT ARM NATURALLY ALONGSIDE FLANK
        leftShoulder.rotation.x = THREE.MathUtils.lerp(0.08, 0.18, smoothPrep);
        leftShoulder.rotation.y = 0;
        leftShoulder.rotation.z = THREE.MathUtils.lerp(0.20, 0.15, smoothPrep);
        leftElbow.rotation.x = THREE.MathUtils.lerp(-0.22, -0.15, smoothPrep);
        leftElbow.rotation.z = 0;

        // 3. STRAIGHTEN LEGS BEHIND BODY (TRAILING TO SCREEN RIGHT)
        leftHip.rotation.x = THREE.MathUtils.lerp(0, 0.02, smoothPrep);
        leftHip.rotation.z = THREE.MathUtils.lerp(0.03, 0.04, smoothPrep);
        leftKnee.rotation.x = THREE.MathUtils.lerp(0, 0.06, smoothPrep);

        rightHip.rotation.x = THREE.MathUtils.lerp(0, -0.02, smoothPrep);
        rightHip.rotation.z = THREE.MathUtils.lerp(-0.03, -0.04, smoothPrep);
        rightKnee.rotation.x = THREE.MathUtils.lerp(0, 0.06, smoothPrep);

        // 4. HEAD LIFTS UPWARD TO LOOK STRAIGHT AHEAD ALONG FLIGHT PATH
        headPivot.rotation.x = THREE.MathUtils.lerp(-0.02, -0.42, smoothPrep);
        headPivot.rotation.y = THREE.MathUtils.lerp(0, 0.22, smoothPrep);
        headPivot.rotation.z = THREE.MathUtils.lerp(0, -0.04, smoothPrep);

        bobGroup.position.y = 0;
        torsoGroup.rotation.x = 0;

        // Dual 3D Nitro Thrusters & Ion Rings ignite and scale up with power
        leftNitroGroup.visible = true;
        rightNitroGroup.visible = true;
        const nitroScale = smoothPrep * (0.9 + Math.random() * 0.15);
        leftNitroGroup.scale.set(nitroScale, nitroScale * 1.15, nitroScale);
        rightNitroGroup.scale.set(nitroScale, nitroScale * 1.15, nitroScale);

        // Arc reactor and emissive glow pulse brightly during launch
        greenEmissiveMaterial.emissiveIntensity = 4.2 + smoothPrep * 1.8;

        // Ground shadow shrinks as robot takes to the air
        shadowMesh.scale.set(1 - smoothPrep * 0.65, 1 - smoothPrep * 0.65, 1);
        shadowMat.opacity = 1 - smoothPrep * 0.75;
      } else if (t < 12.6) {
        // ==================== 7. AUTHENTIC SUPERMAN FLIGHT (RIGHT → LEFT: engEnd → badgeStart) ====================
        flyingActive = true;
        const flightDuration = 2.7;
        const flightP = (t - 9.9) / flightDuration;

        // Smooth sinusoidal cruise progression
        const smoothFlight = 0.5 - 0.5 * Math.cos(Math.PI * flightP);

        // Horizontal flight strictly right to left from end of ENGINEERING to starting position on SMART SYSTEMS
        currentX = THREE.MathUtils.lerp(targets.engEnd.x, targets.badgeStart.x, smoothFlight);

        // Clean, steady horizontal flight altitude with subtle aerodynamic glide wave
        const baseFlightY = THREE.MathUtils.lerp(targets.engEnd.y - 24, targets.badgeStart.y - 24, smoothFlight);
        const flightWave = Math.sin(flightP * Math.PI) * 14;
        currentY = baseFlightY - flightWave;

        // 100% Straight Superman Horizontal Orientation:
        // Head + Leading Arm lead towards LEFT (-X)
        // Legs & Thruster Flames trail behind towards RIGHT (+X)
        targetQuat.copy(quatSuperman);
        targetPitchX = 0;
        bobGroup.position.y = Math.sin(elapsed * 10.0) * 0.02; // Micro aerodynamic float

        // ================= CLASSIC SUPERMAN POSE =================
        // 1. LEADING HAND EXTENDED STRAIGHT FORWARD IN FRONT OF HEAD
        rightShoulder.rotation.x = -0.15;
        rightShoulder.rotation.y = 0.05;
        rightShoulder.rotation.z = Math.PI - 0.18; // Extended straight past head
        rightElbow.rotation.x = 0;
        rightElbow.rotation.z = 0;

        // 2. REAR ARM STREAMLINED ALONGSIDE FLANK
        leftShoulder.rotation.x = 0.18;
        leftShoulder.rotation.y = 0;
        leftShoulder.rotation.z = 0.15;
        leftElbow.rotation.x = -0.15;
        leftElbow.rotation.z = 0;

        // 3. LEGS EXTENDED STRAIGHT BEHIND TORSO (Aligned with spine)
        leftHip.rotation.x = 0.02;
        leftHip.rotation.z = 0.04;
        leftKnee.rotation.x = 0.06;

        rightHip.rotation.x = -0.02;
        rightHip.rotation.z = -0.04;
        rightKnee.rotation.x = 0.06;

        // 4. HEAD LIFTED UPWARD TO LOOK STRAIGHT AHEAD AT DESTINATION
        headPivot.rotation.x = -0.42;
        headPivot.rotation.y = 0.22;
        headPivot.rotation.z = -0.04;

        torsoGroup.rotation.x = 0;
        torsoGroup.rotation.z = 0;

        // ================= HIGH-VELOCITY 3D NITRO ROCKET THRUSTERS =================
        leftNitroGroup.visible = true;
        rightNitroGroup.visible = true;

        const flameFlicker = 1.0 + Math.sin(elapsed * 60.0) * 0.08 + Math.sin(elapsed * 95.0) * 0.05;
        const flameLength = 1.35 * flameFlicker;
        const flameWidth = 1.05 + Math.sin(elapsed * 45.0) * 0.04;

        leftNitroGroup.scale.set(flameWidth, flameLength, flameWidth);
        rightNitroGroup.scale.set(flameWidth, flameLength, flameWidth);

        flameInnerMaterial.emissiveIntensity = 5.2 + flameFlicker * 0.8;
        flameOuterMaterial.emissiveIntensity = 4.0 + flameFlicker * 0.6;
        greenEmissiveMaterial.emissiveIntensity = 5.0;

        // Soft aerodynamic speed aura & streamlines
        aeroGroup.visible = true;
        aeroTrailMaterial.opacity = 0.26 + Math.sin(elapsed * 20.0) * 0.06;

        trailMeshes.forEach((mesh, idx) => {
          mesh.scale.y = 1.0 + Math.sin(elapsed * 26.0 + idx * 1.5) * 0.15;
          mesh.position.y = 1.4 + Math.sin(elapsed * 14.0 + idx) * 0.08;
        });

        // High-altitude ground shadow
        shadowMesh.scale.set(0.32, 0.32, 0.32);
        shadowMat.opacity = 0.15;
      } else {
        // ==================== 8. SUPERHERO RETRO-THRUSTER DECELERATION & SOFT LANDING ====================
        const landP = (t - 12.6) / 1.0; // 0 to 1
        const smoothLand = landP < 0.5 ? 2 * landP * landP : 1 - Math.pow(-2 * landP + 2, 2) / 2;

        currentX = targets.badgeStart.x;
        currentY = THREE.MathUtils.lerp(targets.badgeStart.y - 24, targets.badgeStart.y, smoothLand);

        // Turn off aerodynamic speed streamlines
        aeroGroup.visible = false;

        // Smoothly rotate from horizontal Superman flight orientation back to upright walking posture
        targetQuat.copy(quatSuperman).slerp(quatWalk, smoothLand);
        targetPitchX = 0;

        // Soft knee absorption and deceleration onto top border of Smart System badge
        const impactVal = Math.sin(Math.PI * landP) * (1 - landP);
        bobGroup.position.y = -impactVal * 0.10;

        // Leading arm smoothly lowers to side
        rightShoulder.rotation.x = THREE.MathUtils.lerp(-0.15, 0, landP);
        rightShoulder.rotation.y = THREE.MathUtils.lerp(0.05, 0, landP);
        rightShoulder.rotation.z = THREE.MathUtils.lerp(Math.PI - 0.18, -0.12, landP);
        rightElbow.rotation.x = THREE.MathUtils.lerp(0, -0.22, landP);

        // Left arm returns to natural standing position
        leftShoulder.rotation.x = THREE.MathUtils.lerp(0.18, 0, landP);
        leftShoulder.rotation.z = THREE.MathUtils.lerp(0.15, 0.12, landP);
        leftElbow.rotation.x = THREE.MathUtils.lerp(-0.15, -0.22, landP);

        // Legs cushion touchdown with natural shock absorption
        leftHip.rotation.x = THREE.MathUtils.lerp(0.02, -impactVal * 0.3, landP);
        leftHip.rotation.z = THREE.MathUtils.lerp(0.04, 0, landP);
        leftKnee.rotation.x = THREE.MathUtils.lerp(0.06, impactVal * 0.55, landP);

        rightHip.rotation.x = THREE.MathUtils.lerp(-0.02, -impactVal * 0.3, landP);
        rightHip.rotation.z = THREE.MathUtils.lerp(-0.04, 0, landP);
        rightKnee.rotation.x = THREE.MathUtils.lerp(0.06, impactVal * 0.55, landP);

        // Head aligns forward to resume walk
        headPivot.rotation.x = THREE.MathUtils.lerp(-0.42, 0.04, landP);
        headPivot.rotation.y = THREE.MathUtils.lerp(0.22, 0, landP);
        headPivot.rotation.z = THREE.MathUtils.lerp(-0.04, 0, landP);
        torsoGroup.rotation.x = 0;

        // Retro-thrusters cushion touchdown and smoothly extinguish
        const nitroFade = Math.max(0, 1 - landP * 1.6);
        if (nitroFade > 0.01) {
          leftNitroGroup.visible = true;
          rightNitroGroup.visible = true;
          leftNitroGroup.scale.set(nitroFade, nitroFade * 0.75, nitroFade);
          rightNitroGroup.scale.set(nitroFade, nitroFade * 0.75, nitroFade);
        } else {
          leftNitroGroup.visible = false;
          rightNitroGroup.visible = false;
          leftNitroGroup.scale.set(0, 0, 0);
          rightNitroGroup.scale.set(0, 0, 0);
        }

        // Ground shadow smoothly restores to full size and opacity
        shadowMesh.scale.set(
          THREE.MathUtils.lerp(0.32, 1, landP),
          THREE.MathUtils.lerp(0.32, 1, landP),
          1
        );
        shadowMat.opacity = THREE.MathUtils.lerp(0.15, 1, landP);
      }

      // Update DOM wrapper position (smooth 60fps hardware accelerated transform)
      wrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      // Apply body 3D orientation via Quaternion (zero gimbal lock, zero camera tilt)
      robotRoot.quaternion.copy(targetQuat);
      bobGroup.rotation.x = THREE.MathUtils.lerp(bobGroup.rotation.x, targetPitchX, 0.28);

      // Reset waving arm tilt when not in waving state
      if (!isWaving) {
        pinkBlushMaterial.opacity = 0.55;
        rightHandGroup.rotation.z = 0;
      }

      // Kinematic Biomechanical Walking Gait with Swagger Attitude
      if (isWalking) {
        const walkFreq = 7.5;
        const walkCycle = elapsed * walkFreq;

        // 1. Natural Hip Stride
        leftHip.rotation.x = Math.sin(walkCycle) * 0.65;
        rightHip.rotation.x = -Math.sin(walkCycle) * 0.65;

        // 2. Realistic Knee Flexion
        leftKnee.rotation.x = Math.max(0, -Math.sin(walkCycle) * 0.55);
        rightKnee.rotation.x = Math.max(0, Math.sin(walkCycle) * 0.55);

        // 3. Counter-Swinging Arms
        leftShoulder.rotation.x = -Math.sin(walkCycle) * 0.48;
        leftShoulder.rotation.z = 0.12;
        leftElbow.rotation.x = -0.22 - Math.max(0, Math.sin(walkCycle) * 0.2);

        rightShoulder.rotation.x = Math.sin(walkCycle) * 0.48;
        rightShoulder.rotation.z = -0.12;
        rightElbow.rotation.x = -0.22 - Math.max(0, -Math.sin(walkCycle) * 0.2);
        rightElbow.rotation.z = 0;

        // 4. Torso Pelvic Sway & Vertical Bobbing with confident swagger
        bobGroup.position.y = Math.abs(Math.sin(walkCycle)) * 0.07;
        torsoGroup.rotation.z = Math.sin(walkCycle) * 0.035;
        torsoGroup.rotation.y = -Math.sin(walkCycle) * 0.045;

        // 5. Inquisitive Cocked Head Stabilizer
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
              initial={{ opacity: 0, scale: 0.65, y: 6, filter: 'blur(4px)' }}
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
