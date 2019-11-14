import React from "react";
import './Pages.css';
import OddsTable from "../components/OddsTable";
import LineGraph from "../components/LineGraph";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Game extends React.Component {
      constructor(props) {
        super(props);
        this.state= {
          team1_ml_Data : null,
          team2_ml_Data : null,
          team1_ps_Data : null,
          team2_ps_Data : null,
          openingCSS : "secondary",
          bovadaCSS : "success",
          betonlineCSS : "secondary",
          intertopsCSS : "secondary",
          sportsbettingCSS : "secondary",
          betnowCSS : "secondary",
          postContent: ""
        };
        this.setOpening = this.setOpening.bind(this);
        this.setBovada = this.setBovada.bind(this);
        this.setBetonline = this.setBetonline.bind(this);
        this.setIntertops = this.setIntertops.bind(this);
        this.setSportsbetting = this.setSportsbetting.bind(this);
        this.setBetnow = this.setBetnow.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
      }

      componentDidMount() {
        window.scrollTo(0, 0);
      }

      setOpening() {
          this.setState({
            team1_ml_Data : this.props.gameData.opening_ml_1,
            team2_ml_Data : this.props.gameData.opening_ml_2,
            team1_ps_Data : this.props.gameData.opening_ps_1,
            team2_ps_Data : this.props.gameData.opening_ps_2,
            openingCSS : "success",
            bovadaCSS : "secondary",
            betonlineCSS : "secondary",
            intertopsCSS : "secondary",
            sportsbettingCSS : "secondary",
            betnowCSS : "secondary"
          });
        }

      setBovada() {
          this.setState({
            team1_ml_Data : this.props.gameData.bovada_ml_1,
            team2_ml_Data : this.props.gameData.bovada_ml_2,
            team1_ps_Data : this.props.gameData.bovada_ps_1,
            team2_ps_Data : this.props.gameData.bovada_ps_2,
            openingCSS : "secondary",
            bovadaCSS : "success",
            betonlineCSS : "secondary",
            intertopsCSS : "secondary",
            sportsbettingCSS : "secondary",
            betnowCSS : "secondary"
          });
      }

      setBetonline() {
          this.setState({
            team1_ml_Data : this.props.gameData.betonline_ml_1,
            team2_ml_Data : this.props.gameData.betonline_ml_2,
            team1_ps_Data : this.props.gameData.betonline_ps_1,
            team2_ps_Data : this.props.gameData.betonline_ps_2,
            openingCSS : "secondary",
            bovadaCSS : "secondary",
            betonlineCSS : "success",
            intertopsCSS : "secondary",
            sportsbettingCSS : "secondary",
            betnowCSS : "secondary"
          });
      }

      setIntertops() {
          this.setState({
            team1_ml_Data : this.props.gameData.intertops_ml_1,
            team2_ml_Data : this.props.gameData.intertops_ml_2,
            team1_ps_Data : this.props.gameData.intertops_ps_1,
            team2_ps_Data : this.props.gameData.intertops_ps_2,
            openingCSS : "secondary",
            bovadaCSS : "secondary",
            betonlineCSS : "secondary",
            intertopsCSS : "success",
            sportsbettingCSS : "secondary",
            betnowCSS : "secondary"
          });
      }

      setSportsbetting() {
          this.setState({
            team1_ml_Data : this.props.gameData.sportsbetting_ml_1,
            team2_ml_Data : this.props.gameData.sportsbetting_ml_2,
            team1_ps_Data : this.props.gameData.sportsbetting_ps_1,
            team2_ps_Data : this.props.gameData.sportsbetting_ps_2,
            openingCSS : "secondary",
            bovadaCSS : "secondary",
            betonlineCSS : "secondary",
            intertopsCSS : "secondary",
            sportsbettingCSS : "success",
            betnowCSS : "secondary"
          });
      }

      setBetnow() {
          this.setState({
            team1_ml_Data : this.props.gameData.betnow_ml_1,
            team2_ml_Data : this.props.gameData.betnow_ml_2,
            team1_ps_Data : this.props.gameData.betnow_ps_1,
            team2_ps_Data : this.props.gameData.betnow_ps_2,
            openingCSS : "secondary",
            bovadaCSS : "secondary",
            betonlineCSS : "secondary",
            intertopsCSS : "secondary",
            sportsbettingCSS : "secondary",
            betnowCSS : "success"
          });
      }

      handleContentChange(e) {
         this.setState({postContent: e.target.value});
      }

      render() {
      var gameData = this.props.gameData;
      var team1_ml_Data = this.state.team1_ml_Data;
      var team2_ml_Data = this.state.team2_ml_Data;
      var team1_ps_Data = this.state.team1_ps_Data;
      var team2_ps_Data = this.state.team2_ps_Data;
      return(
          <div className="Pages-Nfl" style={{ fontSize: '20px' }}>
              <div style={{ maxWidth: '80vw'}}>
                  <br/>
                  <br/>
                  <br/>
                  <h1>Point Spread</h1>
                  <OddsTable
                      team1={gameData.team1}
                      opening1={gameData.opening_ps_1.slice(-1)[0]}
                      bovada1={gameData.bovada_ps_1.slice(-1)[0]}
                      betonline1={gameData.betonline_ps_1.slice(-1)[0]}
                      intertops1={gameData.intertops_ps_1.slice(-1)[0]}
                      sportsbetting1={gameData.sportsbetting_ps_1.slice(-1)[0]}
                      betnow1={gameData.betnow_ps_1.slice(-1)[0]}
                      team2={gameData.team2}
                      opening2={gameData.opening_ps_2.slice(-1)[0]}
                      bovada2={gameData.bovada_ps_2.slice(-1)[0]}
                      betonline2={gameData.betonline_ps_2.slice(-1)[0]}
                      intertops2={gameData.intertops_ps_2.slice(-1)[0]}
                      sportsbetting2={gameData.sportsbetting_ps_2.slice(-1)[0]}
                      betnow2={gameData.betnow_ps_2.slice(-1)[0]}
                  />
                  <br/>
                  <LineGraph team1={gameData.team1} team2={gameData.team2} team1_Data={team1_ps_Data == null ? gameData.bovada_ps_1 : team1_ps_Data} team2_Data={team2_ps_Data == null ? gameData.bovada_ps_2 : team2_ps_Data}  times={gameData.sys_time}/>
                  <Table className="chartClicker" striped bordered hover variant="dark" size="sm">
                      <thead>
                          <tr>
                              <th>CHART:</th>
                              <th><Button variant={this.state.openingCSS} onClick={() => this.setOpening()}>OPENING</Button></th>
                              <th><Button variant={this.state.bovadaCSS} onClick={() => this.setBovada()}>BOVADA</Button></th>
                              <th><Button variant={this.state.betonlineCSS} onClick={() => this.setBetonline()}>BETONLINE</Button></th>
                              <th><Button variant={this.state.intertopsCSS} onClick={() => this.setIntertops()}>intertops</Button></th>
                              <th><Button variant={this.state.sportsbettingCSS} onClick={() => this.setSportsbetting()}>SPORTSBETTING</Button></th>
                              <th><Button variant={this.state.betnowCSS} onClick={() => this.setBetnow()}>BETNOW</Button></th>
                          </tr>
                      </thead>
                  </Table>
                  <br/>
                  <h1>Money Line</h1>
                  <OddsTable
                      team1={gameData.team1}
                      opening1={gameData.opening_ml_1.slice(-1)[0]}
                      bovada1={gameData.bovada_ml_1.slice(-1)[0]}
                      betonline1={gameData.betonline_ml_1.slice(-1)[0]}
                      intertops1={gameData.intertops_ml_1.slice(-1)[0]}
                      sportsbetting1={gameData.sportsbetting_ml_1.slice(-1)[0]}
                      betnow1={gameData.betnow_ml_1.slice(-1)[0]}
                      team2={gameData.team2}
                      opening2={gameData.opening_ml_2.slice(-1)[0]}
                      bovada2={gameData.bovada_ml_2.slice(-1)[0]}
                      betonline2={gameData.betonline_ml_2.slice(-1)[0]}
                      intertops2={gameData.intertops_ml_2.slice(-1)[0]}
                      sportsbetting2={gameData.sportsbetting_ml_2.slice(-1)[0]}
                      betnow2={gameData.betnow_ml_2.slice(-1)[0]}
                  />
                  <br/>
                  <LineGraph team1={gameData.team1} team2={gameData.team2} team1_Data={team1_ml_Data == null ? gameData.bovada_ps_1 : team1_ml_Data} team2_Data={team2_ml_Data == null ? gameData.bovada_ps_2 : team2_ml_Data}  times={gameData.sys_time}/>
                  <Table className="chartClicker" striped bordered hover variant="dark" size="sm">
                      <thead>
                          <tr>
                              <th>CHART:</th>
                              <th><Button variant={this.state.openingCSS} onClick={() => this.setOpening()}>OPENING</Button></th>
                              <th><Button variant={this.state.bovadaCSS} onClick={() => this.setBovada()}>BOVADA</Button></th>
                              <th><Button variant={this.state.betonlineCSS} onClick={() => this.setBetonline()}>BETONLINE</Button></th>
                              <th><Button variant={this.state.intertopsCSS} onClick={() => this.setIntertops()}>intertops</Button></th>
                              <th><Button variant={this.state.sportsbettingCSS} onClick={() => this.setSportsbetting()}>SPORTSBETTING</Button></th>
                              <th><Button variant={this.state.betnowCSS} onClick={() => this.setBetnow()}>BETNOW</Button></th>
                          </tr>
                      </thead>
                  </Table>
                  <br/>
                  <div className = "post-section">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Post:</Form.Label>
                      <Form.Control as="textarea" rows="3" value={this.state.postContent} onChange={this.handleContentChange} />
                    </Form.Group>
                    <Button className="submit-button" variant="primary">Submit</Button>
                    <br/>
                  </div>
                  <div className="comments-section">
                    <div className="post">
                      <p className="post-username">username:</p>
                      <p className="post-content">content goes here</p>
                      <p className="like-count">8 likes</p>
                    </div>
                  </div>
              </div>
          </div>
      );
    }
}

export default Game;
