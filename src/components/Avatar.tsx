import { Tooltip } from "@material-ui/core";
import React, {
    PureComponent,
} from "react";

import Helpers from "../commons/utils/Helpers";
import { Resources } from "../constants";

import "./ComponentStyles.css";

interface IProps {
    src?: any;
    onChangeValue: (value: any) => void;
    file?: any;
    label: string;
}

interface IStateProps {
    src: string;
}

export default class Avatar extends PureComponent<IProps, IStateProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            src: Resources.Images.DEFAULT_AVATAR_URL,
        };
    }

    public componentWillMount() {
        if (!Helpers.isNullOrEmpty(this.props.src)
            && (document.getElementById("fileInput") as any).value === "") {
            this.setState({ src: this.props.src });
        }
    }

    public render() {
        return (
            <Tooltip title={this.props.label} aria-label={this.props.label} arrow>
                <label className="file-input-label mb-3" htmlFor="fileInput">
                    <img
                        alt="avatar" 
                        src={this.state.src}
                        id="avatarImg"
                        className="avatar-120" />
                    <input type="file" id="fileInput" accept="image/*" onChange={this.onChangeImage} />
                </label>
            </Tooltip>
        );
    }

    private onChangeImage = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                src: URL.createObjectURL(event.target.files[0]),
            });
        }
        const onChangeValue: (event: any) => void = this.props.onChangeValue;
        onChangeValue(event.target.files[0]);
    }
}
