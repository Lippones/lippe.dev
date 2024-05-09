/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useRef } from 'react'
import ThreeGlobe from 'three-globe'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Color,
  Fog,
  MeshPhongMaterial,
  Vector2,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import MapaData from '@/assets/custom.geo.json'
import Airports from '@/assets/airports.json'
import Flights from '@/assets/flights.json'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { hslToHex } from '@/utils/hsl-to-hex'

export default function Contact() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let width = window.innerWidth
    let height = window.innerHeight
    let frameId: number

    // Initialize renderer
    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height, true)
    mountRef.current.appendChild(renderer.domElement)

    // Initialize scene
    const scene = new Scene()
    scene.add(new AmbientLight(0xbbbbbb, 0.3))
    scene.background = new Color(hslToHex(240, 10, 3.9))

    // Initialize camera
    const camera = new PerspectiveCamera()
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    camera.position.z = 400
    camera.position.x = 0
    camera.position.y = 0

    const dLight = new DirectionalLight(0xffffff, 1.5)
    dLight.position.set(-800, 2000, 400)
    camera.add(dLight)

    const dLight1 = new DirectionalLight(0x7982f6, 1.5)
    dLight1.position.set(-200, 500, 200)
    camera.add(dLight1)

    const dLight2 = new PointLight(0x8566cc, 1)
    dLight2.position.set(-200, 500, 200)
    camera.add(dLight2)

    scene.fog = new Fog(0x535ef3, 400, 2000)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dynamicDampingFactor = 0.01
    controls.enablePan = false
    controls.minDistance = 200
    controls.maxDistance = 500
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 1
    controls.enableZoom = false
    controls.autoRotate = false

    controls.minPolarAngle = Math.PI / 3.5
    controls.maxPolarAngle = Math.PI - Math.PI / 3

    // Globe
    const globe = new ThreeGlobe()
      .hexPolygonsData(MapaData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)

    const globeMaterial = new MeshPhongMaterial()
    globeMaterial.color = new Color(0x3a228a)
    globeMaterial.emissive = new Color(0x220038)
    globeMaterial.emissiveIntensity = 0.2
    globeMaterial.shininess = 20
    globe.globeMaterial(globeMaterial)

    setTimeout(() => {
      globe
        .arcsData(Flights.flights)
        .arcColor((e: any) => {
          return e.status ? '#9cff00' : '#FF4000'
        })
        .arcAltitude((e: any) => {
          return e.arcAlt
        })
        .arcStroke((e: any) => {
          return e.status ? 0.5 : 0.3
        })
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        // .arcDashInitialGap((e) => e.order * 1)
        .labelsData(Airports.airports)
        .labelColor(() => '#ffcb21')
        .labelDotOrientation((e: any) => {
          return e.text === 'ALA' ? 'top' : 'right'
        })
        .labelDotRadius(0.3)
        .labelSize((e: any) => e.size)
        .labelText('city')
        .labelResolution(6)
        .labelAltitude(0.01)
        .pointsData(Airports.airports)
        .pointColor(() => '#ffffff')
        .pointsMerge(true)
        .pointAltitude(0.07)
        .pointRadius(0.05)
    }, 1000)

    scene.add(globe)
    scene.add(camera)

    // Handle resizing
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85,
    )
    bloomPass.threshold = 0
    bloomPass.strength = 0.8
    bloomPass.radius = 1
    composer.addPass(bloomPass)

    // Animation loop
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      composer.render()
      frameId = window.requestAnimationFrame(animate)
    }

    // Start animation
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    frameId = requestAnimationFrame(animate)

    // Clean up
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="w-screen overflow-hidden">
      <div ref={mountRef} />
    </div>
  )
}
