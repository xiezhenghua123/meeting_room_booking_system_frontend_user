// uno.config.ts
import { defineConfig, presetUno, presetMini, presetAttributify, presetIcons  } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetMini(), presetAttributify(), presetIcons()],
})
