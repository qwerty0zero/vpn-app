<script setup lang="ts">
import { ref } from 'vue';
import PixelBlast from "~/components/VueBits/PixelBlast.vue";
import Dither from "~/components/VueBits/Dither.vue";
import Plasma from "~/components/VueBits/Plasma.vue";
import LightPillar from "~/components/VueBits/LightPillar.vue";

const activeComponent = ref('LightPillar');
const componentOpacity = ref(0.5);
const primaryColor = ref('#3B82F6');

onMounted(() => {
  const styles = getComputedStyle(document.documentElement);
  const rootColor = styles.getPropertyValue('--color-primary').trim();

  if (rootColor) {
    primaryColor.value = rootColor;
  }
});

const updatePrimaryColor = () => {
  document.documentElement.style.setProperty('--primary-color', primaryColor.value);
};

const hexToRgbVal = (hex: string) => {
  const defaultColor = { r: 59, g: 130, b: 246 };
  if (!hex || typeof hex !== 'string') return defaultColor;

  let c = hex.trim().replace(/^#/, '');
  if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(c)) return defaultColor;

  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};
const lightenColor = (hex: string, percent: number = 20) => {
  const { r, g, b } = hexToRgbVal(hex);
  const lighten = (n: number) => Math.min(255, Math.floor(n + (255 - n) * (percent / 100)));

  const toHex = (n: number) => n.toString(16).padStart(2, '0');

  return `#${toHex(lighten(r))}${toHex(lighten(g))}${toHex(lighten(b))}`;
};


const ditherRgb = computed(() => {
  const { r, g, b } = hexToRgbVal(primaryColor.value);
  return [r / 255, g / 255, b / 255] as [number, number, number];
});

const componentsList = [
  { label: 'Pixel Blast', value: 'PixelBlast' },
  { label: 'Dither', value: 'Dither' },
  { label: 'Plasma', value: 'Plasma' },
  { label: 'Light Pillar', value: 'LightPillar' },
];
</script>

<template>
  <div style="width: 100%; height: 100%; position: absolute; background: #000;">


      <PixelBlast
        v-if="activeComponent === 'PixelBlast'"
        :style="{ opacity: componentOpacity }"
        variant="circle"
        :pixel-size="4"
        :color="primaryColor"
        :pattern-scale="2"
        :pattern-density="1"
        :pixel-size-jitter="0"
        :enable-ripples="true"
        :ripple-speed="0.4"
        :ripple-thickness="0.12"
        :ripple-intensity-scale="1.5"
        :liquid="false"
        :speed="0.6"
        :edge-fade="0.25"
        :transparent="true"
      />

      <Dither
        v-if="activeComponent === 'Dither'"
        :style="{ opacity: componentOpacity }"
        :wave-speed="0.05"
        :wave-frequency="3"
        :wave-amplitude="0.3"
        :wave-color="ditherRgb"
        :color-num="4"
        :pixel-size="2"
        :disable-animation="false"
        :enable-mouse-interaction="false"
        :mouse-radius="1"
      />

      <Plasma
        v-if="activeComponent === 'Plasma'"
        :style="{ opacity: componentOpacity }"
        :color="primaryColor"
        :speed="0.6"
        direction="forward"
        :scale="1.1"
        :opacity="0.8"
        :mouseInteractive="false"
      />

      <LightPillar
        v-if="activeComponent === 'LightPillar'"
        :style="{ opacity: componentOpacity }"
        :topColor="lightenColor(primaryColor, 50)"
        :bottomColor="primaryColor"
        :intensity="1.4"
        :rotationSpeed="0.4"
        :glowAmount="0.005"
        :pillarWidth="5.8"
        :pillarHeight="1"
        :noiseIntensity="1.3"
        :pillarRotation="53"
        :interactive="false"
        mixBlendMode="normal"
      />

    </div>

    <div class="controls">
      <div class="control-group">
        <label>Компонент:</label>
        <div class="buttons">
          <button
            v-for="comp in componentsList"
            :key="comp.value"
            @click="activeComponent = comp.value"
            :class="{ active: activeComponent === comp.value }"
          >
            {{ comp.label }}
          </button>
        </div>
      </div>

      <div class="control-group">
        <label>Прозрачность: {{ componentOpacity }}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          v-model.number="componentOpacity"
        />

      </div>
      <div class="control-group">
        <label>Primary Color:</label>
        <input
          type="color"
          v-model="primaryColor"
          @input="updatePrimaryColor"
        />
      </div>


  </div>
</template>

<style scoped>

.controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: white;
  backdrop-filter: blur(5px);
  min-width: 300px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.buttons {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  background: #333;
  border: 1px solid #555;
  color: #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #444;
}

button.active {
  background: #48FF28;
  color: #000;
  border-color: #48FF28;
  font-weight: bold;
}

input[type="range"] {
  width: 100%;
  cursor: pointer;
}
</style>