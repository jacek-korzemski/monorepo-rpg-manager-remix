import { AddCard, Layout } from "@rpg-manager/components"

const AddCardPage = () => {
    return <Layout>
        <AddCard apiUrl={import.meta.env.VITE_PUBLIC_API} />
    </Layout>
}

export default AddCardPage;