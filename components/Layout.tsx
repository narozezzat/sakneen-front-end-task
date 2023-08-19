import Head from "next/head"
import Navbar from "./Navbar"

const Layout = (props: any) => {
  return (
    <div>
        <Head>
            <title>Sakneen</title>
        </Head>
        <Navbar />
        {props.children}
    </div>
  )
}

export default Layout