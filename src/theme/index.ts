import { ThemeConfig } from "antd"
import { remToPx } from "@/utils/rem"

const theme: ThemeConfig = {
  components: {
    Input: {
      paddingInlineLG: remToPx(1.88),
      paddingBlockLG: remToPx(1.42),
      inputFontSizeLG: remToPx(1.3),
    },
    Form: {
     labelColor: '#000',
     labelFontSize: remToPx(1.5),
     labelHeight: 40,
     itemMarginBottom: remToPx(2.85),
    }
  },
  token: {
    fontSize: remToPx(1.2),
    colorPrimary: '#E48700'
  }
}

export default theme