import { useAtom } from "jotai";
import state from "../state";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";

const UserPage = ({ open, user }) => {
    const [close, setClose] = useAtom(state.showProfile);

    return (
        <Dialog
            onClose={() => setClose(!close)}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-description">
                <Typography align="center">{"About"}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText component={"div"} id="alert-dialog-title">
                    <Typography align="center">{user.name}</Typography>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar
                            src={"data:image/png;base64," + user.profile_pic}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>
                    My galaxy has {user.count} stars.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Message</Button>
                <Button onClick={setClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserPage;
