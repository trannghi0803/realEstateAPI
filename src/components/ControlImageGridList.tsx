import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { Helpers, IPhotoRequest } from "../commons/utils";
import { Delete } from '@material-ui/icons';
import { CircularProgress, Grid } from '@material-ui/core';
import "./ComponentStyles.css";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            // minHeight: '4rem'
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        process: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffffad',
            display: 'flex'
        }
    }),
);

interface Props {
    key?: string;
    photos?: any[];
    genKey?: string;
    onDelete?: (key: string, index: number, id: string) => void;
    onOpen?: () => void;
    isLoading?: boolean;
}

export default function ControlImageGridList(props: Props) {
    const { key, photos, onDelete } = props;
    const classes = useStyles();

    const handleDelete = (index: number, id: string) => {
        if (Helpers.isFunction(onDelete)) {
            onDelete(key, index, id);
        }
    }
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {photos?.map((photo, i) => {
                    console.log("photo", photo);
                    const genKey = photo || new Date().getTime();
                    // if (Helpers.isNullOrEmpty(photo.photoId)) {
                    //     console.log("null22", photo.photoId)
                    //     return null;
                    // }
                    return (
                        <GridListTile key={'GridListTile' + genKey}>
                            <img
                                style={{ width: "100%" }}
                                className="MuiGridListTile-imgFullHeight"
                                src={photo}
                                alt={props.genKey || `${photo.displayOrder}${genKey}`}
                                onClick={() => window.open(`${photo}`, "_blank")}
                            />
                            <GridListTileBar
                                title={i + 1}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                    Helpers.isFunction(onDelete)
                                        ? <IconButton aria-label={`delete ${genKey}`} onClick={() => handleDelete(i, photo || "")}>
                                            <Delete className={classes.title} />
                                        </IconButton>
                                        : undefined
                                }
                            />
                        </GridListTile>
                    )
                })}
            </GridList>
            <Grid className={props.isLoading ? classes.process : 'd-none'}>
                <CircularProgress />
            </Grid>
        </div>
    );
}
