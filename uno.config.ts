// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetMini,
  presetAttributify,
  presetIcons,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetMini(),
    presetAttributify(),
    presetIcons({
      prefix: 'icon-'
    })
  ],
  transformers: [transformerDirectives()]
})
