import React, {
    PureComponent,
} from "react";

import Helpers from "../commons/utils/Helpers";
import { FormHelperText } from "@material-ui/core";
import "./ComponentStyles.css";
import { Resources } from "../constants";

interface IProps {
    src?: any;
    onChangeValue: (value: any) => void;
    file?: any;
    label: string;
    onImageClick?: () => void;
    className?: string;
    errorMessage?: string;
}

interface IStateProps {
    src?: string;
}

export default class ControlImagePicker extends PureComponent<IProps, IStateProps> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    public componentWillMount() {
        // if (!Helpers.isNullOrEmpty(this.props.src)
        //     && (document.getElementById("fileInput") as any).value === "") {
        this.setState({ src: this.props.src });
        // }
    }

    public render() {
        return (
            <div className={this.props.className}>
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    {
                        this.state.src ?
                            <img alt="icon" src={this.state.src}
                                className={"clickable image-picker " + (this.props.errorMessage ? " error" : "")}
                                onClick={this.props.onImageClick}
                                style={{ objectFit: "cover" }}
                            />
                            :
                            <img alt="icon" src={Resources.Images.THUMBNAIL}
                                className={"image-picker " + (this.props.errorMessage ? " error" : "")}
                                style={{ objectFit: "cover" }}
                            />
                    }
                    <label className="file-input-label ml-2" htmlFor="fileInput">
                        {this.props.label}
                    </label>
                    <input type="file" id="fileInput" accept="image/*" onChange={this.onChangeImage} />
                </div>
                <FormHelperText id="image-picker-error"
                    style={{ marginLeft: "14px" }}
                    error={!Helpers.isNullOrEmpty(this.props.errorMessage)}>
                    {this.props.errorMessage}
                </FormHelperText>
            </div>
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
