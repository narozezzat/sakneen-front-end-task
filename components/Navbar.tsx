import logo from '../assets/sakneen1.png'
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="header">
          <Link href="#">
            <Image src={logo} alt="" className="navbarImg"/>
          </Link>
    </nav>
  )
}

export default Navbar