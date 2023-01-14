import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import SignIn from "./containers/SignIn/SignIn";

const App = () => {

		const theme = createTheme()

    return (
        <ThemeProvider
					theme={theme}
				>
            <Container component="main" maxWidth="xs">
                <SignIn />
            </Container>
        </ThemeProvider>
    );
};

export default App;
