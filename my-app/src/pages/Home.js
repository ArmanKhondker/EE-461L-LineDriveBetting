import React from 'react';
import Logo from '../assets/images/LDBLogo.png';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ImgButton from "../components/ImgButton";
import Football from '../assets/images/white-football.png';
import Baseball from '../assets/images/white-baseball.png';
import Basketball from '../assets/images/white-basketball.png';

class Home extends React.Component {
    render() {
        return(
            <div className="App">
                <div className="App-header">
                    <img src={Logo} className="App-logo" alt="logo" />
                    <Form inline>
                        <FormControl size="lg" type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Go</Button>
                    </Form>
                    <a className="App-link" href="Nba">NBA</a>
                    <a className="App-link" href="Nfl">NFL</a>
                    <a className="App-link" href="Mlb">MLB</a>
                    <div className="btn-row">
                       <a href="nfl"><ImgButton image={Football} label="NFL"/></a> 
                        <a href="Mlb"><ImgButton image={Baseball} label="MLB"/></a>
                        <a href="nba"><ImgButton image={Basketball} label="NBA"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;