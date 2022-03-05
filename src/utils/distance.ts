const distance = (p1: THREE.Vector3, p2: THREE.Vector3) => {
  const a = p2.x - p1.x
  const b = p2.y - p1.y
  const c = p2.z - p1.z

  return Math.sqrt(a * a + b * b + c * c)
}

export { distance }
