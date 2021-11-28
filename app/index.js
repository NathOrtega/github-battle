import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { ThemeProvider } from "./contexts/theme"
import Nav from "./components/nav"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from "./components/loading"

const Popular = React.lazy(() => import("./components/popular"))
const Battle = React.lazy(() => import("./components/battle"))
const Results = React.lazy(() => import("./components/results"))

class App extends React.Component{
  state = {
    theme: "light",
    toogleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light"
      }))
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <React.Suspense fallback={<Loading/>}>
                <Routes>
                  <Route exact path="/" element={<Popular/>}/>
                  <Route exact path="/battle" element={<Battle/>} />
                  <Route path="/battle/results" element={<Results/>}/>
                  <Route path="*" element={<p className="center-text error">Page not found!</p>}/>
                </Routes>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

/*
  ReactDom has a render method that accepts two parameters: 
  1. The component or element we want to render
  2. The place in the DOM where we want to render it
*/
ReactDOM.render(<App/>, document.getElementById("app"))