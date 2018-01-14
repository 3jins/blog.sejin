// import React, {Component} from 'react';
//
// class NavItems extends Component {
//     constructor(props) {
//         super(props);
//         this.menuTitle = props.menuTitle;
//         this.submenuTitle = props.submenuTitle;
//         this.submenuIdx = props.submenuIdx;
//     }
//
//     componentWillReceiveProps(nextProps) {
//         if(this.submenuTitle !== nextProps.submenuTitle) {
//             this.submenuTitle = nextProps.submenuTitle;
//         }
//     }
//
//     render() {
//         return (
//             <td>
//                 <p onClick={() => this.props.onChangeMenu(this.submenuIdx, this.menuTitle, this.submenuTitle)}>
//                     {this.submenuTitle}
//                 </p>
//             </td>
//         );
//     }
// }
//
// export default NavItems;