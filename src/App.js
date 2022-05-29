import React, { Component } from 'react'

import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { BookDetails, BookList, StudentList, StudentDetails } from './Pages/All'

class App extends Component {

  state = {
      BACKEND_URL: 'http://localhost:8080'
  }

  render() {

    return (
      <React.Fragment>
        <Router>

          <Header />

          <Routes>

            {/*--------------- Books ---------------------*/}

            <Route path="/listBooks" exact element={
              <BookList BACKEND_URL={this.state.BACKEND_URL} />
            } />
            <Route path="/bookDetails" exact element={
              <BookDetails BACKEND_URL={this.state.BACKEND_URL} />
            } />


            {/*--------------- Students ---------------------*/}

            <Route path="/listStudents" exact element={
              <StudentList BACKEND_URL={this.state.BACKEND_URL} />
            } />
            <Route path="/studentDetails" exact element={
              <StudentDetails BACKEND_URL={this.state.BACKEND_URL} /> 
            } />

          </Routes>

        </Router>
      </React.Fragment>


    );
  }

}


export default App;
