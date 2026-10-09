"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { HIDDEN_POSE, markRingTrackDirty, sampleRingTrack, sensorScreen, type RingPose } from "@/lib/ringTrack";

import { buildRing } from "./buildRing";
import styles from "./RingStage.module.css";

const FOV = 28;
const CAMERA_Z = 12;
const MAX_DPR = 2;
/** Fraction of the pose change applied per frame, so scroll jumps glide. */
const FOLLOW = 0.16;

/**
 * Fixed full-viewport WebGL layer that renders the page's single ring.
 * Its pose comes from the shared scroll track (see lib/ringTrack.ts).
 */
export function RingStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (error) {
      console.error("[ring] WebGL unavailable, ring hidden", error);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.z = CAMERA_Z;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envMap = pmrem.fromScene(room, 0.03).texture;
    room.dispose();

    const rig = buildRing(envMap);
    scene.add(rig.group);

    const key = new THREE.DirectionalLight("#fff6ea", 1.2);
    key.position.set(-4, 6, 8);
    const rim = new THREE.DirectionalLight("#cfefff", 0.6);
    rim.position.set(6, -3, -4);
    scene.add(key, rim, new THREE.AmbientLight("#ffffff", 0.25));

    const visibleHeight = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    let width = 1;
    let height = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const target: RingPose = { ...HIDDEN_POSE };
    const current: RingPose = { ...HIDDEN_POSE };
    let spinAngle = 0;
    let lastTime = performance.now();
    let settled = false;
    const projected = new THREE.Vector3();
    const normal = new THREE.Vector3();
    const toCamera = new THREE.Vector3();
    const sensorQuat = new THREE.Quaternion();

    const frame = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      sampleRingTrack(window.scrollY, target);
      (Object.keys(target) as (keyof RingPose)[]).forEach((prop) => {
        current[prop] = prop === "sensor" ? target.sensor : current[prop] + (target[prop] - current[prop]) * FOLLOW;
      });

      if (current.opacity < 0.002) {
        if (!settled) {
          renderer.clear();
          settled = true;
        }
        canvas.style.opacity = "0";
        return;
      }
      settled = false;
      canvas.style.opacity = String(Math.min(1, current.opacity));

      spinAngle += current.spin * dt;
      const visibleWidth = visibleHeight * camera.aspect;
      const scale = (current.size * visibleHeight) / 2;
      rig.group.position.set(current.x * visibleWidth, -current.y * visibleHeight, 0);
      rig.group.scale.setScalar(Math.max(0.0001, scale));
      rig.group.rotation.set(current.rx, current.ry + spinAngle, current.rz);
      rig.setFinish(current.finish);
      rig.setGlow(current.glow * (0.75 + Math.sin(now / 320) * 0.25));
      rig.setSensorHighlight(current.sensor - 1, 0.7 + Math.sin(now / 260) * 0.3);

      renderer.render(scene, camera);

      // Publish sensor positions so DOM leader lines can attach to them.
      rig.sensors.forEach((sensor, index) => {
        sensor.getWorldPosition(projected);
        normal.set(0, 0, 1).applyQuaternion(sensor.getWorldQuaternion(sensorQuat));
        toCamera.copy(camera.position).sub(projected).normalize();
        projected.project(camera);
        sensorScreen[index].x = (projected.x * 0.5 + 0.5) * width;
        sensorScreen[index].y = (-projected.y * 0.5 + 0.5) * height;
        sensorScreen[index].facing = normal.dot(toCamera) > 0.05;
      });
    };

    gsap.ticker.add(frame);
    ScrollTrigger.addEventListener("refresh", markRingTrackDirty);

    return () => {
      gsap.ticker.remove(frame);
      ScrollTrigger.removeEventListener("refresh", markRingTrackDirty);
      window.removeEventListener("resize", resize);
      rig.dispose();
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
