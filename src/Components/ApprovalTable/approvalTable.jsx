// import React, { Component } from "react";
// import { connect } from "react-redux";

// import Sidebar from "../Shared/Dashboard/Sidebar/Sidebar.jsx";
// import Header from "../Shared/Dashboard/Header/Header.jsx";
// import "./approvalTable.scss";
// import tripImage from "../../Assets/tripImage.svg";
// import user from "../../Assets/user.svg";
// import { approvalResponse } from "../../Redux/Actions/ApprovalTable/approvalTableAction.js";

// /**
//  * This class contains methods
//  * for accepting or rejecting component
//  */
// export class ApprovalTable extends Component {
//   /**
//    * This method has a constructor which calls super() method
//    * and initialize state object
//    * @param {object} props props passed to this class.
//    * @returns {void}
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       status: ""
//     };
//   }

//   /**
//    * This method renders content in the DOM
//    * @returns {JSX} to be rendered on the screen
//    */

//   render() {
//     const { status } = this.state;
//     return (
//       <div className="container">
//         <Header />
//         <Sidebar />

//         <section className="content-section">
//           <div className="approval-table">
//             <div className="approval-table__site-title">
//               <h3>Assigned Trips</h3>
//               <hr />
//             </div>

//             <div className="page-filter">
//               <div className="page-filter__filter-by-status">
//                 <span className="page-filter__filter-text">Filter</span>
//                 <select>
//                   <option>Status</option>
//                   <option>Pending</option>
//                   <option>Rejected</option>
//                   <option>Accepted</option>
//                 </select>
//               </div>
//             </div>

//             <div className="approval-item">
//               <div className="approval-item__item-space">
//                 <img src={tripImage} alt="profile" />

//                 <div className="approval-item__reason">
//                   <h5>Going to visit my parent</h5>
//                   <div className="approval-item__destination">
//                     <span className="approval-item__from">
//                       <span className="approval-item__label">From:</span> Kigali
//                       branch
//                     </span>
//                     <span className="approval-item__to">
//                       <span className="approval-item__label">To:</span> New York
//                     </span>
//                   </div>
//                   <div className="approval-item__date">Date: 12 Dec 2020</div>
//                 </div>

//                 <div className="approval-item__button">
//                   <button
//                     type="button"
//                     className="approval-item__button--btn-primary"
//                     onClick={status}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     type="button"
//                     className="approval-item__button--btn-danger"
//                     onClick={status}
//                   >
//                     Reject
//                   </button>
//                 </div>

//                 <div className="item-details">
//                   <img
//                     src={user}
//                     alt="profile"
//                     className="item-details__profile-picture"
//                   />

//                   <div className="item-details__text">
//                     <h4>Kalisa Arsene</h4>
//                     <span className="item-details__requester">Requester</span>
//                     <br />
//                     <span className="item-details__email">
//                       brianninja@email.com
//                     </span>
//                     <br />
//                     <span className="item-details__department">
//                       IT Department
//                     </span>
//                     <br />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="approval-item">
//               <div className="approval-item__item-space">
//                 <img src={tripImage} alt="profile" />

//                 <div className="approval-item__reason">
//                   <h5>Going to visit my parent</h5>
//                   <div className="approval-item__destination">
//                     <span className="approval-item__from">
//                       <span className="approval-item__label">From:</span> Kigali
//                       branch
//                     </span>
//                     <span className="approval-item__to">
//                       <span className="approval-item__label">To:</span> New York
//                     </span>
//                   </div>
//                   <div className="approval-item__date">Date: 12 Dec 2020</div>
//                 </div>

//                 <div className="approval-item__button">
//                   <button
//                     type="button"
//                     className="approval-item__button--btn-primary"
//                     onClick={status}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     type="button"
//                     className="approval-item__button--btn-danger"
//                     onClick={status}
//                   >
//                     Reject
//                   </button>
//                 </div>

//                 <div className="item-details">
//                   <img
//                     src={user}
//                     alt="profile"
//                     className="item-details__profile-picture"
//                   />

//                   <div className="item-details__text">
//                     <h4>Kalisa Arsene</h4>
//                     <span className="item-details__requester">Requester</span>
//                     <br />
//                     <span className="item-details__email">
//                       brianninja@email.com
//                     </span>
//                     <br />
//                     <span className="item-details__department">
//                       IT Department
//                     </span>
//                     <br />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// ApprovalTable.propTypes = {
//   // ApprovalTableAction: PropTypes.func.isRequired
//   // status: PropTypes.string,
//   // loading: PropTypes.bool
// };

// ApprovalTable.defaultProps = {
//   // status: "",
//   // loading: false
// };

// export const mapStateToProps = state => ({
//   status: state.approvalResponse.status,
//   loading: state.approvalResponse.loading
// });

// export const mapDispatchToProps = dispatch => ({
//   ApprovalTableAction: form => dispatch(approvalResponse(form))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ApprovalTable);
