import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  base: '/APEX_OceanSheild_Al_SIH/', // 👈 ADD THIS LINE
})
