import type * as ThreeNS from "three"

type Three = typeof ThreeNS

// Studio reflection rig shared by the 3D pieces: soft top box, cyan strip left, amber strip right.
export function createStudioEnvironment(THREE: Three, renderer: ThreeNS.WebGLRenderer) {
  const envScene = new THREE.Scene()
  envScene.background = new THREE.Color("#020304")
  const panel = (color: string, intensity: number, w: number, h: number, pos: [number, number, number], rot: [number, number, number]) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }))
    mesh.position.set(...pos)
    mesh.rotation.set(...rot)
    envScene.add(mesh)
  }
  panel("#ffffff", 3.2, 12, 4, [0, 6, 0], [Math.PI / 2, 0, 0])
  panel("#78ddea", 7, 2.4, 12, [-6, 0, 1.5], [0, Math.PI / 2, 0])
  panel("#f2ad4d", 6, 2.4, 12, [6, 0, 1.5], [0, -Math.PI / 2, 0])
  panel("#dfe7ea", 2.6, 9, 5, [0, 0.5, 8], [0, Math.PI, 0])
  panel("#ffffff", 4, 7, 0.5, [0, 2.2, 7.5], [0, Math.PI, 0])
  panel("#6d8a90", 1.2, 14, 14, [0, -5, 0], [-Math.PI / 2, 0, 0])
  panel("#9fe9f2", 1.4, 6, 0.25, [0, -2.5, -6], [0, 0, 0])
  const pmrem = new THREE.PMREMGenerator(renderer)
  const texture = pmrem.fromScene(envScene, 0.02).texture
  return { texture, dispose: () => { texture.dispose(); pmrem.dispose() } }
}

export function createRenderer(THREE: Three, host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%"
  host.appendChild(renderer.domElement)
  return renderer
}

/**
 * A rig for the liquid mercury. Chrome only reads as chrome when it has something worth
 * mirroring, so this one is a graded sky with a hard horizon rather than a few flat panels.
 */
export function createLiquidEnvironment(THREE: Three, renderer: ThreeNS.WebGLRenderer) {
  const envScene = new THREE.Scene()

  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(40, 48, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {},
      vertexShader: "varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: `
        varying vec3 vPos;
        void main(){
          float h = normalize(vPos).y;
          vec3 top = vec3(0.16, 0.22, 0.26);
          vec3 upper = vec3(1.5, 1.8, 1.95);
          vec3 ground = vec3(0.06, 0.09, 0.10);
          vec3 c = mix(upper, top, smoothstep(0.08, 0.95, h));
          c = mix(ground, c, smoothstep(-0.03, 0.04, h));
          c += vec3(7.5, 8.0, 8.2) * smoothstep(0.05, 0.0, abs(h - 0.02));
          c += vec3(2.0, 3.0, 3.4) * smoothstep(0.3, 0.0, abs(h - 0.6));
          // A lighting grid overhead and a pair of low bars: something for the mirror to hold.
          float az = atan(normalize(vPos).z, normalize(vPos).x);
          float bays = 0.55 + 0.45 * sin(az * 4.0);
          c += vec3(2.6, 2.7, 2.8) * bays * smoothstep(0.022, 0.0, abs(h - 0.34));
          c += vec3(1.8, 1.9, 2.0) * bays * smoothstep(0.02, 0.0, abs(h - 0.47));
          c += vec3(0.9, 1.15, 1.25) * smoothstep(0.016, 0.0, abs(h + 0.2));
          c += vec3(0.5, 0.62, 0.68) * smoothstep(0.014, 0.0, abs(h + 0.34));
          gl_FragColor = vec4(c, 1.0);
        }`,
    }),
  )
  envScene.add(sky)

  const panel = (color: string, intensity: number, w: number, h: number, pos: [number, number, number], rot: [number, number, number]) => {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }))
    mesh.position.set(...pos)
    mesh.rotation.set(...rot)
    envScene.add(mesh)
  }
  panel("#ffffff", 5, 9, 2.4, [0, 6, 1], [Math.PI / 2, 0, 0])
  panel("#8fddea", 3.1, 6.5, 14, [-6, 1, 1], [0, Math.PI / 2, 0])
  panel("#f7dcaf", 2.1, 6.5, 14, [6, 1, 1], [0, -Math.PI / 2, 0])
  panel("#ffffff", 3, 7, 0.45, [0, 2.6, 7], [0, Math.PI, 0])

  const pmrem = new THREE.PMREMGenerator(renderer)
  const texture = pmrem.fromScene(envScene, 0.06).texture
  return { texture, dispose: () => { texture.dispose(); pmrem.dispose() } }
}
