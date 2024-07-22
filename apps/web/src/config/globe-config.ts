import { GlobeConfig } from '@/components/ui/globe'

export const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: '#FFFFFF',
  showAtmosphere: true,
  atmosphereColor: '#FFFFFF',
  atmosphereAltitude: 0.1,
  emissive: '#FFFFFF',
  emissiveIntensity: 0.5,
  shininess: 100,
  polygonColor: '#000',
  ambientLight: '#FFFFFF',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
}
