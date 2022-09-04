import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class TicketIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: [],
            query: {
                page: 1,
                global:'',
                id:'',
                first_name:'',
                book_date:'',
                order_column: 'id',
                order_direction: 'desc'
            }
        }
        this.pageChanged= this.pageChanged.bind(this);
        this.handleTicketFilter= this.handleTicketFilter.bind(this);
        this.handleGlobalFilter = this.handleGlobalFilter.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);

    }
    fetchTicket() {
        axios
            .get("/api/booking", { params: this.state.query })
            .then((response) => this.setState({ tickets: response.data }))
            .catch((error) => console.log(error));
    }
    
    componentDidMount() {
        this.fetchTicket();
    }
    deleteMenu(event) {
        axios
            .delete("/api/booking/" + event.target.value)
            .then((response) => this.fetchTicket());
    }
    pageChanged(url) {
        const fullUrl = new URL(url);
        this.setState((state) =>({
            query: {
                id: this.state.query.id,
                page: fullUrl.searchParams.get('page'),
                order_column: state.query.order_column,
                order_direction: state.query.order_direction
            }
           }), () => this.fetchTicket());
    }
    handleTicketFilter(event) {
        this.setState((state) => ({
         query: {
            book_date: event.target.value,
             page: 1,
             order_column: state.query.order_column,
             order_direction: state.query.order_direction
         }
        }));
 
        this.debouceFetchPosts()
     }
     handleGlobalFilter(event) {
        this.setState((state) => ({
         query: {
             global: event.target.value,
             page: 1,
             order_column: state.query.order_column,
             order_direction: state.query.order_direction
         }
        }), this.fetchTicket());
     }
   

    renderTable() {
        return this.state.tickets.data.map((ticket) => (
            <tr key={ticket.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.first_name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.last_name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.email}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.book_date}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ticket.seat_number}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/admin/ticket/edit/${ticket.id}`}>
                        Edit
                    </Link>{" "}
                    /
                    <button
                        value={ticket.id}
                        onClick={this.deleteMenu}
                        type="button"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }
    renderPaginatorLinks() {
        return this.state.tickets.meta.links.map((link, index) => (
            <button
                key={index}
                onClick={() => this.pageChanged(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"
            ></button>
        ));
    }

    renderPagination() {
        return (
            <nav
                role="navigation"
                aria-label="Pagination Navigation"
                className="flex items-center justify-between"
            >
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 leading-5">
                            Showing
                            <span>
                                <span className="font-medium">
                                    {" "}
                                    {this.state.tickets.meta.from}{" "}
                                </span>
                                to
                                <span className="font-medium">
                                    {" "}
                                    {this.state.tickets.meta.to}{" "}
                                </span>
                            </span>
                            of
                            <span className="font-medium">
                                {" "}
                                {this.state.tickets.meta.total}{" "}
                            </span>
                            results
                        </p>
                    </div>

                    <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                            {this.renderPaginatorLinks()}
                        </span>
                    </div>
                </div>
            </nav>
        );
    }
  render() {
    if (!("data" in this.state.tickets)) return;
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <button>Ticket</button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                FirstName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                LastName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Seat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit / Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTable()}</tbody>
                </table>
            </div>
            <div className='mt-8'>
            {this.renderPagination()}
            </div>

        </div>
        {console.log(this.state.tickets)}
    </div>
    )
  }
}

export default TicketIndex
