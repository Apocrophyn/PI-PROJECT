"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { createRenderer, createStudioEnvironment } from "@/components/site/three-studio"

// A mirror-chrome π built from liquid-metal strokes, lit by a slowly turning cyan/amber studio rig.
export function ChromePi({ className }: { className?: string }) {
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
      const THREE = await import("three")
      if (disposed) return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const renderer = createRenderer(THREE, host)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
      camera.position.set(0, 0, 9)

      const env = createStudioEnvironment(THREE, renderer)
      scene.environment = env.texture

      const material = new THREE.MeshPhysicalMaterial({ color: "#f4f7f8", metalness: 1, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1.6 })
      const group = new THREE.Group()
      const stroke = (points: [number, number][], radius: number, caps = true) => {
        const curve = new THREE.CatmullRomCurve3(points.map(([x, y]) => new THREE.Vector3(x, y, 0)), false, "centripetal")
        group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 180, radius, 48, false), material))
        if (caps) {
          for (const t of [0, 1]) {
            const cap = new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 32), material)
            cap.position.copy(curve.getPoint(t))
            group.add(cap)
          }
        }
      }
      stroke([[-1.32, 0.66], [-1.2, 0.93], [-0.92, 1.08], [-0.3, 1.1], [0.5, 1.1], [1.05, 1.13], [1.3, 1.26]], 0.13)
      stroke([[-0.42, 1.06], [-0.44, 0.45], [-0.52, -0.25], [-0.62, -0.75], [-0.8, -1.08]], 0.145)
      stroke([[0.44, 1.06], [0.43, 0.35], [0.45, -0.45], [0.55, -0.9], [0.8, -1.04], [1.0, -0.9]], 0.145)
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.2, 64, 48), material)
      ball.position.set(1.02, -0.84, 0)
      group.add(ball)
      group.scale.setScalar(1.02)
      scene.add(group)

      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 9),
        new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          uniforms: { uTime: { value: 0 } },
          vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
          fragmentShader: "varying vec2 vUv; uniform float uTime; void main(){ vec2 p = vUv - 0.5; float d = length(p); float a = smoothstep(0.5, 0.0, d); vec3 c = mix(vec3(0.47,0.87,0.92), vec3(0.95,0.68,0.3), 0.5 + 0.5 * sin(uTime * 0.4 + p.x * 3.0)); gl_FragColor = vec4(c, a * a * 0.22); }",
        }),
      )
      glow.position.z = -2
      scene.add(glow)

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
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect()
        pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2
        pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      }
      window.addEventListener("pointermove", onMove, { passive: true })

      let visible = false
      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { rootMargin: "100px" })
      io.observe(host)

      const clock = new THREE.Clock()
      const frame = () => {
        const t = clock.getElapsedTime()
        pointer.x += (pointer.tx - pointer.x) * 0.05
        pointer.y += (pointer.ty - pointer.y) * 0.05
        group.rotation.y = Math.sin(t * 0.45) * 0.42 + pointer.x * 0.35
        group.rotation.x = Math.sin(t * 0.3) * 0.08 + pointer.y * 0.18
        group.position.y = Math.sin(t * 0.8) * 0.06
        scene.environmentRotation.y = t * 0.35
        ;(glow.material as InstanceType<typeof THREE.ShaderMaterial>).uniforms.uTime.value = t
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
        renderer.dispose()
        renderer.domElement.remove()
      }
      })()
    }

    return () => { disposed = true; near.disconnect(); cleanup() }
  }, [])

  return <div ref={hostRef} className={cn("relative", className)} aria-hidden="true" />
}
