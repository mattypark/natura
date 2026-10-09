import * as THREE from "three";

/**
 * Procedural smart ring: a lathed band with a brushed outer shell, a matte
 * inner wall, three sensor windows, a thumb button and a status light.
 * Units: outer radius = 1, so the stage can size it by diameter.
 */

const OUTER_R = 1;
const INNER_R = 0.84;
const HALF_W = 0.34;
const EDGE = 0.07;
const SEGMENTS = 160;

const TITANIUM = new THREE.Color("#b4b0aa");
const PEARL = new THREE.Color("#eeebe5");
const INNER_TITANIUM = new THREE.Color("#5b5853");
const INNER_PEARL = new THREE.Color("#8d8a85");

export type RingRig = {
  group: THREE.Group;
  sensors: THREE.Object3D[];
  setFinish: (t: number) => void;
  setGlow: (t: number) => void;
  setSensorHighlight: (index: number, pulse: number) => void;
  dispose: () => void;
};

/** Rows of fine grain running around the band, used as a roughness map. */
function brushedTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable for ring texture");
  for (let y = 0; y < size; y += 1) {
    const v = 150 + Math.floor(Math.random() * 70);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, y, 8, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/** Cross-section of the outer shell: inner lip → rounded edge → outer wall → edge → lip. */
function shellProfile(): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  const corner = (cx: number, cy: number, from: number, to: number) => {
    for (let i = 0; i <= 10; i += 1) {
      const a = from + ((to - from) * i) / 10;
      points.push(new THREE.Vector2(cx + Math.cos(a) * EDGE, cy + Math.sin(a) * EDGE));
    }
  };
  points.push(new THREE.Vector2(INNER_R + 0.012, -HALF_W));
  corner(OUTER_R - EDGE, -HALF_W + EDGE, -Math.PI / 2, 0);
  corner(OUTER_R - EDGE, HALF_W - EDGE, 0, Math.PI / 2);
  points.push(new THREE.Vector2(INNER_R + 0.012, HALF_W));
  return points;
}

function innerProfile(): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  const lip = HALF_W - 0.02;
  points.push(new THREE.Vector2(INNER_R + 0.02, lip));
  for (let i = 0; i <= 16; i += 1) {
    const y = lip - (2 * lip * i) / 16;
    // A faint barrel so light rolls across the inner wall.
    const bulge = Math.cos((y / lip) * (Math.PI / 2)) * 0.01;
    points.push(new THREE.Vector2(INNER_R - bulge, y));
  }
  points.push(new THREE.Vector2(INNER_R + 0.02, -lip));
  return points;
}

