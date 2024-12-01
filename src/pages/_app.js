import Layout from '../components/Layout/layout';
import 'tailwindcss/tailwind.css'
import { Toaster } from "@/components/ui/toaster"

export default function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
  )
}