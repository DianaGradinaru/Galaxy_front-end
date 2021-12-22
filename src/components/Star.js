import moment from "moment";

import * as React from "react";
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

const Star = ({ id, text, image, createdat, name }) => {
    const created = moment(createdat).fromNow();

    return (
        <Box m={2} pt={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    {image && (
                        <CardMedia
                            component="img"
                            height="300"
                            image={"data:image/png;base64," + image}
                        />
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        <small title={createdat}>{created}</small>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default Star;
