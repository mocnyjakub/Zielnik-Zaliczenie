import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  GridItem,
  Heading,
  Image,
  Badge,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Form from './Form';
import defaultImage from './image.png';
import EditModal from './Modal';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [plants, setPlants] = useState(
    JSON.parse(window.localStorage.getItem('plants')) ?? []
  );

  const [plantIdToEdit, setPlantIdToEdit] = useState();

  const addPlantsForLocalStorageAndReactState = plantObj => {
    const tempPlantsArr = [...plants, plantObj];
    setPlants(tempPlantsArr);
    localStorage.setItem('plants', JSON.stringify(tempPlantsArr));
  };

  const addNewPlant = (data, resetForm) => {
    const uniqueCatalogId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const tempPlant = { ...data, catalogId: uniqueCatalogId };
    addPlantsForLocalStorageAndReactState(tempPlant);
    resetForm();
  };

  const deletePlant = id => {
    const tempPlantsArr = plants.filter(plant => plant.catalogId !== id);
    setPlants(tempPlantsArr);
    localStorage.setItem('plants', JSON.stringify(tempPlantsArr));
  };

  const editPlant = (data, id, resetForm) => {
    const tempPlantsArr = plants.map(plant =>
      plant.catalogId === id ? { catalogId: plant.catalogId, ...data } : plant
    );
    setPlants(tempPlantsArr);
    localStorage.setItem('plants', JSON.stringify(tempPlantsArr));
    resetForm();
    onClose();
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" maxWidth={1440} margin={'auto'}>
        <Grid minH="100vh" p={3}>
          <GridItem>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Heading>Herbarium</Heading>
            <Text p={5}>Dodaj nową roślinę...</Text>
            <Form
              addNewPlant={addNewPlant}
              plantIdToEdit={plantIdToEdit}
              editPlant={editPlant}
              plants={plants}
            ></Form>
            {plants.map(plant => (
              <Box
                flexDirection="row"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                m={5}
                key={plant.catalogId}
              >
                {plant?.imageLink ? (
                  <Box m={6} key={plant.catalogId}>
                    <Image margin={'auto'} src={plant.imageLink} />
                  </Box>
                ) : (
                  <Box>
                    <Image
                      margin={'auto'}
                      src={defaultImage}
                      alt="template plant image"
                    />
                  </Box>
                )}

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      {plant.catalogId}
                    </Badge>
                    <Button
                      onClick={() => deletePlant(plant.catalogId)}
                      colorScheme="red"
                      ml={2}
                      size="xs"
                    >
                      Usuń
                    </Button>
                    <Button
                      onClick={() => {
                        onOpen();
                        setPlantIdToEdit(plant.catalogId);
                      }}
                      colorScheme="blue"
                      ml={2}
                      size="xs"
                    >
                      Edytuj
                    </Button>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    ></Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {plant.name}
                  </Box>
                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {`opis: ${
                        plant?.description ? plant.description : 'brak'
                      }`}
                    </Box>
                  </Box>
                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {`kategoria: ${plant?.category}`}
                    </Box>
                  </Box>
                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {`Częstotliwość tygodniowego podlewania: ${plant.frequency}`}
                    </Box>
                  </Box>
                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {`preferencje: ${plant?.preferences}`}
                    </Box>
                  </Box>
                  <EditModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                    plantIdToEdit={plantIdToEdit}
                    editPlant={editPlant}
                    plants={plants}
                  ></EditModal>
                </Box>
              </Box>
            ))}
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
