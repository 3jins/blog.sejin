import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Content extends Component {
    render() {
        return(
            <div className="content">
                <p>
                    {this.props.submenuList[this.props.selectedSubmenuIdx].content}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        submenuList: state.menus.menuList[state.menus.selectedMenuIdx].submenuList,
        selectedSubmenuIdx: state.menus.selectedSubmenuIdx,
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(actions, dispatch);
    return {
        handleChangeMenu: (menuIdx) => {dispatch(actions.changeMenu(menuIdx))},
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Content);