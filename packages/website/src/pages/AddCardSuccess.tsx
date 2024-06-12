import { Box, Layout } from "@rpg-manager/components"
import { Link } from "react-router-dom";

const AddCardSuccess = () => {
    return <Layout>
        <Box fullWidth>
        <h1>Pomyślnie dodano nową kartę.</h1>
        <p><Link to="/addCard">Dodaj następną</Link> | <Link to="/">Lista kart</Link></p>
        </Box>
    </Layout>
}

export default AddCardSuccess;