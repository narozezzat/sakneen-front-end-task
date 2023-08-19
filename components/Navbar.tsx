import logo from '../assets/sakneen1.png'
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="" style={{backgroundColor: "#2419be", height: "50px"}}>
        <div>
          <Link href="#">
          <Image src={logo} alt="" style={{height: "40px", width: "40px"}} className=""/>
          </Link>
        </div>
    </nav>
  )
}

export default Navbar