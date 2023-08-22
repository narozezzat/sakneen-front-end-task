import logo from '../assets/sakneen1.png'
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="header">
          <Link href="#">
            <img src="/sakneen1.png"  alt="" className="navbarImg"/>
          </Link>
    </nav>
  )
}

export default Navbar