import { CircularProgress, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(7)
        }
    })
);
interface LoaderProps {
    loading: boolean;
    children: ReactNode;
}

export const Loader = ({ loading, children }: LoaderProps) => {
    const classes = useStyles({});

    return loading ? (
        <Grid container justify="center">
            <CircularProgress className={classes.progress} color="secondary" />
        </Grid>
    ) : (
        <div>{children}</div>
    );
};
