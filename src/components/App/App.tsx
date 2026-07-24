import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import { useState } from "react";
import Text from "../Text/Text";
import type { Photo } from "../../types/photo";
import toast from "react-hot-toast";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  async function handleSearch(query: string) {
    try {
      setIsError(null);
      setIsLoading(true);
      const data = await getPhotos(query);
      if (data.length === 0) {
        toast.error("Photos not found!");
        return;
      }
      setPhotos(data);
    } catch {
      setIsError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Section>
        <Container>
          {isLoading && <Loader />}
          {isError && <Text>{`Something went wrong`}</Text>}
          <Form onSubmit={handleSearch} />
          {photos.length > 0 && <PhotosGallery photos={photos} />}
        </Container>
      </Section>
    </>
  );
}
