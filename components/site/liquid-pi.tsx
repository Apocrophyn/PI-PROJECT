"use client"

import { useEffect, useRef } from "react"
import type * as ThreeNS from "three"
import { cn } from "@/lib/utils"
import { createLiquidEnvironment, createRenderer } from "@/components/site/three-studio"

// Centre line of the letterform, in the object's own -1..1 space.
const STROKES: [number, number][][] = [
  [[-0.74, 0.54], [0, 0.54], [0.74, 0.54]],
  [[-0.22, 0.52], [-0.26, 0.1], [-0.32, -0.26], [-0.42, -0.62]],
  [[0.3, 0.52], [0.31, 0.06], [0.36, -0.3], [0.46, -0.52], [0.6, -0.6], [0.7, -0.5]],
]

// Kept inside the marching-cubes box, weaving in front of and behind the letterform.
const DROPS = [
  { a: 0.0, rx: 0.8, ry: 0.62, rz: 0.52, speed: 0.31, r: 0.046 },
  { a: 2.1, rx: 0.72, ry: 0.7, rz: 0.46, speed: -0.24, r: 0.037 },
  { a: 4.0, rx: 0.84, ry: 0.54, rz: 0.5, speed: 0.18, r: 0.03 },
  { a: 5.4, rx: 0.68, ry: 0.74, rz: 0.44, speed: -0.38, r: 0.025 },
]

const SUBTRACT = 34
const strengthFor = (radius: number) => radius * radius * (80 + SUBTRACT)

/**
 * The services opening: a π that is not cast but poured. A metaball field sampled
 * along the letterform makes the chrome behave like mercury, so the symbol is always
 * a fraction away from running back into the droplets that circle it.
 */
