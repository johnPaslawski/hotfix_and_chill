import Landing from './components/Landing'
import Navbar from "@components/layout/Navbar.tsx";
import Footer from "@components/layout/Footer.tsx";

function App() {

  return (
      <main>
        <Navbar/>
        <div id={"Default"}>
        <Landing />
        </div>
        <Footer/>
      </main>
  )
}

export default App
