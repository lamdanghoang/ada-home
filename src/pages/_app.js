import Layout from '../components/Layout/layout';
import 'tailwindcss/tailwind.css'
import { Toaster } from "@/components/ui/toaster"
import "@meshsdk/react/styles.css";
import { MeshProvider } from "@meshsdk/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <MeshProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </MeshProvider>

  )
}