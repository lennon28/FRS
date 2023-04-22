import React, { useEffect, useState } from "react";
import { API } from "../service/Service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddSchedule.css";

function AddSchedule() {
  const [flight, setFlight] = useState([]);
  const [flightID, setFlightID] = useState();
  const [route, seRoute] = useState([]);
  const [routeID, seRouteID] = useState();
  const [schedule, setSchedule] = useState({
    availableDays: "",
    departureTime: "",
    travelDuration: 0,
  });
  useEffect(() => {
    API.get().then((res) => setFlight(res));
  }, []);

  useEffect(() => {
    API.getRoute().then((res) => seRoute(res));
  }, []);

  console.log(route);
  useEffect(() => {
    if (flightID) {
      API.getFlightById(flightID).then((res) =>
        setSchedule({
          ...schedule,
          flightBean: {
            flightID: res.flightID,
            flightName: res.flightName,
            seatingCapacity: res.seatingCapacity,
            reservationCapacity: res.reservationCapacity,
          },
        })
      );
    }
  }, [flightID]);
  useEffect(() => {
    if (routeID) {
      API.getRouteById(routeID).then((res) =>
        setSchedule({
          ...schedule,
          routeBean: {
            routeID: res.routeID,
            source: res.source,
            destination: res.destination,
            distance: res.distance,
            fare: res.fare,
          },
        })
      );
    }
  }, [routeID]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(schedule);
    console.log(JSON.stringify(schedule));
    API.postSchedule(schedule).then((res) =>
      alert("data submitted successfully")
    );
  };

  const handleselect = (e) => {
    setFlightID(e.target.value);
  };
  const handleselect1 = (e) => {
    seRouteID(e.target.value);
  };
  return (
    <div className="addroute" style={{margin:"0",
    padding:"0"}}>
      <h1>ADD SCHEDULE</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Available Days:</label>
              <input
                type="text"
                className="form-control"
                value={schedule.availableDays}
                onChange={(e) =>
                  setSchedule({ ...schedule, availableDays: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Departure Time:</label>
              <input
                type="text"
                className="form-control"
                value={schedule.departureTime}
                onChange={(e) =>
                  setSchedule({ ...schedule, departureTime: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Travel Duration:</label>
              <input
                type="text"
                className="form-control"
                value={schedule.travelDuration}
                onChange={(e) =>
                  setSchedule({ ...schedule, travelDuration: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group">
              <label>Select Flight:</label>
              <select className="form-control" onChange={handleselect}>
                <option value={""}>--select flight--</option>
                {flight.map((sche) => {
                  return (
                    <option value={sche.flightID} key={flight.flightID}>
                      {sche.flightName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Select Route:</label>
              <select className="form-control" onChange={handleselect1}>
                <option>--select route--</option>
                {route.map((rout) => {
                  return (
                    <option value={rout.routeID}>
                      {rout.source}
                      <span>-</span>
                      {rout.destination}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSchedule;
