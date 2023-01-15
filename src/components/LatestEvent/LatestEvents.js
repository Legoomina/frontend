import PropTypes from "prop-types";
import {
    Box,
    Stack,
    Link,
    Card,
    Button,
    Divider,
    Typography,
    CardHeader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helper";

LatestEvents.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    list: PropTypes.array.isRequired,
};

export default function LatestEvents({ title, subheader, list, ...other }) {
    const navigate = useNavigate();

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                {list.map((news) => (
                    <NewsItem key={news.id} news={news} />
                ))}
            </Stack>

            <Divider />

            <Box sx={{ p: 2, textAlign: "right" }}>
                <Button
                    size="small"
                    color="inherit"
                    onClick={() => {
                        navigate("/myactivs");
                    }}
                >
                    View all
                </Button>
            </Box>
        </Card>
    );
}

NewsItem.propTypes = {
    news: PropTypes.shape({
        description: PropTypes.string,
        image: PropTypes.string,
        startAt: PropTypes.instanceOf(Date),
        endAt: PropTypes.instanceOf(Date),
        title: PropTypes.string,
    }),
};

function NewsItem({ news }) {
    const { image, title, description, startAt, endAt } = news;

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                <Link
                    color="inherit"
                    variant="subtitle2"
                    underline="hover"
                    noWrap
                >
                    {title}
                </Link>

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                >
                    {description}
                </Typography>
            </Box>

            <Typography
                variant="caption"
                sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
            >
                From: {formatDate(startAt)}
            </Typography>

            <Typography
                variant="caption"
                sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
            >
                To: {formatDate(endAt)}
            </Typography>
        </Stack>
    );
}
