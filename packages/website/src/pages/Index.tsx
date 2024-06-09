import { CardsList, Layout } from '@rpg-manager/components';

const Index = () => {
  return (
    <Layout>
      <CardsList apiUrl={import.meta.env.VITE_PUBLIC_API} />
    </Layout>
  );
};

export default Index;
