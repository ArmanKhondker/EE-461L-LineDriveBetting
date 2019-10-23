import React from 'react';
import NFLLogo from '../assets/images/NFL.png';
import Logo from '../assets/images/LDBLogo.png';
import '../components/Logos.css';
import './Pages.css';
import GameBar from "../components/GameBar";

class Nfl extends React.Component {
    render()
    {
        return(
        <body className = "Pages">
             <div>
             <h1>Placeholder</h1>
             <img src={Logo} className="App-logo-pages" alt="logo" />
             <img src={NFLLogo} className = "Logos" alt="NFL" />

             </div>
             <GameBar
                league="NFL"
                team1="HOU"
                team2="IND"
                dateTime=""
                spread1="+3"
                spread2="-3"
             />
        <p>NFL page!</p>

           </body>
           );
    }
}

export default Nfl;
