import React from "react";
import './picture.css';
export interface PictureData{
    /**
     * URL Img Source
     */
    src : string;
    width : string;
    height : string;
}
export class PictureComponent extends React.Component{
    constructor(public props : Readonly<PictureData>){
        super(props);
    }
    private get style(){
        let src = this.props.src;
        if(src == null)
            src = '';

        return {
            backgroundImage: `url('${src}')`,
            width : this.props.width,
            height : this.props.height
        };
    }
    render(){
        return (
            <div className="picture" style={this.style}></div>
        );
    }
}