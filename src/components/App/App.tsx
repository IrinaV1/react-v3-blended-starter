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
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectPhoto, setSelectPhoto] = useState<Photo | null>(null);
  async function handleSearch(query: string) {
    try {
      setPhotos([]);
      setIsError(false);
      setIsLoading(true);
      const data = await getPhotos(query);
      if (data.length === 0) {
        toast.error("Photos not found!");
        return;
      }
      setPhotos(data);
    } catch {
      toast.error("Something went wrong");
      setIsError(true);
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
          {photos.length > 0 && (
            <PhotosGallery
              photos={photos}
              onSelect={(photo) => setSelectPhoto(photo)}
            />
          )}
          {selectPhoto && (
            <Modal onClose={() => setSelectPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectPhoto.avg_color,
                  borderColor: selectPhoto.avg_color,
                }}
              >
                <img src={selectPhoto.src.original} alt={selectPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
