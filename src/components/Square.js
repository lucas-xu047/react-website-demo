import React, { Component } from "react";

export default class Square extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <button className={['square', this.props.flag ? 'hightLight' : ''].join(' ')} onClick={() => { this.props.onClick() }}>
                    {this.props.value}
                </button >
            </>
        )
    }
}


/* 函数方法 */
// function Square(props) {
//     return (
//         <button className='square' onClick={() => { props.onClick() }}>
//             {props.value}
//         </button>
//     )
// }