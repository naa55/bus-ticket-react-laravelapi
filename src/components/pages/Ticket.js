import React, { Component } from 'react'
import {useParams,Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
export const withNavigation = (Component) => {
  return props => <Component {...props} navigate={useNavigate()} />;
}
export const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};
 export class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets:[],
      error:{}
    }
    this.deleteMenu = this.deleteMenu.bind(this);

  }
 

  getTicketList() {
    axios.get('/api/me/'+this.props.params.id).then((res) => {
        if(res.data.status === 200) {
          this.setState({tickets:res.data.tickets})
        }
        if(res.status === 401) {
          this.setState({error:res.data.error.message})
        }
    });
  }

  deleteMenu(event) {
    axios
        .delete("/api/booking/" + event.target.value)
        .then((response) => this.getTicketList());
}


  componentDidMount() {
    this.getTicketList();
  }
  render() {

    return (
      <div className='max-w-5xl md:max-w-5xl mx-auto justify-center my-12 items-center min-h-screen'>
       <a
            href="/ticket"
            className="p-4 text-sm font-semibold text-white bg-indigo-900 rounded shadow-md  md:text-base hover:bg-indigo-700"
            >Buy Ticket</a
        >
        {this.state.tickets.length <= 0 ? <p className='mt-8'>Nothing Here</p>: 
        this.state.tickets.map((item) => (
          <div className='lg:w-[500px] md:w-[100px] justify-center mx-auto mt-8' key={item.id}>
          <div className='bg-gray-100 shadow-lg shadow-indigo-200 rounded-lg mb-4'>
          <ul  class="marker:text-sky-400 list-disc  space-y-3 text-slate-400 p-8">
             <li>Departure Time: 08:00am</li>
             <li>Period: {item.book_date}</li>
             <li>Seat Number: {item.seat_number}</li>
             <div className='text-blue-500 underline'>
               <button value={item.id} type="button" onClick={this.deleteMenu}>Delete</button>
           </div>
           </ul>
           </div>
          </div>
       ))
        }

      </div>
    )
  }
}

export default withNavigation(withParams(Ticket))