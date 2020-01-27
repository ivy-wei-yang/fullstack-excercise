import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Warning as WarningIcon
} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles1 = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
}));

export interface Props {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
}

function MySnackbarContentWrapper(props: Props) {
    const classes = useStyles1({});
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    );
}

const useStyles2 = makeStyles((theme: Theme) => ({
    margin: {
        margin: theme.spacing(1)
    }
}));

interface NotificationTypeProps {
    show: boolean;
    message: string;
}
interface NotificationActionProps {
    show: (message: string) => void;
    hide: () => void;
}

interface NotificationProps {
    success: NotificationTypeProps;
    error: NotificationTypeProps;
    warning: NotificationTypeProps;
    info: NotificationTypeProps;

    actions: {
        success: NotificationActionProps;
        error: NotificationActionProps;
        warning: NotificationActionProps;
        info: NotificationActionProps;
    };
}

/**
 *
 * For now the messages are going to be replaced if new message comes in.
 */
export const Notification = ({
    success,
    error,
    warning,
    info,
    actions
}: NotificationProps) => {
    const classes = useStyles2({});

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                open={success.show}
                autoHideDuration={6000}
                onClose={actions.success.hide}
            >
                <MySnackbarContentWrapper
                    onClose={actions.success.hide}
                    variant="success"
                    message={success.message}
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={error.show}
            >
                <MySnackbarContentWrapper
                    onClose={actions.error.hide}
                    variant="error"
                    className={classes.margin}
                    message={error.message}
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={warning.show}
                autoHideDuration={6000}
            >
                <MySnackbarContentWrapper
                    onClose={actions.warning.hide}
                    variant="warning"
                    className={classes.margin}
                    message={warning.message}
                />
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={info.show}
                autoHideDuration={6000}
            >
                <MySnackbarContentWrapper
                    onClose={actions.info.hide}
                    variant="info"
                    className={classes.margin}
                    message={info.message}
                />
            </Snackbar>
        </div>
    );
};
