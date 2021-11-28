import React from "react";
import { FaMoon, FaSun} from "react-icons/fa"
import { ThemeConsumer } from "../contexts/theme"
import { NavLink } from "react-router-dom"

const activeStyle = {
    color: "hotpink"
}

export default function Nav(){
    return (
        <ThemeConsumer>
            {({ theme, toogleTheme }) => (
                <nav className="row space-between">
                    <ul className="row nav">
                        <li>
                            <NavLink 
                                to="/" className="nav-link" 
                                style={({isActive}) => isActive ? activeStyle : {}}
                            >
                                Popular
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/battle" className="nav-link" 
                                style={({isActive}) => isActive ? activeStyle : {}}
                            >
                                Battle
                            </NavLink>
                        </li>
                    </ul>
                    <button style={{fontSize: 30, cursor: "pointer"}} className="button-clear" onClick={toogleTheme}>
                        {theme==="light" ? <FaMoon color="Steelblue"/> : <FaSun color="#FFF4B3"/>}
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}