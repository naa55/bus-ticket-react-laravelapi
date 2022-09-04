import React, { Component } from 'react';
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';

export const withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export class TicketCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            book_date: "",
            seat_number: "",
            user_id:'',
            ticket:[],
            region:[],
            notAvaliable:[],
            seats:[],
            errors:{},
            query:{
                book_date:'',
                region_id:''
            }
        };

        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleBookChange = this.handleBookChange.bind(this);
        this.handleSeatChange = this.handleSeatChange.bind(this);
        this.ticketChange = this.ticketChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stationChange = this.stationChange.bind(this);
        this.handleRegId = this.handleRegId.bind(this);

    }
    handleFirstChange(e) {
        this.setState({first_name: e.target.value})
    }
    handleLastChange(e) {
        this.setState({last_name: e.target.value})
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }
   
    handleBookChange(e) {
        this.setState({book_date: e.target.value})
    }
    handleSeatChange(e) {
        this.setState({seat_number: e.target.value})
    }
    handleRegId(e) {
        this.setState({region_id: e.target.value})
    }
   
    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/booking', {
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            book_date: this.state.query.book_date,
            seat_number: this.state.seat_number,
            user_id: parseInt(localStorage.getItem("auth_id"))
            }).then((response) => this.props.navigate(`/ticket/user/${parseInt(localStorage.getItem("auth_id"))}`))
            .catch((error) => this.setState({errors: error.response.data.errors}))
        }
        errorMessage(field) {
            return (
                <div className="text-red-600 mt-1">
                {this.state.errors?.[field]?.map((message, index) => {
                return (
                    <div key={index}>{message}</div>
                )
                })}
                </div>
            )
        }

    fetchSeat() {
        axios
            .get("/api/seats")
            .then((response) =>
                this.setState({ seats: response.data.data })
            );
    }
    fetchRegion() {
        axios
            .get("/api/region")
            .then((response) =>
                this.setState({ region: response.data.data })
            );
    }

    fetchTicket() {
        axios
            .get("/api/tickets", {params: this.state.query})
            .then((response) =>
                this.setState({ ticket: response.data.ticket, notAvaliable:response.data.notAvaliable})
            );
    }
   
    fetchStation() {
        axios
            .get("/api/station", {params: this.state.query})
            .then((response) => this.setState({station:response.data.station}));
    }
   

    // ticketChange(event) {
    //     this.setState(({
    //         query: {
    //             book_date: event.target.value,
    //         }
    //     }), () => this.fetchTicket())
    // }
    
        ticketChange(event) {
            this.setState((state) =>({
                query: {
                    book_date: event.target.value,
                    // region_id: state.region_id,
                }
            }), () => this.fetchTicket())
        }
    stationChange(event) {
        this.setState(({
            query: {
                region_id: event.target.value
            }
        }), () => this.fetchStation())
    }

    componentDidMount() {
        this.fetchTicket();
        this.fetchSeat();
        this.fetchRegion();
        this.fetchStation();
    }
    
    renderAvaliableTickets() {
        const available = this.state.ticket.map(seat => <option key={seat.id} value={seat.seat_number}>{seat.seat_number}</option> );
        return (
            <div className="m-2">
                <select onChange={this.handleSeatChange}  className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>-- available seats --</option>
                        {available}
                </select>
            </div>
        )
    }
    renderAvaliableSeats() {
        const available = this.state.seats.map(seat => <option key={seat.id} value={seat.id}>{seat.seat_number}</option> );
        return (
            <div className="m-2">
                <select onChange={this.handleSeatChange}  className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>-- available seats --</option>
                        {available}
                </select>
            </div>
        )
    }
    renderRegion() {
        const regions = this.state.region.map(reg => <option key={reg.id} value={reg.id}>{reg.region}</option> );
        return (
            <div className="m-2">
                <select onChange={this.stationChange} className="mt-1 p-2 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>-- region --</option>
                        {regions}
                </select>
            </div>
        )
    }

    renderOption() {
        if(this.state.query.book_date) {
            return (
                <div>
                  {this.state.ticket.length <=0  ? this.renderAvaliableSeats() : this.renderAvaliableTickets()}
                </div>
            )
        } else {
            return '';
        }
    }

  render() {
    return (
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Link className="p-4 text-sm font-semibold text-white bg-indigo-900 rounded shadow-md  md:text-base hover:bg-indigo-700" to={`/ticket/user/${localStorage.getItem('auth_id')}`}>
                        My Ticket </Link>
            <div className="m-2 p-2 bg-slate-100 rounded mt-8">
                <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-10">
                    <form
                        encType="multipart/form-data"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {" "}
                                FirstName{" "}
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name='first_name'
                                    value={this.state.first_name}
                                    onChange={this.handleFirstChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                            {this.errorMessage('first_name')}
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {" "}
                                LastName{" "}
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={this.state.last_name}
                                    onChange={this.handleLastChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                            {this.errorMessage('last_name')}
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {" "}
                               Email{" "}
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                            {this.errorMessage('email')}
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="res_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {" "}
                               Region{" "}
                            </label>
                            {this.renderRegion()}
                        </div>
                       
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="res_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {" "}
                               Date{" "}
                            </label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    value={this.state.query.book_date}
                                    onChange={this.ticketChange}

                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                            {this.errorMessage('book_date')}
                        </div>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="res_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                {" "}
                              Seat Number{" "}
                            </label>
                            <div>
                            {this.state.notAvaliable.length === 5 ? <p className='mt-4 text-red-600'>No Seat available on {this.state.query.book_date}</p>:this.renderOption()}                     

                        </div>
                        {this.errorMessage('seat_number')}

                        </div>
                        
                        <div className="mt-6 p-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default withNavigation(TicketCreate)
