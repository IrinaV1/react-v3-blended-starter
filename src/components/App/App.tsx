import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import { useState } from "react";
import Text from "../Text/Text";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleSearch(query: string) {
    try {
      setError(null);
      setLoading(true);
      const data = await getPhotos(query);
      console.log(data);
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Section>
        <Container>
          {loading && <Loader />}
          {error && <Text>{error}</Text>}
          <Form onSubmit={handleSearch} />
          <PhotosGallery />
        </Container>
      </Section>
    </>
  );
}
