import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component
import PngIcon from '@/components/PngIcon'// png component

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('png-icon', PngIcon)

const reqSvg = require.context('./svg', false, /\.svg$/)
const requireAllSvg = requireContext => requireContext.keys().map(requireContext)
requireAllSvg(reqSvg)

const reqPng = require.context('./png', false, /\.png$/)
const requireAllPng = requireContext => requireContext.keys().map(requireContext)
requireAllPng(reqPng)