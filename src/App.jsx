import logo from './logo.svg'
import './App.css'
import Builder from "./Builder"
import Nav from "./Nav"
import * as download from "downloadjs"
import Grid from "@mui/material/Grid"
import Footer from './Footer'
function App() {


  return (
    <div>
      <Nav />
      <Grid container >
        <Grid item xs ></Grid>
        <Grid item xs={9} md={6} lg={5} >
          <Builder />
          <Footer />
        </Grid>
        <Grid item xs ></Grid>
      </Grid>
      {/* <button onClick={handleCreateApp} >Create project</button> */}
      {/* <a href="http://localhost:7072/project/Sample" >download project</a> */}
    </div>
  )
}

export default App
