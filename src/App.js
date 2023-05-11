import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import EventGenre from "./EventGenre";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    warningText: "",
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const authorized = code || isTokenValid;
    const isLocal = window.location.href.indexOf("localhost") > -1;
    this.setState({ showWelcomeScreen : !authorized && !isLocal });
    getEvents().then((events) => {
      if (this.mounted) {
        const shownEvents = events.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  promptOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({
        warningText: 'You are offline, so events may not be up to date'
      })
    }
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          selectedCity: location,
        });
      });
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === "all"
            ? events
            : events.filter(
                (event) => this.state.selectedCity === event.location
              );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    }
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };  

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className='App'>
         <Row className="justify-content-center py-5">
          <Col md={9} className="mb-5 d-flex flex-column align-items-center">
            <h1 className="mb-4">Welcome to Meet App</h1>
            <div
              className="position-absolute start-50 translate-middle-x"
              style={{ top: "10px" }}
            >
            </div>
              <h4 className="mb-4">Choose your nearest city</h4>
            <CitySearch
              locations={this.state.locations}
              updateEvents={this.updateEvents}
            />
           <NumberOfEvents
              selectedCity={this.state.selectedCity}
              query={this.state.eventCount}
              updateEvents={this.updateEvents}
           />
          </Col>
        </Row>
        <Row className="py-5 text-center">
          <h3 className="mb-4">Events in Each City</h3>
        </Row>
        <Col>
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400} className='scatter'>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
              >
                <CartesianGrid />
                <XAxis
                  type="category"
                  dataKey="city"
                  name="city"
                  angle="35"
                  minTickGap="2"
                  tick={{ textAnchor: "start" }}
                />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="number of events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        </Col>
        <WarningAlert text={this.state.offLineText} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { 
          getAccessToken() }} />
      </div>
    );
  }
}

export default App;
