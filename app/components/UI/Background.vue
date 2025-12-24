<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Vector2, Color } from 'three'

// Шейдеры (GLSL)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  void main() {
    // Простая анимация координат
    vec2 pos = vUv;
    float noise = sin(pos.x * 10.0 + uTime) * cos(pos.y * 10.0 + uTime) * 0.1;

    // Смешивание цветов
    vec3 color = mix(uColor1, uColor2, pos.x + noise);
    color = mix(color, uColor3, pos.y + noise);

    gl_FragColor = vec4(color, 1.0);
  }
`

// Униформы (параметры, передаваемые в шейдер)
const uniforms = {
  uTime: { value: 0 },
  uColor1: { value: new Color('#ff5252') },
  uColor2: { value: new Color('#52ff89') },
  uColor3: { value: new Color('#5252ff') },
}

// Анимационный цикл
const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  uniforms.uTime.value = elapsed
})
</script>

<template>
  <TresCanvas clear-color="#111" window-size>
    <TresPerspectiveCamera :position="[0, 0, 2]" />
    <TresMesh>
      <TresPlaneGeometry :args="[4, 4, 32, 32]" />
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresCanvas>
</template>