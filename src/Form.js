import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

const Form = ({ addNewPlant, isEdit, plantIdToEdit, editPlant, plants }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleAddOrEditPlant = data => {
    if (isEdit) {
      delete data.catalogId;
      editPlant(data, plantIdToEdit, reset);
    } else {
      addNewPlant(data, reset);
    }
  };

  useEffect(() => {
    if (isEdit) {
      const defaultEditValues = plants.find(
        plant => plant.catalogId === plantIdToEdit
      );
      reset(defaultEditValues);
    }
  }, [plantIdToEdit, isEdit, plants, reset]);

  return (
    <form onSubmit={handleSubmit(data => handleAddOrEditPlant(data))}>
      <Box p={3}>
        <FormControl isInvalid={errors.name}>
          <Input
            id="name"
            {...register('name', {
              required: 'To pole jest wymagane',
            })}
            placeholder="Nazwa rośliny"
          ></Input>
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box p={3}>
        <FormControl>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Opis rośliny"
          ></Textarea>
        </FormControl>
      </Box>
      <Box p={3}>
        <FormControl>
          <Input
            id="imageLink"
            {...register('imageLink')}
            placeholder="Link do obrazka"
          ></Input>
        </FormControl>
      </Box>
      <Box p={3}>
        <FormControl isInvalid={errors.category}>
          <Input
            id="category"
            {...register('category', {
              required: 'To pole jest wymagane',
            })}
            placeholder="Kategoria"
          ></Input>
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box p={3}>
        <FormControl name="frequency" isInvalid={errors.frequency}>
          <FormLabel>Częstotliwość tygodniowego podlewania</FormLabel>
          <NumberInput
            defaultValue={1}
            id="frequency"
            {...register('frequency', {
              required: 'To pole jest wymagane',
            })}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {errors.frequency && errors.frequency.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box p={3}>
        <FormControl isInvalid={errors.preferences}>
          <Input
            id="preferences"
            {...register('preferences', {
              required: 'To pole jest wymagane',
            })}
            placeholder="Preferencje rośliny"
          ></Input>
          <FormErrorMessage>
            {errors.preferences && errors.preferences.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box p={5}>
        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          {isEdit ? 'Edytuj' : 'Dodaj'}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