export function LiquidPi({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current!
    let disposed = false
    let cleanup = () => {}

    // Booting a WebGL context and baking the environment map costs real main-thread
    // time, so none of it happens until the piece is close to the viewport.
    let start = () => {}
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      near.disconnect()
      start()
    }, { rootMargin: "600px" })
    near.observe(host)

    start = () => {
      if (disposed) return
      ;(async () => {
      const [THREE, { MarchingCubes }] = await Promise.all([import("three"), import("three/addons/objects/MarchingCubes.js")])
      if (disposed) return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const small = window.innerWidth < 768

      const renderer = createRenderer(THREE, host)
      renderer.toneMappingExposure = 1.05

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
      camera.position.set(0, 0, 7.4)

      const env = createLiquidEnvironment(THREE, renderer)
      scene.environment = env.texture

      const uTime = { value: 0 }
      const material = new THREE.MeshPhysicalMaterial({
        color: "#f6f9fa",
        metalness: 1,
        roughness: 0.055,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.3,
        iridescence: 0.16,
        iridescenceIOR: 1.6,
        iridescenceThicknessRange: [160, 560],
      })

      // Mercury is never glass-smooth. Two travelling wave trains, evaluated in object space
      // so they ride the surface rather than the camera, break the mirror into flowing bands
      // of polish and haze and bend the reflections with them.
      material.customProgramCacheKey = () => "liquid-pi"
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = uTime
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", "#include <common>\nvarying vec3 vObjPos;")
          .replace("#include <begin_vertex>", "#include <begin_vertex>\nvObjPos = transformed;")
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
            uniform float uTime;
            uniform mat3 normalMatrix;
            varying vec3 vObjPos;
            float flow(vec3 p) {
              return sin(p.x * 7.5 + uTime * 0.85) * sin(p.y * 9.5 - uTime * 0.62) * sin(p.z * 6.5 + uTime * 0.47)
                   + 0.28 * sin(p.x * 19.0 - uTime * 1.3) * sin(p.y * 23.0 + uTime * 1.05);
            }
            vec3 flowGrad(vec3 p) {
              float ax = p.x * 7.5 + uTime * 0.85, ay = p.y * 9.5 - uTime * 0.62, az = p.z * 6.5 + uTime * 0.47;
              float bx = p.x * 19.0 - uTime * 1.3, by = p.y * 23.0 + uTime * 1.05;
              return vec3(
                7.5 * cos(ax) * sin(ay) * sin(az) + 5.32 * cos(bx) * sin(by),
                9.5 * sin(ax) * cos(ay) * sin(az) + 6.44 * sin(bx) * cos(by),
                6.5 * sin(ax) * sin(ay) * cos(az)
              );
            }`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
            float liquid = flow(vObjPos);
            roughnessFactor = clamp(roughnessFactor + 0.045 * liquid, 0.012, 0.18);`,
          )
          .replace(
            "#include <normal_fragment_begin>",
            `#include <normal_fragment_begin>
            normal = normalize(normal + normalize(normalMatrix * flowGrad(vObjPos)) * 0.028);`,
          )
      }
      const blob = new MarchingCubes(small ? 48 : 56, material, false, false, small ? 80000 : 120000)
      blob.isolation = 80
      blob.scale.setScalar(2.15)
      scene.add(blob)

      // Resample the letterform once, evenly, so the mercury tube has a constant gauge.
      const spine: ThreeNS.Vector3[] = []
      for (const points of STROKES) {
        const curve = new THREE.CatmullRomCurve3(points.map(([x, y]) => new THREE.Vector3(x, y, 0)), false, "centripetal")
        const steps = Math.max(10, Math.round(curve.getLength() / 0.042))
        for (let i = 0; i <= steps; i++) spine.push(curve.getPoint(i / steps))
      }
      const bodyStrength = strengthFor(0.052)
      const dropStrengths = DROPS.map((drop) => strengthFor(drop.r))

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          uniforms: { uTime: { value: 0 } },
          vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
          fragmentShader: `
            varying vec2 vUv; uniform float uTime;
            void main(){
              vec2 p = vUv - vec2(0.5, 0.62);
              float pool = smoothstep(0.42, 0.0, length(p * vec2(1.0, 2.6)));
              float halo = smoothstep(0.62, 0.0, length(p));
              float shift = 0.5 + 0.5 * sin(uTime * 0.35 + p.x * 4.0);
              vec3 c = mix(vec3(0.47,0.87,0.92), vec3(0.95,0.68,0.3), shift);
              gl_FragColor = vec4(c, pool * 0.3 + halo * halo * 0.16);
            }`,
        }),
      )
      floor.position.z = -2.4
      scene.add(floor)

      const build = (t: number) => {
        blob.reset()
        for (let i = 0; i < spine.length; i++) {
          const p = spine[i]
          const ripple = Math.sin(t * 1.6 + i * 0.55) * 0.012 + Math.sin(t * 0.9 - i * 0.21) * 0.008
          blob.addBall(
            0.5 + p.x * 0.5 + ripple * 0.5,
            0.5 + p.y * 0.5 + Math.sin(t * 1.1 + i * 0.37) * 0.006,
            0.5 + ripple,
            bodyStrength * (1 + 0.12 * Math.sin(t * 2.1 + i * 0.8)),
            SUBTRACT,
          )
        }
        DROPS.forEach((drop, i) => {
          const a = drop.a + t * drop.speed
          blob.addBall(
            0.5 + Math.cos(a) * drop.rx * 0.5,
            0.5 + Math.sin(a * 1.3) * drop.ry * 0.5,
            0.5 + Math.sin(a * 0.7) * drop.rz * 0.5,
            dropStrengths[i],
            SUBTRACT,
          )
        })
        blob.update()
      }

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host
        renderer.setSize(w, h, false)
        camera.aspect = w / Math.max(h, 1)
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(host)

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
      const onMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect()
        pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      }
      window.addEventListener("pointermove", onMove, { passive: true })

      let visible = false
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { rootMargin: "120px" })
      io.observe(host)

      const clock = new THREE.Clock()
      // Resampling the field is the expensive part and the eye cannot follow it at 60fps,
      // so the mercury is rebuilt at 30 and only the camera-facing motion runs every frame.
      let lastBuild = -1
      const frame = () => {
        const t = clock.getElapsedTime()
        pointer.x += (pointer.tx - pointer.x) * 0.045
        pointer.y += (pointer.ty - pointer.y) * 0.045
        if (t - lastBuild >= 1 / 30) {
          lastBuild = t
          build(t)
        }
        blob.rotation.y = Math.sin(t * 0.32) * 0.3 + pointer.x * 0.4
        blob.rotation.x = Math.sin(t * 0.21) * 0.05 + pointer.y * 0.14
        blob.position.y = Math.sin(t * 0.7) * 0.05
        scene.environmentRotation.y = -t * 0.28
        uTime.value = t
        ;(floor.material as InstanceType<typeof THREE.ShaderMaterial>).uniforms.uTime.value = t
        renderer.render(scene, camera)
      }

      if (reduced) {
        frame()
      } else {
        renderer.setAnimationLoop(() => { if (visible) frame() })
      }

      cleanup = () => {
        renderer.setAnimationLoop(null)
        window.removeEventListener("pointermove", onMove)
        ro.disconnect()
        io.disconnect()
        env.dispose()
        blob.geometry.dispose()
        material.dispose()
        floor.geometry.dispose()
        ;(floor.material as InstanceType<typeof THREE.Material>).dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
      })()
    }

    return () => { disposed = true; near.disconnect(); cleanup() }
  }, [])

  return <div ref={hostRef} className={cn("relative", className)} aria-hidden="true" />
}
