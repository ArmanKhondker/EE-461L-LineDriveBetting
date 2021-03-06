import React from 'react';
import './Pages.css';
import './Autosuggest.css';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import GameBar from "../components/GameBar";
import queryString from 'query-string';
import ReactLoading from "react-loading";

function searchingFor(term) {
    return function (x) {
        if(x === undefined || term === undefined) return null;
        return x.team1FullName.toLowerCase().includes(term.toLowerCase()) ||
               x.team2FullName.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nflTeams: null,
            nflGames: null,
            nbaTeams: null,
            nbaGames: null,
            mlbTeams: null,
            mlbGames: null,
            allTeams: [],
            value: '',
        }

        this.searchHandler = this.searchHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.nflGames !== null) {
            nextProps.nflGames.forEach((game) => {
                game.team1FullName = this.encodeTeam(game.team1, 'nfl').fullName;
                game.team2FullName = this.encodeTeam(game.team2, 'nfl').fullName;
            })
        }

        if(nextProps.nbaGames !== null) {
            nextProps.nbaGames.forEach((game) => {
                game.team1FullName = this.encodeTeam(game.team1, 'nba').fullName;
                game.team2FullName = this.encodeTeam(game.team2, 'nba').fullName;
            })
        }

        if(nextProps.mlbGames !== null) {
            nextProps.mlbGames.forEach((game) => {
                game.team1FullName = this.encodeTeam(game.team1, 'mlb').fullName;
                game.team2FullName = this.encodeTeam(game.team2, 'mlb').fullName;
            })
        }

        this.setState({
            nflGames: nextProps.nflGames,
            nbaGames: nextProps.nbaGames,
            mlbGames: nextProps.mlbGames,
        })
    }

    async componentDidMount() {
        await fetch('/NFL/Teams.json')
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    this.setState({
                        nflTeams: data
                    });
                })
            })
            .catch(err => console.log(err));

        await fetch('/NBA/Teams.json')
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    this.setState({
                        nbaTeams: data
                    });
                })
            })
            .catch(err => console.log(err));

        await fetch('/MLB/Teams.json')
            .then(response => {
                response.json().then(data => {
                    console.log(data);
                    this.setState({
                        mlbTeams: data
                    });
                })
            })
            .catch(err => console.log(err));

        let combinedTeams = [].concat(this.state.mlbTeams, this.state.nbaTeams, this.state.nflTeams);
        await combinedTeams.shift();
        const queryValue = queryString.parse(window.location.search);
        const token = queryValue.value;
        console.log('token', token);
        console.log(combinedTeams);
        if(token !== undefined) {
            this.setState({ value: token });
            document.getElementById('search').value = token;
        }
        this.setState({
            allTeams: combinedTeams,
        });
    }

    encodeTeam(team, league) {
        const { nbaTeams, mlbTeams, nflTeams } = this.state;
        let teams;
        league = league.toLowerCase();
        if(league === 'nba') {
            teams = nbaTeams;
        } else if(league === 'nfl') {
            teams = nflTeams;
        } else if(league === 'mlb') {
            teams = mlbTeams;
        }

        for(let i = 0; i < teams.length; i ++) {
            if (teams[i].location === team) {
                return teams[i];
            }
        }
    }

    searchHandler(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit = function(e) {
        e.preventDefault();
        window.location = `http://www.linedrivebetting.com/Search?value=${this.state.value}`;
        return false;
    }

    render() {
        const { value } = this.state;
        const { nflGames, nbaGames, mlbGames } = this.props;
        let hasMounted = false;
        let nflResults = null;
        let nbaResults = null;
        let mlbResults = null;
        let loader = <ReactLoading type={"spin"} color={"#ffffff"} height={'20%'} width={'20%'} />

        if(nflGames !== null && nbaGames !== null && mlbGames !== null && value !== ''){
            hasMounted = true;
            nflResults = nflGames.filter(searchingFor(value));
            nbaResults = nbaGames.filter(searchingFor(value));
            mlbResults = mlbGames.filter(searchingFor(value));
            let resultsLength = nflResults.length + nbaResults.length + mlbResults.length;
            if(resultsLength > 0) {
                loader = <h2></h2>;
            } else if(resultsLength === 0) {
                loader= <h2>No results found.</h2>;
            }
        }

        if(nflResults === null && nbaResults === null && mlbResults === null &&
            nflGames !== null && nbaGames !== null && mlbGames !== null ) {
            if(value === '') {
                loader = <h2>Type above to search.</h2>;
            }
        }

        return(
            <div className="Pages-Search">
                <br/>
                <br/>
                <Form inline onSubmit={this.handleSubmit}>
                    <FormControl size="lg"
                                 type="text"
                                 placeholder="Search"
                                 className="mr-sm-2"
                                 onChange={this.searchHandler}
                                 id="search"
                    />
                </Form>
                <br/>
                {hasMounted ? (
                    nflResults.map((game, index) => {
                        return(
                            <React.Fragment key={index}>
                                <GameBar
                                    key={index}
                                    league="NFL"
                                    date={game.date}
                                    team1={this.encodeTeam(game.team1,'nfl').code}
                                    team2={this.encodeTeam(game.team2, 'nfl').code}
                                    spread1={game.opening_ps_1.slice(-1)[0]}
                                    spread2={game.opening_ps_2.slice(-1)[0]}
                                    link={`/Nfl/${game.team1.replace(' ','-')}-${game.team2.replace(' ', '-')}-${game._id}`}
                                />
                            </React.Fragment>
                        )
                    })
                ) : (
                    <div></div>
                )}
                {hasMounted ? (
                    nbaResults.map((game, index) => {
                        return(
                            <React.Fragment key={index}>
                                <GameBar
                                    key={index}
                                    league="NBA"
                                    date={game.date}
                                    team1={this.encodeTeam(game.team1, 'nba').code}
                                    team2={this.encodeTeam(game.team2, 'nba').code}
                                    spread1={game.opening_ps_1.slice(-1)[0]}
                                    spread2={game.opening_ps_2.slice(-1)[0]}
                                    link={`/Nba/${game.team1.replace(' ','-')}-${game.team2.replace(' ', '-')}-${game._id}`}
                                />
                            </React.Fragment>
                        )
                    })
                ) : (
                    <div></div>
                )}
                {hasMounted ? (
                    mlbResults.map((game, index) => {
                        return(
                            <React.Fragment key={index}>
                                <GameBar
                                    key={index}
                                    league="MLB"
                                    date={game.date}
                                    team1={this.encodeTeam(game.team1, 'mlb').code}
                                    team2={this.encodeTeam(game.team2, 'mlb').code}
                                    spread1={game.opening_ps_1.slice(-1)[0]}
                                    spread2={game.opening_ps_2.slice(-1)[0]}
                                    link={`/Mlb/${game.team1.replace(' ','-')}-${game.team2.replace(' ', '-')}-${game._id}`}
                                />
                            </React.Fragment>
                        )
                    })
                ) : (
                    <div></div>
                )}
                {loader}
            </div>
        );
    }
}

export default Search;