export function buildRing(envMap: THREE.Texture): RingRig {
  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(item: T) => {
    disposables.push(item);
    return item;
  };

  const grain = track(brushedTexture());

  const shellMat = track(
    new THREE.MeshPhysicalMaterial({
      color: TITANIUM.clone(),
      metalness: 1,
      roughness: 0.34,
      roughnessMap: grain,
      envMap,
      envMapIntensity: 1.15,
      clearcoat: 0.25,
      clearcoatRoughness: 0.4,
    }),
  );
  const innerMat = track(
    new THREE.MeshPhysicalMaterial({
      color: INNER_TITANIUM.clone(),
      metalness: 0.85,
      roughness: 0.55,
      envMap,
      envMapIntensity: 0.7,
      side: THREE.DoubleSide,
    }),
  );
  const seamMat = track(new THREE.MeshStandardMaterial({ color: "#e9e4dc", metalness: 0.6, roughness: 0.25, envMap }));
  const glassMat = track(
    new THREE.MeshPhysicalMaterial({ color: "#121416", metalness: 0.2, roughness: 0.08, clearcoat: 1, envMap, envMapIntensity: 1.4 }),
  );
  const ledMats = ["#59f2a0", "#ff5a4a", "#9fc7ff"].map((hex) =>
    track(new THREE.MeshStandardMaterial({ color: hex, emissive: hex, emissiveIntensity: 0.6, roughness: 0.3 })),
  );
  const glowMat = track(
    new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0, depthWrite: false }),
  );
  const haloMat = track(
    new THREE.MeshBasicMaterial({ color: "#2aafcc", transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
  );

  const shell = new THREE.Mesh(track(new THREE.LatheGeometry(shellProfile(), SEGMENTS)), shellMat);
  const inner = new THREE.Mesh(track(new THREE.LatheGeometry(innerProfile(), SEGMENTS)), innerMat);
  grain.repeat.set(1, 3);

  // Thin bright seams just inside each edge, as on a two-part band.
  const seamGeo = track(new THREE.TorusGeometry(OUTER_R - 0.004, 0.0045, 8, SEGMENTS));
  const seamTop = new THREE.Mesh(seamGeo, seamMat);
  seamTop.rotation.x = Math.PI / 2;
  seamTop.position.y = HALF_W - EDGE * 0.9;
  const seamBottom = seamTop.clone();
  seamBottom.position.y = -(HALF_W - EDGE * 0.9);

  const band = new THREE.Group();
  band.add(shell, inner, seamTop, seamBottom);

  // Sensor windows sit on the inner wall, facing the finger.
  const sensors: THREE.Object3D[] = [];
  const windowGeo = track(new THREE.BoxGeometry(0.15, 0.2, 0.03));
  const ledGeo = track(new THREE.CircleGeometry(0.026, 24));
  const haloGeo = track(new THREE.RingGeometry(0.12, 0.135, 48));
  const sensorAngles = [-0.55, -0.15, 0.3];
  sensorAngles.forEach((angle, index) => {
    const holder = new THREE.Group();
    const r = INNER_R - 0.012;
    holder.position.set(Math.sin(angle) * r, 0, Math.cos(angle) * r);
    holder.lookAt(0, 0, 0);
    const glass = new THREE.Mesh(windowGeo, glassMat);
    const led = new THREE.Mesh(ledGeo, ledMats[index]);
    led.position.z = 0.017;
    const halo = new THREE.Mesh(haloGeo, haloMat.clone());
    halo.position.z = 0.03;
    track(halo.material as THREE.Material);
    holder.add(glass, led, halo);
    holder.userData.halo = halo;
    band.add(holder);
    sensors.push(holder);
  });

  // Thumb button on the outer wall plus the listening light beside it.
  const buttonGeo = track(new THREE.CapsuleGeometry(0.045, 0.12, 6, 16));
  const button = new THREE.Mesh(buttonGeo, seamMat);
  const buttonAngle = Math.PI;
  button.position.set(Math.sin(buttonAngle) * (OUTER_R + 0.004), 0.06, Math.cos(buttonAngle) * (OUTER_R + 0.004));
  button.scale.set(1, 1, 0.35);
  button.lookAt(0, 0.06, 0);
  const lightGeo = track(new THREE.CircleGeometry(0.022, 24));
  const light = new THREE.Mesh(lightGeo, glowMat);
  const lightAngle = Math.PI + 0.16;
  light.position.set(Math.sin(lightAngle) * (OUTER_R + 0.006), -0.12, Math.cos(lightAngle) * (OUTER_R + 0.006));
  light.lookAt(light.position.clone().multiplyScalar(2));
  band.add(button, light);

  // Lathe axis is Y; turn the band so it faces the camera like a donut.
  band.rotation.x = Math.PI / 2;
  group.add(band);

  const setFinish = (t: number) => {
    shellMat.color.copy(TITANIUM).lerp(PEARL, t);
    shellMat.metalness = 1 - t * 0.7;
    shellMat.roughness = 0.34 + t * 0.12;
    shellMat.clearcoat = 0.25 + t * 0.6;
    innerMat.color.copy(INNER_TITANIUM).lerp(INNER_PEARL, t);
  };

  const setGlow = (t: number) => {
    glowMat.opacity = t;
  };

  const setSensorHighlight = (index: number, pulse: number) => {
    sensors.forEach((sensor, i) => {
      const halo = sensor.userData.halo as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
      halo.material.opacity = i === index ? 0.9 * pulse : 0;
    });
  };

  return {
    group,
    sensors,
    setFinish,
    setGlow,
    setSensorHighlight,
    dispose: () => disposables.forEach((item) => item.dispose()),
  };
}
